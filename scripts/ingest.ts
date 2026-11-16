// Relevé quotidien des prix : parcourt tout le catalogue français, calcule le prix juste
// de chaque carte et écrit
//   latest/<set>.json     état du jour d'une extension
//   history/<set>.json    une colonne de prix par jour (c'est l'historique des graphiques)
//   market.json           vue d'ensemble : valeur par famille, cartes les plus chères, mouvements
//   market-history.json   valeur totale par jour
//
//   node scripts/ingest.ts [--out .data] [--sets sv03.5,base1]
//
// Avec --sets, seules ces extensions sont relevées (market.json n'est alors pas réécrit).

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { parseArgs } from "node:util";
import type { Serie } from "../src/lib/tcgdex.ts";
import { runProblems, summarizeSet, type CardSummary, type Market, type MarketCard, type MarketHistory, type SetHistory, type SetSnapshot } from "../src/lib/snapshot.ts";
import { fetchCard, fetchSerie, fetchSet, fetchSetEn, listSeries, retry } from "../src/lib/tcgdex.ts";
import { cardtraderClient, frenchAsks, matchExpansion } from "./cardtrader.ts";
import { ebayClient } from "./ebay.ts";

const { values: args } = parseArgs({ options: { out: { type: "string", default: ".data" }, sets: { type: "string" } } });
const out = args.out!;
const only = args.sets?.split(",");
const today = new Date().toISOString().slice(0, 10);
const CONCURRENCY = 10;
// TCGdex a des indisponibilités de quelques secondes (503) : le relevé attend jusqu'à 25 s par requête.
retry.tries = 7;
// Quota eBay gratuit : 5 000 appels par jour. On garde de la marge.
const EBAY_BUDGET = Number(process.env.EBAY_DAILY_CALLS ?? 4000);

async function pool<T, R>(items: T[], fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (next < items.length) {
        const i = next++;
        results[i] = await fn(items[i]);
      }
    }),
  );
  return results;
}

const readJson = async <T>(path: string): Promise<T | null> => {
  try {
    return JSON.parse(await readFile(join(out, path), "utf8")) as T;
  } catch {
    return null;
  }
};
const writeJson = (path: string, data: unknown) => writeFile(join(out, path), JSON.stringify(data));

/** Ajoute (ou remplace) la colonne du jour dans une série temporelle. */
function setDay(days: string[], rows: Record<string, (number | null)[]>, values: Record<string, number | null>) {
  let col = days.indexOf(today);
  if (col < 0) col = days.push(today) - 1;
  for (const key of new Set([...Object.keys(rows), ...Object.keys(values)])) {
    const row = (rows[key] ??= []);
    while (row.length < days.length) row.push(null);
    row[col] = values[key] ?? null;
  }
}

/** Annonces françaises des cartes d'une extension, ou null si CardTrader ne la connaît pas. */
async function frenchForSet(set: { id: string; abbreviation?: { official?: string }; cards: { id: string; localId: string }[] }) {
  if (!cardtrader) return null;
  const en = await fetchSetEn(set.id);
  const expansion = matchExpansion({ code: set.abbreviation?.official, enName: en?.name }, cardtrader.expansions);
  if (!expansion || !en) return null;
  const enNames = new Map(en.cards.map((c) => [c.localId, c.name]));
  const { asks, rejected } = frenchAsks(await cardtrader.listings(expansion.id), set.cards.map((c) => ({ ...c, enName: enNames.get(c.localId) })));
  frStats.sets++;
  frStats.cards += asks.size;
  frStats.rejected += rejected;
  return asks;
}

await mkdir(join(out, "latest"), { recursive: true });
await mkdir(join(out, "history"), { recursive: true });
const ebay = await ebayClient();
const cardtrader = await cardtraderClient();
console.log(`Relevé du ${today} — CardTrader ${cardtrader ? "activé" : "désactivé (pas de jeton)"} — eBay ${ebay ? "activé" : "désactivé (pas de clés)"}`);
const frStats = { sets: 0, cards: 0, rejected: 0 }; // extensions reliées, cartes avec annonces françaises, annonces écartées

const previous = await readJson<Market>("market.json");
const market: Market = { updated: new Date().toISOString(), cards: 0, priced: 0, series: [], top: [], up: [], down: [] };
const all: MarketCard[] = [];
const catalog: Serie[] = []; // familles et extensions, publiées pour que le site ne dépende pas de TCGdex
let failed = 0; // cartes que TCGdex n'a pas su servir, même au second essai

for (const brief of await listSeries()) {
  const serie = await fetchSerie(brief.id);
  if (!serie) continue;
  catalog.push(serie);
  const stats = { id: serie.id, name: serie.name, value: 0, priced: 0, cards: 0 };
  for (const setBrief of serie.sets) {
    if (only && !only.includes(setBrief.id)) continue;
    const set = await fetchSet(setBrief.id);
    if (!set) continue;
    // undefined = échec de lecture (null = la carte n'existe pas). Second essai, une à la fois.
    const full = await pool(set.cards, (c) => fetchCard(c.id).catch(() => undefined));
    for (const [i, c] of set.cards.entries()) if (full[i] === undefined) full[i] = await fetchCard(c.id).catch(() => undefined);
    // Annonces de cartes françaises. Une panne de CardTrader ne doit pas faire échouer le
    // relevé : les prix du jour se calculent alors sans elles.
    let french: Awaited<ReturnType<typeof frenchForSet>> = null;
    try {
      french = await frenchForSet(set);
    } catch (err) {
      console.error(`CardTrader indisponible pour ${set.id} : ${err}`);
    }
    const fresh = new Map(summarizeSet(full.filter((c) => c != null), french ?? undefined).map((c) => [c.id, c]));
    // Une carte illisible aujourd'hui garde sa fiche de la veille (sans point d'historique)
    // plutôt que de disparaître de l'extension.
    const before = new Map((await readJson<SetSnapshot>(`latest/${setBrief.id}.json`))?.cards.map((c) => [c.id, c]));
    const lost = new Set(set.cards.filter((_, i) => full[i] === undefined).map((c) => c.id));
    failed += lost.size;
    const cards: CardSummary[] = set.cards.flatMap((c) => fresh.get(c.id) ?? (lost.has(c.id) ? (before.get(c.id) ?? []) : []));

    const { cards: _briefs, ...setInfo } = set;
    const snapshot: SetSnapshot = { set: { ...setInfo, serie: { id: serie.id, name: serie.name } }, updated: market.updated, cards };
    await writeJson(`latest/${set.id}.json`, snapshot);

    const history = (await readJson<SetHistory>(`history/${set.id}.json`)) ?? { days: [], prices: {} };
    const values: Record<string, number | null> = {};
    for (const c of fresh.values()) {
      if (c.std) values[c.localId] = c.std.p;
      if (c.rev) values[`${c.localId}~r`] = c.rev.p;
    }
    setDay(history.days, history.prices, values);
    await writeJson(`history/${set.id}.json`, history);

    stats.cards += cards.length;
    for (const c of cards) {
      if (!c.std) continue;
      stats.priced++;
      stats.value += c.std.p;
      all.push({ ...c, setId: set.id, setName: set.name });
    }
    console.log(`${set.id.padEnd(10)} ${String(cards.length).padStart(4)} cartes  ${set.name}`);
  }
  if (stats.cards) market.series.push({ ...stats, value: Math.round(stats.value) });
}

if (ebay) {
  // Les cartes les plus chères d'abord : c'est là que les annonces gradées existent.
  const targets = [...all].sort((a, b) => b.std!.p - a.std!.p).slice(0, EBAY_BUDGET);
  const official = new Map<string, number>();
  let done = 0;
  for (const setId of new Set(targets.map((t) => t.setId))) {
    const snapshot = (await readJson<SetSnapshot>(`latest/${setId}.json`))!;
    official.set(setId, snapshot.set.cardCount.official);
    const wanted = new Map(targets.filter((t) => t.setId === setId).map((t) => [t.id, t]));
    for (const c of snapshot.cards) {
      if (!wanted.has(c.id)) continue;
      const data = await ebay(c.name, c.localId, official.get(setId)!).catch(() => null);
      if (data) c.ebay = data;
      done++;
    }
    // shortcut: le prix du jour reste celui calculé sans eBay ; les annonces servent
    // au site (fiche carte). À fusionner dans summarize() une fois l'adaptateur validé.
    await writeJson(`latest/${setId}.json`, snapshot);
  }
  console.log(`eBay : ${done} cartes relevées`);
}

if (!only) {
  // Certaines illustrations annoncées n'existent pas encore côté TCGdex : on le vérifie
  // pour les quelques cartes mises en avant sur l'accueil.
  const slim = async ({ ebay: _e, ...c }: MarketCard): Promise<MarketCard> => {
    const ok = c.image && (await fetch(`${c.image}/low.webp`, { method: "HEAD" }).then((r) => r.ok, () => false));
    return ok ? c : { ...c, image: undefined };
  };
  const pick = (list: MarketCard[], n: number) => pool(list.slice(0, n), slim);
  // Seuls les prix fiables entrent dans les classements : une carte au marché mince
  // affiche vite ±100 % sans que cela veuille dire quoi que ce soit.
  const trusted = all.filter((c) => c.std!.c >= 60);
  const liquid = trusted.filter((c) => c.std!.t !== null && c.std!.p >= 10 && c.std!.l >= 68);
  market.cards = market.series.reduce((s, x) => s + x.cards, 0);
  market.priced = all.length;
  // Un relevé anormal n'est pas publié : le script s'arrête en erreur avant market.json,
  // et le flux GitHub Actions ne pousse rien.
  const problems = runProblems(previous, { cards: market.cards, priced: market.priced, failed });
  if (problems.length) {
    console.error(`Relevé refusé : ${problems.join(" ; ")}.`);
    process.exit(1);
  }
  market.top = await pick([...trusted].sort((a, b) => b.std!.p - a.std!.p), 60);
  market.up = await pick([...liquid].sort((a, b) => b.std!.t! - a.std!.t!), 24);
  market.down = await pick([...liquid].sort((a, b) => a.std!.t! - b.std!.t!), 24);
  await writeJson("market.json", market);
  await writeJson("catalog.json", catalog);

  const mh = (await readJson<MarketHistory>("market-history.json")) ?? { days: [], total: [], series: {} };
  const rows: Record<string, (number | null)[]> = { ...mh.series, total: mh.total };
  setDay(mh.days, rows, { ...Object.fromEntries(market.series.map((s) => [s.id, s.value])), total: market.series.reduce((s, x) => s + x.value, 0) });
  const { total, ...series } = rows;
  await writeJson("market-history.json", { days: mh.days, total, series });
  if (cardtrader) console.log(`CardTrader : ${frStats.sets} extensions reliées, ${frStats.cards} cartes avec annonces françaises, ${frStats.rejected} annonces écartées (nom différent).`);
  console.log(`${market.cards} cartes, ${market.priced} avec un prix, ${failed} illisibles, ${market.top.filter((c) => c.image).length}/${market.top.length} illustrations vérifiées en tête de classement.`);
}

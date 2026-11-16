// Tirage des cartes témoins : node scripts/temoins.ts <dossier du relevé>
// Tirage reproductible (pas de hasard machine) dans chaque case époque × tranche de prix,
// en variant les raretés et les extensions. Écrit docs/cartes-temoins.json et docs/cartes-temoins.md.
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import type { CardSummary, SetSnapshot } from "../src/lib/snapshot.ts";

const SEED = "temoins-2026-11-16";
const PER_CELL = 3;
const PER_FLAG = 10;

const ERAS: [string, string, string[]][] = [
  ["wizards", "Wizards (1999-2003)", ["base", "neo", "ecard"]],
  ["ex", "EX et POP (2003-2007)", ["ex", "pop"]],
  ["dp", "Diamant & Perle, Platine, HGSS (2007-2011)", ["dp", "pl", "hgss", "col"]],
  ["bw", "Noir & Blanc (2011-2013)", ["bw"]],
  ["xy", "XY (2014-2016)", ["xy"]],
  ["sm", "Soleil et Lune (2017-2019)", ["sm"]],
  ["swsh", "Épée et Bouclier (2020-2022)", ["swsh"]],
  ["sv", "Écarlate et Violet (2023-2025)", ["sv"]],
  ["me", "Méga-Évolution (2025-2026)", ["me"]],
  ["divers", "McDonald's et kits du dresseur", ["mc", "tk"]],
];
const TIERS: [string, number][] = [
  ["moins de 1 €", 1],
  ["1 à 5 €", 5],
  ["5 à 20 €", 20],
  ["20 à 100 €", 100],
  ["100 à 500 €", 500],
  ["500 € et plus", Infinity],
];

interface Witness {
  id: string;
  set: string;
  name: string;
  localId: string;
  rarity: string;
  era: string;
  tier: string;
  why: string;
  drawn: { price: number; confidence: number; french: number };
  reference: null;
}

const dir = process.argv[2];
if (!dir) throw new Error("usage : node scripts/temoins.ts <dossier du relevé>");

const rank = (id: string) => createHash("sha256").update(SEED + id).digest("hex");
const cells = new Map<string, { card: CardSummary; set: string }[]>();
const flagged: Record<"far" | "shared", { card: CardSummary; set: string; era: string }[]> = { far: [], shared: [] };
let date = "";

for (const file of readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
  const snap: SetSnapshot = JSON.parse(readFileSync(`${dir}/${file}`, "utf8"));
  date = snap.updated.slice(0, 10) > date ? snap.updated.slice(0, 10) : date;
  const era = ERAS.find(([, , series]) => series.includes(snap.set.serie.id))?.[0];
  if (!era) continue;
  for (const card of snap.cards) {
    if (!card.std) continue;
    const entry = { card, set: snap.set.name, era };
    if (card.far) flagged.far.push(entry);
    else if (card.shared) flagged.shared.push(entry);
    else {
      const tier = TIERS.findIndex(([, max]) => card.std!.p < max);
      const key = `${era}|${tier}`;
      cells.set(key, [...(cells.get(key) ?? []), entry]);
    }
  }
}

const witness = (e: { card: CardSummary; set: string }, era: string, why: string): Witness => ({
  id: e.card.id,
  set: e.set,
  name: e.card.name,
  localId: e.card.localId,
  rarity: e.card.rarity ?? "Sans rareté",
  era,
  tier: TIERS[TIERS.findIndex(([, max]) => e.card.std!.p < max)][0],
  why,
  drawn: { price: e.card.std!.p, confidence: e.card.std!.c, french: e.card.std!.f ?? 0 },
  reference: null,
});

const out: Witness[] = [];
for (const [era] of ERAS)
  for (let tier = 0; tier < TIERS.length; tier++) {
    const pool = (cells.get(`${era}|${tier}`) ?? []).sort((a, b) => rank(a.card.id).localeCompare(rank(b.card.id)));
    const picked: typeof pool = [];
    // À chaque tour, la première carte qui apporte une rareté puis une extension pas encore prises.
    while (picked.length < PER_CELL && picked.length < pool.length) {
      const fresh = (e: (typeof pool)[number]) =>
        (picked.some((p) => p.card.rarity === e.card.rarity) ? 2 : 0) + (picked.some((p) => p.set === e.set) ? 1 : 0);
      const rest = pool.filter((e) => !picked.includes(e));
      picked.push(rest.reduce((best, e) => (fresh(e) < fresh(best) ? e : best)));
    }
    out.push(...picked.map((e) => witness(e, era, "tirage")));
  }
for (const flag of ["far", "shared"] as const)
  out.push(
    ...flagged[flag]
      .sort((a, b) => rank(a.card.id).localeCompare(rank(b.card.id)))
      .slice(0, PER_FLAG)
      .map((e) => witness(e, e.era, flag === "far" ? "prix douteux : écart avec le marché américain" : "prix douteux : produit partagé")),
  );

writeFileSync("docs/cartes-temoins.json", JSON.stringify({ seed: SEED, snapshot: date, cards: out }, null, 1) + "\n");

const count = (era: string, tier: string) => out.filter((w) => w.why === "tirage" && w.era === era && w.tier === tier).length;
const eur = (n: number) => n.toFixed(2).replace(".", ",") + " €";
const md = `# Cartes témoins

${out.length} cartes tirées dans le relevé du ${date}. Elles servent à noter chaque source de prix, puis le modèle : pour chacune, un prix français de référence sera établi à la main à partir de plusieurs sources, daté et sourcé.

**État : les cartes sont tirées, aucun prix de référence n'est encore établi.** Le champ \`reference\` de \`docs/cartes-temoins.json\` est vide pour toutes.

## Comment elles ont été choisies

Personne ne les a choisies à la main : \`node scripts/temoins.ts <dossier du relevé>\` refait exactement le même tirage sur le même relevé.

- Les cartes cotées sont rangées par époque et par tranche de prix (le prix affiché par le site ce jour-là).
- Dans chaque case, ${PER_CELL} cartes au plus, en variant d'abord la rareté, puis l'extension. Une case qui contient moins de ${PER_CELL} cartes les donne toutes.
- S'y ajoutent ${PER_FLAG} cartes signalées pour un écart de plus de dix fois avec le marché américain et ${PER_FLAG} cartes dont le produit est partagé avec une autre : ce sont les cas où notre prix est le plus suspect.
- Les cartes sans aucun prix ne sont pas tirées : il n'y a pas de tranche où les ranger.

Limite : le tirage range les cartes selon notre prix actuel, qui est précisément ce qu'on veut contrôler. Une carte mal cotée est donc peut-être dans la mauvaise tranche. Cela ne fausse pas le contrôle, mais la répartition réelle par tranche pourra différer une fois les prix de référence établis.

## Répartition

| Époque | ${TIERS.map(([t]) => t).join(" | ")} |
| --- | ${TIERS.map(() => "---:").join(" | ")} |
${ERAS.map(([id, label]) => `| ${label} | ${TIERS.map(([t]) => count(id, t)).join(" | ")} |`).join("\n")}

Prix douteux ajoutés : ${out.filter((w) => w.why !== "tirage").length}. Cartes dont le prix repose déjà sur trois annonces françaises ou plus : ${out.filter((w) => w.drawn.french >= 3).length}.

## Les cartes

| Carte | Extension | N° | Rareté | Prix du site au tirage | Annonces françaises | Raison |
| --- | --- | --- | --- | ---: | ---: | --- |
${out.map((w) => `| ${w.name} | ${w.set} | ${w.localId} | ${w.rarity} | ${eur(w.drawn.price)} | ${w.drawn.french} | ${w.why} |`).join("\n")}
`;
writeFileSync("docs/cartes-temoins.md", md);
console.log(`${out.length} cartes témoins, relevé du ${date}`);

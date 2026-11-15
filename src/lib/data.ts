"use cache";
// Accès aux données côté serveur, mis en cache par Next (« use cache »).
// Deux origines : l'API TCGdex en direct, et les relevés quotidiens produits par
// scripts/ingest.ts (branche `data` du dépôt, ou dossier local en développement).

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cacheLife } from "next/cache";
import { eraOfSerie, type Era, type GradedObservations } from "./pricing/graded";
import type { Quote } from "./pricing/raw";
import { quoteFor, summarizeSet, type Market, type MarketHistory, type SetHistory, type SetSnapshot } from "./snapshot";
import { fetchCard, fetchSerie, fetchSet, listSeries, searchCards, usdToEur, type Card, type CardBrief, type Serie } from "./tcgdex";

const DATA_URL = process.env.POKETRACK_DATA_URL ?? "https://raw.githubusercontent.com/louistouquet/PokeTrack/data";

async function readData<T>(path: string): Promise<T | null> {
  try {
    if (process.env.POKETRACK_DATA_DIR) {
      return JSON.parse(await readFile(join(process.env.POKETRACK_DATA_DIR, path), "utf8")) as T;
    }
    const res = await fetch(`${DATA_URL}/${path}`);
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

/** Toutes les familles avec leurs extensions, de la plus récente à la plus ancienne. */
export async function getSeries(): Promise<Serie[]> {
  cacheLife("days");
  const series = await Promise.all((await listSeries()).map((s) => fetchSerie(s.id)));
  return series
    .filter((s): s is Serie => s !== null && s.sets.length > 0)
    .sort((a, b) => (b.releaseDate ?? "").localeCompare(a.releaseDate ?? ""));
}

export async function getSerie(id: string): Promise<Serie | null> {
  cacheLife("days");
  return fetchSerie(id);
}

/** État du jour d'une extension : relevé quotidien, sinon calcul en direct. */
export async function getSetSnapshot(id: string): Promise<SetSnapshot | null> {
  cacheLife("hours");
  const stored = await readData<SetSnapshot>(`latest/${id}.json`);
  if (stored) return stored;
  const set = await fetchSet(id);
  if (!set) return null;
  const fx = await usdToEur();
  const full: Card[] = [];
  // Par paquets de 12 pour ménager l'API.
  for (let i = 0; i < set.cards.length; i += 12) {
    const batch = await Promise.all(set.cards.slice(i, i + 12).map((c) => fetchCard(c.id).catch(() => null)));
    for (const card of batch) if (card) full.push(card);
  }
  const { cards: _briefs, ...info } = set;
  return { set: info, updated: new Date().toISOString(), cards: summarizeSet(full, fx) };
}

export interface CardDetail {
  card: Card;
  era: Era;
  serie: { id: string; name: string };
  standard: Quote;
  reverse: Quote | null;
  observations: GradedObservations; // annonces gradées relevées sur eBay, si disponibles
  shared: boolean; // prix partagé par plusieurs cartes dans la source
  history: { standard: Point[]; reverse: Point[] };
  neighbours: { prev: CardBrief | null; next: CardBrief | null };
}
interface Point {
  day: string;
  value: number;
}

export async function getCardDetail(id: string): Promise<CardDetail | null> {
  cacheLife("hours");
  const card = await fetchCard(id);
  if (!card) return null;
  const [snapshot, history, fx] = await Promise.all([getSetSnapshot(card.set.id), getSetHistory(card.set.id), usdToEur()]);
  const index = snapshot?.cards.findIndex((c) => c.id === id) ?? -1;
  const stored = snapshot?.cards[index];
  const serie = snapshot?.set.serie ?? { id: "", name: "" };
  const standard = quoteFor(card, "standard", fx, stored?.ebay);
  if (stored?.shared) standard.confidence = Math.min(standard.confidence, 25);
  const series = (key: string): Point[] =>
    (history?.prices[key] ?? []).flatMap((value, i) => (value === null ? [] : [{ day: history!.days[i], value }]));
  return {
    card,
    era: eraOfSerie(serie.id),
    serie,
    standard,
    reverse: card.variants?.reverse ? quoteFor(card, "reverse", fx) : null,
    observations: stored?.ebay?.graded ?? {},
    shared: !!stored?.shared,
    history: { standard: series(card.localId), reverse: series(`${card.localId}~r`) },
    neighbours: { prev: snapshot?.cards[index - 1] ?? null, next: snapshot?.cards[index + 1] ?? null },
  };
}

export async function getSetHistory(id: string): Promise<SetHistory | null> {
  cacheLife("hours");
  return readData<SetHistory>(`history/${id}.json`);
}

export async function getMarket(): Promise<Market | null> {
  cacheLife("hours");
  return readData<Market>("market.json");
}

export async function getMarketHistory(): Promise<MarketHistory | null> {
  cacheLife("hours");
  return readData<MarketHistory>("market-history.json");
}

export async function search(query: string): Promise<CardBrief[]> {
  cacheLife("hours");
  return searchCards(query);
}

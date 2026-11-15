// Format des fichiers produits chaque jour par scripts/ingest.ts et lus par le site.

import { computeQuote, type EbayObservation, type Finish, type Quote } from "./pricing/raw.ts";
import type { GradedObservations } from "./pricing/graded.ts";
import type { Card, SerieBrief, SetBrief } from "./tcgdex.ts";

/** Résumé d'un prix, compact car répété ~20 000 fois par jour. */
export interface Mini {
  p: number; // prix juste, EUR
  c: number; // confiance 0..100
  l: number; // liquidité 0..100
  t: number | null; // tendance 7 j vs 30 j
}
export interface EbayData {
  n: number; // annonces non gradées trouvées
  raw: number[];
  graded: GradedObservations;
}
export interface CardSummary {
  id: string;
  localId: string;
  name: string;
  image?: string;
  rarity?: string;
  std?: Mini;
  rev?: Mini;
  ebay?: EbayData;
  /** La source attribue le même produit à plusieurs cartes de l'extension : prix douteux. */
  shared?: true;
}
export interface SetSnapshot {
  set: SetBrief & { serie: SerieBrief; releaseDate?: string };
  updated: string;
  cards: CardSummary[];
}
export interface SetHistory {
  days: string[]; // "2026-11-15"
  prices: Record<string, (number | null)[]>; // localId, ou localId~r pour la reverse
}
export interface MarketCard extends CardSummary {
  setId: string;
  setName: string;
}
export interface Market {
  updated: string;
  cards: number;
  priced: number;
  series: { id: string; name: string; value: number; priced: number; cards: number }[];
  top: MarketCard[];
  up: MarketCard[];
  down: MarketCard[];
}
export interface MarketHistory {
  days: string[];
  total: number[];
  series: Record<string, number[]>;
}

const mini = (q: Quote): Mini | undefined =>
  q.price === null ? undefined : { p: q.price, c: q.confidence, l: q.liquidity, t: q.trend };

export const ebayObservation = (e: EbayData | undefined): EbayObservation | null =>
  e ? { prices: e.raw, total: e.n } : null;

export function quoteFor(card: Card, finish: Finish, usdToEur: number, ebay?: EbayData): Quote {
  // Les annonces eBay relevées concernent la version standard de la carte.
  return computeQuote(card.pricing, { usdToEur, finish, ebay: finish === "standard" ? ebayObservation(ebay) : null });
}

export function summarize(card: Card, usdToEur: number, ebay?: EbayData): CardSummary {
  return {
    id: card.id,
    localId: card.localId,
    name: card.name,
    image: card.image,
    rarity: card.rarity,
    std: mini(quoteFor(card, "standard", usdToEur, ebay)),
    rev: card.variants?.reverse ? mini(quoteFor(card, "reverse", usdToEur)) : undefined,
    ebay,
  };
}

/**
 * Résume toutes les cartes d'une extension. Quand la source rattache plusieurs cartes
 * au même produit Cardmarket (erreur de correspondance fréquente sur les promos),
 * leur prix est le même pour toutes : on le garde mais sa confiance est plafonnée.
 */
export function summarizeSet(cards: Card[], usdToEur: number): CardSummary[] {
  const seen = new Map<unknown, number>();
  const product = (c: Card) => c.pricing?.cardmarket?.idProduct;
  for (const c of cards) if (product(c)) seen.set(product(c), (seen.get(product(c)) ?? 0) + 1);
  return cards.map((card) => {
    const summary = summarize(card, usdToEur);
    if ((seen.get(product(card)) ?? 0) > 1) {
      summary.shared = true;
      for (const m of [summary.std, summary.rev]) if (m) m.c = Math.min(m.c, 25);
    }
    return summary;
  });
}

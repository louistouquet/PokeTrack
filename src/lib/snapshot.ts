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
  /** Prix européen sans commune mesure avec le prix américain : prix douteux. */
  far?: true;
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

export function quoteFor(card: Card, finish: Finish, ebay?: EbayData): Quote {
  // Les annonces eBay relevées concernent la version standard de la carte.
  return computeQuote(card.pricing, { finish, ebay: finish === "standard" ? ebayObservation(ebay) : null });
}

export function summarize(card: Card, ebay?: EbayData): CardSummary {
  return {
    id: card.id,
    localId: card.localId,
    name: card.name,
    image: card.image,
    rarity: card.rarity,
    std: mini(quoteFor(card, "standard", ebay)),
    rev: card.variants?.reverse ? mini(quoteFor(card, "reverse")) : undefined,
    ebay,
  };
}

// Le marché américain n'entre jamais dans le prix. Il sert seulement d'alarme : un prix
// européen plus de dix fois au-dessus ou au-dessous de tous les prix américains de la carte
// trahit un rattachement au mauvais produit, côté européen ou côté américain. Mesuré le
// 16 novembre 2026 : ×4 signalait 772 cartes, surtout des promos où les deux marchés
// diffèrent vraiment ; ×10 en signale environ 200.
// shortcut: taux de change fixe, suffisant pour un seuil ×10 ; à revoir si le seuil se resserre.
const USD_EUR = 0.9;
export function usGap(card: Card, price: number): boolean {
  const us = Object.values(card.pricing?.tcgplayer ?? {}).flatMap((v) => {
    const p = v && typeof v === "object" ? ((v as Record<string, unknown>).marketPrice ?? (v as Record<string, unknown>).midPrice) : null;
    return typeof p === "number" && p > 0 ? [p * USD_EUR] : [];
  });
  // Sous 5 €, l'écart vient des prix planchers de chaque marché, pas d'une erreur.
  return us.length > 0 && Math.max(price, ...us) >= 5 && us.every((p) => Math.abs(Math.log(price / p)) > Math.log(10));
}

/** Plafonne la confiance d'un prix douteux : il reste affiché, signalé, hors classements. */
export const DOUBT_CAP = 25;

/** Raisons de ne pas publier un relevé : trop de cartes illisibles, ou une chute depuis la veille. */
export function runProblems(prev: { cards: number; priced: number } | null, run: { cards: number; priced: number; failed: number }): string[] {
  const out: string[] = [];
  if (run.failed > run.cards * 0.005) out.push(`${run.failed} cartes n'ont pas pu être lues chez TCGdex`);
  if (prev && run.cards < prev.cards * 0.98) out.push(`${run.cards} cartes suivies contre ${prev.cards} la veille`);
  if (prev && run.priced < prev.priced * 0.97) out.push(`${run.priced} cartes cotées contre ${prev.priced} la veille`);
  return out;
}

/**
 * Résume toutes les cartes d'une extension. Quand la source rattache plusieurs cartes
 * au même produit Cardmarket (erreur de correspondance fréquente sur les promos),
 * leur prix est le même pour toutes : on le garde mais sa confiance est plafonnée.
 * Même traitement quand le prix est sans commune mesure avec le marché américain.
 */
export function summarizeSet(cards: Card[]): CardSummary[] {
  const seen = new Map<unknown, number>();
  const product = (c: Card) => c.pricing?.cardmarket?.idProduct;
  for (const c of cards) if (product(c)) seen.set(product(c), (seen.get(product(c)) ?? 0) + 1);
  return cards.map((card) => {
    const summary = summarize(card);
    if ((seen.get(product(card)) ?? 0) > 1) summary.shared = true;
    if (summary.std && usGap(card, summary.std.p)) summary.far = true;
    if (summary.shared || summary.far) for (const m of [summary.std, summary.rev]) if (m) m.c = Math.min(m.c, DOUBT_CAP);
    return summary;
  });
}

// Prix « juste » d'une carte non gradée, à partir des sources de marché.
// Tout est en euros. La méthode est décrite pour les humains dans /methode.

export type Finish = "standard" | "reverse";
export type SourceId = "cardmarket" | "ebay";

type Num = number | null | undefined;

export interface TcgdexPricing {
  cardmarket?: ({ updated?: string; low?: Num; trend?: Num; avg1?: Num; avg7?: Num; avg30?: Num } & Record<string, unknown>) | null;
  // Marché américain, cartes anglaises : n'entre jamais dans le prix (voir usGap dans snapshot.ts).
  tcgplayer?: Record<string, unknown> | null;
}

/** Annonces actives relevées sur eBay (optionnel : nécessite des clés API). */
export interface EbayObservation {
  prices: number[]; // prix demandés, en EUR
  total: number; // nombre d'annonces trouvées
}

export interface SourceQuote {
  source: SourceId;
  price: number;
  weight: number; // poids final dans le prix juste, 0..1
  low?: number; // annonce la moins chère
  listings?: number; // quantité en vente connue
  updated?: string;
}

export interface Quote {
  price: number | null;
  range: [number, number] | null;
  confidence: number; // 0..100
  liquidity: number; // 0..100
  volatility: number; // 0..100
  trend: number | null; // moyenne 7 j vs 30 j, en fraction (0.05 = +5 %)
  listings: number | null; // quantité en vente, toutes sources connues
  sources: SourceQuote[];
}

const pos = (v: unknown): number | null => (typeof v === "number" && v > 0 && Number.isFinite(v) ? v : null);
const clamp = (v: number, lo = 0, hi = 100) => Math.min(hi, Math.max(lo, v));
const round2 = (v: number) => Math.round(v * 100) / 100;

export function median(values: number[]): number {
  const s = [...values].sort((a, b) => a - b);
  const mid = s.length >> 1;
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

/** Médiane après retrait des valeurs hors [Q1 − 1,5·IQR ; Q3 + 1,5·IQR]. */
export function trimmedMedian(values: number[]): number {
  if (values.length < 4) return median(values);
  const s = [...values].sort((a, b) => a - b);
  const q = (p: number) => s[Math.min(s.length - 1, Math.floor(p * s.length))];
  const iqr = q(0.75) - q(0.25);
  const kept = s.filter((v) => v >= q(0.25) - 1.5 * iqr && v <= q(0.75) + 1.5 * iqr);
  return median(kept);
}

// Poids des indicateurs Cardmarket : la tendance et la moyenne 7 j dominent,
// la moyenne 1 j est trop bruitée pour peser lourd.
const CM_FIELDS = [
  ["trend", 0.35],
  ["avg7", 0.3],
  ["avg30", 0.25],
  ["avg1", 0.1],
] as const;

interface CmEstimate {
  price: number;
  dispersion: number; // écart moyen (en log) des indicateurs à leur médiane
  fields: number;
  avg1: number | null;
  avg7: number | null;
  avg30: number | null;
  low: number | null;
}

function cardmarketEstimate(cm: NonNullable<TcgdexPricing["cardmarket"]>, finish: Finish): CmEstimate | null {
  const sfx = finish === "reverse" ? "-holo" : "";
  const get = (k: string) => pos(cm[k + sfx]);
  const vals = CM_FIELDS.flatMap(([k, w]): [number, number][] => {
    const v = get(k);
    return v === null ? [] : [[v, w]];
  });
  if (!vals.length) return null;
  const m = median(vals.map(([v]) => v));
  // Winsorisation : un indicateur ne peut pas s'écarter de plus de ×1,6 de la médiane.
  let sum = 0;
  let wsum = 0;
  let disp = 0;
  for (const [v, w] of vals) {
    sum += clamp(v, m / 1.6, m * 1.6) * w;
    wsum += w;
    disp += Math.abs(Math.log(v / m));
  }
  return {
    price: sum / wsum,
    dispersion: disp / vals.length,
    fields: vals.length,
    avg1: get("avg1"),
    avg7: get("avg7"),
    avg30: get("avg30"),
    low: get("low"),
  };
}

const ageDays = (iso: string | undefined, now: number) => (iso ? Math.max(0, (now - Date.parse(iso)) / 86_400_000) : 0);

export function computeQuote(
  pricing: TcgdexPricing | null | undefined,
  opts: { finish?: Finish; ebay?: EbayObservation | null; now?: number } = {},
): Quote {
  const finish = opts.finish ?? "standard";
  const now = opts.now ?? Date.now();
  const cm = pricing?.cardmarket ? cardmarketEstimate(pricing.cardmarket, finish) : null;
  const ebayPrices = opts.ebay?.prices.filter((p) => p > 0) ?? [];
  // Les prix eBay sont des prix demandés : décote de 8 % pour approcher un prix de vente.
  const ebay = ebayPrices.length >= 3 ? { price: trimmedMedian(ebayPrices) * 0.92, n: ebayPrices.length } : null;

  const raw: SourceQuote[] = [];
  if (cm) {
    raw.push({
      source: "cardmarket",
      price: cm.price,
      weight: Math.exp(-ageDays(pricing?.cardmarket?.updated, now) / 14),
      low: cm.low ?? undefined,
      updated: pricing?.cardmarket?.updated,
    });
  }
  // Référence pour juger eBay : Cardmarket (marché européen) s'il existe.
  const anchor = cm?.price ?? ebay?.price ?? null;
  const agreement = (p: number) => (anchor ? Math.abs(Math.log(p / anchor)) : 0);
  if (ebay) {
    const far = agreement(ebay.price) > Math.LN2;
    raw.push({
      source: "ebay",
      price: ebay.price,
      weight: 0.6 * Math.min(1, ebay.n / 8) * (far ? 0.25 : 1),
      low: Math.min(...ebayPrices),
      listings: opts.ebay!.total,
    });
  }

  const wsum = raw.reduce((s, q) => s + q.weight, 0);
  if (!raw.length || wsum <= 0) {
    return { price: null, range: null, confidence: 0, liquidity: 0, volatility: 0, trend: null, listings: null, sources: [] };
  }
  const price = raw.reduce((s, q) => s + q.price * q.weight, 0) / wsum;
  const sources = raw.map((q) => ({ ...q, price: round2(q.price), weight: round2(q.weight / wsum), low: q.low ? round2(q.low) : undefined }));

  const dispersion = cm?.dispersion ?? 0.35;
  const cross = raw.length > 1 ? Math.max(...raw.map((q) => Math.abs(Math.log(q.price / price)))) : 0;

  // Confiance : nombre de sources, accord entre elles, cohérence interne, fraîcheur.
  let confidence = cm ? 50 : 35;
  if (cm) confidence += 20 * Math.max(0, 1 - cm.dispersion / 0.5) + (cm.fields - 1) * 3;
  if (ebay && cm) confidence += 9 * Math.max(0, 1 - agreement(ebay.price) / Math.LN2);
  confidence *= Math.exp(-ageDays(pricing?.cardmarket?.updated, now) / 30);

  // Liquidité (indice) : activité récente, stabilité des moyennes, écart au prix plancher,
  // annonces en cours quand elles sont connues.
  let liquidity = 0;
  if (cm) {
    liquidity += (cm.avg1 ? 10 : 0) + (cm.avg7 ? 8 : 0) + (cm.avg30 ? 6 : 0);
    // Un marché profond bouge peu d'une moyenne à l'autre ; un marché mince fait des bonds.
    const steady = (a: number | null, b: number | null) => (a && b ? Math.max(0, 1 - Math.abs(Math.log(a / b)) / 0.7) : 0);
    liquidity += 20 * steady(cm.avg1, cm.avg7) + 16 * steady(cm.avg7, cm.avg30);
    if (cm.low) liquidity += 14 * clamp(cm.low / cm.price / 0.8, 0, 1);
  }
  // Les signaux Cardmarket plafonnent à 74 : les annonces en cours complètent, sinon on ramène sur 100.
  liquidity = ebay ? liquidity + 26 * Math.min(1, opts.ebay!.total / 25) : (liquidity * 100) / 74;

  const half = clamp(Math.max(dispersion, cross) * 0.6, 0.05, 0.45);
  const listings = sources.reduce<number | null>((s, q) => (q.listings == null ? s : (s ?? 0) + q.listings), null);
  return {
    price: round2(price),
    range: [round2(price * (1 - half)), round2(price * (1 + half))],
    confidence: Math.round(clamp(confidence)),
    liquidity: Math.round(clamp(liquidity)),
    volatility: Math.round(clamp((dispersion / 0.6) * 100)),
    trend: cm?.avg7 && cm.avg30 ? round2(cm.avg7 / cm.avg30 - 1) : null,
    listings,
    sources,
  };
}

// Estimation du prix gradé par société et par note.
//
// Faute d'accès libre aux ventes réalisées, la base est un MODÈLE : un multiple du prix
// non gradé qui dépend de l'époque de la carte, corrigé par société. Dès que des annonces
// eBay sont disponibles pour une carte (clés API configurées), elles prennent le dessus.
// Les coefficients ci-dessous sont des ordres de grandeur de marché, pas des mesures :
// les contributions qui les affinent avec des données de vente sont les bienvenues.

import { trimmedMedian } from "./raw.ts";

export type Era = "vintage" | "classic" | "modern" | "recent";
export type CompanyId = "psa" | "pca" | "cgc" | "bgs" | "ca";

/** Séries TCGdex → époque. Inconnue = récente (hypothèse la plus prudente). */
const ERA_BY_SERIE: Record<string, Era> = {
  base: "vintage", neo: "vintage", ecard: "vintage",
  ex: "classic", pop: "classic", dp: "classic", pl: "classic", hgss: "classic", col: "classic", tk: "classic",
  bw: "modern", xy: "modern", sm: "modern",
};
export const eraOfSerie = (serieId: string): Era => ERA_BY_SERIE[serieId] ?? "recent";

// Multiple du prix non gradé (état proche du neuf) pour une note PSA.
const PSA_MULTIPLE: Record<Era, Record<number, number>> = {
  vintage: { 10: 12, 9: 3.6, 8: 2, 7: 1.35 },
  classic: { 10: 5.5, 9: 2, 8: 1.25, 7: 1 },
  modern: { 10: 3.2, 9: 1.35, 8: 1, 7: 0.85 },
  recent: { 10: 2.1, 9: 1.05, 8: 0.85, 7: 0.75 },
};
// Prime de boîtier : une commune gradée vaut surtout le service rendu. Elle s'efface
// à mesure que la carte prend de la valeur (÷ e tous les 50 €).
const SLAB_PREMIUM: Record<number, number> = { 10: 18, 9: 8, 8: 4, 7: 2 };

interface GradeDef {
  grade: string; // libellé affiché : "10", "9.5"…
  psa: number; // note PSA équivalente (9.1 = un peu au-dessus d'un PSA 9)
  factor: number; // décote ou prime de la société par rapport à PSA
}
export interface Company {
  id: CompanyId;
  name: string;
  country: string;
  grades: GradeDef[];
  /** Rareté de la meilleure note par rapport à un PSA 10 (1 = aussi fréquente). */
  topOdds?: number;
}

export const COMPANIES: Company[] = [
  { id: "psa", name: "PSA", country: "États-Unis", grades: [
    { grade: "10", psa: 10, factor: 1 }, { grade: "9", psa: 9, factor: 1 },
    { grade: "8", psa: 8, factor: 1 }, { grade: "7", psa: 7, factor: 1 },
  ] },
  { id: "pca", name: "PCA", country: "France", grades: [
    { grade: "10", psa: 10, factor: 0.65 }, { grade: "9.5", psa: 9.1, factor: 0.85 },
    { grade: "9", psa: 9, factor: 0.8 }, { grade: "8", psa: 8, factor: 0.8 },
  ] },
  { id: "cgc", name: "CGC", country: "États-Unis · Allemagne", grades: [
    { grade: "10", psa: 10, factor: 0.75 }, { grade: "9.5", psa: 9.2, factor: 0.85 },
    { grade: "9", psa: 9, factor: 0.85 }, { grade: "8.5", psa: 8.5, factor: 0.9 },
  ] },
  { id: "bgs", name: "BGS", country: "États-Unis", topOdds: 0.2, grades: [
    { grade: "10", psa: 10, factor: 1.6 }, { grade: "9.5", psa: 9.3, factor: 1 },
    { grade: "9", psa: 9, factor: 0.9 }, { grade: "8.5", psa: 8.5, factor: 0.95 },
  ] },
  { id: "ca", name: "Collect Aura", country: "France", grades: [
    { grade: "10", psa: 10, factor: 0.55 }, { grade: "9.5", psa: 9.1, factor: 0.75 },
    { grade: "9", psa: 9, factor: 0.75 }, { grade: "8", psa: 8, factor: 0.75 },
  ] },
];

// Interpolation linéaire entre deux notes PSA entières.
const at = (table: Record<number, number>, g: number) => {
  const lo = Math.floor(g);
  return lo === g ? table[g] : table[lo] + (g - lo) * (table[lo + 1] - table[lo]);
};

export type GradedMethod = "modèle" | "mixte" | "observé";
export interface GradedEstimate {
  company: CompanyId;
  grade: string;
  price: number;
  method: GradedMethod;
  listings: number; // annonces eBay prises en compte
}

/** Clé d'observation : "psa:10", "pca:9.5"… → prix demandés en EUR. */
export type GradedObservations = Record<string, number[]>;

const PRIOR_STRENGTH = 4; // le modèle « pèse » 4 annonces

export function gradedPrice(
  raw: number,
  era: Era,
  company: CompanyId,
  grade: string,
  observed: number[] = [],
): GradedEstimate | null {
  const def = COMPANIES.find((c) => c.id === company)?.grades.find((g) => g.grade === grade);
  if (!def || !(raw > 0)) return null;
  const model = (raw * at(PSA_MULTIPLE[era], def.psa) + at(SLAB_PREMIUM, def.psa) * Math.exp(-raw / 50)) * def.factor;
  const n = observed.length;
  // Mélange bayésien : plus il y a d'annonces, plus l'observation remplace le modèle.
  const price = n ? (n * trimmedMedian(observed) * 0.92 + PRIOR_STRENGTH * model) / (n + PRIOR_STRENGTH) : model;
  return {
    company,
    grade,
    price: Math.round(price * 100) / 100,
    method: n >= 8 ? "observé" : n ? "mixte" : "modèle",
    listings: n,
  };
}

export function gradedTable(raw: number, era: Era, observations: GradedObservations = {}): GradedEstimate[] {
  return COMPANIES.flatMap((c) =>
    c.grades.flatMap((g) => gradedPrice(raw, era, c.id, g.grade, observations[`${c.id}:${g.grade}`]) ?? []),
  );
}

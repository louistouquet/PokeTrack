// Prix d'une carte gradée, par société et par note.
//
// Règle du projet : un prix gradé est OBSERVÉ ou il n'est pas affiché. Aucun multiple du
// prix non gradé, aucun coefficient par société. Le prix vient des annonces relevées pour
// cette carte, cette société et cette note ; en dessous de MIN_LISTINGS annonces, on ne
// dit rien plutôt que d'inventer.

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

export interface Company {
  id: CompanyId;
  name: string;
  country: string;
  grades: string[]; // notes suivies, de la meilleure à la moins bonne
  /** Rareté de la meilleure note par rapport à un PSA 10 (1 = aussi fréquente). */
  topOdds?: number;
}

export const COMPANIES: Company[] = [
  { id: "psa", name: "PSA", country: "États-Unis", grades: ["10", "9", "8", "7"] },
  { id: "pca", name: "PCA", country: "France", grades: ["10", "9.5", "9", "8"] },
  { id: "cgc", name: "CGC", country: "États-Unis · Allemagne", grades: ["10", "9.5", "9", "8.5"] },
  { id: "bgs", name: "BGS", country: "États-Unis", topOdds: 0.2, grades: ["10", "9.5", "9", "8.5"] },
  { id: "ca", name: "Collect Aura", country: "France", grades: ["10", "9.5", "9", "8"] },
];

export interface GradedEstimate {
  company: CompanyId;
  grade: string;
  price: number | null; // null = pas assez d'annonces observées
  listings: number; // annonces prises en compte
}

/** Clé d'observation : "psa:10", "pca:9.5"… → prix demandés en EUR, toutes sources réunies. */
export type GradedObservations = Record<string, number[]>;

/** En dessous, une ou deux annonces isolées ne font pas un prix. */
export const MIN_LISTINGS = 3;

/** Prix observé d'une carte gradée : médiane des annonces, extrêmes écartés. */
export function gradedPrice(observed: number[] = []): number | null {
  const prices = observed.filter((p) => p > 0);
  return prices.length >= MIN_LISTINGS ? Math.round(trimmedMedian(prices) * 100) / 100 : null;
}

export function gradedTable(observations: GradedObservations = {}): GradedEstimate[] {
  return COMPANIES.flatMap((c) =>
    c.grades.map((grade) => {
      const observed = observations[`${c.id}:${grade}`] ?? [];
      return { company: c.id, grade, price: gradedPrice(observed), listings: observed.length };
    }),
  );
}

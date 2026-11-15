// « Est-ce que ça vaut le coup de faire grader cette carte ? »
// Espérance de valeur gradée (pondérée par les chances d'obtenir chaque note)
// moins la valeur actuelle et le coût complet du service.

import { COMPANIES, gradedPrice, type CompanyId, type Era, type GradedObservations } from "./graded.ts";

export interface GradingService {
  company: CompanyId;
  fee: number; // tarif par carte, en EUR
  shipping: number; // envoi aller-retour assuré, ramené à une carte d'un lot de 10
  importVat: number; // TVA à l'import sur les frais (services hors UE)
  weeks: number; // délai courant
}

// Tarifs INDICATIFS relevés en novembre 2026 (offres d'entrée de gamme). Ils changent
// souvent : l'interface permet de les corriger, et les sites officiels font foi.
export const SERVICES: GradingService[] = [
  { company: "psa", fee: 55, shipping: 9, importVat: 0.2, weeks: 10 },
  { company: "pca", fee: 17, shipping: 3, importVat: 0, weeks: 6 },
  { company: "cgc", fee: 19, shipping: 4, importVat: 0, weeks: 6 },
  { company: "bgs", fee: 32, shipping: 9, importVat: 0.2, weeks: 10 },
  { company: "ca", fee: 14, shipping: 3, importVat: 0, weeks: 5 },
];

export type Condition = "mint" | "nearMint" | "excellent";
export const CONDITIONS: { id: Condition; label: string; hint: string }[] = [
  { id: "mint", label: "Sortie de booster", hint: "Centrage correct, aucun défaut visible" },
  { id: "nearMint", label: "Très bon état", hint: "Micro-défauts sur les bords ou le dos" },
  { id: "excellent", label: "Bon état", hint: "Blanchiment des coins, fines rayures" },
];

// Chances d'obtenir chaque palier : [meilleure note, 2e, 3e, 4e, note inférieure].
// Une carte ancienne, même bien conservée, décroche rarement les notes du haut.
type Odds = Record<Condition, number[]>;
const ODDS_RECENT: Odds = {
  mint: [0.35, 0.45, 0.15, 0.04, 0.01],
  nearMint: [0.08, 0.37, 0.33, 0.15, 0.07],
  excellent: [0, 0.08, 0.27, 0.35, 0.3],
};
const ODDS: Record<Era, Odds> = {
  recent: ODDS_RECENT,
  modern: ODDS_RECENT,
  classic: {
    mint: [0.15, 0.4, 0.28, 0.12, 0.05],
    nearMint: [0.03, 0.2, 0.35, 0.25, 0.17],
    excellent: [0, 0.03, 0.17, 0.35, 0.45],
  },
  vintage: {
    mint: [0.05, 0.25, 0.35, 0.22, 0.13],
    nearMint: [0.01, 0.09, 0.28, 0.32, 0.3],
    excellent: [0, 0.01, 0.09, 0.3, 0.6],
  },
};
// Sous la plus basse note suivie, le boîtier n'apporte rien : la carte vaut un peu moins que nue.
const BELOW_VALUE = 0.9;

export interface GradingOutcome {
  grade: string;
  probability: number;
  value: number;
  net: number; // gain net si cette note tombe
}
export interface GradingVerdict {
  company: CompanyId;
  cost: number;
  expectedValue: number;
  expectedGain: number;
  winChance: number; // probabilité de finir en gain
  breakevenGrade: string | null; // note minimale pour ne pas perdre d'argent
  outcomes: GradingOutcome[];
  verdict: "rentable" | "risqué" | "à éviter";
  weeks: number;
}

export const serviceCost = (s: GradingService) => Math.round((s.fee + s.shipping) * (1 + s.importVat) * 100) / 100;

export function gradingVerdict(
  raw: number,
  era: Era,
  condition: Condition,
  service: GradingService,
  observations: GradedObservations = {},
): GradingVerdict | null {
  const company = COMPANIES.find((c) => c.id === service.company);
  if (!company || !(raw > 0)) return null;
  const cost = serviceCost(service);
  // Une meilleure note plus rare que le PSA 10 (BGS 10) reporte ses chances sur la suivante.
  const [top, second, ...rest] = ODDS[era][condition];
  const odds = [top * (company.topOdds ?? 1), second + top * (1 - (company.topOdds ?? 1)), ...rest];
  const outcome = (grade: string, probability: number, value: number): GradingOutcome => ({
    grade,
    probability,
    value: Math.round(value * 100) / 100,
    net: Math.round((value - raw - cost) * 100) / 100,
  });
  const outcomes = [
    ...company.grades.map((g, i) => outcome(g.grade, odds[i], gradedPrice(raw, era, company.id, g.grade, observations[`${company.id}:${g.grade}`])!.price)),
    outcome("inférieure", odds[4], raw * BELOW_VALUE),
  ];
  const expectedValue = outcomes.reduce((s, o) => s + o.probability * o.value, 0);
  const expectedGain = expectedValue - raw - cost;
  const winChance = outcomes.reduce((s, o) => s + (o.net > 0 ? o.probability : 0), 0);
  // Rentable : gain espéré d'au moins 15 % de la mise (carte + service) et plus d'une chance sur deux.
  const stake = raw + cost;
  const verdict = expectedGain > 0.15 * stake && winChance >= 0.5 ? "rentable" : expectedGain > 0 ? "risqué" : "à éviter";
  return {
    company: company.id,
    cost,
    expectedValue: Math.round(expectedValue * 100) / 100,
    expectedGain: Math.round(expectedGain * 100) / 100,
    winChance,
    breakevenGrade: outcomes.findLast((o) => o.net > 0)?.grade ?? null,
    outcomes,
    verdict,
    weeks: service.weeks,
  };
}

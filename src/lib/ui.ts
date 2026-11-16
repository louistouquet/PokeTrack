// Petits utilitaires d'affichage partagés (serveur et client).

const eur = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
const eurRound = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const pct = new Intl.NumberFormat("fr-FR", { style: "percent", maximumFractionDigits: 0, signDisplay: "exceptZero" });
const int = new Intl.NumberFormat("fr-FR");

export const money = (v: number | null | undefined) => (v == null ? "—" : v >= 1000 ? eurRound.format(v) : eur.format(v));
export const percent = (v: number | null | undefined) => (v == null ? "—" : pct.format(v));
export const count = (v: number) => int.format(v);
export const dateFr = (iso: string | undefined, opts: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }) =>
  iso ? new Intl.DateTimeFormat("fr-FR", { ...opts, timeZone: "UTC" }).format(new Date(iso)) : "";

export const level = (score: number): "high" | "mid" | "low" => (score >= 65 ? "high" : score >= 40 ? "mid" : "low");
export const levelWord = (score: number) => ({ high: "élevée", mid: "moyenne", low: "faible" })[level(score)];

// Une couleur de coque Game Boy Color par famille : [fond, encre].
const FAMILY: Record<string, [string, string]> = {
  me: ["#0d9b76", "#ffffff"],
  sv: ["#d6363a", "#ffffff"],
  swsh: ["#1594b8", "#ffffff"],
  sm: ["#ef8a1d", "#23215a"],
  xy: ["#2b62c4", "#ffffff"],
  bw: ["#2a2a36", "#ffffff"],
  col: ["#2a8a58", "#ffffff"],
  hgss: ["#d9a41e", "#23215a"],
  pl: ["#8b91ab", "#23215a"],
  dp: ["#3c86d6", "#ffffff"],
  ex: ["#b7243f", "#ffffff"],
  ecard: ["#5d4aa8", "#ffffff"],
  neo: ["#129a93", "#ffffff"],
  base: ["#f2bb0f", "#23215a"],
  pop: ["#86bf36", "#23215a"],
  mc: ["#e0502b", "#ffffff"],
};
export function familyStyle(serieId: string) {
  const [bg, ink] = FAMILY[serieId] ?? ["#474a66", "#edebf6"];
  return { "--family": bg, "--family-ink": ink } as React.CSSProperties;
}

const HOLO = /holo|rare|ex|brillant|chromatique|secr|illustration|magnifique|shiny|légende|prime|turbo|v$|vmax|vstar|gx|ace|radieux|high-?tech/i;
/** Les cartes au-dessus de « peu commune » reçoivent le reflet holographique. */
export const isShiny = (rarity: string | undefined) => !!rarity && !/^(commune|peu commune|aucune)$/i.test(rarity) && HOLO.test(rarity);

// Raretés de la plus courante à la plus rare, d'après les intitulés français de TCGdex.
// Chaque ligne est un palier ; une rareté inconnue se range avec les rares simples.
const RARITY_TIERS: RegExp[] = [
  /^(sans rareté|aucune|promo|collection classique)$/i,
  /^commune$/i,
  /^peu commune$/i,
  /^rare$/i,
  /^(holo rare|rare holo)$/i,
  /^(double rare|holo rare v|rare prime|rare holo lv\.x|high-tech rare|radieux rare|magnifique|légende|pikachu rare|mega attack rare)$/i,
  /^(holo rare vmax|holo rare vstar|ultra rare|dresseur full art|shiny rare|shiny rare v|illustration rare|rgb rare|futuristic rare|rare noir blanc)$/i,
  /^(shiny rare vmax|magnifique rare|illustration spéciale rare|chromatique ultra rare)$/i,
  /^(hyper rare|méga hyper rare)$/i,
];
export const rarityRank = (rarity: string | undefined) => {
  const tier = RARITY_TIERS.findIndex((re) => re.test(rarity ?? "aucune"));
  return tier < 0 ? 3 : tier;
};

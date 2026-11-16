// Adaptateur CardTrader (optionnel). Actif seulement si CARDTRADER_TOKEN est défini.
// CardTrader est la seule source branchée qui distingue la langue : on n'y lit que les
// annonces de cartes FRANÇAISES. Une requête par extension renvoie, pour chaque carte,
// ses 25 annonces les moins chères.
//
// Vérifié en conditions réelles le 16 novembre 2026 (861 extensions, 23 342 annonces
// françaises). Ce sont des prix DEMANDÉS, pas des ventes, et le marché est mince :
// environ une carte sur cinq a une annonce française, surtout dans les séries récentes.

import type { Asks, FrenchAsks } from "../src/lib/snapshot.ts";

const API = "https://api.cardtrader.com/api/v2";
const POKEMON = 5; // identifiant du jeu chez CardTrader

export interface Expansion {
  id: number;
  code: string;
  name: string;
}
/** Une annonce, réduite à ce qui sert au prix. */
export interface Listing {
  price: number; // EUR
  number: string; // numéro de la carte dans l'extension
  name: string; // nom anglais de la carte
  quantity: number;
  condition?: string;
  reverse: boolean;
  firstEdition: boolean;
  graded: boolean;
}

/** Compare des noms ou des codes sans tenir compte de la casse, des accents ni de la ponctuation. */
export const plain = (s: string | undefined) =>
  (s ?? "").normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]/g, "");
const number = (s: string) => s.toLowerCase().replace(/^0+(?=.)/, "");

/** Extension CardTrader d'une extension TCGdex : même code officiel, sinon même nom anglais. */
export function matchExpansion(set: { code?: string; enName?: string }, expansions: Expansion[]): Expansion | null {
  const code = set.code?.toLowerCase();
  return (code && expansions.find((e) => e.code.toLowerCase() === code)) || (set.enName && expansions.find((e) => plain(e.name) === plain(set.enName))) || null;
}

const SELLABLE = /^(Near Mint|Mint)$/; // le prix juste suppose une carte en très bon état
const KEEP = 8; // annonces conservées par carte, les moins chères

/**
 * Range les annonces d'une extension par carte. Une carte n'est retenue que si le nom
 * anglais de l'annonce est bien celui de la carte TCGdex portant ce numéro : c'est le
 * garde-fou contre un numéro qui désignerait une autre carte.
 * Écartées : cartes gradées, premières éditions, cartes abîmées, lots.
 */
export function frenchAsks(listings: Listing[], cards: { id: string; localId: string; enName?: string }[]): { asks: Map<string, FrenchAsks>; rejected: number } {
  const byNumber = new Map(cards.map((c) => [number(c.localId), c]));
  const asks = new Map<string, FrenchAsks>();
  let rejected = 0;
  for (const l of [...listings].sort((a, b) => a.price - b.price)) {
    const card = byNumber.get(number(l.number));
    if (!card) continue;
    if (!card.enName || plain(card.enName) !== plain(l.name)) {
      rejected++;
      continue;
    }
    if (l.graded || l.firstEdition || !SELLABLE.test(l.condition ?? "") || !(l.price > 0)) continue;
    const entry = asks.get(card.id) ?? {};
    const side: Asks = (entry[l.reverse ? "rev" : "std"] ??= { n: 0, p: [] });
    side.n += l.quantity;
    if (side.p.length < KEEP) side.p.push(l.price);
    asks.set(card.id, entry);
  }
  return { asks, rejected };
}

export async function cardtraderClient() {
  const token = process.env.CARDTRADER_TOKEN;
  if (!token) return null;
  const get = async (path: string) => {
    for (let i = 0; ; i++) {
      try {
        const res = await fetch(`${API}/${path}`, { headers: { authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(40_000) });
        if (res.ok) return await res.json();
        if (res.status === 401 || res.status === 403) throw new Error(`CardTrader : jeton refusé (${res.status})`);
        if (i >= 3) throw new Error(`CardTrader ${res.status} sur ${path}`);
      } catch (err) {
        if (i >= 3 || String(err).includes("jeton refusé")) throw err;
      }
      await new Promise((r) => setTimeout(r, 1500 * 2 ** i));
    }
  };
  const expansions: Expansion[] = ((await get("expansions")) as { id: number; code: string; name: string; game_id: number }[]).filter((e) => e.game_id === POKEMON);

  return {
    expansions,
    /** Annonces françaises d'une extension, en euros. */
    async listings(expansionId: number): Promise<Listing[]> {
      type Raw = { price: { cents: number; currency: string }; name_en: string; quantity: number; graded: boolean; bundle_size?: number; properties_hash: Record<string, unknown> };
      const byBlueprint = (await get(`marketplace/products?expansion_id=${expansionId}&language=fr`)) as Record<string, Raw[]>;
      return Object.values(byBlueprint)
        .flat()
        .filter((p) => p.price.currency === "EUR" && (p.bundle_size ?? 1) === 1 && p.properties_hash.pokemon_language === "fr" && !p.properties_hash.signed && !p.properties_hash.altered)
        .map((p) => ({
          price: p.price.cents / 100,
          number: String(p.properties_hash.collector_number ?? ""),
          name: p.name_en,
          quantity: p.quantity,
          condition: p.properties_hash.condition as string | undefined,
          reverse: !!p.properties_hash.pokemon_reverse,
          firstEdition: !!p.properties_hash.first_edition,
          graded: p.graded,
        }));
    },
  };
}

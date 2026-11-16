// Client minimal de l'API TCGdex (catalogue français + prix Cardmarket).
// Sans dépendance à Next : utilisé par le site et par le script d'ingestion.

import type { TcgdexPricing } from "./pricing/raw.ts";

const API = "https://api.tcgdex.net/v2/fr";

// Pokémon Pocket est un jeu numérique : pas de cartes physiques à collectionner.
const EXCLUDED_SERIES = new Set(["tcgp"]);

export interface SerieBrief {
  id: string;
  name: string;
  logo?: string;
}
export interface SetBrief {
  id: string;
  name: string;
  logo?: string;
  symbol?: string;
  cardCount: { total: number; official: number };
}
export interface Serie extends SerieBrief {
  releaseDate?: string;
  sets: SetBrief[];
}
export interface CardBrief {
  id: string;
  localId: string;
  name: string;
  image?: string;
}
export interface SetDetail extends SetBrief {
  serie: SerieBrief;
  releaseDate?: string;
  cards: CardBrief[];
}
export interface Card extends CardBrief {
  category: string;
  rarity?: string;
  illustrator?: string;
  hp?: number;
  types?: string[];
  stage?: string;
  dexId?: number[];
  set: SetBrief;
  variants?: { normal?: boolean; reverse?: boolean; holo?: boolean; firstEdition?: boolean };
  pricing?: TcgdexPricing | null;
}

async function get<T>(path: string, tries = 4): Promise<T | null> {
  for (let i = 0; ; i++) {
    try {
      const res = await fetch(`${API}/${path}`);
      if (res.status === 404) return null;
      if (res.ok) return (await res.json()) as T;
      if (i >= tries - 1) throw new Error(`TCGdex ${res.status} sur ${path}`);
    } catch (err) {
      if (i >= tries - 1) throw err;
    }
    await new Promise((r) => setTimeout(r, 400 * 2 ** i));
  }
}

export async function listSeries(): Promise<SerieBrief[]> {
  return ((await get<SerieBrief[]>("series")) ?? []).filter((s) => !EXCLUDED_SERIES.has(s.id));
}
export const fetchSerie = (id: string) => (EXCLUDED_SERIES.has(id) ? null : get<Serie>(`series/${encodeURIComponent(id)}`));
export const fetchSet = (id: string) => get<SetDetail>(`sets/${encodeURIComponent(id)}`);
export const fetchCard = (id: string) => get<Card>(`cards/${encodeURIComponent(id)}`);
// Les extensions Pocket s'appellent P-A, A1, A2b, B1a…
const POCKET_CARD = /^(P-A|[AB]\d+[a-z]?)-/;
export const searchCards = (name: string) =>
  get<CardBrief[]>(`cards?name=${encodeURIComponent(name)}&pagination:itemsPerPage=100`).then((r) => (r ?? []).filter((c) => !POCKET_CARD.test(c.id)));

/** Les images TCGdex se déclinent en qualité (low/high) et format. */
export const cardImage = (image: string | undefined, quality: "low" | "high" = "low") =>
  image ? `${image}/${quality}.webp` : null;
export const assetImage = (url: string | undefined) => (url ? `${url}.webp` : null);

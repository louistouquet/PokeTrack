"use client";

import { useMemo, useState } from "react";
import type { CardSummary } from "@/lib/snapshot";
import { CardTile } from "./card-tile";
import { Icon } from "./icon";

type Sort = "number" | "price" | "trend" | "liquidity";
const SORTS: { id: Sort; label: string }[] = [
  { id: "number", label: "Numéro" },
  { id: "price", label: "Prix" },
  { id: "trend", label: "Tendance" },
  { id: "liquidity", label: "Liquidité" },
];
const PAGE = 60;

const normalize = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

/** Grille des cartes d'une extension : recherche, filtre par rareté, tri, finition. */
export function SetBrowser({ cards }: { cards: CardSummary[] }) {
  const [query, setQuery] = useState("");
  const [rarity, setRarity] = useState("");
  const [sort, setSort] = useState<Sort>("number");
  const [reverse, setReverse] = useState(false);
  const [limit, setLimit] = useState(PAGE);

  const rarities = useMemo(() => [...new Set(cards.map((c) => c.rarity).filter((r): r is string => !!r))], [cards]);
  const hasReverse = useMemo(() => cards.some((c) => c.rev), [cards]);

  const shown = useMemo(() => {
    const q = normalize(query.trim());
    const price = (c: CardSummary) => (reverse ? c.rev : c.std);
    const list = cards.filter((c) => (!q || normalize(c.name).includes(q) || c.localId.toLowerCase() === q) && (!rarity || c.rarity === rarity) && (!reverse || c.rev));
    if (sort === "number") return list;
    const key = (c: CardSummary) => (sort === "price" ? price(c)?.p : sort === "trend" ? price(c)?.t : price(c)?.l) ?? -Infinity;
    return [...list].sort((a, b) => key(b) - key(a));
  }, [cards, query, rarity, sort, reverse]);

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:w-64">
          <label htmlFor="set-q" className="sr-only">
            Filtrer par nom ou numéro
          </label>
          <Icon name="search" size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
          <input id="set-q" className="field pl-10" placeholder="Nom ou numéro" value={query} onChange={(e) => (setQuery(e.target.value), setLimit(PAGE))} />
        </div>
        <label className="sr-only" htmlFor="set-rarity">
          Rareté
        </label>
        <select id="set-rarity" className="field w-auto max-w-56" value={rarity} onChange={(e) => (setRarity(e.target.value), setLimit(PAGE))}>
          <option value="">Toutes les raretés</option>
          {rarities.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
        <label className="sr-only" htmlFor="set-sort">
          Trier par
        </label>
        <select id="set-sort" className="field w-auto" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
          {SORTS.map((s) => (
            <option key={s.id} value={s.id}>
              Tri : {s.label.toLowerCase()}
            </option>
          ))}
        </select>
        {hasReverse && (
          <div className="segmented" role="group" aria-label="Finition">
            <button type="button" aria-pressed={!reverse} onClick={() => setReverse(false)}>
              Normale
            </button>
            <button type="button" aria-pressed={reverse} onClick={() => setReverse(true)}>
              Reverse
            </button>
          </div>
        )}
        <span className="ml-auto text-sm text-ink-soft" aria-live="polite">
          {shown.length} carte{shown.length > 1 ? "s" : ""}
        </span>
      </div>

      {shown.length ? (
        // La clé relance l'entrée en cascade quand le tri ou le filtre change.
        <div key={`${sort}${rarity}${reverse}`} className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {shown.slice(0, limit).map((c, i) => (
            <CardTile key={c.id} card={c} price={reverse ? c.rev : c.std} index={i < PAGE ? i : 0} />
          ))}
        </div>
      ) : (
        <div className="panel px-6 py-12 text-center">
          <p className="pixel text-2xl">Aucune carte ne correspond.</p>
          <button type="button" className="btn btn-quiet btn-small mt-4" onClick={() => (setQuery(""), setRarity(""), setReverse(false))}>
            Effacer les filtres
          </button>
        </div>
      )}
      {shown.length > limit && (
        <div className="mt-10 text-center">
          <button type="button" className="btn btn-quiet" onClick={() => setLimit(limit + PAGE * 2)}>
            Afficher plus de cartes
          </button>
        </div>
      )}
    </div>
  );
}

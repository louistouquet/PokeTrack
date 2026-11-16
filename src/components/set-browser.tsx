"use client";

import { useMemo, useState } from "react";
import type { CardSummary } from "@/lib/snapshot";
import { rarityRank } from "@/lib/ui";
import { CardTile } from "./card-tile";
import { Icon } from "./icon";
import { Select } from "./select";

type Sort = "number" | "rarity" | "price" | "trend" | "liquidity";
const SORTS: { id: Sort; label: string }[] = [
  { id: "number", label: "Numéro" },
  { id: "rarity", label: "Rareté" },
  { id: "price", label: "Prix" },
  { id: "trend", label: "Tendance" },
  { id: "liquidity", label: "Liquidité" },
];

const normalize = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

/** Grille des cartes d'une extension : recherche, filtre par rareté, tri, finition. */
export function SetBrowser({ cards }: { cards: CardSummary[] }) {
  const [query, setQuery] = useState("");
  const [rarity, setRarity] = useState("");
  const [sort, setSort] = useState<Sort>("number");
  const [reverse, setReverse] = useState(false);

  const rarities = useMemo(
    () => [...new Set(cards.map((c) => c.rarity).filter((r): r is string => !!r))].sort((a, b) => rarityRank(a) - rarityRank(b)),
    [cards],
  );
  const hasReverse = useMemo(() => cards.some((c) => c.rev), [cards]);

  const shown = useMemo(() => {
    const q = normalize(query.trim());
    const price = (c: CardSummary) => (reverse ? c.rev : c.std);
    const list = cards.filter((c) => (!q || normalize(c.name).includes(q) || c.localId.toLowerCase() === q) && (!rarity || c.rarity === rarity) && (!reverse || c.rev));
    if (sort === "number") return list;
    // Les plus rares d'abord ; à rareté égale, l'ordre des numéros est conservé (tri stable).
    if (sort === "rarity") return [...list].sort((a, b) => rarityRank(b.rarity) - rarityRank(a.rarity));
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
          <input id="set-q" className="field pl-10" placeholder="Nom ou numéro" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Select
          label="Rareté"
          className="w-auto max-w-56"
          value={rarity}
          onChange={setRarity}
          options={[{ value: "", label: "Toutes les raretés" }, ...rarities.map((r) => ({ value: r, label: r }))]}
        />
        <Select label="Trier par" className="w-auto" value={sort} onChange={setSort} options={SORTS.map((s) => ({ value: s.id, label: `Tri : ${s.label.toLowerCase()}` }))} />
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
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {/* Toute l'extension d'un coup, illustrations chargées d'emblée : pas de « afficher plus ». */}
          {shown.map((c, i) => (
            <CardTile key={c.id} card={c} price={reverse ? c.rev : c.std} index={i} eager />
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
    </div>
  );
}

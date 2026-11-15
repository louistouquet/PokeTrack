"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { exportCollection, importCollection, saveValue, unitValue, useCollection, useHydrated, usePrices, valueSeries, type Item, type SetInfo } from "@/lib/collection";
import type { CardSummary } from "@/lib/snapshot";
import { count, familyStyle, money, percent } from "@/lib/ui";
import { CardArt } from "./card-tile";
import { Icon } from "./icon";
import { ItemPanel, stateLabel } from "./item-panel";
import { LcdChart } from "./lcd-chart";

interface Row {
  item: Item;
  card?: CardSummary;
  unit: number | null;
  total: number | null;
}
type View = "binder" | "series" | "list";
const POCKETS = 9;

const LABEL_TONE: Record<string, string> = { psa: "bg-berry text-white", pca: "bg-ink text-white", cgc: "bg-[#129a93] text-white", bgs: "bg-[#e9b213] text-ink", ca: "bg-bezel text-white" };

function Pocket({ row, selected, onSelect }: { row: Row; selected: boolean; onSelect: () => void }) {
  const { item } = row;
  return (
    <button type="button" className="pocket" aria-pressed={selected} onClick={onSelect} aria-label={`${item.name}, ${stateLabel(item)}, ${money(row.unit)}`}>
      {item.grade && (
        <span className={`pocket-tag left-1 top-1 ${LABEL_TONE[item.grade.company]}`}>
          {item.grade.company.toUpperCase()} {item.grade.grade}
        </span>
      )}
      {item.qty > 1 && <span className="pocket-tag bottom-1 right-1 bg-shell-hi text-ink">×{item.qty}</span>}
      <CardArt image={item.image} name={item.name} />
    </button>
  );
}

/** Classeur à pochettes de 9 cartes : une page sur téléphone, deux en vis-à-vis au-delà. */
function Binder({ rows, selected, onSelect }: { rows: Row[]; selected: string | null; onSelect: (key: string) => void }) {
  const [wide, setWide] = useState(false);
  const [spread, setSpread] = useState(0);
  const [turn, setTurn] = useState<"none" | "next" | "back">("none");
  useEffect(() => {
    const mq = matchMedia("(min-width: 48rem)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const perSpread = wide ? 2 : 1;
  const pages = Math.max(1, Math.ceil(rows.length / POCKETS));
  const spreads = Math.ceil(pages / perSpread);
  const current = Math.min(spread, spreads - 1);
  const go = (delta: number, animate: boolean) => {
    setTurn(animate ? (delta > 0 ? "next" : "back") : "none");
    setSpread(Math.min(spreads - 1, Math.max(0, current + delta)));
  };

  return (
    <div>
      <div
        className="binder"
        data-turn={turn}
        tabIndex={0}
        aria-label="Classeur. Flèches gauche et droite pour tourner les pages."
        onKeyDown={(e) => {
          // Au clavier, la page change sans animation.
          if (e.key === "ArrowRight") go(1, false);
          if (e.key === "ArrowLeft") go(-1, false);
        }}
      >
        {Array.from({ length: perSpread }, (_, side) => {
          const page = current * perSpread + side;
          const slots = rows.slice(page * POCKETS, (page + 1) * POCKETS);
          return (
            <div key={`${page}-${turn}`} className="binder-page" style={{ "--hinge": wide && side === 0 ? "100%" : "0%", "--side": side === 0 && wide ? -1 : 1 } as React.CSSProperties}>
              {Array.from({ length: POCKETS }, (_, i) =>
                slots[i] ? <Pocket key={slots[i].item.key} row={slots[i]} selected={selected === slots[i].item.key} onSelect={() => onSelect(slots[i].item.key)} /> : <span key={i} className="pocket" aria-hidden />,
              )}
            </div>
          );
        })}
        <span className="binder-rings" aria-hidden>
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="mt-4 flex items-center justify-center gap-4">
        <button type="button" className="btn btn-quiet btn-small" disabled={current === 0} onClick={() => go(-1, true)}>
          <Icon name="left" size={16} />
          Précédente
        </button>
        <span className="text-sm font-semibold" aria-live="polite">
          {wide && pages > 1 ? `Pages ${current * 2 + 1}–${Math.min(pages, current * 2 + 2)}` : `Page ${current * perSpread + 1}`} sur {pages}
        </span>
        <button type="button" className="btn btn-quiet btn-small" disabled={current >= spreads - 1} onClick={() => go(1, true)}>
          Suivante
          <Icon name="right" size={16} />
        </button>
      </div>
    </div>
  );
}

function BySeries({ rows, sets, selected, onSelect }: { rows: Row[]; sets: Map<string, SetInfo>; selected: string | null; onSelect: (key: string) => void }) {
  const groups = useMemo(() => {
    const bySerie = new Map<string, Map<string, Row[]>>();
    for (const r of rows) {
      const serie = bySerie.get(r.item.serieId) ?? bySerie.set(r.item.serieId, new Map()).get(r.item.serieId)!;
      (serie.get(r.item.setId) ?? serie.set(r.item.setId, []).get(r.item.setId)!).push(r);
    }
    return [...bySerie];
  }, [rows]);
  const sum = (list: Row[]) => list.reduce((s, r) => s + (r.total ?? 0), 0);

  return (
    <div className="space-y-8">
      {groups.map(([serieId, bySet]) => {
        const all = [...bySet.values()].flat();
        const serieName = sets.get(all[0].item.setId)?.serie.name ?? "Autres cartes";
        return (
          <section key={serieId} style={familyStyle(serieId)}>
            <header className="flex items-baseline justify-between gap-4 rounded-t-xl bg-family px-4 py-3 text-family-ink">
              <h2 className="text-2xl">{serieName}</h2>
              <span className="font-bold">{money(sum(all))}</span>
            </header>
            <div className="panel divide-y divide-line/60 !rounded-t-none">
              {[...bySet].map(([setId, list]) => {
                const total = sets.get(setId)?.cardCount.total;
                const distinct = new Set(list.map((r) => r.item.cardId)).size;
                return (
                  <div key={setId} className="px-4 py-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <Link href={`/sets/${setId}`} className="font-bold hover:underline">
                        {list[0].item.setName}
                      </Link>
                      <span className="text-sm text-ink-soft">
                        {total ? `${distinct} carte${distinct > 1 ? "s" : ""} sur ${total} · ` : ""}
                        <strong className="text-ink">{money(sum(list))}</strong>
                      </span>
                    </div>
                    {total && (
                      <div className="hp mt-2" data-level="high" role="meter" aria-label="Extension complétée" aria-valuenow={Math.round((distinct / total) * 100)} aria-valuemin={0} aria-valuemax={100}>
                        <i style={{ width: `${Math.max((distinct / total) * 100, 1.5)}%` }} />
                      </div>
                    )}
                    <div className="mt-3.5 grid grid-cols-4 gap-2.5 sm:grid-cols-6 md:grid-cols-8">
                      {list.map((r) => (
                        <Pocket key={r.item.key} row={r} selected={selected === r.item.key} onSelect={() => onSelect(r.item.key)} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function ListView({ rows, selected, onSelect }: { rows: Row[]; selected: string | null; onSelect: (key: string) => void }) {
  const sorted = useMemo(() => [...rows].sort((a, b) => (b.total ?? -1) - (a.total ?? -1)), [rows]);
  return (
    <div className="panel overflow-x-auto">
      <table className="w-full min-w-[34rem] text-left">
        <thead className="text-sm text-ink-soft">
          <tr>
            <th className="px-4 py-2.5 font-semibold">Carte</th>
            <th className="px-3 py-2.5 font-semibold">État</th>
            <th className="px-3 py-2.5 text-right font-semibold">Qté</th>
            <th className="px-3 py-2.5 text-right font-semibold">Prix</th>
            <th className="px-4 py-2.5 text-right font-semibold">Valeur</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(({ item, unit, total }) => (
            <tr key={item.key} className={`border-t border-line/60 ${selected === item.key ? "bg-white" : ""}`}>
              <td className="px-4 py-2">
                <button type="button" className="flex w-full items-center gap-3 text-left" onClick={() => onSelect(item.key)}>
                  <span className="w-9 shrink-0">
                    <CardArt image={item.image} name={item.name} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-semibold underline-offset-2 hover:underline">{item.name}</span>
                    <span className="block truncate text-sm text-ink-soft">
                      {item.setName} · N° {item.localId}
                    </span>
                  </span>
                </button>
              </td>
              <td className="px-3 py-2 text-sm">{stateLabel(item)}</td>
              <td className="px-3 py-2 text-right">{item.qty}</td>
              <td className="px-3 py-2 text-right">{money(unit)}</td>
              <td className="px-4 py-2 text-right font-bold">{money(total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Backup() {
  const input = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const download = () => {
    const url = URL.createObjectURL(new Blob([exportCollection()], { type: "application/json" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `poketrack-collection-${new Date().toISOString().slice(0, 10)}.json` });
    a.click();
    URL.revokeObjectURL(url);
  };
  const upload = async (file: File | undefined) => {
    if (!file) return;
    try {
      const n = importCollection(await file.text());
      setMessage(`${n} ligne${n > 1 ? "s" : ""} importée${n > 1 ? "s" : ""}.`);
    } catch (err) {
      setMessage(err instanceof SyntaxError ? "Ce fichier est illisible : choisissez une sauvegarde PokéTrack (.json)." : (err as Error).message);
    }
  };
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" className="btn btn-quiet btn-small" onClick={download}>
        <Icon name="download" size={16} />
        Sauvegarder
      </button>
      <button type="button" className="btn btn-quiet btn-small" onClick={() => input.current?.click()}>
        <Icon name="upload" size={16} />
        Restaurer
      </button>
      <input ref={input} type="file" accept="application/json,.json" className="sr-only" tabIndex={-1} aria-label="Fichier de sauvegarde" onChange={(e) => (upload(e.target.files?.[0]), (e.target.value = ""))} />
      <span className="text-sm text-ink-soft" role="status">
        {message}
      </span>
    </div>
  );
}

export function CollectionView() {
  const hydrated = useHydrated();
  const items = useCollection();
  const { cards, sets, loading } = usePrices(items);
  const [view, setView] = useState<View>("binder");
  const [selected, setSelected] = useState<string | null>(null);

  const rows = useMemo<Row[]>(
    () =>
      items
        .map((item) => {
          const card = cards.get(item.cardId);
          const unit = unitValue(item, card);
          return { item, card, unit, total: unit === null ? null : unit * item.qty };
        })
        .sort((a, b) => a.item.serieId.localeCompare(b.item.serieId) || a.item.setId.localeCompare(b.item.setId) || a.item.localId.localeCompare(b.item.localId, "fr", { numeric: true })),
    [items, cards],
  );
  const value = rows.reduce((s, r) => s + (r.total ?? 0), 0);
  const copies = items.reduce((s, i) => s + i.qty, 0);
  const unpriced = rows.filter((r) => r.unit === null).length;
  const bought = rows.filter((r) => r.item.paid && r.unit !== null);
  const paid = bought.reduce((s, r) => s + r.item.paid! * r.item.qty, 0);
  const gain = bought.reduce((s, r) => s + r.total!, 0) - paid;
  const current = rows.find((r) => r.item.key === selected);

  // La valeur du jour est notée à chaque visite : c'est l'historique de la collection.
  const ready = hydrated && !loading && items.length > 0;
  const series = useMemo(() => (ready ? valueSeries(value) : []), [ready, value]);
  useEffect(() => {
    if (ready) saveValue(value);
  }, [ready, value]);

  if (!hydrated) return <div className="skeleton h-72" />;

  if (!items.length) {
    return (
      <div className="grid items-center gap-8 md:grid-cols-[1fr_20rem]">
        <div>
          <p className="max-w-[52ch] text-lg text-ink-soft">
            Votre classeur est vide. Ouvrez une carte et choisissez « Ajouter à ma collection » : elle se range ici, avec sa valeur du jour, qu&apos;elle soit gradée ou
            non.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/#familles" className="btn">
              Parcourir les familles
            </Link>
            <Link href="/recherche" className="btn btn-quiet">
              Chercher une carte
            </Link>
          </div>
          <div className="mt-8">
            <p className="mb-2 text-sm text-ink-soft">Vous avez déjà une sauvegarde ?</p>
            <Backup />
          </div>
        </div>
        <div className="binder !grid-cols-1" data-turn="none" aria-hidden>
          <div className="binder-page">
            {Array.from({ length: POCKETS }, (_, i) => (
              <span key={i} className="pocket" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="grid gap-6 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:items-start">
        <div>
          <div className="lcd px-5 py-4">
            <p className="text-sm font-semibold text-lcd-dim">Valeur de la collection</p>
            <p className="pixel text-5xl leading-none">{loading ? "…" : money(value)}</p>
            <p className="mt-2 text-sm">
              {count(copies)} carte{copies > 1 ? "s" : ""}, {count(new Set(items.map((i) => i.cardId)).size)} différente{items.length > 1 ? "s" : ""}
            </p>
          </div>
          <div className="mt-4 space-y-1 px-1.5 text-sm">
            {paid > 0 && !loading && (
              <p>
                <span className={`font-bold ${gain >= 0 ? "text-up" : "text-down"}`}>
                  {gain >= 0 ? "+" : ""}
                  {money(gain)} ({percent(gain / paid)})
                </span>{" "}
                <span className="text-ink-soft">sur les cartes dont le prix d&apos;achat est renseigné ({money(paid)}).</span>
              </p>
            )}
            {unpriced > 0 && !loading && <p className="text-ink-soft">{unpriced} carte{unpriced > 1 ? "s" : ""} sans prix connu, non comptée{unpriced > 1 ? "s" : ""}.</p>}
            <p className="text-ink-soft">Enregistrée dans ce navigateur uniquement.</p>
          </div>
          <div className="mt-4 px-1.5">
            <Backup />
          </div>
        </div>
        <LcdChart points={series} label="Valeur de la collection" />
      </section>

      <div className="mb-6 mt-10 flex flex-wrap items-center justify-between gap-3">
        <div className="segmented" role="group" aria-label="Affichage">
          {(
            [
              ["binder", "Classeur", "binder"],
              ["series", "Par séries", "layers"],
              ["list", "Liste", "list"],
            ] as const
          ).map(([id, label, icon]) => (
            <button key={id} type="button" aria-pressed={view === id} onClick={() => setView(id)}>
              <Icon name={icon} size={16} />
              {label}
            </button>
          ))}
        </div>
        <Link href="/#familles" className="btn btn-small">
          <Icon name="plus" size={16} />
          Ajouter des cartes
        </Link>
      </div>

      <div className={current ? "grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start" : ""}>
        <div className="min-w-0">
          {view === "binder" && <Binder rows={rows} selected={selected} onSelect={setSelected} />}
          {view === "series" && <BySeries rows={rows} sets={sets} selected={selected} onSelect={setSelected} />}
          {view === "list" && <ListView rows={rows} selected={selected} onSelect={setSelected} />}
        </div>
        {current && <ItemPanel key={current.item.key} item={current.item} card={current.card} unit={current.unit} onClose={() => setSelected(null)} />}
      </div>
    </div>
  );
}

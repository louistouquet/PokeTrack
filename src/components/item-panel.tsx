"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadHistory, rawValue, removeItem, updateItem, type Item } from "@/lib/collection";
import { COMPANIES, eraOfSerie, type CompanyId } from "@/lib/pricing/graded";
import type { CardSummary } from "@/lib/snapshot";
import { money } from "@/lib/ui";
import { CardArt } from "./card-tile";
import { GradingAdvisor } from "./grading-advisor";
import { Icon } from "./icon";
import { LcdChart, type Point } from "./lcd-chart";

export const stateLabel = (item: Pick<Item, "grade" | "finish">) =>
  `${item.grade ? `${COMPANIES.find((c) => c.id === item.grade!.company)!.name} ${item.grade.grade}` : "Non gradée"}${item.finish === "reverse" ? " · reverse" : ""}`;

/** Détail d'un exemplaire de la collection : valeur, état, quantité, graphique, gradation. */
export function ItemPanel({ item, card, unit, onClose }: { item: Item; card?: CardSummary; unit: number | null; onClose: () => void }) {
  const [history, setHistory] = useState<Point[] | null>(null);
  const [confirming, setConfirming] = useState(false);
  const raw = rawValue(item, card);
  const company = COMPANIES.find((c) => c.id === (item.grade?.company ?? "psa"))!;
  const historyKey = `${item.setId}|${item.localId}${item.finish === "reverse" ? "~r" : ""}`;

  useEffect(() => {
    let alive = true;
    const [setId, row] = historyKey.split("|");
    loadHistory(setId).then((h) => {
      if (alive) setHistory((h?.prices[row] ?? []).flatMap((value, i) => (value === null ? [] : [{ day: h!.days[i], value }])));
    });
    return () => {
      alive = false;
    };
  }, [historyKey]);

  useEffect(() => {
    if (!confirming) return;
    const t = setTimeout(() => setConfirming(false), 3000);
    return () => clearTimeout(t);
  }, [confirming]);

  const gain = unit !== null && item.paid ? (unit - item.paid) * item.qty : null;

  return (
    <aside className="item-panel" aria-label={`${item.name}, détail`}>
      <div className="flex items-start gap-4">
        <div className="w-24 shrink-0">
          <CardArt image={item.image} name={item.name} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl">{item.name}</h2>
          <p className="text-sm text-ink-soft">
            {item.setName} · N° {item.localId}
          </p>
          <p className="pixel mt-2 text-4xl leading-none">{money(unit)}</p>
          <p className="text-sm text-ink-soft">
            {stateLabel(item)}
            {item.qty > 1 && unit !== null ? ` · ${money(unit * item.qty)} les ${item.qty}` : ""}
          </p>
          {gain !== null && (
            <p className={`text-sm font-semibold ${gain >= 0 ? "text-up" : "text-down"}`}>
              {gain >= 0 ? "+" : ""}
              {money(gain)} depuis l&apos;achat
            </p>
          )}
        </div>
        <button type="button" className="btn btn-quiet btn-small !px-2.5" onClick={onClose} aria-label="Fermer">
          <Icon name="close" size={18} />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <div className="segmented" role="group" aria-label="État de la carte">
            <button type="button" aria-pressed={!item.grade} onClick={() => updateItem(item.key, { grade: null })}>
              Non gradée
            </button>
            <button type="button" aria-pressed={!!item.grade} onClick={() => !item.grade && updateItem(item.key, { grade: { company: "psa", grade: "10" } })}>
              Gradée
            </button>
          </div>
        </div>
        {item.grade && (
          <>
            <label className="block text-sm font-semibold">
              Société
              <select
                className="field mt-1"
                value={item.grade.company}
                onChange={(e) => updateItem(item.key, { grade: { company: e.target.value as CompanyId, grade: COMPANIES.find((c) => c.id === e.target.value)!.grades[0].grade } })}
              >
                {COMPANIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-semibold">
              Note
              <select className="field mt-1" value={item.grade.grade} onChange={(e) => updateItem(item.key, { grade: { company: item.grade!.company, grade: e.target.value } })}>
                {company.grades.map((g) => (
                  <option key={g.grade}>{g.grade}</option>
                ))}
              </select>
            </label>
          </>
        )}
        <label className="block text-sm font-semibold">
          Quantité
          <input className="field mt-1" type="number" min={1} max={999} value={item.qty} onChange={(e) => updateItem(item.key, { qty: Math.max(1, Math.floor(Number(e.target.value)) || 1) })} />
        </label>
        <label className="block text-sm font-semibold">
          Prix d&apos;achat, par carte
          <input
            className="field mt-1"
            type="number"
            min={0}
            step="0.01"
            placeholder="€"
            value={item.paid ?? ""}
            onChange={(e) => updateItem(item.key, { paid: Number(e.target.value) > 0 ? Number(e.target.value) : undefined })}
          />
        </label>
      </div>

      {!item.grade && raw !== null && (
        <details className="mt-5 rounded-xl bg-shell-lo">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-bold">
            Faut-il la faire grader ?
            <Icon name="down" size={18} />
          </summary>
          <div className="px-4 pb-4">
            <GradingAdvisor raw={raw} era={eraOfSerie(item.serieId)} observations={card?.ebay?.graded} />
          </div>
        </details>
      )}

      <div className="mt-5">{history === null ? <div className="skeleton h-40" /> : <LcdChart points={history} label="Prix non gradé" />}</div>

      <div className="mt-5 flex flex-wrap justify-between gap-3">
        <Link href={`/cartes/${item.cardId}`} className="btn btn-quiet btn-small">
          Voir la fiche
        </Link>
        <button
          type="button"
          className={`btn btn-small ${confirming ? "" : "btn-quiet"}`}
          onClick={() => {
            if (!confirming) return setConfirming(true);
            removeItem(item.key);
            onClose();
          }}
        >
          <Icon name="trash" size={16} />
          {confirming ? "Confirmer le retrait" : "Retirer"}
        </button>
      </div>
    </aside>
  );
}

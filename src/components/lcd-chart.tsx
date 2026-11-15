"use client";

import { useEffect, useRef, useState } from "react";
import { dateFr, money } from "@/lib/ui";

export interface Point {
  day: string; // "2026-11-15"
  value: number;
}

const H = 200;
const PAD = { top: 16, right: 14, bottom: 26, left: 64 };

/** Trois graduations « rondes » couvrant [min, max]. */
function ticks(min: number, max: number): number[] {
  const span = max - min || Math.max(max, 1) * 0.2;
  const step = [1, 2, 2.5, 5, 10].map((m) => m * 10 ** Math.floor(Math.log10(span / 2))).find((s) => span / s <= 3.2)!;
  const first = Math.floor(min / step) * step;
  return Array.from({ length: 5 }, (_, i) => +(first + i * step).toFixed(6)).filter((t) => t <= max + step);
}

function Empty() {
  return (
    <div className="lcd flex min-h-40 items-center justify-center p-6 text-center">
      <p className="pixel text-xl">Pas encore de relevé.</p>
    </div>
  );
}

/** Courbe d'une seule série sur l'écran LCD : survol ou flèches du clavier pour lire un jour. */
export function LcdChart({ points, label }: { points: Point[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // 0 tant que le conteneur n'est pas mesuré : le SVG ne doit jamais imposer sa largeur à la page.
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
    // Le conteneur n'existe qu'à partir du premier point.
  }, [points.length === 0]);

  if (!points.length) return <Empty />;

  const values = points.map((p) => p.value);
  const ts = ticks(Math.min(...values), Math.max(...values));
  const lo = ts[0];
  const hi = ts[ts.length - 1];
  const innerW = Math.max(width - PAD.left - PAD.right, 10);
  const innerH = H - PAD.top - PAD.bottom;
  const x = (i: number) => PAD.left + (points.length === 1 ? innerW / 2 : (i / (points.length - 1)) * innerW);
  const y = (v: number) => PAD.top + innerH - ((v - lo) / (hi - lo || 1)) * innerH;
  const line = points.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(p.value).toFixed(1)}`).join("");
  const shown = active ?? points.length - 1;
  const day = (iso: string) => dateFr(iso, { day: "numeric", month: "short" });

  const pick = (clientX: number) => {
    const left = ref.current!.getBoundingClientRect().left;
    const ratio = (clientX - left - PAD.left) / innerW;
    setActive(Math.round(Math.min(1, Math.max(0, ratio)) * (points.length - 1)));
  };

  return (
    <figure className="min-w-0">
      <div
        ref={ref}
        className="lcd touch-pan-y overflow-hidden"
        tabIndex={0}
        role="img"
        aria-label={`${label} : ${money(points[shown].value)} le ${dateFr(points[shown].day)}`}
        onPointerMove={(e) => pick(e.clientX)}
        onPointerLeave={() => setActive(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setActive(Math.max(0, shown - 1));
          if (e.key === "ArrowRight") setActive(Math.min(points.length - 1, shown + 1));
        }}
      >
        <svg width={width} height={H} className="block" style={{ visibility: width ? "visible" : "hidden" }}>
          {ts.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={width - PAD.right} y1={y(t)} y2={y(t)} stroke="var(--lcd-mid)" strokeWidth="1" />
              <text x={PAD.left - 8} y={y(t) + 4} textAnchor="end" fontSize="12" fill="var(--lcd-dim)">
                {hi >= 100 ? money(Math.round(t)).replace(",00", "") : money(t)}
              </text>
            </g>
          ))}
          {points.length > 1 && (
            <>
              <path d={`${line}L${x(points.length - 1)} ${PAD.top + innerH}L${x(0)} ${PAD.top + innerH}Z`} fill="var(--lcd-ink)" opacity="0.1" />
              <path d={line} fill="none" stroke="var(--lcd-ink)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
              <line x1={x(shown)} x2={x(shown)} y1={PAD.top} y2={PAD.top + innerH} stroke="var(--lcd-ink)" strokeWidth="1" opacity={active === null ? 0 : 0.5} />
            </>
          )}
          <circle cx={x(shown)} cy={y(points[shown].value)} r="5" fill="var(--lcd-ink)" stroke="var(--lcd)" strokeWidth="2" />
          <text x={PAD.left} y={H - 7} fontSize="12" fill="var(--lcd-dim)">
            {day(points[0].day)}
          </text>
          {points.length > 1 && (
            <text x={width - PAD.right} y={H - 7} textAnchor="end" fontSize="12" fill="var(--lcd-dim)">
              {day(points[points.length - 1].day)}
            </text>
          )}
        </svg>
        <p className="absolute right-3 top-2 rounded bg-lcd/85 px-1.5 text-right leading-tight" aria-hidden>
          <span className="pixel block text-xl">{money(points[shown].value)}</span>
          <span className="text-xs text-lcd-dim">{dateFr(points[shown].day)}</span>
        </p>
      </div>
      <figcaption className="mt-3 text-sm text-ink-soft">
        {points.length === 1
          ? `Premier relevé le ${dateFr(points[0].day)}. Un point s'ajoute chaque jour : la courbe se dessine avec le temps.`
          : `${label}, ${points.length} relevés quotidiens depuis le ${dateFr(points[0].day)}.`}
      </figcaption>
      {points.length > 1 && (
        <details className="mt-1 text-sm">
          <summary className="cursor-pointer font-semibold text-ink-soft">Voir les valeurs</summary>
          <table className="mt-2 w-full max-w-xs">
            <tbody>
              {[...points].reverse().map((p) => (
                <tr key={p.day} className="border-t border-line">
                  <td className="py-1">{dateFr(p.day)}</td>
                  <td className="py-1 text-right font-semibold">{money(p.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      )}
    </figure>
  );
}

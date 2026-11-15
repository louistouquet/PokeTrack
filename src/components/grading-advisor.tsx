"use client";

import { useState } from "react";
import { COMPANIES, type Era, type GradedObservations } from "@/lib/pricing/graded";
import { CONDITIONS, gradingVerdict, SERVICES, serviceCost, type Condition, type GradingVerdict } from "@/lib/pricing/grading-roi";
import { money } from "@/lib/ui";

const TONE: Record<GradingVerdict["verdict"], string> = {
  rentable: "bg-[#cfe8d4] text-[#12512c]",
  risqué: "bg-[#f6dfa6] text-[#5b4300]",
  "à éviter": "bg-[#f3cfca] text-[#7a1712]",
};
const signed = (v: number) => `${v > 0 ? "+" : ""}${money(v)}`;

/**
 * Compare les sociétés de gradation pour une carte non gradée : gain espéré, frais,
 * chances de gain. `editable` permet de corriger les tarifs (page Gradation).
 */
export function GradingAdvisor({ raw, era, observations, editable = false }: { raw: number; era: Era; observations?: GradedObservations; editable?: boolean }) {
  const [condition, setCondition] = useState<Condition>("nearMint");
  const [fees, setFees] = useState<Record<string, number>>({});

  const verdicts = SERVICES.map((s) => gradingVerdict(raw, era, condition, { ...s, fee: fees[s.company] ?? s.fee }, observations)!).sort((a, b) => b.expectedGain - a.expectedGain);
  const best = verdicts[0];
  const name = (id: string) => COMPANIES.find((c) => c.id === id)!.name;

  return (
    <div className="@container">
      <fieldset>
        <legend className="mb-2 font-semibold">État de votre carte</legend>
        <div className="grid gap-2 @xl:grid-cols-3">
          {CONDITIONS.map((c) => (
            <label key={c.id} className="condition">
              <input type="radio" name="condition" className="sr-only" checked={condition === c.id} onChange={() => setCondition(c.id)} />
              <span className="block font-bold leading-tight">{c.label}</span>
              <span className="block text-sm opacity-80">{c.hint}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <p className="mt-6 text-lg" aria-live="polite">
        {best.expectedGain > 0 ? (
          <>
            D&apos;après le modèle, le meilleur choix est <strong>{name(best.company)}</strong>, pour un gain moyen de <strong>{money(best.expectedGain)}</strong> et{" "}
            {Math.round(best.winChance * 100)} % de chances de finir gagnant.
          </>
        ) : (
          <>
            <strong>Mieux vaut la garder telle quelle.</strong> Dans cet état, les frais dépassent le gain espéré chez toutes les sociétés.
          </>
        )}
      </p>

      <div className="mt-5 space-y-2.5">
        {verdicts.map((v) => {
          const service = SERVICES.find((s) => s.company === v.company)!;
          return (
            <details key={v.company} className="panel group">
              <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-4 py-3 @xl:grid-cols-[8rem_6rem_1fr_auto]">
                <span className="font-bold">{name(v.company)}</span>
                <span className={`chip justify-self-end @xl:order-none @xl:justify-self-start ${TONE[v.verdict]}`}>{v.verdict}</span>
                <span className="order-last col-span-2 text-sm text-ink-soft @xl:order-none @xl:col-span-1">
                  {money(v.cost)} de frais · {Math.round(v.winChance * 100)} % de chances de gain{v.breakevenGrade ? ` · rentable dès ${v.breakevenGrade}` : ""}
                </span>
                <span className={`col-span-2 text-lg font-bold @xl:col-span-1 @xl:text-right ${v.expectedGain > 0 ? "text-up" : "text-down"}`}>
                  {signed(v.expectedGain)} <span className="text-sm font-normal text-ink-soft @xl:hidden">de gain moyen</span>
                </span>
              </summary>
              <div className="border-t border-line/60 px-4 py-3">
                <table className="w-full text-sm">
                  <thead className="text-left text-ink-soft">
                    <tr>
                      <th className="py-1 font-semibold">Note obtenue</th>
                      <th className="py-1 text-right font-semibold">Chances</th>
                      <th className="py-1 text-right font-semibold">Valeur gradée</th>
                      <th className="py-1 text-right font-semibold">Résultat net</th>
                    </tr>
                  </thead>
                  <tbody>
                    {v.outcomes.map((o) => (
                      <tr key={o.grade} className="border-t border-line/50">
                        <td className="py-1.5 font-semibold">{o.grade === "inférieure" ? "Note inférieure" : `${name(v.company)} ${o.grade}`}</td>
                        <td className="py-1.5 text-right">{Math.round(o.probability * 100)} %</td>
                        <td className="py-1.5 text-right">{money(o.value)}</td>
                        <td className={`py-1.5 text-right font-semibold ${o.net > 0 ? "text-up" : "text-down"}`}>{signed(o.net)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-3 text-sm text-ink-soft">
                  <p>
                    Délai courant : {v.weeks} semaines. Frais = tarif + envoi assuré{service.importVat ? " + TVA à l'import" : ""}.
                  </p>
                  {editable && (
                    <label className="flex items-center gap-2 font-semibold text-ink">
                      Tarif par carte
                      <input
                        className="field !min-h-9 w-24"
                        type="number"
                        min={0}
                        step={1}
                        value={fees[v.company] ?? service.fee}
                        onChange={(e) => setFees({ ...fees, [v.company]: Math.max(0, Number(e.target.value)) })}
                      />
                      €
                    </label>
                  )}
                </div>
              </div>
            </details>
          );
        })}
      </div>
      <p className="mt-4 max-w-[70ch] text-sm text-ink-soft">
        Tarifs indicatifs de novembre 2026 ({SERVICES.map((s) => `${name(s.company)} ${money(serviceCost(s))}`).join(", ")} tout compris) : vérifiez-les sur le site de chaque société. Les
        frais de revente ne sont pas comptés.
      </p>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { Era } from "@/lib/pricing/graded";
import { GradingAdvisor } from "./grading-advisor";

const ERAS: { id: Era; label: string }[] = [
  { id: "recent", label: "Récente : Épée et Bouclier, Écarlate et Violet, Méga-Évolution" },
  { id: "modern", label: "Moderne : Noir & Blanc, XY, Soleil et Lune" },
  { id: "classic", label: "Classique : EX, Diamant & Perle, Platine, HeartGold" },
  { id: "vintage", label: "Vintage : Set de Base, Neo, e-cards" },
];

/** Calculateur libre : on saisit un prix et une époque, sans passer par une carte. */
export function GradingCalculator({ initialPrice, initialEra }: { initialPrice?: number; initialEra?: Era }) {
  const [price, setPrice] = useState(initialPrice ? String(initialPrice) : "");
  const [era, setEra] = useState<Era>(initialEra ?? "recent");
  const raw = Number(price.replace(",", "."));

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-[12rem_1fr]">
        <label className="block font-semibold">
          Prix de la carte non gradée
          <span className="relative mt-1 block">
            <input className="field pr-8" inputMode="decimal" placeholder="120" value={price} onChange={(e) => setPrice(e.target.value)} />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft">€</span>
          </span>
        </label>
        <label className="block font-semibold">
          Époque
          <select className="field mt-1" value={era} onChange={(e) => setEra(e.target.value as Era)}>
            {ERAS.map((e) => (
              <option key={e.id} value={e.id}>
                {e.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-8">
        {raw > 0 ? (
          <GradingAdvisor raw={raw} era={era} editable />
        ) : (
          <p className="panel px-5 py-6 text-ink-soft">Indiquez le prix de votre carte pour comparer les sociétés de gradation.</p>
        )}
      </div>
    </div>
  );
}

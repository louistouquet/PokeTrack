import { level, levelWord } from "@/lib/ui";

/** Jauge 0–100 façon barre de PV, avec son libellé et sa valeur en toutes lettres. */
export function Meter({ label, score, hint, invert = false }: { label: string; score: number; hint?: string; invert?: boolean }) {
  // Pour la volatilité, un score haut est mauvais : on inverse la couleur, pas la longueur.
  const tone = level(invert ? 100 - score : score);
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="font-semibold">{label}</span>
        <span className="text-sm text-ink-soft">
          {levelWord(score)} · {score}/100
        </span>
      </div>
      <div className="hp" data-level={tone} role="meter" aria-label={label} aria-valuenow={score} aria-valuemin={0} aria-valuemax={100}>
        <i style={{ width: `${Math.max(score, 3)}%` }} />
      </div>
      {hint && <p className="mt-1.5 text-sm text-ink-soft">{hint}</p>}
    </div>
  );
}

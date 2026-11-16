"use client";

import Link from "next/link";
import { ViewTransition, useState } from "react";
import { addItem, useCollection } from "@/lib/collection";
import type { CardDetail } from "@/lib/data";
import { COMPANIES, gradedTable, type CompanyId } from "@/lib/pricing/graded";
import { gradingVerdict, SERVICES } from "@/lib/pricing/grading-roi";
import type { Finish, SourceId } from "@/lib/pricing/raw";
import { isShiny, money, percent } from "@/lib/ui";
import { CardArt, Trend } from "./card-tile";
import { HoloCard } from "./holo-card";
import { Icon } from "./icon";
import { LcdChart } from "./lcd-chart";
import { Meter } from "./meter";
import { Select } from "./select";
import { Slab } from "./slab";

const SOURCE_NAMES: Record<SourceId, string> = { cardmarket: "Cardmarket", ebay: "eBay France" };
const SOURCE_NOTES: Record<SourceId, string> = {
  cardmarket: "Europe, ventes réalisées",
  ebay: "Annonces en cours",
};

type Grade = { company: CompanyId; grade: string } | null;

export function CardView({ detail }: { detail: CardDetail }) {
  const { card, era, serie } = detail;
  const [finish, setFinish] = useState<Finish>("standard");
  const [grade, setGrade] = useState<Grade>(null);
  const quote = finish === "reverse" && detail.reverse ? detail.reverse : detail.standard;
  const graded = quote.price ? gradedTable(quote.price, era, finish === "standard" ? detail.observations : {}) : [];
  const selected = grade && graded.find((g) => g.company === grade.company && g.grade === grade.grade);
  const company = grade && COMPANIES.find((c) => c.id === grade.company)!;
  const history = detail.history[finish];

  // Meilleure option de gradation pour une carte en très bon état.
  const best = quote.price
    ? SERVICES.map((s) => gradingVerdict(quote.price!, era, "nearMint", s, detail.observations)!).sort((a, b) => b.expectedGain - a.expectedGain)[0]
    : null;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,23rem)_minmax(0,1fr)] lg:gap-14">
      <div className="mx-auto w-full max-w-[23rem] lg:sticky lg:top-24 lg:self-start">
        <Slab company={company?.name} companyId={grade?.company} grade={grade?.grade} name={card.name} setName={card.set.name}>
          <HoloCard shiny={isShiny(card.rarity) && !grade}>
            <ViewTransition name={`card-${card.id}`} share="card-morph" default="none">
              <CardArt image={card.image} name={card.name} quality="high" eager />
            </ViewTransition>
          </HoloCard>
        </Slab>
        {/* Sur grand écran, le formulaire reste sous la carte ; sur téléphone il vient après le prix. */}
        <div className="hidden lg:block">
          <AddToCollection detail={detail} finish={finish} grade={grade} onGrade={setGrade} />
        </div>
      </div>

      <div className="min-w-0">
        {detail.reverse && (
          <div className="segmented mb-5" role="group" aria-label="Finition">
            <button type="button" aria-pressed={finish === "standard"} onClick={() => setFinish("standard")}>
              Normale
            </button>
            <button type="button" aria-pressed={finish === "reverse"} onClick={() => setFinish("reverse")}>
              Reverse
            </button>
          </div>
        )}

        {quote.price === null && (
          <div className="panel px-6 py-10">
            <p className="pixel text-2xl">Pas encore de prix pour cette carte.</p>
            <p className="mt-2 max-w-[55ch] text-ink-soft">Aucune place de marché suivie ne la cote pour le moment. Vous pouvez tout de même l&apos;ajouter à votre collection.</p>
          </div>
        )}
        {quote.price === null ? (
          <div className="lg:hidden">
            <AddToCollection detail={detail} finish={finish} grade={grade} onGrade={setGrade} />
          </div>
        ) : (
          <>
            <div className="lcd px-5 py-4" aria-live="polite">
              <p className="text-sm font-semibold text-lcd-dim">
                {selected ? `${company!.name} ${selected.grade} · ${selected.method === "modèle" ? "estimation par modèle" : selected.method === "mixte" ? "modèle + annonces" : "prix observé"}` : "Prix juste · non gradée"}
              </p>
              <p className="pixel text-5xl leading-none sm:text-6xl">{money(selected ? selected.price : quote.price)}</p>
              <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                {selected ? (
                  <span>
                    {percent(selected.price / quote.price - 1)} par rapport à la carte non gradée ({money(quote.price)})
                  </span>
                ) : (
                  <>
                    <span>
                      Fourchette {money(quote.range![0])} – {money(quote.range![1])}
                    </span>
                    {quote.trend !== null && (
                      <span className="flex items-center gap-1.5">
                        <Trend value={quote.trend} className="!text-lcd-ink" />
                        <span className="text-lcd-dim">7 j contre 30 j</span>
                      </span>
                    )}
                  </>
                )}
              </p>
            </div>

            {detail.shared && (
              <p className="mt-5 flex gap-2.5 rounded-xl bg-[#f6dfa6] px-4 py-3 text-sm">
                <Icon name="info" size={18} className="mt-0.5 shrink-0" />
                La source rattache plusieurs cartes de cette extension au même produit : ce prix est probablement celui d&apos;une autre carte. À vérifier avant toute décision.
              </p>
            )}

            {detail.far && (
              <p className="mt-5 flex gap-2.5 rounded-xl bg-[#f6dfa6] px-4 py-3 text-sm">
                <Icon name="info" size={18} className="mt-0.5 shrink-0" />
                Ce prix est plus de dix fois au-dessus ou au-dessous de celui de la même carte aux États-Unis : elle est peut-être rattachée au mauvais produit dans les
                données de la source. À vérifier avant toute décision.
              </p>
            )}

            <div className="mt-7 grid gap-x-8 gap-y-5 px-1.5 sm:grid-cols-3">
              <Meter label="Liquidité" score={quote.liquidity} hint={quote.listings !== null ? `${quote.listings} en vente sur eBay` : "Facilité à vendre au prix juste"} />
              <Meter label="Confiance" score={quote.confidence} hint="Cohérence et fraîcheur des indicateurs" />
              <Meter label="Volatilité" score={quote.volatility} invert hint="Écart entre les moyennes récentes" />
            </div>

            <div className="lg:hidden">
              <AddToCollection detail={detail} finish={finish} grade={grade} onGrade={setGrade} />
            </div>

            <section className="mt-12">
              <h2 className="text-2xl">Les sources</h2>
              <div className="panel mt-4 overflow-x-auto">
                <table className="w-full min-w-[30rem] text-left">
                  <thead className="text-sm text-ink-soft">
                    <tr>
                      <th className="px-4 py-2.5 font-semibold">Place de marché</th>
                      <th className="px-4 py-2.5 text-right font-semibold">Prix</th>
                      <th className="px-4 py-2.5 text-right font-semibold">Poids</th>
                      <th className="px-4 py-2.5 text-right font-semibold">Moins chère</th>
                      <th className="px-4 py-2.5 text-right font-semibold">En vente</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quote.sources.map((s) => (
                      <tr key={s.source} className="border-t border-line/60">
                        <td className="px-4 py-3">
                          <span className="block font-semibold">{SOURCE_NAMES[s.source]}</span>
                          <span className="block text-sm text-ink-soft">{SOURCE_NOTES[s.source]}</span>
                        </td>
                        <td className="px-4 py-3 text-right font-bold">{money(s.price)}</td>
                        <td className="px-4 py-3 text-right">{Math.round(s.weight * 100)} %</td>
                        <td className="px-4 py-3 text-right">{money(s.low)}</td>
                        <td className="px-4 py-3 text-right">{s.listings ?? "—"}</td>
                      </tr>
                    ))}
                    {!quote.sources.some((s) => s.source === "ebay") && (
                      <tr className="border-t border-line/60 text-ink-soft">
                        <td className="px-4 py-3" colSpan={5}>
                          <span className="font-semibold">eBay France</span> : pas d&apos;annonces relevées pour cette carte.{" "}
                          <Link href="/methode#sources" className="underline">
                            Pourquoi ?
                          </Link>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl">Si elle était gradée</h2>
              <p className="mt-2 max-w-[62ch] text-ink-soft">
                Choisissez une note pour voir la carte en boîtier et son prix estimé.{" "}
                {graded.some((g) => g.method !== "modèle") ? "Les cases marquées d'un point s'appuient sur des annonces eBay." : "Ces prix viennent d'un modèle, pas de ventes observées."}{" "}
                <Link href="/methode#grade" className="underline">
                  Comprendre le calcul
                </Link>
              </p>
              <div className="mt-4 space-y-2.5">
                {COMPANIES.map((c) => (
                  <div key={c.id} className="panel grid grid-cols-[5.5rem_1fr] items-center gap-2 p-2 sm:grid-cols-[9rem_1fr]">
                    <div className="pl-2">
                      <span className="block font-bold leading-tight">{c.name}</span>
                      <span className="hidden text-sm text-ink-soft sm:block">{c.country}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {graded
                        .filter((g) => g.company === c.id)
                        .map((g) => {
                          const on = grade?.company === g.company && grade.grade === g.grade;
                          return (
                            <button
                              key={g.grade}
                              type="button"
                              aria-pressed={on}
                              onClick={() => setGrade(on ? null : { company: g.company, grade: g.grade })}
                              className="grade-cell"
                              title={`${c.name} ${g.grade} : ${g.method}${g.listings ? `, ${g.listings} annonces` : ""}`}
                            >
                              <span className="pixel text-lg leading-none">
                                {g.grade}
                                {g.method !== "modèle" && <i aria-hidden className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-current align-middle" />}
                              </span>
                              <span className="text-[0.8125rem] font-semibold sm:text-sm">{money(g.price)}</span>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>

              {best && (
                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-shell-lo px-5 py-4">
                  <p className="max-w-[52ch]">
                    <strong>Faut-il la faire grader ?</strong>{" "}
                    {best.expectedGain > 0
                      ? `En très bon état, ${COMPANIES.find((c) => c.id === best.company)!.name} rapporterait en moyenne ${money(best.expectedGain)} une fois les ${money(best.cost)} de frais déduits.`
                      : "En très bon état, les frais dépassent le gain espéré chez toutes les sociétés."}
                  </p>
                  <Link href={`/gradation?carte=${card.id}${finish === "reverse" ? "&finition=reverse" : ""}`} className="btn btn-quiet btn-small">
                    Faire le calcul
                  </Link>
                </div>
              )}
            </section>

            <section className="mt-12">
              <h2 className="mb-4 text-2xl">Évolution du prix</h2>
              <LcdChart points={history} label="Prix juste, non gradée" />
            </section>
          </>
        )}

        {(card.illustrator || serie.name) && (
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 text-sm sm:grid-cols-4">
            {[
              ["Famille", serie.name],
              ["Extension", card.set.name],
              ["Illustration", card.illustrator],
              ["Type", [card.category, card.types?.join(", ")].filter(Boolean).join(" · ")],
            ].map(([k, v]) => v && (
              <div key={k}>
                <dt className="text-ink-soft">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}

function AddToCollection({ detail, finish, grade, onGrade }: { detail: CardDetail; finish: Finish; grade: Grade; onGrade: (g: Grade) => void }) {
  const { card, serie } = detail;
  const owned = useCollection().filter((i) => i.cardId === card.id).reduce((n, i) => n + i.qty, 0);
  const [qty, setQty] = useState(1);
  const [paid, setPaid] = useState("");
  const [done, setDone] = useState(false);
  const company = COMPANIES.find((c) => c.id === (grade?.company ?? "psa"))!;

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const price = Number(paid.replace(",", "."));
    addItem({
      cardId: card.id,
      setId: card.set.id,
      setName: card.set.name,
      serieId: serie.id,
      localId: card.localId,
      name: card.name,
      image: card.image,
      rarity: card.rarity,
      finish,
      grade,
      qty,
      paid: price > 0 ? price : undefined,
    });
    setDone(true);
    setTimeout(() => setDone(false), 1800);
  };

  return (
    <form onSubmit={add} className="panel mt-6 space-y-4 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="segmented" role="group" aria-label="État de la carte">
          <button type="button" aria-pressed={!grade} onClick={() => onGrade(null)}>
            Non gradée
          </button>
          <button type="button" aria-pressed={!!grade} onClick={() => onGrade(grade ?? { company: "psa", grade: "10" })}>
            Gradée
          </button>
        </div>
        {owned > 0 && (
          <Link href="/collection" className="text-sm font-semibold underline">
            {owned} dans ma collection
          </Link>
        )}
      </div>

      {grade && (
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm font-semibold">
            Société
<Select
              className="mt-1"
              value={grade.company}
              onChange={(id) => onGrade({ company: id, grade: COMPANIES.find((c) => c.id === id)!.grades[0].grade })}
              options={COMPANIES.map((c) => ({ value: c.id, label: c.name }))}
            />
          </label>
          <label className="block text-sm font-semibold">
            Note
<Select className="mt-1" value={grade.grade} onChange={(g) => onGrade({ company: grade.company, grade: g })} options={company.grades.map((g) => ({ value: g.grade, label: g.grade }))} />
          </label>
        </div>
      )}

      <div className="grid grid-cols-[5.5rem_1fr] gap-3">
        <label className="block text-sm font-semibold">
          Quantité
          <input className="field mt-1" type="number" min={1} max={999} required value={qty} onChange={(e) => setQty(Math.max(1, Math.floor(Number(e.target.value)) || 1))} />
        </label>
        <label className="block text-sm font-semibold">
          Prix d&apos;achat, par carte <span className="font-normal text-ink-soft">(facultatif)</span>
          <input className="field mt-1" inputMode="decimal" pattern="[0-9]+([.,][0-9]{1,2})?" placeholder="€" value={paid} onChange={(e) => setPaid(e.target.value)} />
        </label>
      </div>

      <button type="submit" className="btn w-full" data-done={done}>
        <Icon name={done ? "check" : "plus"} />
        <span aria-live="polite">{done ? "Ajoutée au classeur" : "Ajouter à ma collection"}</span>
      </button>
    </form>
  );
}

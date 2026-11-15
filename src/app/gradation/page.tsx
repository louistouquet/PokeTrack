import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CardArt } from "@/components/card-tile";
import { GradingAdvisor } from "@/components/grading-advisor";
import { GradingCalculator } from "@/components/grading-calculator";
import { getCardDetail } from "@/lib/data";
import { money } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Faut-il faire grader sa carte ?",
  description: "Comparez PSA, PCA, CGC, BGS et Collect Aura : frais, chances de gain et gain espéré selon l'état de votre carte Pokémon.",
};

async function Calculator({ searchParams }: Pick<PageProps<"/gradation">, "searchParams">) {
  const params = await searchParams;
  const id = typeof params.carte === "string" ? params.carte : undefined;
  const detail = id ? await getCardDetail(id) : null;
  const quote = detail && (params.finition === "reverse" && detail.reverse ? detail.reverse : detail.standard);

  if (!detail || !quote?.price) return <GradingCalculator />;
  const { card } = detail;
  return (
    <div className="grid gap-8 md:grid-cols-[11rem_1fr]">
      <div className="max-w-44">
        <CardArt image={card.image} name={card.name} quality="high" eager />
        <p className="mt-3 font-bold leading-tight">{card.name}</p>
        <p className="text-sm text-ink-soft">
          {card.set.name} · {money(quote.price)} non gradée
        </p>
        <p className="mt-2 flex flex-col gap-1 text-sm font-semibold">
          <Link href={`/cartes/${card.id}`} className="underline">
            Voir la fiche
          </Link>
          <Link href="/gradation" className="underline">
            Calculer pour un autre prix
          </Link>
        </p>
      </div>
      <GradingAdvisor raw={quote.price} era={detail.era} observations={detail.observations} editable />
    </div>
  );
}

export default function GradingPage({ searchParams }: PageProps<"/gradation">) {
  return (
    <div className="wrap max-w-[60rem] pt-10">
      <h1 className="text-4xl sm:text-5xl">Faut-il la faire grader ?</h1>
      <p className="mb-9 mt-3 max-w-[64ch] text-lg text-ink-soft">
        Faire grader coûte de l&apos;argent et le résultat n&apos;est jamais garanti. Ce calcul pèse les frais contre ce que la carte vaudrait à chaque note possible, selon
        son état.
      </p>
      <Suspense fallback={<div className="skeleton h-72" />}>
        <Calculator searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

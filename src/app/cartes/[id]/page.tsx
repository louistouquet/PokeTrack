import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CardView } from "@/components/card-view";
import { Icon } from "@/components/icon";
import { getCardDetail } from "@/lib/data";
import { money } from "@/lib/ui";

export async function generateMetadata({ params }: PageProps<"/cartes/[id]">): Promise<Metadata> {
  const detail = await getCardDetail((await params).id);
  if (!detail) return { title: "Carte introuvable" };
  const { card, standard } = detail;
  return {
    title: `${card.name} (${card.set.name} ${card.localId})`,
    description: `Prix juste de ${card.name}, ${card.set.name} : ${money(standard.price)} non gradée. Prix gradés, liquidité et historique.`,
  };
}

async function CardPage({ params }: Pick<PageProps<"/cartes/[id]">, "params">) {
  const detail = await getCardDetail((await params).id);
  if (!detail) notFound();
  const { card, serie, neighbours } = detail;

  return (
    <div className="wrap pb-6 pt-8">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink-soft">
            {serie.id && (
              <>
                <Link href={`/series/${serie.id}`} className="hover:underline">
                  {serie.name}
                </Link>
                {" / "}
              </>
            )}
            <Link href={`/sets/${card.set.id}`} className="hover:underline">
              {card.set.name}
            </Link>
          </p>
          <h1 className="mt-1.5 text-4xl sm:text-5xl">{card.name}</h1>
          <p className="mt-3 flex flex-wrap gap-2">
            <span className="chip">
              N° {card.localId}
              {card.set.cardCount?.official ? ` / ${card.set.cardCount.official}` : ""}
            </span>
            {card.rarity && <span className="chip">{card.rarity}</span>}
            {card.variants?.firstEdition && <span className="chip">Existe en édition 1</span>}
          </p>
        </div>
        <nav aria-label="Cartes voisines" className="flex gap-2">
          {neighbours.prev && (
            <Link href={`/cartes/${neighbours.prev.id}`} className="btn btn-quiet btn-small" title={neighbours.prev.name}>
              <Icon name="left" size={16} />
              Précédente
            </Link>
          )}
          {neighbours.next && (
            <Link href={`/cartes/${neighbours.next.id}`} className="btn btn-quiet btn-small" title={neighbours.next.name}>
              Suivante
              <Icon name="right" size={16} />
            </Link>
          )}
        </nav>
      </div>
      <CardView detail={detail} />
    </div>
  );
}

function Loading() {
  return (
    <div className="wrap grid gap-10 pt-8 lg:grid-cols-[minmax(0,23rem)_minmax(0,1fr)] lg:gap-14">
      <div className="skeleton mx-auto aspect-[63/88] w-full max-w-[23rem]" />
      <div className="space-y-5">
        <div className="skeleton h-12 w-2/3" />
        <div className="skeleton h-36" />
        <div className="skeleton h-64" />
      </div>
    </div>
  );
}

export default function Page({ params }: PageProps<"/cartes/[id]">) {
  return (
    <Suspense fallback={<Loading />}>
      <CardPage params={params} />
    </Suspense>
  );
}

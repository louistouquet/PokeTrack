import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getMarket, getSerie, getSeries } from "@/lib/data";
import { assetImage } from "@/lib/tcgdex";
import { count, familyStyle, money } from "@/lib/ui";

export async function generateStaticParams() {
  return (await getSeries()).map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: PageProps<"/series/[id]">): Promise<Metadata> {
  const serie = await getSerie((await params).id);
  return { title: serie ? `${serie.name} : toutes les extensions` : "Famille introuvable" };
}

async function Family({ params }: Pick<PageProps<"/series/[id]">, "params">) {
  const { id } = await params;
  const [serie, market] = await Promise.all([getSerie(id), getMarket()]);
  if (!serie) notFound();
  const logo = assetImage(serie.logo);
  const stats = market?.series.find((s) => s.id === id);
  const sets = [...serie.sets].reverse(); // les plus récentes d'abord

  return (
    <div style={familyStyle(id)}>
      <header className="bg-family text-family-ink">
        <div className="wrap flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-12">
          <div>
            <Link href="/#familles" className="text-sm font-semibold opacity-85 hover:underline">
              Toutes les familles
            </Link>
            <h1 className="mt-2 text-4xl sm:text-6xl">{serie.name}</h1>
            <p className="mt-3 text-lg opacity-90">
              {sets.length} extension{sets.length > 1 ? "s" : ""}
              {serie.releaseDate ? `, depuis ${serie.releaseDate.slice(0, 4)}` : ""}
              {stats ? ` · ${count(stats.priced)} cartes cotées, ${money(stats.value)} pour un exemplaire de chacune` : ""}
            </p>
          </div>
          {logo && (
            <div className="flex h-28 w-full max-w-72 shrink-0 items-center justify-center rounded-xl bg-shell-hi p-5 shadow-[0_1px_3px_#0005_inset]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} alt="" className="max-h-full max-w-full object-contain" />
            </div>
          )}
        </div>
      </header>

      <div className="wrap mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {sets.map((set, i) => {
          const setLogo = assetImage(set.logo);
          const symbol = assetImage(set.symbol);
          return (
            <Link key={set.id} href={`/sets/${set.id}`} className="tile panel rise overflow-hidden" style={{ "--i": Math.min(i, 12) } as React.CSSProperties}>
              <span className="flex h-28 items-center justify-center bg-white/60 p-5">
                {setLogo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={setLogo} alt="" loading="lazy" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="pixel text-center text-xl leading-tight">{set.name}</span>
                )}
              </span>
              <span className="flex items-center gap-2.5 px-4 py-3">
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-bold leading-tight">{set.name}</span>
                  <span className="block text-sm text-ink-soft">{set.cardCount.total} cartes</span>
                </span>
                {symbol && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={symbol} alt="" loading="lazy" className="h-6 w-6 shrink-0 object-contain" />
                )}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function SeriePage({ params }: PageProps<"/series/[id]">) {
  return (
    <Suspense fallback={<div className="skeleton h-56 !rounded-none" />}>
      <Family params={params} />
    </Suspense>
  );
}

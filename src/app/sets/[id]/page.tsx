import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SetBrowser } from "@/components/set-browser";
import { getSetSnapshot } from "@/lib/data";
import { assetImage } from "@/lib/tcgdex";
import { dateFr, familyStyle, money } from "@/lib/ui";

export async function generateMetadata({ params }: PageProps<"/sets/[id]">): Promise<Metadata> {
  const snapshot = await getSetSnapshot((await params).id);
  return { title: snapshot ? `${snapshot.set.name} : cartes et prix` : "Extension introuvable" };
}

async function SetView({ params }: Pick<PageProps<"/sets/[id]">, "params">) {
  const { id } = await params;
  const snapshot = await getSetSnapshot(id);
  if (!snapshot) notFound();
  const { set, cards } = snapshot;
  const logo = assetImage(set.logo);
  const priced = cards.filter((c) => c.std);
  const total = priced.reduce((sum, c) => sum + c.std!.p, 0);
  const best = priced.reduce<(typeof priced)[number] | null>((a, c) => (!a || c.std!.p > a.std!.p ? c : a), null);

  return (
    <div style={familyStyle(set.serie.id)}>
      <header className="bg-family text-family-ink">
        <div className="wrap flex flex-col gap-6 py-9 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href={`/series/${set.serie.id}`} className="text-sm font-semibold opacity-85 hover:underline">
              {set.serie.name}
            </Link>
            <h1 className="mt-2 text-4xl sm:text-5xl">{set.name}</h1>
            <p className="mt-3 opacity-90">
              {cards.length} cartes{set.releaseDate ? `, sortie le ${dateFr(set.releaseDate)}` : ""}
            </p>
          </div>
          {logo && (
            <div className="flex h-24 w-full max-w-64 shrink-0 items-center justify-center rounded-xl bg-shell-hi p-4 shadow-[0_1px_3px_#0005_inset]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} alt="" className="max-h-full max-w-full object-contain" />
            </div>
          )}
        </div>
      </header>

      <div className="wrap mt-8">
        {best && (
          <p className="mb-6 max-w-[70ch] text-ink-soft">
            Un exemplaire de chaque carte cotée revient à <strong className="text-ink">{money(total)}</strong>. La plus chère :{" "}
            <Link href={`/cartes/${best.id}`} className="font-semibold text-ink underline">
              {best.name}
            </Link>{" "}
            à {money(best.std!.p)}.
          </p>
        )}
        <SetBrowser cards={cards} />
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div>
      <div className="skeleton h-44 !rounded-none" />
      <div className="wrap mt-10 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="skeleton aspect-[63/88]" />
        ))}
      </div>
    </div>
  );
}

export default function SetPage({ params }: PageProps<"/sets/[id]">) {
  return (
    <Suspense fallback={<Loading />}>
      <SetView params={params} />
    </Suspense>
  );
}

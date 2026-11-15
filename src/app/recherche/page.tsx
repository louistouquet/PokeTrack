import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CardTile } from "@/components/card-tile";
import { SearchForm } from "@/components/site-header";
import { search } from "@/lib/data";

export const metadata: Metadata = { title: "Recherche" };

async function Results({ searchParams }: Pick<PageProps<"/recherche">, "searchParams">) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw)?.trim() ?? "";
  if (q.length < 2) {
    return (
      <>
        <h1 className="text-4xl sm:text-5xl">Chercher une carte</h1>
        <p className="mt-3 text-ink-soft">Tapez au moins deux lettres du nom français de la carte.</p>
        <SearchForm className="mt-6 max-w-md" autoFocus />
      </>
    );
  }
  const cards = await search(q);
  return (
    <>
      <h1 className="text-4xl sm:text-5xl">« {q} »</h1>
      <p className="mt-3 text-ink-soft" aria-live="polite">
        {cards.length === 0 ? "Aucune carte trouvée." : `${cards.length}${cards.length >= 100 ? " premières" : ""} carte${cards.length > 1 ? "s" : ""}. Ouvrez une carte pour voir son prix.`}
      </p>
      {cards.length === 0 ? (
        <div className="panel mt-8 max-w-xl px-6 py-8">
          <p className="font-semibold">Quelques pistes</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-soft">
            <li>Utilisez le nom français : « Dracaufeu » plutôt que « Charizard ».</li>
            <li>Un seul mot suffit : « Évoli », « Mew », « Pikachu ».</li>
            <li>
              Ou partez d&apos;une{" "}
              <Link href="/#familles" className="font-semibold text-ink underline">
                famille
              </Link>
              .
            </li>
          </ul>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {cards.map((c, i) => (
            <CardTile key={c.id} card={c} caption={`N° ${c.localId}`} index={i} />
          ))}
        </div>
      )}
    </>
  );
}

export default function SearchPage({ searchParams }: PageProps<"/recherche">) {
  return (
    <div className="wrap pt-10">
      <Suspense fallback={<div className="skeleton h-14 max-w-md" />}>
        <Results searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

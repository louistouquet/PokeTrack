import type { Metadata } from "next";
import { CollectionView } from "@/components/collection-view";

export const metadata: Metadata = {
  title: "Ma collection",
  description: "Rangez vos cartes Pokémon dans un classeur, gradées ou non, et suivez la valeur de votre collection jour après jour.",
};

export default function CollectionPage() {
  return (
    <div className="wrap pt-10">
      <h1 className="mb-7 text-4xl sm:text-5xl">Ma collection</h1>
      <CollectionView />
    </div>
  );
}

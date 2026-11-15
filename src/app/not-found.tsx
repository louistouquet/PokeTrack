import Link from "next/link";
import { SearchForm } from "@/components/site-header";

export default function NotFound() {
  return (
    <div className="wrap max-w-[40rem] pt-14">
      <div className="lcd px-6 py-8">
        <p className="pixel text-6xl leading-none">404</p>
        <p className="mt-2 text-lg font-semibold">Cette page n&apos;existe pas, ou plus.</p>
      </div>
      <p className="mt-7 text-ink-soft">La carte ou l&apos;extension a peut-être changé d&apos;identifiant. Cherchez-la par son nom, ou repartez des familles.</p>
      <SearchForm className="mt-4 max-w-md" />
      <Link href="/#familles" className="btn mt-5">
        Voir les familles
      </Link>
    </div>
  );
}

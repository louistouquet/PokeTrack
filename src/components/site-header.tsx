import Link from "next/link";
import { Icon, type IconName } from "./icon";
import { NavLink } from "./nav-link";

const NAV: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Familles", icon: "layers" },
  { href: "/collection", label: "Ma collection", icon: "binder" },
  { href: "/gradation", label: "Gradation", icon: "slab" },
  { href: "/methode", label: "Méthode", icon: "info" },
];

export function Wordmark() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="PokéTrack, accueil">
      {/* Les deux filets de la façade Game Boy : framboise et indigo. */}
      <span aria-hidden className="flex w-6 flex-col gap-[3px]">
        <i className="block h-[3px] rounded-full bg-[#d8478c]" />
        <i className="block h-[3px] rounded-full bg-[#8f8cf0]" />
      </span>
      <span className="text-[1.35rem] font-bold italic leading-none tracking-tight">
        Poké<span className="text-lcd">Track</span>
      </span>
    </Link>
  );
}

export function SearchForm({ className = "", autoFocus = false, defaultValue = "" }: { className?: string; autoFocus?: boolean; defaultValue?: string }) {
  return (
    <form action="/recherche" role="search" className={`relative ${className}`}>
      <label htmlFor="q" className="sr-only">
        Chercher une carte
      </label>
      <Icon name="search" size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
      <input
        id="q"
        name="q"
        type="search"
        required
        minLength={2}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        placeholder="Dracaufeu, Pikachu, Mew…"
        className="field pl-10"
        autoComplete="off"
      />
    </form>
  );
}

export function SiteHeader() {
  return (
    <>
      <header className="sticky top-0 z-40 bg-bezel text-bezel-ink shadow-[0_2px_0_#2c2e44,0_10px_20px_-14px_#23215a]">
        <div className="wrap flex h-16 items-center gap-6">
          <Wordmark />
          <nav aria-label="Navigation principale" className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <NavLink key={item.href} href={item.href} className="rounded-full px-3.5 py-2 text-[0.95rem] font-semibold text-bezel-ink/75 transition-colors duration-150 hover:text-white aria-[current=page]:bg-white/12 aria-[current=page]:text-white">
                {item.label}
              </NavLink>
            ))}
          </nav>
          <SearchForm className="ml-auto w-full max-w-72" />
        </div>
      </header>
      {/* Sur téléphone, la navigation passe en bas, sous le pouce. */}
      <nav aria-label="Navigation principale" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 bg-bezel pb-[env(safe-area-inset-bottom)] text-bezel-ink shadow-[0_-2px_0_#2c2e44] md:hidden">
        {NAV.map((item) => (
          <NavLink key={item.href} href={item.href} className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-[0.7rem] font-semibold text-bezel-ink/70 aria-[current=page]:text-lcd">
            <Icon name={item.icon} size={22} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-bezel pb-24 pt-10 text-bezel-ink/80 md:pb-10">
      <div className="wrap grid gap-6 text-sm md:grid-cols-[1fr_auto]">
        <p className="max-w-[62ch]">
          PokéTrack est un projet libre et gratuit, sans lien avec Nintendo, Game Freak, Creatures ou The Pokémon Company. Les prix sont des
          estimations calculées à partir de données publiques : ils ne constituent pas un conseil en investissement.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 font-semibold text-bezel-ink">
          <li>
            <Link href="/methode" className="hover:underline">
              Comment les prix sont calculés
            </Link>
          </li>
          <li>
            <a href="https://github.com/louistouquet/PokeTrack" className="hover:underline">
              Code source
            </a>
          </li>
          <li>
            <a href="https://tcgdex.dev" className="hover:underline">
              Données TCGdex
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// « Familles » reste actif sur tout le catalogue (familles, extensions, cartes).
const CATALOG = /^\/(series|sets|cartes|recherche)?(\/|$)/;

export function NavLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = href === "/" ? CATALOG.test(pathname) : pathname.startsWith(href);
  return (
    <Link href={href} className={className} aria-current={active ? "page" : undefined}>
      {children}
    </Link>
  );
}

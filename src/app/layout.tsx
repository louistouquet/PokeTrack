import type { Metadata, Viewport } from "next";
import { Cabin, Jersey_20 } from "next/font/google";
import { Suspense } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import "./globals.css";

// Cabin descend du Gill Sans, la lettre des cartes de 1999 et du logo Game Boy.
const text = Cabin({ variable: "--font-text", subsets: ["latin"], style: ["normal", "italic"] });
// Jersey 20 : une lettre en pixels dont les chiffres restent sans ambiguïté (5 ≠ S).
const display = Jersey_20({ variable: "--font-display", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: { default: "PokéTrack — la cote des cartes Pokémon françaises", template: "%s — PokéTrack" },
  description:
    "Le prix juste de chaque carte Pokémon française, non gradée ou gradée, avec indice de liquidité. Suivez la valeur de votre collection, gratuitement.",
};
export const viewport: Viewport = { themeColor: "#474a66" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${text.variable} ${display.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold">
          Aller au contenu
        </a>
        <Suspense>
          <SiteHeader />
        </Suspense>
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

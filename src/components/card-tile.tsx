import Link from "next/link";
import { ViewTransition } from "react";
import type { Mini } from "@/lib/snapshot";
import { cardImage } from "@/lib/tcgdex";
import { money, percent } from "@/lib/ui";

export function CardArt({ image, name, quality = "low", eager = false, priority = eager }: { image?: string; name: string; quality?: "low" | "high"; eager?: boolean; priority?: boolean }) {
  const src = cardImage(image, quality);
  return (
    <div className="card-art relative">
      {/* Le nom reste dessous : il apparaît si l'image manque ou ne se charge pas. */}
      <span className="absolute inset-0 flex items-center justify-center p-3 text-center text-sm font-semibold text-ink-soft">{name}</span>
      {src && (
        // Images servies telles quelles par TCGdex (déjà en WebP, à la bonne taille).
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" width={245} height={342} loading={eager ? "eager" : "lazy"} fetchPriority={priority ? "auto" : "low"} decoding="async" className="relative" />
      )}
    </div>
  );
}

export function Trend({ value, className = "" }: { value: number | null | undefined; className?: string }) {
  if (value == null || Math.abs(value) < 0.005) return null;
  return (
    <span className={`inline-flex items-center gap-0.5 font-semibold ${value > 0 ? "text-up" : "text-down"} ${className}`}>
      <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden className={value > 0 ? "" : "rotate-180"}>
        <path d="M5 1.5 9.5 8.5h-9z" fill="currentColor" />
      </svg>
      {percent(value)}
    </span>
  );
}

export interface TileCard {
  id: string;
  localId: string;
  name: string;
  image?: string;
  rarity?: string;
}

export function CardTile({ card, price, caption, index = 0, eager = false }: { card: TileCard; price?: Mini; caption?: string; index?: number; eager?: boolean }) {
  return (
    <Link href={`/cartes/${card.id}`} className="tile rise" style={{ "--i": Math.min(index, 14) } as React.CSSProperties}>
      <ViewTransition name={`card-${card.id}`} share="card-morph" default="none">
        {/* eager : toute la grille se charge d'emblée, les premières rangées en priorité. */}
        <CardArt image={card.image} name={card.name} eager={eager || index < 6} priority={index < 12} />
      </ViewTransition>
      <div className="mt-2.5 flex items-baseline justify-between gap-2">
        <span className="truncate font-semibold leading-tight">{card.name}</span>
        <span className="shrink-0 font-bold">{price ? money(price.p) : <span className="font-normal text-ink-soft">—</span>}</span>
      </div>
      <div className="flex items-baseline justify-between gap-2 text-[0.8125rem] text-ink-soft">
        <span className="truncate">{caption ?? `N° ${card.localId}${card.rarity ? ` · ${card.rarity}` : ""}`}</span>
        <Trend value={price?.t} className="shrink-0" />
      </div>
    </Link>
  );
}

import Link from "next/link";
import { CardArt, CardTile, Trend } from "@/components/card-tile";
import { HoloCard } from "@/components/holo-card";
import { Meter } from "@/components/meter";
import { getMarket, getSeries } from "@/lib/data";
import type { MarketCard } from "@/lib/snapshot";
import { assetImage, type Serie } from "@/lib/tcgdex";
import { count, dateFr, familyStyle, isShiny, money } from "@/lib/ui";

/** Une famille = une cartouche de jeu, à la couleur de sa génération. */
function Cartridge({ serie, index }: { serie: Serie; index: number }) {
  const logo = assetImage(serie.logo);
  const year = serie.releaseDate?.slice(0, 4);
  const cards = serie.sets.reduce((n, s) => n + s.cardCount.total, 0);
  return (
    <Link href={`/series/${serie.id}`} className="cartridge rise" style={{ ...familyStyle(serie.id), "--i": Math.min(index, 12) } as React.CSSProperties}>
      <span className="cartridge-grip" aria-hidden />
      <span className="cartridge-label">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt="" loading="lazy" className="max-h-full max-w-full object-contain" />
        ) : (
          <span className="pixel text-xl leading-none text-ink">{serie.name}</span>
        )}
      </span>
      <span className="mt-3 block text-[1.05rem] font-bold leading-tight">{serie.name}</span>
      <span className="block text-sm opacity-85">
        {serie.sets.length} extension{serie.sets.length > 1 ? "s" : ""} · {count(cards)} cartes{year ? ` · ${year}` : ""}
      </span>
    </Link>
  );
}

function Featured({ card, updated }: { card: MarketCard; updated: string }) {
  const price = card.std!;
  return (
    <div className="grid grid-cols-[minmax(0,11rem)_minmax(0,1fr)] items-center gap-5 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:gap-7">
      <Link href={`/cartes/${card.id}`} aria-label={`Voir ${card.name}`}>
        <HoloCard shiny={isShiny(card.rarity)}>
          <CardArt image={card.image} name={card.name} quality="high" eager />
        </HoloCard>
      </Link>
      <div>
        <div className="lcd px-4 py-3.5">
          <p className="text-sm font-semibold text-lcd-dim">Prix juste, non gradée</p>
          <p className="pixel text-[2.6rem] leading-none sm:text-5xl">{money(price.p)}</p>
          <p className="mt-1.5 flex items-center gap-2 text-sm">
            <Trend value={price.t} className="!text-lcd-ink" />
            <span className="text-lcd-dim">7 j contre 30 j</span>
          </p>
        </div>
        <div className="mt-5 space-y-3.5 px-1.5">
          <Meter label="Liquidité" score={price.l} />
          <Meter label="Confiance" score={price.c} />
        </div>
        <p className="mt-4 px-1.5 text-sm text-ink-soft">
          <Link href={`/cartes/${card.id}`} className="font-semibold text-ink underline">
            {card.name}
          </Link>
          , {card.setName}. Relevé du {dateFr(updated, { day: "numeric", month: "long" })}.
        </p>
      </div>
    </div>
  );
}

function Movers({ title, cards }: { title: string; cards: MarketCard[] }) {
  return (
    <div>
      <h3 className="mb-3 text-xl">{title}</h3>
      <ul className="panel divide-y divide-line/60">
        {cards.map((c) => (
          <li key={c.id}>
            <Link href={`/cartes/${c.id}`} className="flex items-center gap-3 px-4 py-2.5 transition-colors duration-150 hover:bg-white">
              <span className="w-9 shrink-0">
                <CardArt image={c.image} name={c.name} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold">{c.name}</span>
                <span className="block truncate text-sm text-ink-soft">{c.setName}</span>
              </span>
              <span className="text-right">
                <span className="block font-bold">{money(c.std!.p)}</span>
                <Trend value={c.std!.t} className="text-sm" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function Home() {
  const [series, market] = await Promise.all([getSeries(), getMarket()]);
  // En vedette : la carte fiable la plus cotée qui a une illustration.
  const featured = market?.top.find((c) => c.image && c.std!.l >= 60);

  return (
    <>
      <section className="wrap grid items-center gap-10 pb-14 pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,31rem)] lg:gap-14 lg:pb-20 lg:pt-16">
        <div>
          <h1 className="text-[2.6rem] sm:text-6xl">La cote des cartes Pokémon françaises.</h1>
          <p className="mt-5 max-w-[52ch] text-lg text-ink-soft">
            Un prix juste pour chaque carte, non gradée ou gradée, calculé sur les ventes du marché européen, avec sa liquidité. Rangez votre
            collection et suivez sa valeur. C&apos;est gratuit et le code est ouvert.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="#familles" className="btn">
              Parcourir les familles
            </Link>
            <Link href="/collection" className="btn btn-quiet">
              Ouvrir mon classeur
            </Link>
          </div>
          {market && (
            <p className="mt-7 text-sm text-ink-soft">
              {count(market.priced)} cartes cotées sur {count(market.cards)} suivies, relevées chaque jour.
            </p>
          )}
        </div>
        {featured && market && <Featured card={featured} updated={market.updated} />}
      </section>

      <section id="familles" className="wrap scroll-mt-24">
        <h2 className="text-3xl sm:text-4xl">Les familles</h2>
        <p className="mt-2 max-w-[60ch] text-ink-soft">De Méga-Évolution au Set de Base : choisissez une génération, puis une extension.</p>
        <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
          {series.map((s, i) => (
            <Cartridge key={s.id} serie={s} index={i} />
          ))}
        </div>
      </section>

      {market && (
        <>
          <section className="wrap mt-20">
            <h2 className="text-3xl sm:text-4xl">Les plus cotées</h2>
            <p className="mt-2 max-w-[60ch] text-ink-soft">Les cartes françaises les plus chères parmi celles dont le prix est fiable.</p>
            <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-4 lg:grid-cols-6">
              {market.top.slice(0, 12).map((c, i) => (
                <CardTile key={c.id} card={c} price={c.std} caption={c.setName} index={i} />
              ))}
            </div>
          </section>

          <section className="wrap mt-20">
            <h2 className="text-3xl sm:text-4xl">Ça bouge</h2>
            <p className="mt-2 max-w-[60ch] text-ink-soft">
              Moyenne des ventes sur 7 jours comparée à 30 jours, pour les cartes de plus de 10 € qui s&apos;échangent régulièrement.
            </p>
            <div className="mt-7 grid gap-8 md:grid-cols-2">
              <Movers title="En hausse" cards={market.up.slice(0, 6)} />
              <Movers title="En baisse" cards={market.down.slice(0, 6)} />
            </div>
          </section>
        </>
      )}
    </>
  );
}

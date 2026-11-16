import type { Metadata } from "next";
import Link from "next/link";
import { COMPANIES } from "@/lib/pricing/graded";
import { SERVICES, serviceCost } from "@/lib/pricing/grading-roi";
import { money } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Comment les prix sont calculés",
  description: "Sources, formule du prix juste, indice de liquidité, estimation des prix gradés et limites connues de PokéTrack.",
};

function Part({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-14 scroll-mt-24">
      <h2 className="text-3xl">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export default function MethodPage() {
  return (
    <article className="wrap max-w-[46rem] pt-10 text-[1.0625rem] leading-relaxed">
      <h1 className="text-4xl sm:text-5xl">Comment les prix sont calculés</h1>
      <p className="mt-4 text-lg text-ink-soft">
        Un prix affiché sans explication ne vaut pas grand-chose. Voici ce que PokéTrack mesure, ce qu&apos;il estime, et ce qu&apos;il ne sait pas encore faire.
      </p>

      <nav aria-label="Sommaire" className="panel mt-8 px-5 py-4">
        <ul className="grid gap-1.5 font-semibold sm:grid-cols-2">
          {[
            ["sources", "Les sources"],
            ["prix", "Le prix juste"],
            ["indices", "Liquidité, confiance, volatilité"],
            ["grade", "Les prix gradés"],
            ["gradation", "Le calcul de gradation"],
            ["limites", "Les limites connues"],
          ].map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="underline">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Part id="sources" title="Les sources">
        <p>
          Le catalogue français (familles, extensions, cartes, raretés, illustrations) vient de{" "}
          <a href="https://tcgdex.dev" className="font-semibold underline">
            TCGdex
          </a>
          , une base ouverte tenue par des bénévoles. Elle fournit aussi, pour chaque carte, des indicateurs de prix :
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Cardmarket</strong>, le marché européen : tendance, moyennes des ventes sur 1, 7 et 30 jours, et annonce la moins chère.
          </li>
          <li>
            <strong>CardTrader</strong> : les annonces en cours de cartes <strong>françaises</strong>, en très bon état. C&apos;est la seule source qui distingue la langue.
            Le marché y est mince : environ une carte sur cinq a une annonce française, surtout dans les séries récentes.
          </li>
          <li>
            <strong>TCGplayer</strong>, le marché américain, n&apos;est <strong>pas utilisé</strong> : il cote des cartes anglaises vendues aux États-Unis, pas des cartes
            françaises.
          </li>
          <li>
            <strong>eBay France</strong> : annonces en cours, relevées chaque jour pour les cartes les plus chères. Cette source demande des clés d&apos;accès à l&apos;API
            d&apos;eBay ; tant qu&apos;elles ne sont pas configurées, elle n&apos;apparaît pas dans les fiches.
          </li>
        </ul>
        <p>Un relevé complet est fait une fois par jour. Chaque relevé ajoute un point à l&apos;historique : les courbes commencent le jour de la mise en ligne.</p>
      </Part>

      <Part id="prix" title="Le prix juste">
        <p>Le prix juste d&apos;une carte non gradée se calcule en trois temps.</p>
        <ol className="list-decimal space-y-3 pl-6">
          <li>
            <strong>Une estimation par source.</strong> Pour Cardmarket, une moyenne pondérée de la tendance (35 %), des moyennes 7 jours (30 %), 30 jours (25 %) et 1 jour
            (10 %). Un indicateur qui s&apos;écarte de plus de 60 % de la médiane des autres est ramené à cette borne : une vente isolée à un prix aberrant ne déplace pas le
            résultat.
          </li>
          <li>
            <strong>Un poids par source.</strong> Cardmarket, toutes langues, a un poids de 1. Les annonces françaises de CardTrader pèsent selon leur nombre : presque
            rien pour une seule, plus que Cardmarket à partir de trois, les trois quarts du prix à partir de cinq. eBay compte jusqu&apos;à 0,6. Une source
            qui s&apos;écarte de plus du double de la référence voit son poids divisé par quatre, et les données anciennes pèsent moins que les récentes.
          </li>
          <li>
            <strong>La moyenne pondérée</strong> de ces estimations donne le prix juste. La fourchette affichée reflète le désaccord entre indicateurs.
          </li>
        </ol>
        <p>
          Pour les annonces françaises, on prend la médiane des cinq moins chères : c&apos;est le prix auquel la carte française se trouve réellement aujourd&apos;hui. Chaque
          fiche dit si son prix est <strong>français</strong> (au moins trois annonces de cartes françaises) ou <strong>européen, toutes langues</strong>.
        </p>
        <p>Pour eBay, on prend la médiane des annonces après retrait des prix extrêmes, moins 8 % : un prix demandé n&apos;est pas un prix vendu.</p>
      </Part>

      <Part id="indices" title="Liquidité, confiance, volatilité">
        <p>
          <strong>La liquidité</strong> (0 à 100) dit si la carte se vend facilement à son prix. Elle additionne trois signaux : des ventes récentes (moyennes 1, 7 et 30
          jours renseignées), des moyennes stables d&apos;une période à l&apos;autre (un marché mince fait des bonds) et une annonce la moins chère proche du prix juste.
          Quand eBay est connecté, le nombre d&apos;annonces en cours s&apos;y ajoute.
        </p>
        <p>
          <strong>La confiance</strong> (0 à 100) dit si le prix est solide : nombre de sources, accord entre elles, cohérence des indicateurs, fraîcheur des données. Les
          classements de l&apos;accueil ne retiennent que les prix de confiance 60 et plus.
        </p>
        <p>
          <strong>La volatilité</strong> mesure l&apos;écart entre les moyennes récentes. <strong>La tendance</strong> compare la moyenne des ventes sur 7 jours à celle sur 30
          jours.
        </p>
      </Part>

      <Part id="grade" title="Les prix gradés">
        <p>
          Un prix gradé est <strong>observé ou il n&apos;est pas affiché</strong>. Il n&apos;est jamais calculé à partir du prix de la carte non gradée : pas de
          multiplicateur, pas de coefficient par société.
        </p>
        <p>
          Pour une carte, une société et une note données, le prix est la médiane des annonces relevées, après retrait des prix extrêmes. Il faut au moins trois annonces ;
          en dessous, la case reste vide. Sociétés et notes suivies :{" "}
          {COMPANIES.map((c) => `${c.name} (${c.grades.join(", ")})`).join(" ; ")}.
        </p>
        <p>
          <strong>Aujourd&apos;hui, aucune source d&apos;annonces gradées n&apos;est branchée</strong> : les prix gradés sont donc vides sur tout le site, et une carte gradée
          de votre collection n&apos;a pas de valeur affichée. Les sources seront ajoutées une à une, chacune avec l&apos;accord de la place de marché concernée.
        </p>
      </Part>

      <Part id="gradation" title="Le calcul de gradation">
        <p>
          Le{" "}
          <Link href="/gradation" className="font-semibold underline">
            calcul
          </Link>{" "}
          répond à une question : en envoyant cette carte, vais-je en moyenne gagner de l&apos;argent ? Pour chaque société, il pondère le prix observé à chaque note par la
          probabilité de l&apos;obtenir, puis retire la valeur actuelle de la carte et le coût complet du service. Il n&apos;est rendu que si un prix observé existe pour
          chaque note atteignable.
        </p>
        <p>
          Les probabilités dépendent de l&apos;état déclaré et de l&apos;époque ; ce sont des ordres de grandeur, pas des mesures. Les coûts retenus, envoi assuré et TVA à
          l&apos;import compris : {SERVICES.map((s) => `${COMPANIES.find((c) => c.id === s.company)!.name} ${money(serviceCost(s))}`).join(", ")}. Ce sont des tarifs
          indicatifs relevés en novembre 2026.
        </p>
      </Part>

      <Part id="limites" title="Les limites connues">
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Le prix n&apos;est propre à la version française que pour une partie des cartes.</strong> Cardmarket publie un prix par carte, toutes langues
            confondues, et les annonces françaises de CardTrader ne couvrent qu&apos;une carte sur cinq environ. Quand elles manquent, la fiche l&apos;indique : le prix
            affiché est alors celui du marché européen.
          </li>
          <li>Le prix non gradé suppose une carte en très bon état. Une carte abîmée vaut moins, parfois beaucoup moins.</li>
          <li>La quantité en vente n&apos;est connue que pour eBay. Cardmarket ne la publie pas dans ses données ouvertes.</li>
          <li>
            Il arrive que la source rattache plusieurs cartes d&apos;une extension au même produit, surtout pour les promos. PokéTrack le détecte, plafonne la confiance et
            l&apos;indique sur la fiche.
          </li>
          <li>
            Même traitement quand le prix européen d&apos;une carte d&apos;au moins 5 € est plus de dix fois au-dessus ou au-dessous de son prix aux États-Unis : c&apos;est le signe d&apos;une
            carte rattachée au mauvais produit, d&apos;un côté ou de l&apos;autre. Le prix américain sert seulement d&apos;alarme ; il n&apos;entre jamais dans le calcul.
          </li>
          <li>Éditions 1, tampons et erreurs d&apos;impression ne sont pas distingués de la version courante.</li>
          <li>Aucun prix gradé n&apos;est affiché tant qu&apos;aucune source d&apos;annonces gradées n&apos;est branchée.</li>
        </ul>
        <p>
          Une erreur, une idée ?{" "}
          <a href="https://github.com/louistouquet/PokeTrack/issues" className="font-semibold underline">
            Ouvrez un ticket sur GitHub
          </a>
          .
        </p>
      </Part>
    </article>
  );
}

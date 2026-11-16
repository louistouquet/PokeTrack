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
            <strong>Un poids par source.</strong> Cardmarket sert de référence (poids 1), eBay compte jusqu&apos;à 0,6 selon le nombre d&apos;annonces. Une source
            qui s&apos;écarte de plus du double de la référence voit son poids divisé par quatre, et les données anciennes pèsent moins que les récentes.
          </li>
          <li>
            <strong>La moyenne pondérée</strong> de ces estimations donne le prix juste. La fourchette affichée reflète le désaccord entre indicateurs.
          </li>
        </ol>
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
          Les ventes de cartes gradées ne sont pas publiées dans une base ouverte. Par défaut, le prix gradé est donc <strong>un modèle</strong>, pas une mesure : un multiple
          du prix non gradé, qui dépend de l&apos;époque de la carte (une note 10 est bien plus rare sur une carte de 1999 que sur une carte de 2024) et de la société.
        </p>
        <div className="panel overflow-x-auto">
          <table className="w-full min-w-[26rem] text-left text-base">
            <thead className="text-sm text-ink-soft">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Société</th>
                <th className="px-4 py-2.5 font-semibold">Notes suivies</th>
                <th className="px-4 py-2.5 text-right font-semibold">Note maximale, par rapport à PSA 10</th>
              </tr>
            </thead>
            <tbody>
              {COMPANIES.map((c) => (
                <tr key={c.id} className="border-t border-line/60">
                  <td className="px-4 py-2.5 font-semibold">{c.name}</td>
                  <td className="px-4 py-2.5">{c.grades.map((g) => g.grade).join(" · ")}</td>
                  <td className="px-4 py-2.5 text-right">× {c.grades[0].factor.toLocaleString("fr-FR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Pour une carte récente, un PSA 10 est estimé à 2,1 fois le prix non gradé ; pour une carte vintage, à 12 fois. Une prime fixe s&apos;ajoute pour les cartes bon
          marché, où le boîtier vaut plus que la carte.
        </p>
        <p>
          Quand des annonces eBay existent pour une carte et une note données, elles remplacent progressivement le modèle : avec 4 annonces, le prix est à mi-chemin ; à
          partir de 8, il est indiqué comme observé. Ces coefficients sont des ordres de grandeur. Ils sont{" "}
          <a href="https://github.com/louistouquet/PokeTrack/blob/main/src/lib/pricing/graded.ts" className="font-semibold underline">
            dans le code
          </a>
          , ouverts à la critique et aux corrections.
        </p>
      </Part>

      <Part id="gradation" title="Le calcul de gradation">
        <p>
          Le{" "}
          <Link href="/gradation" className="font-semibold underline">
            calculateur
          </Link>{" "}
          répond à une question : en envoyant cette carte, vais-je en moyenne gagner de l&apos;argent ? Pour chaque société, il pondère la valeur à chaque note par la
          probabilité de l&apos;obtenir, puis retire la valeur actuelle de la carte et le coût complet du service.
        </p>
        <p>
          Les probabilités dépendent de l&apos;état déclaré et de l&apos;époque : une carte de 1999 en très bon état a une chance sur cent de décrocher la note maximale,
          contre huit pour une carte récente. Les coûts retenus, envoi assuré et TVA à l&apos;import compris :{" "}
          {SERVICES.map((s) => `${COMPANIES.find((c) => c.id === s.company)!.name} ${money(serviceCost(s))}`).join(", ")}. Ce sont des tarifs indicatifs relevés en novembre
          2026, que le calculateur vous laisse corriger.
        </p>
      </Part>

      <Part id="limites" title="Les limites connues">
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Le prix n&apos;est pas encore propre à la version française.</strong> Cardmarket publie un prix par carte, toutes langues confondues. Pour les cartes où
            la version française se négocie différemment des autres, l&apos;écart n&apos;est pas visible ici. Une source de prix par langue est en cours d&apos;étude.
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
          <li>Les prix gradés sont des estimations tant que des ventes observées ne les confirment pas.</li>
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

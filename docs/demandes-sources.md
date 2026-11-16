# Demandes d'accord aux sources de prix

Brouillons rédigés par l'assistant, à envoyer par le fondateur, en son nom. Tant qu'une réponse écrite n'est pas arrivée, l'usage correspondant reste limité à ce que les conditions publiques permettent.

Les deux sont en anglais : ce sont les langues de travail des équipes concernées. Remplacer `[adresse du site]` et `[votre nom]`.

## 1. CardTrader

Pourquoi : leurs conditions disent « We can provide market APIs upon request… You need to write to us ». Nous lisons déjà leurs annonces françaises avec un jeton personnel ; il faut leur accord pour en publier un prix.

À envoyer depuis la page de contact de CardTrader, ou à l'adresse d'assistance indiquée dans votre compte.

> **Subject: Using the marketplace API for an open-source French price guide**
>
> Hello,
>
> I run a small, free and open-source price guide for French-language Pokémon cards ([adresse du site], code at github.com/louistouquet/PokeTrack). It is a community project with no paid plan.
>
> Your terms say market data is available on request, so I am asking before going further. Here is exactly what I would like to do:
>
> - Once a day, call `GET /marketplace/products?expansion_id=…&language=fr` for each Pokémon expansion (about 200 calls, spread out, well under your rate limits).
> - From the cheapest French, Near Mint, ungraded listings of each card, compute one indicative price, and show it on the card's page next to the number of listings it is based on.
> - Credit CardTrader as the source on every such price, with a link to the card on your marketplace. I would be glad to use an affiliate or partner link if you have one.
>
> I would not republish individual listings, seller names or any personal data, and I would not resell the data.
>
> Could you confirm whether this use is acceptable, and whether you would like the attribution or the link done in a particular way? I am happy to adjust.
>
> Thank you,
> [votre nom]

## 2. eBay

Pourquoi : la licence de l'API interdit, sans accord écrit, d'utiliser le contenu eBay pour « suggest or model prices » et d'en dériver un prix moyen de vente. Vous voulez qu'eBay serve aux prix, notamment gradés : il faut donc cet accord. Sans lui, nous nous limiterons aux annonces en cours affichées avec un lien.

À envoyer une fois le compte développeur validé, par le formulaire d'assistance du programme développeur (« Developer Technical Support » ou « Contact us » dans votre espace développeur).

> **Subject: Permission request — showing indicative prices derived from eBay listings (French Pokémon cards)**
>
> Hello,
>
> I am a registered developer (application: [nom de l'application]). I run a free, open-source price guide for French-language Pokémon cards ([adresse du site]). Every price shown links to its sources, and I would like eBay France to be one of them.
>
> I have read the API License Agreement, in particular the restrictions on using eBay Content to suggest or model prices and on deriving average selling prices. I am therefore asking for written permission before doing anything of the kind.
>
> What I would like to do with the Browse API on EBAY_FR:
>
> 1. On a card's page, show current eBay France listings for that card (title, price, link to the listing on eBay), refreshed within the freshness limits of the agreement. I understand this is already within the standard licence.
> 2. With your permission: compute an indicative price per card, and per grading company and grade for graded cards (PSA, PCA, CGC, BGS, Collect Aura), from the asking prices of those listings, and keep one such figure per day to draw a price history. Each figure would be labelled as derived from eBay France listings and would link to a live eBay search for the card.
>
> I would not store or display seller information, would not use the data to train any model, and the site does not sell anything: every card page sends buyers to eBay. I am also applying to the eBay Partner Network for those links.
>
> Could you tell me whether point 2 can be authorised, and under which conditions?
>
> Thank you,
> [votre nom]

## 3. Cardmarket (plus tard)

Leurs conditions prévoient un accord écrit pour présenter cartes et prix issus de l'API, alors que leur billet de 2024 encourage l'usage des fichiers de prix publics. Nous passons par TCGdex, qui relaie ces fichiers. Une demande de confirmation sera utile avant toute forme de revenu ; elle n'est pas urgente pour un site gratuit.

## 4. PokéCardex (illustrations)

Leurs mentions légales interdisent toute reprise de leurs images sans autorisation, et leurs scans sont leur propre travail. Si vous voulez leurs illustrations françaises, la seule voie est de leur demander. Ils n'y ont pas d'intérêt évident : c'est leur principal avantage. L'autre voie, ouverte, est de faire contribuer les illustrations manquantes à TCGdex par la communauté.

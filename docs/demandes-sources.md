# Demandes d'accord aux sources de prix

Tant qu'une réponse écrite n'est pas arrivée, l'usage correspondant reste limité à ce que les conditions publiques permettent.

## Suivi

| Destinataire | Objet | Voie | État au 16 novembre 2026 |
| --- | --- | --- | --- |
| Cardmarket | Confirmation de l'usage des prix publics, prix par langue, affiliation | Courriel à `contact@cardmarket.com` | Envoyé depuis la boîte du fondateur. Pas de réponse. |
| PokéCardex | Autorisation d'afficher leurs scans français pour les cartes sans illustration | Courriel à `contact@pokecardex.com` | Envoyé depuis la boîte du fondateur. Pas de réponse. |
| CardTrader | Accord pour publier un prix tiré de leurs annonces françaises | Formulaire réservé aux comptes connectés : `https://www.cardtrader.com/en-US/issues/new` | **À soumettre par le fondateur.** Texte ci-dessous. |
| eBay | Accord pour dériver des prix des annonces | Espace développeur, après validation du compte | **À soumettre par le fondateur** quand les clés arrivent. Texte ci-dessous. |
| TCGdex | Charge de notre relevé, contribution d'illustrations | Pas d'adresse publiée trouvée ; passer par leur dépôt GitHub ou leur Discord | À faire. |

Les textes envoyés à Cardmarket et à PokéCardex sont dans la boîte d'envoi du fondateur.

## Brouillons

Les deux sont en anglais. Adresse du site : `https://poke-track-tau.vercel.app`. Signer du nom du fondateur.

## 1. CardTrader

Pourquoi : leurs conditions disent « We can provide market APIs upon request… You need to write to us ». Nous lisons déjà leurs annonces françaises avec un jeton personnel ; il faut leur accord pour en publier un prix.

À envoyer depuis la page de contact de CardTrader, ou à l'adresse d'assistance indiquée dans votre compte.

> **Subject: Using the marketplace API for an open-source French price guide**
>
> Hello,
>
> I run a small, free and open-source price guide for French-language Pokémon cards (https://poke-track-tau.vercel.app, code at github.com/louistouquet/PokeTrack). It is a community project with no paid plan.
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
> Louis Touquet

## 2. eBay

Pourquoi : la licence de l'API interdit, sans accord écrit, d'utiliser le contenu eBay pour « suggest or model prices » et d'en dériver un prix moyen de vente. Vous voulez qu'eBay serve aux prix, notamment gradés : il faut donc cet accord. Sans lui, nous nous limiterons aux annonces en cours affichées avec un lien.

À envoyer une fois le compte développeur validé, par le formulaire d'assistance du programme développeur (« Developer Technical Support » ou « Contact us » dans votre espace développeur).

> **Subject: Permission request — showing indicative prices derived from eBay listings (French Pokémon cards)**
>
> Hello,
>
> I am a registered developer (application: [nom de l'application]). I run a free, open-source price guide for French-language Pokémon cards (https://poke-track-tau.vercel.app). Every price shown links to its sources, and I would like eBay France to be one of them.
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
> Louis Touquet

## 3. Cardmarket

Envoyé le 16 novembre. Le courriel demande trois choses : la confirmation que l'usage actuel (prix tirés de leurs fichiers publics, via TCGdex, avec mention de la source) leur convient, un accès aux prix par langue, et la bonne façon de faire un lien d'affiliation. Leurs conditions prévoient un accord écrit pour présenter cartes et prix issus de l'API, alors que leur billet de 2024 encourage l'usage des fichiers publics.

## 4. PokéCardex

Envoyé le 16 novembre. Leurs mentions légales interdisent toute reprise de leurs images sans autorisation. Le courriel demande l'autorisation d'afficher leurs scans pour les cartes sans illustration, avec mention et lien, et accepte d'avance un refus. Ils n'ont pas d'intérêt évident à dire oui : les scans français sont leur principal avantage. L'autre voie, ouverte, est de faire contribuer les illustrations manquantes à TCGdex par la communauté.

# Inventaire des sources de prix

Phase 1 du chantier « prix fiables » (`docs/chantier-prix-fiables.md`). Recherche faite les 16 et 17 novembre 2026 par sept sous-agents, un par famille, selon `_consignes.md`. Chaque famille a son fichier, avec une fiche par source, les citations des conditions et ce qui n'a pas pu être vérifié.

Question posée à chaque source : peut-on en tirer, de façon permise et gratuite, un prix propre à la carte française, non gradée ou gradée ?

## La réponse en six lignes

1. **Il n'existe aucune source cachée, gratuite et permise, d'un prix français.** Sur environ 170 sources distinctes, deux seulement sont utilisables telles quelles, et nous les avons déjà : les fichiers de prix de Cardmarket et le catalogue TCGdex.
2. **Le prix français existe à deux endroits** : les offres par langue de Cardmarket (c'est là que nos concurrents le relèvent, sans dire comment ; l'API est fermée aux nouvelles demandes) et les annonces de CardTrader, déjà branchées.
3. **Presque tout le reste demande un accord écrit** (84 lignes sur 197) ou est interdit, payant ou inaccessible (88).
4. **Les boutiques ne sont pas une source indépendante** : leurs prix sont le plus souvent calés sur Cardmarket. Elles servent à confirmer, et surtout à observer des cartes gradées françaises en vente.
5. **Prix gradés français : aucune vente réalisée n'est accessible gratuitement et de façon permise.** On trouve des prix demandés (boutiques, CardTrader, eBay en simple affichage) et des populations par note (CCC Grading, Collect Aura, CGC, PSA), toutes sous accord écrit.
6. **L'écart entre le français et le reste n'est publié nulle part par époque.** Il faudra le mesurer sur nos propres cartes à prix français observé.

## Décompte

Verdicts : **A** API ou fichier officiel, usage permis ; **B** lecture de pages permise ; **C** accord écrit nécessaire ; **D** interdit, payant ou inaccessible. « Sans verdict » : hors sujet, non examiné ou simple rappel.

| Famille | Sources | A | B | C | D | Sans verdict | Fichier |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Places de marché | 33 | 0 | 0 | 17 | 13 | 3 | `01-places-de-marche.md` |
| Boutiques françaises | 30 | 0 | 3 | 12 | 6 | 9 | `02-boutiques-francaises.md` |
| Gradation et prix gradés | 28 | 0 | 0 | 10 | 18 | 0 | `03-gradation-registres.md` |
| Cotes et agrégateurs | 38 | 0 | 0 | 12 | 21 | 5 | `04-cotes-agregateurs.md` |
| Enchères | 28 | 0 | 0 | 20 | 8 | 0 | `05-encheres.md` |
| API et données ouvertes | 20 | 2 | 0 | 4 | 13 | 1 | `06-api-donnees-ouvertes.md` |
| Communautés | 20 | 0 | 1 | 9 | 9 | 1 | `07-communautes.md` |
| **Total des lignes** | 197 | 2 | 4 | 84 | 88 | 19 | |

Une même source peut figurer dans plusieurs familles (Cards N Packs, Catawiki, PokéCardex, eBay, par exemple) : le total compte des lignes, pas des sources. En retirant les doublons de nom, il reste environ 170 sources distinctes ; le chiffre est approché, les noms n'étant pas écrits partout de la même façon.

Crédits Firecrawl dépensés : **0**. Tout a été lu avec la recherche web, la lecture de pages, `curl` et un navigateur. Le catalogue de fournisseurs de Firecrawl a été consulté (gratuit), rien n'y a été exécuté.

## Ce qui a été recoupé, et ce qui ne l'a pas été

L'assistant principal a relu à la source un échantillon de citations dans chaque famille : `robots.txt` de Barnebys, Aguttes, Ewbank's, Leboncoin, LorenZone et DracauGames ; conditions de Cardpeer, Collect Aura et CCC Grading ; fermeture de Rakuten France ; arrêt de pokemontcg.io ; fermeture de l'API Cardmarket ; champs du fichier de prix Cardmarket ; page méthode de TCG Crew ; article de folio.fyi. Toutes étaient exactes, sauf deux chiffres mal recopiés de folio.fyi, corrigés.

Trois verdicts B proposés par les sous-agents ont été reclassés en C à la relecture (Cards N Packs dans deux familles, DracauGames).

**Le reste n'a pas été relu ligne à ligne.** Une citation à utiliser dans une demande d'accord ou une décision doit être relue à la source avant. Chaque fichier de famille liste ce que son auteur n'a pas pu lire, notamment :

- les conditions de seize places de marché (pages protégées ou introuvables) ;
- TCG Sense, entièrement derrière un défi Cloudflare : à lire par un humain dans un navigateur ;
- PSA (population et prix fermés sans compte), GemRate, 130point, Card Ladder (Cloudflare) ;
- les volumes et couvertures : aucun n'est mesuré au sens strict, faute d'extraction en masse. Les chiffres sont déclarés par les sites ou estimés, et marqués comme tels.

## Ce que cela change pour le modèle

| Besoin | Ce que l'inventaire donne | Conséquence |
| --- | --- | --- |
| Prix européen de chaque carte | Fichier Cardmarket (A), quotidien, sans champ de langue. TCGdex en relaie déjà tous les champs. | Rien à brancher de plus. Notre propre archive quotidienne est le seul historique gratuit. |
| Prix français observé, non gradé | CardTrader (branché). Cardmarket par langue : demande envoyée le 16 novembre, sans réponse. Cardpeer et CardNexus : places de marché avec filtre de langue, accord à demander. | La réponse de Cardmarket est la plus importante de toutes. Sans elle, le prix français repose sur CardTrader et sur l'estimation. |
| Écart français / européen pour les cartes sans observation | Une seule étude chiffrée (folio.fyi, 288 cartes récentes non gradées : français à 1,40 fois l'anglais en médiane), mais elle compare l'Europe aux États-Unis. Rien par époque. | À mesurer nous-mêmes sur les cartes où l'on a les deux prix. Aucun coefficient extérieur n'est repris. |
| Composition par état | Un fil de forum (Elite Fourum, 2024, une seule carte, non relu par l'assistant principal) : environ 31 % d'annonces françaises en mauvais état contre 14 % en anglais. | Comparer les « premiers prix » entre langues sans tenir compte de l'état fausse le résultat. |
| Fiabilité d'un premier prix | Le même jour, la même carte française est à 1 199 € sur un site et 3 000 € sur un autre, tous deux lisant Cardmarket. | Un premier prix seul ne suffit pas : il faut plusieurs annonces et un plancher. |
| Prix gradés français | Prix demandés : CardTrader (une vingtaine d'annonces), boutiques (MangaCash, Cards N Packs, OozeShopFR), eBay en affichage seul. Ventes réalisées : enchères françaises (Aguttes, Vermot), quelques centaines de lots par an d'après une estimation non mesurée, sous accord. | **Un modèle gradé « très solide » n'est pas faisable aujourd'hui avec les seules données permises.** Il dépend des accords ci-dessous, ou des déclarations de la communauté. |
| Populations par note | CCC Grading et Collect Aura (langue en champ distinct), CGC, API de PSA : toutes sous accord écrit. | À demander en priorité : c'est la variable la plus utile au modèle gradé. |
| Filtre de langue | Base Set 2, Gym Heroes, Gym Challenge, Legendary Collection et Skyridge ne seraient jamais parues en France (TCG Crew). Notre catalogue français n'en contient aucune. | Une offre « française » de ces extensions est une erreur d'étiquetage : à écarter. |
| Communauté comme source | Précédent le plus proche : Open Prices (Open Food Facts), preuve par photo, règle publique contre les valeurs aberrantes. | Voie ouverte, sans dépendre de personne ; elle demande des comptes et de la modération. |

## Demandes d'accord à préparer

Candidats, par ordre d'intérêt. Rien n'est envoyé : le fondateur valide le lot (destinataires, adresses relues à la source, texte) avant tout envoi. Suivi dans `docs/demandes-sources.md`.

| Rang | Destinataire | Ce qu'on demande | Voie |
| --- | --- | --- | --- |
| 1 | Cardmarket | Prix par langue | Déjà envoyé le 16 novembre ; relance à prévoir |
| 2 | CardTrader | Publier un prix tiré des annonces françaises | Formulaire, par le fondateur |
| 3 | eBay | Dériver des prix des annonces, gradées comprises | Espace développeur, par le fondateur |
| 4 | Collect Aura | Populations des cartes françaises par note | Courriel |
| 5 | CCC Grading | Populations des cartes françaises par note | Courriel |
| 6 | PSA (Collectors) | Usage de l'API de population | Courriel |
| 7 | Cards N Packs | Prix demandés des cartes gradées françaises, médianes de ventes | Courriel |
| 8 | MangaCash | Prix demandés des cartes gradées françaises | Courriel |
| 9 | Cardpeer | Annonces par langue | Courriel |
| 10 | Aguttes, Vermot et Associés | Résultats de ventes de cartes | Courriel |
| 11 | UltraJeux, Parkage | Prix à l'unité ; prix de rachat pour Parkage | Courriel |
| 12 | CardNexus, Graded Card Center | À décider après lecture de leurs conditions par un humain | |

## Toutes les sources

Le verdict est celui du fichier de famille, où se trouvent la fiche et les citations.

### Places de marché

| Source | Verdict |
| --- | --- |
| Vinted | C |
| Leboncoin | C |
| Rakuten France | D (fermée le 30 septembre 2026) |
| Catawiki | D (inaccessible) |
| Delcampe | C |
| Voggt | C |
| Whatnot | C |
| Facebook Marketplace et groupes | D |
| Amazon.fr | C |
| Cdiscount | C |
| Fnac marketplace | D (inaccessible) |
| Etsy | C |
| Wallapop | D (inaccessible, recherche interdite) |
| 2ememain / Marktplaats | C |
| Ricardo | D (inaccessible) |
| Kleinanzeigen | C |
| Subito | D (inaccessible) |
| CardNexus | D (inaccessible à mes outils) |
| Cardpeer | C |
| Play-in | C |
| UltraJeux | C |
| Bazaar of Magic | C |
| Ludikbazar | D (hors sujet) |
| Collectr | C |
| Dex | D (hors sujet) |
| Cardlines | D (hors sujet) |
| eBay, ventes réalisées en France | C pour l'API Marketplace Insights, D pour le reste |
| Magic Bazar | non examiné |
| API Marketplace Insights (`item_sales/search`) | C : accord d'eBay à demander, chances faibles pour un projet gratuit |
| Autres API « Buy » | Annonces seulement |
| Flux du Partner Network | Annonces seulement ; programme d'affiliation à rejoindre |
| Terapeak (outil « Product research » de Seller Hub) | D pour tout usage automatique ou public |
| Pages « objets vendus » d'ebay.fr | D |

### Boutiques françaises

| Source | Verdict |
| --- | --- |
| MangaCash | C |
| LorenZone | B |
| Blazing Tail | C |
| Cards N Packs | C (B proposé, reclassé à la relecture) |
| UltraJeux | C |
| Parkage | B |
| DracauGames | C (B proposé, reclassé à la relecture) |
| Cardshunter | C |
| OozeShopFR | B |
| Pokegourou | C |
| Le Dépôt TCG | C |
| Guizette Family | C |
| Hikaru Distribution | C |
| Ludik' | C |
| Pikastore | C |
| Play-in | D |
| Investcollect | D |
| Le Coin des Barons | D |
| Oupi | D |
| Good Games Bern | D |
| Vinticards | D |
| Pokécardshop | Sans objet |
| Pokemoms | Sans objet |
| Cartes-Pokemon.fr | Sans objet |
| Ludifolie | Sans objet |
| Philibert | Sans objet |
| Okkazeo | Sans objet |
| Wellplayed | Sans objet |
| Lotana | Sans objet |
| Samurai Sword Tokyo | Sans objet |

### Gradation et prix gradés

| Source | Verdict |
| --- | --- |
| PSA | C |
| PCA | D |
| Collect Aura | C |
| CGC | C |
| Beckett | D |
| SGC | D |
| TAG | C |
| ACE | D |
| AP Grading | D |
| GRAAD | C |
| MNT | D |
| CCC Grading | C |
| PCC Grading | D |
| Pure Grading | D |
| GemRate | D |
| PriceCharting | D |
| 130point | D |
| Card Ladder | D |
| Alt | D |
| PokeData | D |
| PokemonPriceTracker | C |
| PokeTrace | D |
| getcardbase | C |
| Fanatics Collect | D |
| Goldin | D |
| Courtyard | D |
| Cards N Packs | C (B proposé, reclassé à la relecture) |
| Graded Card Center | C |

### Cotes et agrégateurs

| Source | Verdict |
| --- | --- |
| PokeData (pokedata.io) | C (doute), sans intérêt |
| pkmncards.com | D (sans objet) |
| PokePrices.io (pokeprices.io) | D (sans objet) |
| CollX (collx.app) | D |
| TCGCollector (tcgcollector.com) | D (inaccessible) |
| Card Ladder (cardladder.com) | D (inaccessible) |
| Mavin (mavin.io) | D |
| Cardboard (cardboard.app), Ludex (ludex.ai) | D (inaccessible) |
| Rare Candy (rarecandy.com) | D (sans objet) |
| Shiny | Hors sujet |
| MyPokeCard (mypokecard.com) | Hors sujet |
| Poképédia (pokepedia.fr) | D (pas de cote) |
| Pokébip (pokebip.com) | D (pas de cote) |
| Pokécote / Poké-cote (pokecote.com) | D (inaccessible) |
| Pokéscan (pokescan.fr) | D (inaccessible) |
| Cardex (cardex.fr) | Hors sujet |
| Cardmarket « tendance de prix » (rappel) | Rappel |
| Cotes papier, magazines | Aucune trouvée |
| PokéCardex | C |
| TCG Sense | C |
| Collectr | D |
| PriceCharting | D |
| Pokellector | D |
| PokemonPriceTracker | D |
| PokeTrace | D |
| PkmCards.fr | C |
| ZebraDex | C |
| ValoTCG / Valo.Data | D |
| TCG Crew | C |
| Pokoya | D |
| Pokedexia / Compleo | C |
| Cardzia | C |
| Booster Breakerz | C |
| Pokémon Trash | C |
| Cards N Packs | C |
| Dex | D |
| Limitless TCG | C |
| Pokécote, Pokéscan | D |

### Enchères

| Source | Verdict |
| --- | --- |
| Aguttes | C |
| Vermot et Associés | C |
| Drouot (plateforme) | C |
| Gazette Drouot | D |
| Interenchères | D (mur Cloudflare) |
| Auction.fr | D (mur Cloudflare) |
| Millon | D (blocage Cloudflare) |
| Barnebys | C |
| Catawiki | D (Akamai) |
| Invaluable | C |
| LiveAuctioneers | C |
| the-saleroom | C |
| Lot-tissimo | C (conditions non lues) |
| Ewbank's | D (robots.txt) |
| Heritage Auctions | C |
| Goldin | C |
| Fanatics Collect (ex-PWCC) | C |
| Voggt | C (non vérifié) |
| Whatnot | D (mur Cloudflare) |
| Auctionet | C (conditions non lues, volume nul) |
| eBay enchères | D (voir `ROADMAP.md`) |
| Artcurial | C (non vérifié, sans objet) |
| Tessier & Sarrou | C (non vérifié, sans objet) |
| Ader | C (non vérifié, sans objet) |
| Boisgirard-Antonini | C (non vérifié, sans objet) |
| Rossini | C (non vérifié, sans objet) |
| Crédit Municipal de Paris | C (non vérifié, sans objet) |
| Hake's | C (non vérifié, sans objet) |

### API et données ouvertes

| Source | Verdict |
| --- | --- |
| Fichiers de prix Cardmarket | A sous réserve |
| Pokémon TCG API | D |
| Scrydex | D |
| PokemonPriceTracker | D |
| PokeTrace | D |
| JustTCG | D |
| TCG API | D |
| TCGAPIs | D |
| TCGCSV | C |
| PriceCharting API | D |
| PSA Public API | D (prix) |
| API Cardmarket v2 | C |
| eBay (rappel) | C |
| pokemon-tcg-data | D |
| TCGdex cards-database | A (déjà branché) |
| TCG Price History | D |
| Jeux Kaggle | D |
| CardNexus | C |
| GoupixDex, CMScrape, Gather | Sans objet (pas une source) |
| GemRate | D |

### Communautés

| Source | Verdict |
| --- | --- |
| Pokécardex (site, forum, ventes entre membres) | D |
| Pokébip (forums) | D (forum exclu par robots.txt) |
| Pokémon Trash (actualités, « Club » avec section cartes) | C |
| Poképédia | B (contenu CC, hors prix) |
| Pokékalos | C |
| Pokémon Millennium | D (injoignable) |
| Margxt | Non vérifié (aucune trace trouvée) |
| Reddit (r/pokemonfrance, r/PokemonTCG, r/pkmntcgcollections, r/pokemoncardcollectors) | C |
| Discord (serveurs francophones) | D |
| Facebook (groupes d'achat-vente) | D |
| Dealabs (groupes et discussions Pokémon) | D (page protégée) |
| jeuxvideo.com (forums) | D (page protégée) |
| YouTube (chaînes françaises) | D |
| Twitch (chaînes françaises) | D |
| Journal du Geek (articles de cote) | C |
| Cards N Packs (blog) | C |
| Poke-Geek (blog) | C |
| Pokévendre Pro (blog) | C |
| folio.fyi (blog d'une application de prix) | C |
| Elite Fourum | C |

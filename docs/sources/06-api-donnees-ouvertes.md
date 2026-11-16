# Famille 6 : API et jeux de données ouverts

Inventaire du 16 novembre 2026, selon `_consignes.md`. Question posée à chaque source : peut-on en tirer, de façon permise et gratuite, un prix propre à la carte **française**, non gradée ou gradée ?

Identifiants des cartes d'essai utilisés : Dracaufeu `base1-4` (Cardmarket `idProduct` 273699), Mew ex `sv03.5-205` / `sv3pt5-205` (Cardmarket 720951), Noctali VMAX `swsh7-215` (Cardmarket 574273). Les identifiants Cardmarket viennent de TCGdex (`pricing.cardmarket.idProduct`).

## Récapitulatif

(Tableau complété en fin de rédaction, voir plus bas.)

## Fiches

### 1. Fichiers publics de prix de Cardmarket (précisions)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | `https://downloads.s3.cardmarket.com/productCatalog/priceGuide/price_guide_6.json` (prix) et `https://downloads.s3.cardmarket.com/productCatalog/productList/products_singles_6.json` (catalogue des cartes à l'unité). `6` est l'identifiant du jeu Pokémon. Allemagne (Sammelkartenmarkt GmbH und Co. KG). Fichier JSON officiel. |
| Langue de la carte distinguée ? | **Non.** Clés de chaque ligne, lues le 16 novembre 2026 : `avg, avg-holo, avg1, avg1-holo, avg30, avg30-holo, avg7, avg7-holo, idCategory, idProduct, low, low-holo, trend, trend-holo`. Aucun champ de langue, d'état ou d'édition. Le catalogue donne le nom anglais (`"Charizard [Energy Burn \| Fire Spin]"`), l'extension (`idExpansion`), `idMetacard` et `dateAdded`. |
| Non gradé, gradé | Non gradé seulement. Les variantes « holo » (`*-holo`) sont la version brillante/inverse du même produit. |
| Nature du prix | Ventes réalisées (`avg`, `avg1`, `avg7`, `avg30` : moyennes des ventes ; `trend`) et prix demandé (`low` : annonce la moins chère). |
| Profondeur | Mesuré : 80 854 lignes de prix, dont 75 738 en catégorie 51 « Pokémon Single » ; 75 742 produits dans le catalogue des cartes à l'unité. Toutes langues confondues, aucun moyen de compter les cartes françaises. |
| Historique | Aucun : un instantané par jour (`createdAt` : `2026-11-16T02:48:57+0100` pour les prix, `2026-11-16T13:56:57+0100` pour le catalogue). L'historique doit être constitué par nous en archivant chaque jour. |
| Accès | Fichier public, sans clé ni connexion, téléchargé avec `curl` (15,9 Mo pour les prix, 13,9 Mo pour le catalogue). La page qui présente ces fichiers (`https://www.cardmarket.com/en/Pokemon/Data/Price-Guide`) renvoie 403 à l'outil de lecture : non lue. |
| Conditions | Billet de Cardmarket (https://news.cardmarket.com/en/FoW/adding-non-singles-and-accessories-to-the-price-guide) : « we made our price guide and product catalog available to all users on the website ». Aucune licence ni restriction propre aux fichiers dans ce billet. Conditions générales, article 9, déjà citées dans `CADRAGE.md` : « The presentation of the trading cards and their respective prices require our prior written agreement » (clause sur l'API). `robots.txt` de `www.cardmarket.com` : `User-agent: *` / `Content-Signal: search=yes,ai-train=no,use=reference` / `Allow: /`. `downloads.s3.cardmarket.com/robots.txt` : 403 (pas de fichier lisible). |
| Contact | Demande déjà envoyée le 16 novembre (voir `docs/demandes-sources.md`). |
| Verdict | **A sous réserve** (fichier officiel public, déjà utilisé via TCGdex ; la confirmation écrite demandée le 16 novembre reste attendue). Ne donne **pas** de prix français. |
| Essai | Lu le 16 novembre 2026 à 23 h UTC, fichier du 16 novembre 02 h 48. Dracaufeu 273699 : `avg 453.87, low 90, trend 327.41, avg1 239.95, avg7 406.45, avg30 415.52, trend-holo 123.63, avg1-holo 207.4, avg7-holo 129.55, avg30-holo 202.71`. Mew ex 720951 : `avg 18.42, low 13, trend 24, avg1 14.96, avg7 24.61, avg30 19.53`. Noctali VMAX 574273 : `avg 1944, low 250, trend 1872.01, avg1 1775, avg7 1945.63, avg30 1790.22`. Prix en euros, toutes langues. |

**Ce que TCGdex relaie déjà.** Comparaison faite sur Dracaufeu : `https://api.tcgdex.net/v2/fr/cards/base1-4` renvoie dans `pricing.cardmarket` exactement les mêmes quatorze champs et les mêmes valeurs (`avg 453.87 … avg30-holo 202.71`, `updated 2026-11-16T22:16:19Z`). Les fichiers de Cardmarket n'apportent donc **aucun champ** que TCGdex ne relaie pas. Leur seul intérêt propre : ne pas dépendre de TCGdex (instable par moments) et récupérer en une requête tout le jeu, y compris les produits que TCGdex n'apparie pas.

### 2. Pokémon TCG API (pokemontcg.io)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | `https://api.pokemontcg.io/v2/cards/{id}` ; docs `https://docs.pokemontcg.io/`. États-Unis (équipe devenue Scrydex). API JSON. |
| Langue de la carte distinguée ? | **Non.** Catalogue anglais uniquement (noms anglais : « Charizard », « Umbreon VMAX »). Aucun champ de langue. |
| Non gradé, gradé | Non gradé seulement. |
| Nature du prix | Relais de TCGplayer (`low, mid, high, market, directLow` par finition) et de Cardmarket (`averageSellPrice, lowPrice, trendPrice, germanProLow, suggestedPrice, reverseHoloSell, reverseHoloLow, reverseHoloTrend, lowPriceExPlus, avg1, avg7, avg30, reverseHoloAvg1/7/30`). `lowPriceExPlus` (prix demandé le plus bas en état Excellent ou mieux) est le seul champ Cardmarket absent des fichiers publics et de TCGdex. |
| Profondeur | Toutes les cartes anglaises ; aucune carte française en tant que telle. |
| Historique | Aucun (instantané). |
| Accès | API ouverte, sans clé : « If you aren't using an API key, you are rate limited to 1000 requests a day, and a maxium of 30 per minute » (https://docs.pokemontcg.io/getting-started/rate-limits). |
| Conditions | Docs : « The Pokémon TCG API is deprecated. » / « New account registrations are no longer available. » / « Existing API keys will continue to function through March 1, 2027. » (https://docs.pokemontcg.io/). Conditions (https://dev.pokemontcg.io/terms) : « You may not place undue burden on the Pokémon TCG API through the use of automated means » ; « Price data is for informational purposes only. » Rien sur la réutilisation ou la redistribution. `robots.txt` (pokemontcg.io et api.pokemontcg.io) : uniquement le préambule Cloudflare sur les « content signals », aucune ligne `Disallow` ni `Content-Signal`. |
| Contact | Non trouvé sur les pages lues (renvoi vers Scrydex). |
| Verdict | **D** pour notre usage : pas de français, API déclarée obsolète, et surtout **données Cardmarket figées** (voir essai). Utile seulement comme table de correspondance anglaise (identifiants `base1-4`, `sv3pt5-205`, `swsh7-215`, liens TCGplayer et Cardmarket). |
| Essai | Lu le 16 novembre 2026 à 22 h 54 UTC, sans clé. `base1-4` : TCGplayer `updatedAt 2026/10/15`, holofoil `low 499.99, mid 587.98, high 3499.1, market 954.65` (USD) ; Cardmarket `updatedAt 2026/07/01`, `averageSellPrice 1531.0, lowPrice 799.0, trendPrice 4184.6, lowPriceExPlus 1750.0, avg1 14950.0, avg7 3939.88, avg30 2427.79`. `sv3pt5-205` : TCGplayer 2026/10/15 `low 18.53, mid 28.16, market 25.04` ; Cardmarket **`updatedAt 2025/11/18`**, `averageSellPrice 16.82, lowPrice 8.95, trendPrice 16.63, avg30 16.88`. `swsh7-215` : TCGplayer 2026/10/15 `low 1699.99, market 2264.7` ; Cardmarket **2025/11/18**, `averageSellPrice 1609.94, trendPrice 1579.48, avg30 1538.35`. Constat : les prix Cardmarket de cette API ont un an de retard pour deux cartes sur trois, et pour Dracaufeu ils ne correspondent pas au produit 273699 de Cardmarket (453,87 € de moyenne ce jour) : l'API pointe probablement vers un autre produit (édition 1 ?), non vérifié. |

### 3. Scrydex (successeur de pokemontcg.io)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | `https://scrydex.com`, docs `https://scrydex.com/docs`. États-Unis. API commerciale. |
| Langue de la carte distinguée ? | Partiellement : anglais et japonais (la page d'accueil liste « Latest Japanese Expansions » et propose la recherche `language:japanese`). Français : **aucune mention trouvée**. |
| Non gradé, gradé | Les deux. Page d'accueil : « Track real-time market values, price history, and trends across raw and graded cards (PSA, BGS, CGC, TAG, ACE & more) ». |
| Nature du prix | Non précisé dans les pages lues (« market » en dollars, par état NM/LP/MP/HP/DM). Marché américain. |
| Profondeur | Non vérifié. |
| Historique | Oui, point d'accès « price history » (3 crédits par requête selon la page des tarifs) ; profondeur non indiquée. |
| Accès | API avec clé payante. |
| Conditions | Tarifs (https://scrydex.com/pricing) : Starter 29 $/mois (5 000 crédits), Growth 99 $/mois, Professional 399 $/mois, Enterprise sur devis ; aucune offre gratuite affichée. Conditions (https://scrydex.com/terms) : interdit de « Resell, sublicense, redistribute, mirror, or commercially exploit the Services without prior written authorization » et de « Use the Services primarily as a substitute backend, proxy, or wholesale data source for a competing commercial product ». `robots.txt` : `User-agent: *` / `Allow: /`. |
| Contact | « Contact Us » sur la page des tarifs (formulaire), non ouvert. |
| Verdict | **D** : payant, pas de français. |
| Essai | Non fait (payant). |

### 4. PokemonPriceTracker API

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | `https://www.pokemonpricetracker.com/api`, États-Unis. API commerciale avec offre gratuite. |
| Langue de la carte distinguée ? | Anglais et japonais seulement : la page de l'API annonce « English & Japanese ». Français : aucune mention. |
| Non gradé, gradé | Les deux. Gradé PSA, CGC, BGS ; la FAQ indique que les ventes PSA 8, 9 et 10 viennent des « eBay completed listings ». |
| Nature du prix | Relais TCGplayer (prix de marché), ventes eBay terminées pour le gradé ; Cardmarket en euros « en bêta », réservé aux formules payantes. |
| Profondeur | Non vérifié pour le français (aucune carte française). |
| Historique | Gratuit : 3 jours ; formule à 9,99 $/mois : 6 mois ; Business 99 $/mois : « 12+ months ». |
| Accès | API avec clé (compte gratuit : 100 crédits par jour). Non créé. |
| Conditions | https://www.pokemonpricetracker.com/terms : usage gratuit limité aux fins « personal and non-commercial purposes » ; « Displaying card prices, trends, or market data within a commercial product or service » est un usage commercial qui « requires an active Business or Enterprise subscription » ; « No plan permits resale, sublicensing, syndication or redistribution of PokePriceTracker Data » ; « Scraping, data mining, or otherwise collecting data from the Service without our prior written consent » est interdit. `robots.txt` : `User-Agent: *` / `Allow: /` / `Disallow: /api/`. |
| Contact | Non relevé. |
| Verdict | **D** : pas de français ; l'affichage public des prix (même gratuit) frôle la redistribution interdite, la formule qui l'autorise coûte 99 $/mois. |
| Essai | Non fait (clé obligatoire). |

### 5. PokeTrace

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | `https://poketrace.com`, API `https://api.poketrace.com/v2`. Pays non relevé. API commerciale avec offre gratuite. |
| Langue de la carte distinguée ? | Anglais, japonais, chinois simplifié et quelques extensions indonésiennes/thaïes d'après le plan du site (`/sitemap/sets` : `30th-celebration-jp`, `…-simplified-chinese`, `30th-celebration-idth`). **Aucune extension française** dans ce plan (recherche `fr`, `french` : rien). |
| Non gradé, gradé | Les deux. Page des tarifs : 15 sociétés, dont PSA, BGS, CGC, SGC, ACE et TAG, notes 1 à 10 ; gradé à partir de la formule Pro. |
| Nature du prix | « US (eBay, TCGPlayer) » pour toutes les formules, « EU (Cardmarket) » à partir de Pro. |
| Profondeur | Annonce « 60,000+ cards across 700+ sets ». Français : zéro (mesuré sur le plan des extensions). |
| Historique | Gratuit : 7 jours ; formules supérieures : jusqu'à « all-time price history ». |
| Accès | API avec clé (gratuit : 100 requêtes par jour, une requête toutes les deux secondes, non gradé, marché américain). |
| Conditions | https://poketrace.com/pricing : Pro 19,99 $/mois, Growth 49,99 $, Scale 98 $, Business 399,99 $. https://poketrace.com/terms : « Paid plans (currently Pro, Growth, Scale and Business) permit commercial use only of PokeTrace's analytical pricing data » ; « You may display these statistics to free or paying users of your websites and applications » ; « This permission does not include reselling or sublicensing datasets, distributing bulk datasets ». `robots.txt` : `User-agent: *` / `Allow: /` / `Content-Signal: ai-train=no, search=yes, ai-input=yes`. |
| Contact | Non relevé. |
| Verdict | **D** : pas de français ; le gradé et l'Europe sont payants. |
| Essai | Non fait (clé obligatoire). |

### 6. JustTCG

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | `https://justtcg.com`, États-Unis. API commerciale avec offre gratuite. |
| Langue de la carte distinguée ? | Non documenté. La page des régions (https://justtcg.com/docs/api/cards-v2/regions) dit : « Right now `NA` is the only region with data » ; EU, UK et JP « switch on later as their data matures ». |
| Non gradé, gradé | Les deux. Gradé : « One of PSA, BGS, CGC, BCCG, BVG, or SGC » (https://justtcg.com/docs/api/cards-v2/graded). |
| Nature du prix | Gradé : ventes réalisées du boîtier exact (prix nul tant qu'aucune vente, expiré 90 jours après la dernière). Non gradé : « JustTCG prices come from our own market data » (https://justtcg.com/docs/attributions), source précise non dite. Marché nord-américain. |
| Profondeur | Non vérifié ; aucune donnée européenne aujourd'hui. |
| Historique | « historical trends » annoncés ; profondeur non indiquée. |
| Accès | API avec clé. Gratuit : 1 000 requêtes par mois, 100 par jour, 10 par minute. Payant : 19 $, 49 $, 149 $ par mois. |
| Conditions | https://justtcg.com/terms, section 6 : « the free tier is intended solely for personal, non-commercial use » ; section 7.2 : les données « may not be exported, published, sold, or otherwise made available to third parties as a dataset » ; l'affichage aux utilisateurs finaux (section 7.1) est réservé aux formules payantes. `robots.txt` : `User-Agent: *` / `Allow: /` / `Disallow: /api/`. |
| Contact | Lien « Contact us » en pied de page, non ouvert. |
| Verdict | **D** : pas de français, pas d'Europe, affichage public réservé aux formules payantes. |
| Essai | Non fait (clé obligatoire). |

### 7. TCG API (tcgapi.dev)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | `https://tcgapi.dev`. Pays non relevé. API commerciale avec offre gratuite. |
| Langue de la carte distinguée ? | Non documenté sur la page des tarifs. Les points d'accès (`/v1/bulk/resolve/tcgplayer`) indiquent un catalogue TCGplayer, donc anglais et japonais. |
| Non gradé, gradé | Gradé à partir de Pro : « eBay sold prices, raw and graded (PSA/BGS/CGC) ». |
| Nature du prix | Prix de marché (source non nommée, probablement TCGplayer) ; ventes eBay réalisées en formule Pro. |
| Profondeur | Non vérifié. |
| Historique | « Full price history (from March 2025) » en Pro ; 7 jours en gratuit. |
| Accès | API avec clé. Gratuit : 100 requêtes par jour, usage non commercial. Hobby 9,99 $, Starter 19,99 $, Pro 49,99 $ (licence commerciale), Business 99,99 $ par mois (https://tcgapi.dev/pricing). |
| Conditions | Conditions générales non lues (au-delà de la mention « non-commercial » de la page des tarifs). `robots.txt` : `User-agent: *` / `Allow: /` / `Disallow: /login …/dashboard` / `Content-Signal: ai-train=no, search=yes, ai-input=yes`. |
| Contact | Non relevé. |
| Verdict | **D** : pas de français, Europe absente, gradé payant. |
| Essai | Non fait (clé obligatoire). |

### 8. TCGAPIs (tcgapis.com)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | `https://tcgapis.com`, facturé en livres sterling (Royaume-Uni probable, non vérifié). API commerciale. |
| Langue de la carte distinguée ? | Oui dans les données : la page d'accueil décrit des enregistrements par « condition × printing × language » (formule Unlimited). |
| Non gradé, gradé | Non gradé. La page d'accueil dit : « Graded-slab prices are not included. » Les recherches PSA et ACE renvoient des certificats, pas des prix. |
| Nature du prix | TCGplayer (USD), « price guides » Cardmarket (EUR), annonces CardTrader ; « We do not convert between currencies. » |
| Profondeur | Non vérifié. |
| Historique | Prix de marché TCGplayer quotidiens depuis février 2024 ; ventes réalisées par tranches de 3 jours. |
| Accès | Gratuit : « 100 evaluation credits » au total ; Hobby 99 £/mois, Business 199 £/mois (Cardmarket et CardTrader), Unlimited 499 £/mois (annonces et prix par langue). |
| Conditions | Conditions (`/terms`) non lues. `robots.txt` : `User-Agent: *` / `Allow: /` / `Disallow: /api/ … /csv/`. |
| Contact | Non relevé. |
| Verdict | **D** : payant (le prix par langue n'est que dans la formule à 499 £/mois, et il ne ferait que reprendre CardTrader, que nous avons déjà en direct). |
| Essai | Non fait. |

### 9. TCGCSV (export quotidien de TCGplayer)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | `https://tcgcsv.com`, projet personnel (mainteneur « CptSpaceToaster », code sur GitHub). Fichiers JSON et CSV. |
| Langue de la carte distinguée ? | Par catégorie seulement : `3` « Pokemon » (anglais) et `85` « Pokemon Japan ». **Pas de français** (TCGplayer ne vend pas de cartes françaises). |
| Non gradé, gradé | Non gradé. |
| Nature du prix | Prix TCGplayer : `lowPrice`, `midPrice`, `highPrice` (demandés), `marketPrice` (ventes récentes), `directLowPrice`, par finition (`subTypeName`). USD. |
| Profondeur | Tout le catalogue TCGplayer ; zéro carte française. |
| Historique | Archives quotidiennes depuis le 8 février 2024 (`https://tcgcsv.com/archive/tcgplayer/prices-2024-02-08.ppmd.7z`), « earlier data doesn't exist » (FAQ). |
| Accès | Fichiers ouverts sans clé : `https://tcgcsv.com/tcgplayer/{catégorie}/{groupe}/products` et `/prices`, `https://tcgcsv.com/last-updated.txt`. |
| Conditions | FAQ (https://tcgcsv.com/faq) : les fichiers sont « sourced _directly_ from TCGplayer's API » ; pas de licence formelle. Docs (https://tcgcsv.com/docs) : « Don't make requests to TCGCSV directly from user-facing applications. » ; « Applications that make more than 10,000 requests in a 24 hour period may be banned. » ; « Applications that repeatedly download price archives day-after-day may be banned. » Au sujet des archives : « I want to share them freely, however they attract all sorts of trouble. » `robots.txt` : `User-agent: *` / `Allow: /`. |
| Contact | Discord du projet et GitHub `CptSpaceToaster/tcgcsv` (issues), indiqués dans la FAQ. |
| Verdict | **C** : accès technique ouvert, mais les données appartiennent à TCGplayer, dont l'API est fermée aux nouveaux venus, et aucune licence ne couvre la réutilisation. Sans objet pour le prix français (marché américain exclu par le fondateur) ; utile seulement comme alarme ou table de correspondance TCGplayer. |
| Essai | Lu le 16 novembre 2026 (fichier `last-updated` : `2026-11-16T20:05:58+0000`), version anglaise des cartes. Charizard, Base Set, produit 42382, Holofoil : `lowPrice 499.99, midPrice 675.1, highPrice 3499.1, marketPrice 1001.05, directLowPrice 1131.03`. Mew ex 205/165, produit 517051 : `lowPrice 17.91, midPrice 26.8, highPrice 129.99, marketPrice 24.27, directLowPrice 23.7`. Umbreon VMAX (Alternate Art Secret), produit 246723 : `lowPrice 1804.98, midPrice 2300.0, highPrice 16721.3, marketPrice 2324.94, directLowPrice 1999.0`. Aucune version française. |

### 10. PriceCharting API

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | `https://www.pricecharting.com/api-documentation`, États-Unis. API et CSV payants. |
| Langue de la carte distinguée ? | Par extension : anglais, japonais, chinois, coréen. Sur la page `https://www.pricecharting.com/category/pokemon-cards` (325 liens d'extensions relevés le 16 novembre), **aucune extension française** (mesuré : recherche de `french`, `fr-` dans les liens). |
| Non gradé, gradé | Les deux. Champs : `loose-price` (« Ungraded card »), `graded-price` (« Graded 9 by a grading company »), `manual-only-price` (« Graded 10 by PSA grading service »), `bgs-10-price`, `condition-17-price` (« CGC 10 »). |
| Nature du prix | Valeurs courantes ; la documentation ne nomme pas la source (ventes eBay selon la notoriété du site, non vérifié ici). |
| Profondeur | Zéro carte française. |
| Historique | « Historic prices and historic sales are not supported » par l'API. |
| Accès | « API's are a premium tool. You must have a paid subscription to access the API » ; « CSV download feature is only available to Legendary subscribers. » Tarif non affiché sur la page lue. |
| Conditions | « The API and CSV data are licensed for internal use only. » Toute mise à disposition de tiers demande une licence commerciale et un accord écrit. `robots.txt` : `User-agent: *` / `Disallow: /stripe-connect`, `/publish-offer`, `/buy`. |
| Contact | Non relevé. |
| Verdict | **D** : payant, usage interne seulement, pas de français. Le site lui-même relève de la famille des cotes. |
| Essai | Non fait. |

### 11. PSA Public API

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | `https://api.psacard.com/publicapi/`, documentation `https://www.psacard.com/publicapi/documentation`. États-Unis. API officielle de la société de gradation. |
| Langue de la carte distinguée ? | Non vérifié (le libellé du certificat porte souvent la langue, par exemple « FRENCH », mais je n'ai pas pu le lire). |
| Non gradé, gradé | Gradé PSA seulement. |
| Nature du prix | **Aucun prix** d'après ce qui est publiquement décrit : consultation de certificats (et population selon des tiers, non vérifié). Les prix réalisés de PSA (« Auction Prices Realized ») sont un site, pas cette API. |
| Profondeur | Sans objet. |
| Historique | Sans objet. |
| Accès | API avec jeton lié à un compte PSA. D'après la documentation telle que citée par la recherche web : « There is a daily limit of 100 API calls for free accounts. » Non lu directement. |
| Conditions | La documentation renvoie à un « PSA API End User Agreement » : **non lu**. `https://www.psacard.com/publicapi/documentation` a renvoyé **429 Too Many Requests** (`Retry-After: 28843`) ; `https://www.psacard.com/robots.txt` renvoie une page de vérification Cloudflare (« Just a moment... ») ; `https://api.psacard.com/publicapi/cert/GetByCertNumber/…` sans jeton : 429. Je n'ai pas insisté. |
| Contact | Non relevé. |
| Verdict | **D** pour le prix (aucun prix) ; pour la vérification de certificats, **C** (compte et contrat d'utilisateur à lire, non fait). |
| Essai | Impossible (429 et protection Cloudflare). |

### 12. API Cardmarket v2 (état réel)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | `https://api.cardmarket.com/ws/documentation`. Allemagne. API officielle. |
| Langue de la carte distinguée ? | Les annonces (« articles ») de l'API portent une langue, d'après la documentation historique ; non vérifié aujourd'hui. Le point d'accès « Price Guide » (`API_2.0:PriceGuide`) répond désormais **410 Gone**. |
| Non gradé, gradé | Non gradé. |
| Nature du prix | Annonces et guide des prix (le même que le fichier public). |
| Profondeur | Sans objet. |
| Historique | Aucun. |
| Accès | Fermé. Centre d'aide (https://help.cardmarket.com/en/cardmarket-api) : « Currently, we are not accepting applications for access to the Cardmarket API. » |
| Conditions | Conditions générales article 9 (citées dans `CADRAGE.md`) : « The presentation of the trading cards and their respective prices require our prior written agreement ». |
| Contact | Demande déjà envoyée le 16 novembre (`docs/demandes-sources.md`). |
| Verdict | **C** : seule voie, l'accord écrit déjà demandé. |
| Essai | Non fait. |

### 13. eBay (rappel)

Déjà étudié (`ROADMAP.md`, `CADRAGE.md`). API Browse avec clés de développeur ; la licence interdit de modéliser des prix sans accord écrit ; décision du fondateur : n'afficher que les annonces en cours avec un lien. Les ventes terminées passent par l'API « Marketplace Insights », à accès restreint (non revérifié dans cette mission). Verdict inchangé : **C** pour un prix, usage d'affichage d'annonces permis. Pas d'essai.

### 14. pokemon-tcg-data (GitHub)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | `https://github.com/PokemonTCG/pokemon-tcg-data` (lu via `raw.githubusercontent.com`). Jeu de données JSON. |
| Langue de la carte distinguée ? | Non : dossier `cards/en/` seulement. |
| Non gradé, gradé | Aucun prix : `cards/en/base1.json`, carte `base1-4` : `"tcgplayer": null, "cardmarket": null`. |
| Nature du prix | Sans objet. |
| Profondeur | Catalogue anglais. |
| Historique | Sans objet. |
| Accès | Fichiers publics. |
| Conditions | README : « This project is being deprecated » ; « The Pokémon TCG API is scheduled to be taken offline on March 1, 2027. » ; « Existing data in this repository will remain available for historical and compatibility purposes. » **Aucun fichier de licence** à la racine (`LICENSE` et `LICENSE.md` : 404) : réutilisation non accordée explicitement. |
| Contact | Renvoi vers Scrydex. |
| Verdict | **D** pour les prix (il n'y en a pas). Catalogue anglais sans licence : à ne pas reprendre ; TCGdex fait mieux. |
| Essai | Sans objet. |

### 15. TCGdex `cards-database` (catalogue multilingue pour l'appariement)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | `https://github.com/tcgdex/cards-database`. Jeu de données TypeScript, base de l'API TCGdex déjà branchée. |
| Langue de la carte distinguée ? | Oui : noms et textes par langue (`en, fr, es, it, pt, de` pour `swsh7-215` : `fr: "Noctali VMAX"`). README : « A Multilanguage Pokémon TCG Database ». |
| Non gradé, gradé | Pas de prix dans le dépôt ; l'API ajoute les prix relayés. |
| Nature du prix | Sans objet. |
| Profondeur | Catalogue français complet (c'est notre source). |
| Historique | Sans objet. |
| Accès | Fichiers publics ; API `api.tcgdex.net`. |
| Conditions | README : « The Database is licensed under the MIT License » ; `LICENSE` : « MIT License / Copyright (c) 2021 TCGdex ». |
| Contact | Dépôt GitHub. |
| Verdict | **A** (déjà branché). Intérêt nouveau pour l'appariement : `variants_detailed[].thirdParty` donne par variante les identifiants Cardmarket et TCGplayer (`swsh7-215` : `{"cardmarket":574273,"tcgplayer":246723}`), et le prix TCGplayer y porte `productId` 246723, le même que dans TCGCSV. C'est la table de correspondance la plus complète trouvée ; aucun numéro PSA (« spec ») n'y figure. |
| Essai | Fait sur `swsh7-215` (voir ci-dessus), 16 novembre 2026. |

### 16. « TCG Price History » sur Hugging Face (`TCGapi/tcg-price-history`)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | `https://huggingface.co/datasets/TCGapi/tcg-price-history`. Jeu de données publié par un vendeur d'API. |
| Langue de la carte distinguée ? | Métadonnées : `"language":["en"]`. |
| Non gradé, gradé | Annoncé : TCGplayer, eBay et PSA 10. |
| Nature du prix | `nm_tcgplayer_market`, `nm_ebay_30d_avg`, `psa_10_ebay_30d` (USD). |
| Profondeur | **Mesuré : 5 lignes.** Le dépôt ne contient que `README.md` et `data/sample.json` ; la première ligne a pour identifiant `"example-charizard-base"`. Les « 100K<n<1M » annoncés ne sont pas dans les fichiers. C'est une vitrine pour l'API payante. |
| Historique | Une date (`2026-04-01`) dans l'échantillon. Dernière modification du dépôt : 10 avril 2026. |
| Accès | Fichier public. |
| Conditions | Métadonnées : `"license":"mit"`. |
| Contact | Page du jeu de données. |
| Verdict | **D** : pas de données réelles, pas de français. |
| Essai | Sans objet (5 lignes d'exemple). |

Autres jeux Hugging Face trouvés par l'API de recherche (`/api/datasets?search=pokemon`) : `tooni/pokemoncards` (MIT, modifié le 20 octobre 2024), `TheFusion21/PokemonCards` (CC BY-NC 4.0, 21 novembre 2022), `WyldKnyght/pokemon_tcg_data_cards` et `…_sets` (copie de pokemon-tcg-data, d'après le nom). Ce sont des catalogues et images anglais, sans prix d'après leur nom ; contenu non ouvert, non vérifié.

### 17. Jeux de données Kaggle

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | `kaggle.com/datasets/…`. Jeux déposés par des particuliers. |
| Langue de la carte distinguée ? | Non vérifié. Selon l'extrait du moteur de recherche, `kanchana1990/e-commerce-pokmon-card-pricing-data` (542 lignes de ventes, prix convertis en USD) aurait une colonne de langue et de gradation. |
| Non gradé, gradé | Idem, non vérifié. |
| Nature du prix | D'après les titres et extraits : PriceCharting (`davidkim2003/pokemon-pricecharting-historic-data`, « historic data up to 10-2024 », annoncé MIT ; `zeynepcahan/pokemon-pricecharting`, mensuel 2021-2025), TCGplayer (`jasonlzp/…-chilling-reign-booster-box-sales-data`), une boutique britannique (`jacklacey/pokemon-trading-cards`, chaoscards.co.uk). |
| Profondeur | Non vérifié. |
| Historique | Voir ci-dessus, non vérifié. |
| Accès | Téléchargement avec compte Kaggle. Les pages ne se lisent pas sans JavaScript (l'outil de lecture ne reçoit que le titre) et l'API publique `kaggle.com/api/v1/datasets/list` répond 404 sans authentification. Non insisté. |
| Conditions | La licence affichée par le déposant (MIT pour l'un d'eux) ne vaut que pour son travail : des prix copiés de PriceCharting restent soumis à PriceCharting, dont la licence est « for internal use only ». |
| Contact | Déposants, via Kaggle. |
| Verdict | **D** : origine des données non licenciée (copies de PriceCharting ou de TCGplayer), anglais, figés. |
| Essai | Impossible sans compte. |

### 18. CardNexus (API de prix)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | Documentation `https://docs.cardnexus.com/pricing/`. Place de marché de cartes avec API ; pays non vérifié (`cardnexus.com` répond 403 à l'outil de lecture). |
| Langue de la carte distinguée ? | Pour les annonces de sa propre place de marché : « broken down per condition and per language » (https://docs.cardnexus.com/pricing/). Pour les valeurs Cardmarket et TCGplayer relayées : non précisé. |
| Non gradé, gradé | Gradé non mentionné. |
| Nature du prix | « daily market values from Cardmarket (EUR) and TCGplayer (USD) » ; annonces CardNexus en cours. |
| Profondeur | Non vérifié. |
| Historique | « History starts on 6 November 2024. » (https://docs.cardnexus.com/pricing/history) |
| Accès | Clé d'API ; les blocs de prix et l'historique « each need a data permission that CardNexus grants to an account or an application ». Tarif non publié. |
| Conditions | Conditions non lues ; `robots.txt` de `cardnexus.com` et `docs.cardnexus.com` : non lisibles (rien de pertinent renvoyé). |
| Contact | Non relevé. |
| Verdict | **C** : permission accordée au cas par cas. Seul point intéressant : un historique quotidien des valeurs Cardmarket depuis novembre 2024, mais toutes langues (comme la source), donc rien de plus que ce que nous pouvons archiver nous-mêmes. Ses annonces par langue relèvent de la famille des places de marché. |
| Essai | Non fait. |

### 19. Projets libres voisins et leurs sources

| Projet | Ce qu'il fait | Source de prix | Licence |
| --- | --- | --- | --- |
| GoupixDex (`github.com/leoglme/goupixdex`) | Outil français de revente : scan, prix, publication sur Vinted, eBay France, Leboncoin. README : « Price it from the Cardmarket price guide (TCGPlayer and eBay as extra references) » ; « eBay market — price research on active listings and recently completed sales on eBay France ». | Fichier de prix Cardmarket (toutes langues), eBay France via OAuth du vendeur. | Pas de `LICENSE` trouvé à la racine (404). |
| CMScrape (`github.com/DrankRock/CMScrape`) | « Collectibles price tracker from Cardmarket links. » Archivé ; renvoie vers « AutoScrape » et son « cardmarket_parser ». | Lecture de pages Cardmarket. | Non relevé. À ne pas imiter : Cardmarket interdit la collecte sans accord. |
| Gather (`github.com/hjacque/gather`) | Selon l'extrait de recherche : prix Cardmarket, prix eBay vendus, population PSA. | Non vérifié (README introuvable sur `main` et `master`). | Non vérifié. |

Constat : aucun projet libre trouvé ne publie un prix propre aux cartes françaises ; tous reprennent le fichier Cardmarket toutes langues, comme nous.

### 20. GemRate API (population des cartes gradées)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | `https://docs.gemrate.com`. API de données gradées. |
| Langue de la carte distinguée ? | Non vérifié. |
| Non gradé, gradé | Gradé, plusieurs sociétés ; **population seulement, aucun prix** (index `https://docs.gemrate.com/llms.txt` : « certs, population, history, and catalogs »). |
| Nature du prix | Sans objet. |
| Profondeur | Non vérifié. |
| Historique | Population quotidienne « begins on Jan 1, 2022 », mais « Historical data access not included in basic plans ». |
| Accès | Clé d'API ; tarif non publié. |
| Conditions | Non lues. `https://www.gemrate.com/robots.txt` renvoie une page de vérification Cloudflare. |
| Contact | « Contact GemRate » (sans adresse relevée). |
| Verdict | **D** pour le prix. Pourrait servir un jour à l'appariement des numéros de certificats entre sociétés ; non prioritaire. |
| Essai | Sans objet. |


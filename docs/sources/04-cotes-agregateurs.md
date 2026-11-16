# Inventaire des sources, famille 4 : cotes, guides de prix, agrégateurs et applications de collection

Relevé du 16 novembre 2026. Fichier rédigé au fur et à mesure ; les fiches suivent le format de `_consignes.md`. Méthode : `robots.txt` lus par `curl`, pages lues par navigateur Playwright ou par l'outil de lecture de pages, quelques pages par site, aucune extraction en masse. Les protections techniques (Cloudflare) n'ont pas été contournées : un site qui a refusé la lecture est noté comme tel.

## Tableau récapitulatif

(complété en fin de travail, voir plus bas)

## Fiches

### 1. PokéCardex

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.pokecardex.com ; France (éditeur NUMELEK SAS, Lyon, d'après `/legal`) ; site, forum et application iOS/Android de gestion de collection |
| Langue de la carte distinguée ? | Pour le catalogue : oui, de plus en plus (page « Langues par version », FAQ : « PokéCardex indique désormais dans quelles langues existe chaque version d'une carte »). Pour le prix : non établi. L'application annonce « Suivez le prix de vente sur les plateformes Cardmarket et TCGPlayer » ; la FAQ parle d'un « filtre de langue des liens Cardmarket », c'est-à-dire un lien vers Cardmarket filtré sur la langue, pas un prix propre à la langue. Je n'ai pas vu de prix par langue. |
| Non gradé, gradé | Non gradé : prix par carte. Gradé : l'application permet d'« enregistrer vos cartes gradées de nombreuses sociétés de gradation: PSA, PCA, BGS, etc. » ; aucun prix gradé observé. |
| Nature du prix | Reprend Cardmarket et TCGplayer (page `/app`, citation ci-dessus). La méthode exacte (tendance, prix le plus bas, etc.) n'est pas publiée : non vérifié. Le scanner donne « une estimation du prix » (page `/app`). Historique des prix réservé à l'abonnement Plus. |
| Profondeur | Catalogue : « plus de 68 000 cartes référencées couvrant les sets internationaux, japonais et en chinois simplifié » (page d'accueil, déclaratif). Nombre de cartes françaises avec prix : non vérifié (pages de cartes non ouvertes, voir Essai). |
| Historique | « La référence pour les collectionneurs depuis 2015 » (page `/app`) ; « © PokéCardex 2003-2026 » en pied de page. |
| Accès | Pages web et application. Pas d'API ni d'export public : les CGU disent « L'export des données de votre collection n'est pas disponible directement depuis le site ou l'application » (6.1, collection seulement). |
| Conditions | CGU (https://www.pokecardex.com/terms_ios), article 10.4 : « L'Application, le site Web et tout autre contenu sont uniquement destinés à votre usage personnel et non commercial. Toute autre utilisation de l'Application requiert l'autorisation écrite préalable de PokéCardex. » Article 10.2 : « L'Utilisateur n'est pas autorisé à vendre, à concéder des sous-licences, à distribuer ou à accéder d'une autre manière au contenu de l'Application. » Article 10.1 : « PokéCardex est le détenteur de tous les droits de propriété intellectuelle sur les informations fournies par l'Application ». `robots.txt` (https://www.pokecardex.com/robots.txt) : pour `*`, « Content-Signal: search=yes,ai-train=no,use=reference » puis « Allow: / » ; ClaudeBot, GPTBot, CCBot, anthropic-ai, Claude-Web et d'autres sont en `Disallow: /`. |
| Contact | contact@pokecardex.com (page `/faq` et `/legal`) ; appli_ios@pokecardex.com pour l'application (CGU, article 8.1). |
| Verdict | **C** : prix repris de Cardmarket/TCGplayer (nous les avons déjà à la source), pas de prix propre au français, et usage « personnel et non commercial » sauf autorisation écrite. Rien à gagner en prix ; l'intérêt est le catalogue des langues par version (demande d'autorisation déjà envoyée pour les images). |
| Essai | Non fait (verdict C). Une page série (`/series/MEW`) est lisible sans connexion ; l'URL d'une carte n'a pas été trouvée. |

Réponse aux trois questions laissées ouvertes : (1) D'où viennent ses prix : Cardmarket et TCGplayer, déclaré sur `/app` ; la source amont n'est donc pas inconnue. (2) Distingue-t-il le français : pas pour le prix, d'après ce que j'ai pu lire ; oui pour l'existence d'une version dans une langue. (3) Conditions sur les prix : aucune clause spécifique aux prix ; la clause générale 10.4 (personnel, non commercial) couvre « tout autre contenu ».

### 2. TCG Sense

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://tcgsense.com ; éditeur « Foenn Software » (d'après `llms.txt`) ; pays non vérifié ; gestionnaire de collection (site, application mobile, extension Chrome « vendre sa collection sur Cardmarket ») |
| Langue de la carte distinguée ? | Le site se décrit ainsi (`llms.txt`) : « suivi de collection par langue et par finition » ; pour chaque carte : « langues et finitions disponibles, cote en euro (fourchette basse – haute) avec sa date de relevé et son historique ». Une cote **par langue** n'est pas établie : le texte parle d'une cote par carte et d'un suivi de collection par langue. Non vérifié, les pages de cartes sont derrière Cloudflare. |
| Non gradé, gradé | Non vérifié. |
| Nature du prix | « cotes en euro relevées chaque jour sur le marché européen et historisées » (`llms.txt`), fourchette basse - haute. Source précise (Cardmarket ? autre ?) : non vérifiée, la page « À propos : périmètre, méthode de cote, éditeur » (`/fr/a-propos`) n'a pas pu être lue. |
| Profondeur | « Pokémon : 63698 cartes · 515 extensions » (`llms.txt`, déclaratif, toutes langues). Cartes françaises : non vérifié. |
| Historique | Non vérifié. Historique de cote « historisé » depuis le lancement (offre « tarif de lancement »). |
| Accès | Pages web, application, extension Chrome. Pas d'API vue. Offres : « l'offre Free et l'offre Plus, au tarif de lancement de 4,99 € par mois ou 39,90 € par an » (`llms.txt`). Les pages sont servies derrière un défi Cloudflare : `curl`, l'outil de lecture et Playwright ont reçu un 403 (« Sorry, you have been blocked » / « Just a moment... »). Seuls `robots.txt`, `llms.txt` et les sitemaps répondent. Je n'ai pas insisté. |
| Conditions | Conditions d'utilisation : non lues (page inaccessible). `robots.txt` (https://tcgsense.com/robots.txt) : « User-agent: * / Content-Signal: search=yes, ai-input=yes, ai-train=yes / Allow: / » avec `Disallow` sur les pages de compte (`/fr/collections`, `/fr/portfolio`, `/auth/`, etc.) ; les pages de cartes ne sont pas interdites. Mais le défi Cloudflare est une protection technique. |
| Contact | Non vérifié (aucune page lisible). |
| Verdict | **C** : site manifestement ouvert aux robots dans `robots.txt` et `llms.txt` mais pages protégées, conditions et méthode illisibles pour nous. À étudier avec un navigateur humain (conditions, page À propos), puis à contacter pour un accord. Concurrent direct. |
| Essai | Impossible (pages bloquées). |

### 3. Collectr (getcollectr.com)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.getcollectr.com ; pays non vérifié ; application de collection (« 4.8+ App Store rating », « 100,000+ reviews » selon la page d'accueil) |
| Langue de la carte distinguée ? | Non établi. Un comparatif tiers (folio.fyi, concurrent, à prendre avec prudence) écrit : « en Europe, les prix viennent de Cardmarket, qui réunit les langues occidentales ». Non vérifié chez Collectr. |
| Non gradé, gradé | Les deux : « Price guide : Raw, graded and pop reports with up to 5+ years of price history » (`/prices`). |
| Nature du prix | « Every card you own, valued daily from real sales data » (accueil) ; le guide cite « eBay and TCGplayer » pour les annonces (`/prices`). Pour un utilisateur réglé sur l'Europe : Cardmarket et eBay selon le comparatif tiers (non vérifié chez Collectr). |
| Profondeur | « 0M+ Cards & sealed products priced daily » (compteur d'animation illisible). Cartes françaises : non vérifié. |
| Historique | « © 2022-2026 Collectr ». |
| Accès | Application et site ; pas d'API publique vue. |
| Conditions | https://www.getcollectr.com/terms-and-conditions : l'utilisateur ne doit pas « involve crawling, scraping or otherwise caching any content from the Website and/or App » ; « You must not access or use for any commercial purposes any part of the Services » ; collecte « in an automated way without our express permission » interdite. `robots.txt` (https://www.getcollectr.com/robots.txt) : « User-agent: * / Disallow: / Disallow: /cgi-bin/ ». |
| Contact | contact@getcollectr.com (CGU). |
| Verdict | **D** : la collecte et l'usage commercial sont interdits, et rien n'indique un prix propre au français. |
| Essai | Sans objet. |

### 4. PriceCharting

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.pricecharting.com ; États-Unis ; guide de prix de jeux, cartes, etc. avec place de marché, prix en USD |
| Langue de la carte distinguée ? | Non. Une recherche « Pokemon French » (https://www.pricecharting.com/search-products?q=pokemon+french&type=prices) ne renvoie que des annonces de la place de marché (titres de vendeurs : « French 1st Edition », etc.), pas de fiche de prix distincte pour la version française. Le prix du guide est anglais/américain. |
| Non gradé, gradé | Les deux (ungraded, grades PSA/BGS/CGC dans le guide) pour les produits américains ; non examiné en détail. |
| Nature du prix | Dérivé de ventes réalisées (eBay et autres) en USD ; formulation exacte non relevée : non vérifié. |
| Profondeur | Cartes françaises avec prix de guide : aucune trouvée sur cette recherche. |
| Historique | « PriceCharting © 2007-2026 ». |
| Accès | API payante : « API's are a premium tool. You must have a paid subscription to access the API. » CSV : « CSV download feature is only available to Legendary subscribers. » (https://www.pricecharting.com/api-documentation). |
| Conditions | Même page : « The API and CSV data are licensed for internal use only. Sharing our price data with a third party, or making it available within an application or service used by others, requires a commercial license and express written permission from us. » Conditions d'utilisation : https://www.pricecharting.com/page/terms-of-service (lues en partie, pas de clause sur la collecte relevée : non concluant). `robots.txt` : « Disallow: /stripe-connect / Disallow: /publish-offer / Disallow: /buy ». |
| Contact | Page « Contact Us » en pied de page (non ouverte). |
| Verdict | **D** : payant, usage interne seulement, et pas de prix français distinct. |
| Essai | Sans objet. |

### 5. Pokellector

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.pokellector.com ; non vérifié ; catalogue de cartes et suivi de collection, interface en anglais (sélecteur « EN ») |
| Langue de la carte distinguée ? | Non pour le prix : la fiche du Dracaufeu (Charizard) du Set de Base affiche des prix de marchands américains (« $499.99 from TCG Player », « $101.00 from eBay (avg curr listings) », etc., https://www.pokellector.com/Base-Set-Expansion/Charizard-Card-4). Version française : non vérifiée. |
| Non gradé, gradé | Non gradé seulement vu. |
| Nature du prix | Prix demandés de boutiques affiliées ; « Pokellector may receive commision from purchases made from companies listed above ». |
| Profondeur | Non vérifié pour le français. |
| Historique | Non vérifié. |
| Accès | Pages ; « Pokellector does not offer an API ». |
| Conditions | https://www.pokellector.com/terms : « Pokellector does not offer an API to interact with the data we store. You agree not to use automated means to interact with the data we store without written permission. This includes, but isn't limited to, retrieving prices, images and managing collections. » `robots.txt` : 404 (aucune règle publiée). |
| Contact | https://www.pokellector.com/contact |
| Verdict | **D** : automatisation interdite sans accord écrit, prix = annonces américaines. |
| Essai | Sans objet. |

### 6. PokemonPriceTracker (pokemonpricetracker.com)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.pokemonpricetracker.com ; éditeur Spellmark LLC (pied de page), États-Unis supposé (non vérifié) ; site de suivi de prix, calculateur de gradation PSA, API |
| Langue de la carte distinguée ? | Non démontré. Pages sur l'anglais et le japonais (« Japanese Card Prices ») ; je n'ai trouvé aucune mention du français dans les pages lues. Les prix Cardmarket sont ceux d'un produit multilingue. |
| Non gradé, gradé | Les deux ; gradé : « Graded-card prices are refreshed from recent sales on the same daily cycle » (FAQ). |
| Nature du prix | FAQ : « We aggregate sales data from multiple sources including eBay, TCGPlayer, and CardMarket. » Licence : « TCGplayer market prices, graded sales, Cardmarket EUR prices, population data — but we don't disclose how it is collected ». |
| Profondeur | Non vérifié. |
| Historique | Non vérifié. |
| Accès | API REST. Gratuit : 100 crédits par jour (FAQ et pages d'API) ; l'usage commercial exige l'offre Business (payante, tarifs publiés incohérents d'une page à l'autre : non vérifié). |
| Conditions | https://www.pokemonpricetracker.com/licensing : « You may not resell, syndicate or redistribute our data as a data product — on any plan » ; « If your project earns money in any form, it needs a Business plan, even if visitors pay nothing » ; « Operate an API, endpoint or feed that serves our pricing data to third parties » interdit. `robots.txt` : `Allow: /`, `Disallow: /api/`, `/admin/`, `/_next/`, `/static/`. |
| Contact | support@pokemonpricetracker.com (page d'accueil). |
| Verdict | **D** : pas de français, commercial payant, redistribution interdite (or notre branche `data` est publique). |
| Essai | Sans objet. |

### 7. PokeTrace (poketrace.com)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://poketrace.com ; non vérifié ; API de prix de cartes + catalogue en 7 langues d'interface (la page française existe) |
| Langue de la carte distinguée ? | Non pour le prix : marchés « US · EU » seulement ; les fiches affichent « CM Price Trend » (Cardmarket) en euros. La documentation montre, pour le gradé, une ventilation Cardmarket par **pays du vendeur** (DE, FR), pas par langue de la carte. |
| Non gradé, gradé | Les deux : « All grades (15 companies) » dès l'offre Pro ; sur une fiche, les prix gradés sont « CONNECTEZ-VOUS POUR VOIR ». |
| Nature du prix | eBay (ventes conclues), TCGplayer, Cardmarket « CM Price Trend » (page fiche Farfetch'd, Set de Base, lue le 16 novembre 2026). |
| Profondeur | « 60,000+ cards across 700+ sets » (page des tarifs, déclaratif). Cartes françaises : aucune distinction. |
| Historique | Historique jusqu'à 7 jours en gratuit, 1 an en Pro. |
| Accès | API REST. Gratuit : 100 requêtes par jour, prix américains (eBay, TCGplayer) seulement. « EU (Cardmarket) », gradé et usage commercial : à partir de Pro, 19,99 $ par mois. |
| Conditions | https://poketrace.com/terms : « Free access is for personal, non-commercial use. Paid plans ... permit commercial use only of PokeTrace's analytical pricing data » ; revente ou « standalone data feed » interdits sans autorisation écrite. `robots.txt` : `User-agent: * / Allow: /`, « Content-Signal: ai-train=no, search=yes, ai-input=yes ». |
| Contact | contact@poketrace.com |
| Verdict | **D** : les prix européens sont payants et rien n'est propre au français. |
| Essai | Sans objet. |

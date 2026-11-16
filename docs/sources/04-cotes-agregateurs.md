# Inventaire des sources, famille 4 : cotes, guides de prix, agrégateurs et applications de collection

Relevé du 16 novembre 2026. Fichier rédigé au fur et à mesure ; les fiches suivent le format de `_consignes.md`. Méthode : `robots.txt` lus par `curl`, pages lues par navigateur Playwright ou par l'outil de lecture de pages, quelques pages par site, aucune extraction en masse. Les protections techniques (Cloudflare) n'ont pas été contournées : un site qui a refusé la lecture est noté comme tel.

Le tableau récapitulatif et la section « D'où les autres tirent leurs prix » sont en fin de fichier, après les fiches.

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

### 8. PkmCards.fr (communauté française, réseau tcgcards.fr)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.pkmcards.fr ; France ; site communautaire (catalogue, decks, collections, boutiques partenaires) du réseau tcgcards.fr |
| Langue de la carte distinguée ? | **Oui.** Page de méthode (https://www.pkmcards.fr/guides/estimation-valeur-cartes) : « Langue : une même carte peut avoir un prix très différent selon qu'elle soit en français, anglais ou japonais. L'estimation s'adapte automatiquement à la langue de ta carte. » Chaque fiche porte « Langue FR » et les listes se filtrent par langue (« Liste des cartes françaises »). |
| Non gradé, gradé | Non gradé seulement (état Mint/Near Mint par défaut). Aucun prix gradé vu. |
| Nature du prix | Prix **demandé** : « sa valeur est automatiquement estimée à partir du prix le plus bas actuellement disponible sur Cardmarket » ; « calculée en priorité à partir des vendeurs francophones européens (France, Belgique, Suisse...) » ; « si une carte n'est pas en vente sur Cardmarket, son prix est momentanément considéré comme nul ». Les fiches parlent de « prix le plus bas sur Cardmarket et Cardnexus ». Rafraîchissement : « plusieurs fois par jour » pour les cartes chères, quotidien sinon. |
| Profondeur | Séries récentes et anciennes avec filtre de langue (FR, EN, JP). Nombre exact de cartes françaises : non mesuré. La série « Set de Base » (Dracaufeu 4/102) est introuvable : aucune série « Base » ou « Wizards » dans la liste des séries ; trois adresses devinées renvoient une redirection vers `/cards`. |
| Historique | « © 2023 - 2026 ». Courbe de prix sur 30 jours par fiche. |
| Accès | Pages seulement. Pas d'API ni d'export vus. |
| Conditions | Aucune page de conditions d'utilisation trouvée : seule « Politique des cookies » (https://www.pkmcards.fr/cookies) figure en pied de page ; `/cgu`, `/terms`, `/mentions-legales` renvoient 404. `robots.txt` (https://www.pkmcards.fr/robots.txt) : « User-agent: * / Disallow: /decks/print / Disallow: /decks/delete / Disallow: /wishlists/print / Disallow: /wishlists/delete / Disallow: /account / Allow: /account/profile » ; les fiches de cartes ne sont pas interdites. Absence de conditions ne vaut pas permission : droit de la base de données en France. |
| Contact | Formulaire https://www.tcgcards.fr/support/contact?website=pkmcards ; formulaire « Devenir partenaire » ; aucune adresse e-mail trouvée. |
| Verdict | **C** : c'est la source qui fait le plus proche de ce que nous voulons (prix Cardmarket filtré sur la langue française et les vendeurs francophones) mais c'est un prix demandé, tiré de Cardmarket, sans conditions écrites ; la réutilisation dans une cote publique demande un accord. Leur méthode est surtout un modèle à reproduire nous-mêmes. |
| Essai | Lecture de trois fiches le 16 novembre 2026 (page ouverte sans connexion), prix affiché par la page, nature : prix le plus bas Cardmarket/Cardnexus, vendeurs francophones en priorité. 1. Dracaufeu Set de Base 4/102 FR : **non trouvé** (série absente). 2. Mew ex 205/165, série MEW, langue FR : **24,00 €** (https://www.pkmcards.fr/cards/mew-fr-205-ecarlate-et-violet-151-mew-ex). 3. Noctali VMAX 215/203, série EVS, langue FR : **1 199,00 €** (https://www.pkmcards.fr/cards/evs-fr-215-epee-et-bouclier-evolution-celeste-noctali-vmax). Les deux valeurs n'ont pas été recoupées avec Cardmarket dans cette mission. |

### 9. ZebraDex

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://zebradex.fr ; France (éditeur ZEBRADEX SAS, Paris, d'après `/mentions.php`) ; application et site de collection (« plus de 55 000 collectionneurs », page d'accueil, déclaratif) |
| Langue de la carte distinguée ? | Annoncé : « Prix FR mis à jour chaque jour » et « Prix mis à jour chaque jour sur les cartes et les produits scellés en France » (accueil). Le détail par langue n'est pas écrit dans la méthode : non vérifié. |
| Non gradé, gradé | Non gradé seulement d'après la méthode (« cartes en très bon état »). |
| Nature du prix | https://zebradex.fr/methodologie-prix (mise à jour le 2026-11-16) : « Nous nous basons en priorité sur les ventes réellement conclues, plutôt que sur des prix affichés non conclusifs » ; « vendeurs de confiance (bonnes évaluations) et des cartes en très bon état » ; « nous préférons ne pas estimer de prix plutôt que d'afficher une valeur approximative ». **La ou les places de marché ne sont pas nommées** (« sources sérieuses »). |
| Profondeur | Non vérifié. |
| Historique | « © 2025-2026 » ; page de méthode publiée le 2025-09-18. |
| Accès | Pages, application ; pas d'API. |
| Conditions | CGU (https://zebradex.fr/cgu.php) : « L'utilisateur s'engage à ne pas utiliser de moyens automatisés pour interroger ou extraire les données du site sans autorisation explicite. » `robots.txt` : `Disallow` sur `/collection`, `/mentions`, `/cgu`, `/admin/`, etc. ; la méthode de prix et les pages de cartes ne sont pas interdites. |
| Contact | contact@zebradex.fr (mentions légales). |
| Verdict | **C** : collecte automatisée interdite sans autorisation ; source amont non déclarée. |
| Essai | Non fait. |

### 10. ValoTCG et Valo.Data (valotcg.com)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://valotcg.com ; France (Entreprise Individuelle, RCS Lyon, CGU) ; application de scan, site de prix, **API Valo.Data**, assistant Valo.IA |
| Langue de la carte distinguée ? | **Oui, dans l'API.** Les réponses d'exemple de https://valotcg.com/fr/developers portent `card_language: "fr"` et `market_language` (« global », « en », « fr ») : prix Cardmarket « trend » et « low » par marché linguistique, et `sold_median_raw` eBay avec `market_language: "fr"` (« 30 jours, 5 ventes », observé le 2026-10-12, Dracaufeu-ex 199/165 de 151). Sur le site grand public, l'assistant cite « eBay · 30 j · 5 ventes 274,64 € ». |
| Non gradé, gradé | Les deux : « cartes gradées, populations PSA, PCA et CCC » ; cotes gradées non disponibles en Sandbox. |
| Nature du prix | Cardmarket (tendance, bas, offres FR), marché US (TCGplayer), ventes eBay conclues « best effort » (« Les données eBay sont collectées au mieux », CGU de l'API). « 7 sources suivies : 3 de prix, 4 pour le gradé et les populations ». |
| Profondeur | Catalogue : « 375 k 608 k références cartes, langues et variantes » (compteur d'animation, illisible) ; page de couverture (https://valotcg.com/fr/developers/coverage, 16 nov. 2026) : « 184 801 cartes avec un prix du jour Cardmarket, marché US ou eBay (79 % du catalogue) » tous jeux ; Pokémon : 147 121 cartes pour le scanner. Cartes françaises : non isolé. |
| Historique | Historique de prix 30 jours en Sandbox, 90 jours en Starter, 365 jours en Growth/Scale. |
| Accès | API REST JSON. Forfaits (CGU de l'API, https://valotcg.com/fr/developers/terms) : Sandbox gratuit « usage non commercial », 500 crédits/mois, 250 cartes distinctes/mois, « sans lien entre les versions linguistiques d'une carte » ; Starter 19 €/mois ; Growth 49 €/mois ; Scale 99 €/mois (usage commercial). |
| Conditions | Même page : « Sandbox et Essai : usage limité au développement, aux tests et aux prototypes, sans exploitation commerciale. » Interdits : « Exposer les Données brutes à des tiers sous une forme exploitable automatiquement (API publique, flux, téléchargement massif) » ; « Revendre, louer ou redistribuer les Données en flux ou en masse, y compris sous forme de fichiers, d'exports ou de jeux de données » ; attribution obligatoire « Données : ValoTCG ». CGU grand public (https://valotcg.com/terms, 6.1) : « Le Service est destiné à un usage strictement personnel et non commercial » ; interdit « Extraire massivement les données (scraping, crawling automatisé) ». `robots.txt` : `Allow: /` avec exclusions des espaces de compte. |
| Contact | contact@valotcg.com (CGU). |
| Verdict | **D** : l'usage public exige un forfait payant (dès 19 €/mois) et notre branche `data` publique contreviendrait à l'interdiction d'exposer les données brutes ; le Sandbox gratuit est limité au prototypage. À retenir : c'est la seule API trouvée qui ventile Cardmarket et eBay par langue de carte, et un exemple de ce que le marché sait faire. Un accord écrit pour un usage gratuit et libre pourrait être demandé (contact@valotcg.com), mais je ne le classe pas C car le modèle économique de l'éditeur est la licence. |
| Essai | Non fait (D). |

### 11. TCG Crew (tcgcrew.com)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://tcgcrew.com ; France (NUMYXTCG SASU, Vincennes, mentions légales) ; application de collection et outils pour revendeurs (« à partir de 4,99 €/mois » selon un comparatif tiers, non vérifié sur le site) |
| Langue de la carte distinguée ? | **Oui, pour les cartes françaises de 10 € et plus** : méthode publiée (https://tcgcrew.com/methodologie, mise à jour le 5 octobre 2026) : « Pour les cartes françaises de 10 € et plus, TCG Crew relève le premier prix Near Mint de la version française. En dessous, et pour les cartes allemandes, espagnoles et italiennes, la cote est la tendance Cardmarket du produit, commune aux langues d'une même extension. » |
| Non gradé, gradé | Les deux. Gradé : « Une carte gradée est cotée pour sa note exacte (par exemple PSA 10, CCC 9,5), jamais à partir du prix de la carte non gradée », sur « des ventes récentes de la même carte à la même note ». Mêmes principes que ceux du projet. |
| Nature du prix | Cardmarket : premier prix Near Mint de la version française (demandé), relevé « environ tous les deux jours », sinon tendance Cardmarket « protégée » (comparée aux moyennes 7 et 30 jours et à la médiane trois mois) ; guide de prix Cardmarket « importé quotidiennement ». Anglais, japonais : « valeur de référence de la version exacte » dont la source n'est pas nommée. Ventes conclues eBay abandonnées : « Depuis le 19 août 2026, eBay bloque l'accès aux ventes conclues » (déclaration du site, non recoupée). |
| Profondeur | « Les pages publiques des extensions dont les cotes sont vérifiées (la plupart de celles parues depuis 2013) » publient la cote de chaque carte avec sa source. Nombre de cartes : non mesuré. |
| Historique | « l'historique commence au premier relevé réel : aucune courbe n'est reconstituée ». |
| Accès | Pages publiques (`/sets`, `/comparatifs`, `/blog`, autorisées par `robots.txt`) ; application ; pas d'API vue. |
| Conditions | Mentions légales (https://tcgcrew.com/legal) : « Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces éléments est strictement interdite sans l'accord écrit de NUMYXTCG. » `robots.txt` (https://tcgcrew.com/robots.txt) : `Allow: /landing /pricing /blog /sets /comparatifs /outils`, `Disallow: /login /register ...`. |
| Contact | contact@tcgcrew.com (mentions légales). |
| Verdict | **C** : la seule méthode publique française qui sépare le prix de la carte française et qui distingue le gradé par note exacte ; reprise de leurs cotes interdite sans accord écrit. Utile comme point de comparaison et pour confirmer notre propre méthode. |
| Essai | Non fait (C). |

Note : TCG Crew, qui est concurrent et publie des pages comparatives, signale que « Base Set 2, Gym Heroes, Gym Challenge, Legendary Collection et Skyridge ne sont jamais parues en France : les offres "françaises" de ces extensions sur Cardmarket sont des erreurs d'étiquetage ». Déclaration non recoupée, mais utile à vérifier pour notre propre filtre de langue.

### 12. Pokoya

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://pokoya.app ; non vérifié ; application de collection (Android, navigateur) |
| Langue de la carte distinguée ? | Non établi. |
| Non gradé, gradé | Non vérifié. |
| Nature du prix | FAQ (https://pokoya.app/faq) : « Nos prix proviennent de Cardmarket, la plus grande place de marché européenne pour les cartes Pokémon. Ils sont mis à jour quotidiennement à partir des ventes réelles, pas des annonces. » (formulation du site ; Cardmarket publie des tendances calculées, pas des ventes individuelles : à ne pas prendre au mot). |
| Profondeur, historique | Non vérifié. |
| Accès | Application, pas d'API vue. |
| Conditions | Non lues. `robots.txt` : `Allow: /`, `/faq`, `/legal/` ; `Disallow` sur les espaces de compte. |
| Contact | Non vérifié. |
| Verdict | **D** : aucune plus-value de prix (c'est Cardmarket), conditions non lues. |
| Essai | Sans objet. |

### 13. Pokedexia et application Compleo (pokedexia.com)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://pokedexia.com ; projet personnel de fan, éditeur « Pokedexia », pays non vérifié ; site (fiches Pokémon et cartes) et application de collection **Compleo** (iOS, Android) |
| Langue de la carte distinguée ? | **Oui.** Chaque fiche affiche « FR », puis « Near Mint le plus bas · Cardmarket · Prix du 16/11 » et la phrase : « Le prix Near Mint de Gardevoir-ex PAF 233 en version française est de 140,00 € sur Cardmarket (prix du 16 novembre 2026). Dans Compleo, tu as le prix de chaque langue et de chaque état, mis à jour chaque jour. » La même page montre aussi « Tendance Cardmarket · toutes langues et tous états ». |
| Non gradé, gradé | Non gradé seulement. |
| Nature du prix | Prix demandé le plus bas, état Near Mint, version française, relevé du jour sur Cardmarket. L'historique complet est dans l'application (Premium : « courbes sur 30 jours »). |
| Profondeur | Fiches par extension (Écarlate et Violet, Épée et Bouclier, etc.) ; la liste des extensions lue ne contient pas le Set de Base (aucune entrée « base » ancienne, seulement `mega-evolution-base` et `ecarlate-et-violet-base`). Nombre de cartes françaises : non mesuré. |
| Historique | Non vérifié. |
| Accès | Pages et application ; pas d'API vue. |
| Conditions | CGU (https://pokedexia.com/fr/cgu), article 5 : sont interdits « extraire, copier ou réutiliser massivement le contenu du Service (scraping, aspiration de données) sans autorisation » ; article 7 : « Toute reproduction, représentation, modification ou diffusion, totale ou partielle, sans autorisation préalable, est interdite. » Article 8 : « Le Service s'appuie sur des sources tierces, notamment PokéAPI, TCGdex et Cardmarket. » `robots.txt` : les robots d'entraînement d'IA sont bloqués ; `User-agent: *` autorisé. |
| Contact | Formulaire https://pokedexia.com/fr/contact (mentions légales). |
| Verdict | **C** : prix « Near Mint, version française, Cardmarket » exactement ce que nous voulons, mais lecture à l'unité seulement et reprise sans autorisation interdite ; la façon dont ils obtiennent le prix Cardmarket par langue n'est pas écrite (non vérifié). |
| Essai | Lecture de deux fiches le 16 novembre 2026, prix le plus bas Near Mint français sur Cardmarket. 1. Dracaufeu Set de Base 4/102 FR : **non trouvé** (série absente de la liste). 2. Mew ex 205/165 FR : **non trouvé** (l'adresse attendue `.../ecarlate-et-violet-151/mew-ex-mew-205` répond 404 ; seule `mew-ex-mew-193` existe). 3. Noctali VMAX 215/203 FR : **3 000,00 €**, « Stable » (https://pokedexia.com/fr/cartes-pokemon/extensions/epee-et-bouclier-evolution-celeste/noctali-vmax-evs-215). Même carte à **1 199,00 €** sur PkmCards.fr le même jour : écart de 2,5 fois, à expliquer (offre unique ? état ? vendeurs ?) avant de se fier à un seul de ces relevés. |

### 14. Cardzia

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://cardzia.fr ; France (Cardzia SAS, Aix-en-Provence, CGV) ; application de scan et d'estimation Pokémon, One Piece, Lorcana, Yu-Gi-Oh! (« 150 000+ collectionneurs », déclaratif) |
| Langue de la carte distinguée ? | **Oui, annoncé.** Fiche App Store (https://apps.apple.com/app/id6751027816) : « Toutes les estimations proviennent de vraies ventes réalisées sur le marché de chaque langue » ; le site : « Vos cartes françaises, japonaises ou chinoises ». |
| Non gradé, gradé | Non gradé ; « Prix séparés selon l'état et la rareté ». Gradé : non vérifié. |
| Nature du prix | « d'après les dernières ventes réalisées sur le marché » ; CGU article 10.1 : « calculées automatiquement à partir de données de marché émanant de sources tierces (places de marché, historiques de ventes, cotations publiques) ». **Sources non nommées.** |
| Profondeur, historique | Non vérifié. Société née en 2023 (page d'accueil). |
| Accès | Application ; pas d'API. Premium : 6,99 $ par mois ou 44,99 $ par an (fiche App Store américaine). |
| Conditions | CGU (https://cardzia.fr/conditions-generales-dutilisations/), article 7 : sont interdits « toute tentative de reproduction, d'extraction massive, de scraping ou de réutilisation des données et estimations de l'Application » ; « Toute utilisation à des fins commerciales ou professionnelles est interdite, sauf accord écrit préalable » (suite de phrase coupée dans ma lecture). `robots.txt` : Googlebot, Bingbot, Applebot autorisés ; reste non lu. |
| Contact | contact@cardzia.fr (CGV). |
| Verdict | **C** : méthode annoncée proche de la nôtre mais sources inconnues et réutilisation interdite. |
| Essai | Non fait. |

### 15. Booster Breakerz, « la cote des cartes Pokémon »

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://booster-breakerz.fr/cartes-pokemon/ ; France ; site d'actualités jeux vidéo avec un module « cote » du JCC, publicité Google AdSense et liens affiliés (CGU) |
| Langue de la carte distinguée ? | **Non, et c'est écrit.** « Cotes Cardmarket en euros, relevées le 27 août 2026. Elles portent sur la carte toutes langues confondues, pas sur la seule version française. » |
| Non gradé, gradé | Non gradé. |
| Nature du prix | Cote Cardmarket toutes langues. |
| Profondeur | « 19 797 cartes · 182 sets · 17 012 cartes cotées » sur la page d'index, « paru en français, du Set de Base de 1999 aux sorties les plus récentes » (déclaratif, relevé 16 nov. 2026). Cotes datées du 27 août 2026 : peu à jour. |
| Historique | Non vérifié. |
| Accès | Pages (sitemap `sitemap-cartes.xml` publié dans `robots.txt`). Un accès répété a déclenché une réponse 429 de l'hébergeur : je me suis arrêté. |
| Conditions | CGU (https://booster-breakerz.fr/conditions-generales-dutilisation-cgu), 4.1 : « Toute reproduction, totale ou partielle, sans autorisation est interdite (article L.122-5 du Code de la propriété intellectuelle). » `robots.txt` : `User-agent: *` / `Allow: /wp-admin/admin-ajax.php`, pas d'interdiction des fiches. |
| Contact | Page https://booster-breakerz.fr/contact (non ouverte). |
| Verdict | **C** : cote datée de moins fraîche et toutes langues ; aucun intérêt prix, mais l'index français du catalogue (19 797 cartes) est un point de comparaison. |
| Essai | Non fait. |

### 16. Pokémon Trash (cartes-pokemon)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.pokemontrash.com/cartes-pokemon ; France ; site communautaire (jeux, soluces, cartes) avec un module « Ma Collection » et « Cotes du marché » |
| Langue de la carte distinguée ? | Non établi. La page https://www.pokemontrash.com/cartes-pokemon/prix « Top 1000 Cartes les Plus Chères » affiche des prix en euros avec « Tendance 7j » (ex. « Lugia Aquapolis 1 265,05 € -30% ») sans dire la langue ni la source. |
| Non gradé, gradé | Non gradé supposé. |
| Nature du prix | **Non déclarée** (« prix actualisés et tendances »). |
| Profondeur, historique | Top 1 000 seulement ; le reste non vérifié. |
| Accès | Pages ; `robots.txt` : `User-Agent: * / Allow: / / Disallow: /api/`. |
| Conditions | Non trouvées (aucune page CGU relevée en pied de page). |
| Contact | contact@pokemontrash.com (pied de page). |
| Verdict | **C** (doute) : source de prix non déclarée, conditions absentes. |
| Essai | Non fait. |

### 17. Cards N Packs, cote des cartes françaises gradées PSA

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.cardsnpacks.com ; France ; boutique et enchères de cartes gradées ; **publie ses propres ventes** dans un article de marché (« Cote des cartes Pokémon françaises gradées PSA : 244 ventes analysées », 27 septembre 2026) |
| Langue de la carte distinguée ? | **Oui** : « 244 ventes de cartes Pokémon en version française notées par PSA ». Remarque du site : « Beaucoup de prix affichés en ligne sont des prix demandés, pas des prix obtenus, et ils mélangent souvent les versions anglaise, japonaise et française. » |
| Non gradé, gradé | Gradé PSA seulement (« 6 ventes ... CGC : trop peu pour une cote »). Brutes non comptées. |
| Nature du prix | **Vente réalisée** : « prix payé, remises déduites, hors port », commandes payées du 14 mars au 25 septembre 2026 sur eBay. Médiane et quartiles par **note et époque**, pas par carte (ex. Wizard PSA 10 : médiane 300 €, 48 ventes ; Moderne PSA 10 : 315 €, 69 ventes ; le site écrit lui-même que les quartiles sont larges). Aucune case sous 10 ventes. |
| Profondeur | 244 ventes, dont 110 du Set de Base ; trop peu pour une cote par carte. |
| Historique | Une période, six mois, pas de série régulière. |
| Accès | Pages (article). |
| Conditions | `robots.txt` (https://www.cardsnpacks.com/robots.txt) : `User-agent: * / Allow: /` ; robots d'entraînement dont ClaudeBot bloqués après un incident de charge décrit dans le fichier. Pas de clause relevée sur la réutilisation de l'article ; mentions légales https://www.cardsnpacks.com/mentions-legales/ non lues. |
| Contact | https://www.cardsnpacks.com/contact/ |
| Verdict | **C** : seul relevé de ventes réelles françaises gradées trouvé dans cette famille, mais agrégé par note ; utilisable tout au plus comme repère de contrôle, avec accord. |
| Essai | Dracaufeu 4/102 gradé : pas de médiane propre à la carte dans l'article (le tableau est par note et époque). |

### 18. Dex (dextcg.com, éditeur Dexbit)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://dextcg.com ; droit portugais (CGU) ; application de collection, web gratuit, « Dex+ » payant |
| Langue de la carte distinguée ? | Non, d'après un comparatif tiers (folio.fyi) : « Une seule région « International » » ; non vérifié chez Dex. |
| Non gradé, gradé | Non vérifié. |
| Nature du prix | « Live market prices TCGplayer, Cardmarket, CardTrader and eBay, converted to your currency » (accueil). |
| Profondeur, historique | « More than 25,000 reviews » ; reste non vérifié. |
| Accès | Application, web ; pas d'API vue. |
| Conditions | https://dextcg.com/terms-of-service : « We grant you a limited, non-exclusive, revocable license to use the Services for personal, non-commercial purposes. » `robots.txt` : `Allow: /` pour tous. |
| Contact | Page https://dextcg.com/help ; pas d'adresse lue. |
| Verdict | **D** : usage personnel non commercial, aucune distinction de langue, pas de plus-value par rapport aux sources qu'il agrège. |
| Essai | Sans objet. |

### 19. Limitless TCG (limitlesstcg.com)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://limitlesstcg.com ; non vérifié ; base de cartes et de tournois |
| Langue de la carte distinguée ? | Le texte des cartes existe en 7 langues (page À propos) ; le prix, non : fiche SVI #1 : « Scarlet & Violet #1 $0.11 0.03€ », liens « Buy on TCGplayer / Buy on Cardmarket », sans langue. |
| Non gradé, gradé | Non gradé. |
| Nature du prix | TCGplayer (USD) et Cardmarket (EUR), prix d'achat affichés. |
| Profondeur, historique | Non mesuré ; « Price History » présent. |
| Accès | Pages. |
| Conditions | Pas de page d'utilisation (`/terms` répond 404) ; « Site Notice » non lue. `robots.txt` : « User-agent: * / Disallow: » (vide : tout est permis). |
| Contact | https://limitlesstcg.com/contact (non ouvert). |
| Verdict | **C** (doute : conditions non lues) ; sans intérêt pour le français. |
| Essai | Sans objet. |

### 20. Autres sources examinées plus brièvement

| Source | Ce qui a été lu | Verdict |
| --- | --- | --- |
| PokeData (pokedata.io) | `robots.txt` : « User-agent: * / Disallow: ». Page d'accueil : prix en USD (« Mega Rayquaza ex Holofoil 141 Raw $349.35 »), onglets « English Japanese Chinese », Pokedata PRO. Page des conditions (`/termsandconditions`) vide à l'affichage, FAQ 404 : conditions et sources **non vérifiées**. Aucun français. | C (doute), sans intérêt |
| pkmncards.com | `robots.txt` : « Disallow: /*?s= » seulement. Fiches de cartes anglaises avec un prix TCGplayer (« 499.99 » pour Charizard Base Set 4) et liens affiliés. TCGplayer seul : exclu par notre règle du prix américain. | D (sans objet) |
| PokePrices.io (pokeprices.io) | « 100% Free No Login No Data Collection », « Price guide rebuilt nightly from recent sold-sales activity », « English & Japanese sets ». `robots.txt` : `Allow: /`, `Disallow: /admin /intel /api`. Conditions non lues. Pas de français. | D (sans objet) |
| CollX (collx.app) | Conditions (https://www.collx.app/terms) : « extensively or automatically copy any content from the Services (in other words, no scraping). You may use our Services only for your personal non-commercial use ». `robots.txt` : sitemap seul. Marché américain. | D |
| TCGCollector (tcgcollector.com) | Page d'accueil derrière Cloudflare (« Performing security verification »), `robots.txt` : connexion refusée (réinitialisation). Non lu. Un comparatif tiers écrit que la langue n'a aucun effet sur le prix (non vérifié). | D (inaccessible) |
| Card Ladder (cardladder.com) | Cloudflare (« Performing security verification »), `robots.txt` non servi (502 sur `www`, 404 sur le domaine nu). Non lu. | D (inaccessible) |
| Mavin (mavin.io) | `robots.txt` servi en `curl` (« User-agent: * / Allow: / ») mais le navigateur est redirigé vers une page de vente du domaine (GoDaddy « forsale ») : service apparemment arrêté. À revérifier par un humain. | D |
| Cardboard (cardboard.app), Ludex (ludex.ai) | Aucune réponse exploitable : tunnel refusé (502), `ludex.ai` réinitialise la connexion ou répond 502. Non lus. | D (inaccessible) |
| Rare Candy (rarecandy.com) | Place de marché américaine de produits (boîtes scellées, cartes), « Unlimited free TCG card scanner ». Pas de cote lue. | D (sans objet) |
| Shiny | « Shiny » trouvé (getshiny.app) est une application de nettoyage de photos pour iPhone, sans rapport avec les cartes. Aucune application de cartes de ce nom trouvée. | Hors sujet |
| MyPokeCard (mypokecard.com) | Générateur de cartes personnalisées, pas de cote. | Hors sujet |
| Poképédia (pokepedia.fr) | Encyclopédie collaborative ; la page d'une carte (Dracaufeu, Set de Base 4) ne contient pas de prix. `robots.txt` : exclusions de pages spéciales seulement. | D (pas de cote) |
| Pokébip (pokebip.com) | Site communautaire ; pas de cote vue ; pied de page renvoie vers PokéCardex. `robots.txt` : « User-agent: ClaudeBot / Disallow: / », autres autorisés hors forum et compte. | D (pas de cote) |
| Pokécote / Poké-cote (pokecote.com) | Le domaine répond « This deployment is temporarily paused » (HTTP 402, hébergeur Vercel) ; `www.poke-cote.fr` : tunnel refusé. Aucun site actif trouvé par la recherche. | D (inaccessible) |
| Pokéscan (pokescan.fr) | Erreur TLS puis 502 « upstream request failed ». Une recherche ne trouve que des applications anglophones de même nom. Non vérifié. | D (inaccessible) |
| Cardex (cardex.fr) | Homonyme sans rapport : impression de cartes plastiques et badges. Aucune application de cartes Pokémon de ce nom trouvée. | Hors sujet |
| Cardmarket « tendance de prix » (rappel) | Pas réexaminé. Selon un comparatif tiers (folio.fyi), la tendance est « une régression sur les 28 derniers jours de vente » et les langues d'un produit « partagent un produit et une tendance » : à recouper par la famille Cardmarket. | Rappel |
| Cotes papier, magazines | Une recherche (« argus », « catalogue de cotation ») ne remonte aucun guide papier français de cote des cartes Pokémon ; seulement des boutiques qui publient leur cote en ligne. Non vérifié en librairie. | Aucune trouvée |

## Tableau récapitulatif

Légende : langue = la version française a-t-elle une valeur distincte de l'anglaise ? Oui, Non, ? (non établi). Nature : D = demandé, V = vente réalisée.

| # | Source | Adresse | Type | Langue distinguée | Gradé | Nature du prix | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | PokéCardex | pokecardex.com | appli FR | ? (liens Cardmarket filtrés) | non (collection seulement) | Cardmarket, TCGplayer | C |
| 2 | TCG Sense | tcgsense.com | appli FR | ? (collection par langue) | ? | cote européenne, source non lue | C |
| 3 | Collectr | getcollectr.com | appli | ? | oui | eBay, TCGplayer (V) | D |
| 4 | PriceCharting | pricecharting.com | guide US | non | oui | ventes, USD, payant | D |
| 5 | Pokellector | pokellector.com | catalogue US | non | non | annonces de marchands | D |
| 6 | PokemonPriceTracker | pokemonpricetracker.com | API | non | oui | eBay, TCGplayer, Cardmarket | D |
| 7 | PokeTrace | poketrace.com | API | non | oui (payant) | eBay (V), TCGplayer, Cardmarket | D |
| 8 | PkmCards.fr | pkmcards.fr | site FR | **oui** | non | Cardmarket plus bas, vendeurs francophones (D) | C |
| 9 | ZebraDex | zebradex.fr | appli FR | annoncé (« Prix FR ») | non | ventes conclues, source non nommée (V) | C |
| 10 | ValoTCG / Valo.Data | valotcg.com | appli + API FR | **oui** (API) | oui | Cardmarket, eBay (V), TCGplayer | D |
| 11 | TCG Crew | tcgcrew.com | appli FR | **oui** (≥ 10 €) | oui (par note) | Cardmarket 1er prix NM français (D) | C |
| 12 | Pokoya | pokoya.app | appli | ? | ? | Cardmarket | D |
| 13 | Pokedexia / Compleo | pokedexia.com | site + appli | **oui** | non | Cardmarket NM français plus bas (D) | C |
| 14 | Cardzia | cardzia.fr | appli FR | annoncé | ? | ventes « de chaque langue », source non nommée | C |
| 15 | Booster Breakerz | booster-breakerz.fr | site FR | non (écrit) | non | Cardmarket toutes langues | C |
| 16 | Pokémon Trash | pokemontrash.com | site FR | ? | non | non déclarée | C |
| 17 | Cards N Packs | cardsnpacks.com | boutique FR | **oui** | oui (PSA, par note) | ses ventes eBay (V) | C |
| 18 | Dex | dextcg.com | appli | non | ? | TCGplayer, Cardmarket, CardTrader, eBay | D |
| 19 | Limitless TCG | limitlesstcg.com | base de cartes | non | non | TCGplayer, Cardmarket (D) | C |
| 20 | PokeData | pokedata.io | site US | non | ? | USD, non lu | C |
| 21 | pkmncards.com | pkmncards.com | catalogue US | non | non | TCGplayer | D |
| 22 | PokePrices.io | pokeprices.io | site | non | oui (PSA 10) | ventes, source non lue | D |
| 23 | CollX | collx.app | appli US | ? | ? | non lu | D |
| 24 | TCGCollector | tcgcollector.com | appli | ? | ? | inaccessible | D |
| 25 | Card Ladder | cardladder.com | guide US | ? | oui | inaccessible | D |
| 26 | Mavin | mavin.io | guide US | ? | ? | domaine à vendre | D |
| 27 | Cardboard, Ludex | cardboard.app, ludex.ai | applis | ? | ? | inaccessibles | D |
| 28 | Rare Candy | rarecandy.com | place de marché US | ? | ? | pas de cote lue | D |
| 29 | Poképédia, Pokébip | pokepedia.fr, pokebip.com | communauté FR | sans objet | sans objet | pas de prix | D |
| 30 | Pokécote, Pokéscan | pokecote.com, pokescan.fr | ? | ? | ? | sites inactifs | D |
| 31 | Shiny, MyPokeCard, Cardex | | | hors sujet | | | hors sujet |

Décompte : 0 A, 0 B, 12 C, 21 D, 3 hors sujet, soit 36 noms examinés. Parmi eux, 7 sont injoignables ou parqués (TCGCollector, Card Ladder, Mavin, Cardboard, Ludex, Pokécote, Pokéscan) ; TCG Sense n'a été lu que par `robots.txt`, `llms.txt` et les sitemaps. Les 28 autres ont eu au moins une page ou leurs conditions lues.

## D'où les autres tirent leurs prix

Sources amont déclarées par chaque agrégateur ou application (déclaratif sauf mention). « Non nommée » = le site dit se baser sur des ventes ou des places de marché sans les citer.

| Source | Marché amont déclaré | Où c'est écrit |
| --- | --- | --- |
| PokéCardex | Cardmarket, TCGplayer | https://www.pokecardex.com/app : « Suivez le prix de vente sur les plateformes Cardmarket et TCGPlayer » |
| TCG Sense | « marché européen » (précision non lue) | `llms.txt` |
| Collectr | eBay, TCGplayer (guide) ; Cardmarket et eBay en Europe selon un comparatif tiers | https://www.getcollectr.com/prices |
| PriceCharting | ventes réalisées, source non relevée | non vérifié |
| Pokellector | TCGplayer, Troll & Toad, eBay (annonces), Collector's Cache, Cool Stuff Inc | fiche Charizard Base Set |
| PokemonPriceTracker | eBay, TCGplayer, Cardmarket ; données de gradation et populations | `/faq`, `/licensing` (« we don't disclose how it is collected ») |
| PokeTrace | eBay (ventes), TCGplayer, Cardmarket ; 15 sociétés de gradation | https://poketrace.com/pricing |
| PkmCards.fr | Cardmarket **et Cardnexus** | fiches de cartes |
| CardNexus (feedback.cardnexus.com) | Cardmarket (Europe), TCGplayer (Amérique du Nord) | https://feedback.cardnexus.com/help/articles/2287029-understanding-prices |
| ZebraDex | ventes conclues, vendeurs bien notés, place non nommée | `/methodologie-prix` |
| ValoTCG / Valo.Data | Cardmarket, TCGplayer (marché US), ventes eBay « best effort » ; populations PSA, PCA, CCC | https://valotcg.com/fr/developers |
| TCG Crew | **guide de prix Cardmarket « importé quotidiennement »**, premier prix Near Mint français relevé sur Cardmarket ; API officielle d'eBay pour les annonces en cours ; source des « valeurs de référence » anglais/japonais non nommée | https://tcgcrew.com/methodologie |
| Pokoya | Cardmarket | `/faq` |
| Pokedexia / Compleo | Cardmarket, TCGdex, PokéAPI | CGU, article 8 |
| Cardzia | « places de marché, historiques de ventes, cotations publiques », non nommées | CGU, article 10.1 |
| Booster Breakerz | Cardmarket, toutes langues | page d'index |
| Cards N Packs | ses propres ventes eBay | article du 27 septembre 2026 |
| Dex | TCGplayer, Cardmarket, CardTrader, eBay | accueil |
| Limitless TCG | TCGplayer, Cardmarket | fiches de cartes |
| pkmncards.com | TCGplayer | fiches de cartes |
| TCGdex (déjà utilisé par le projet) | Cardmarket (EUR, quotidien), TCGplayer (USD, horaire à quotidien) | https://tcgdex.dev/markets-prices |

À retenir pour le chantier :
- Presque tous remontent à **Cardmarket** (et à TCGplayer pour l'Amérique). Aucune source indépendante de prix de ventes françaises n'a été découverte, hormis les ventes propres de Cards N Packs (gradé).
- Sources amont nouvelles par rapport à ce que nous connaissions : **Cardnexus** (place de marché, aussi lue par PkmCards.fr), le **guide de prix Cardmarket importé quotidiennement** (cité par TCG Crew ; d'où il vient exactement, fichier public ou accès réservé, n'est pas écrit : non vérifié), et les API **Valo.Data** et **PokeTrace** (payantes pour l'Europe).
- Les sites qui distinguent la langue (PkmCards.fr, Pokedexia, TCG Crew, ValoTCG) le font tous de la même façon : **premier prix Near Mint filtré sur la langue française sur Cardmarket**, éventuellement avec les vendeurs francophones, ce qui est un prix demandé. Les écarts entre eux sur une même carte (Noctali VMAX 215/203 : 1 199 € contre 3 000 € le 16 novembre 2026) montrent qu'un seul relevé n'est pas fiable sans plancher d'offres.
- TCG Crew écrit que, depuis le 19 août 2026, eBay bloque l'accès aux ventes conclues ; ValoTCG qualifie sa collecte eBay de « best effort ». À recouper avec la famille eBay.
- Déclaration de TCG Crew à vérifier avant d'écrire notre filtre de langue : les offres « françaises » de Base Set 2, Gym Heroes, Gym Challenge, Legendary Collection et Skyridge sur Cardmarket seraient des erreurs d'étiquetage.

## Sources croisées hors de ma famille

- Cardmarket (prix tendance, guide de prix, filtre de langue et de vendeur) : famille Cardmarket.
- TCGdex (prix Cardmarket et TCGplayer, déjà intégré) : famille API de catalogue.
- CardNexus (place de marché, prix Cardmarket) : à examiner comme place de marché.
- CardTrader (déjà intégré, cité par Dex).
- eBay : API officielle d'annonces en cours ; ventes conclues bloquées selon TCG Crew.
- Cards N Packs : boutique et enchères de cartes gradées, ventes eBay propres.
- Autres applications françaises vues en passant, non examinées : TCG Pro (tcgpro.fr), iEstims, Scanémon, Treasurewise (lien partenaire de PokéCardex).

## Marchés anglais, américain, japonais (à noter sans approfondir)

- TCGplayer : prix américain, exclu de tout prix affiché par notre règle ; Collectr, PokeTrace, PokemonPriceTracker, Pokellector, pkmncards.com et Limitless l'affichent.
- eBay États-Unis : ventes conclues relayées par PokeTrace, PokemonPriceTracker, PriceCharting, PokePrices.io.
- Japon : PokeData, PokePrices.io, PokemonPriceTracker (page « Japanese Card Prices ») ont des prix japonais ; non examinés.

## Ce que je n'ai pas pu vérifier

- TCG Sense : méthode de cote, conditions, couverture française, prix par langue, gradé (pages derrière un défi Cloudflare, non contourné).
- Cardmarket « guide de prix importé » : accès exact à ce fichier.
- Pages de cartes sur PokéCardex (adresse non trouvée), PokeData (conditions vides), Pokoya (conditions), Pokémon Trash (source), TCGCollector, Card Ladder, Cardboard, Ludex, Pokéscan, Pokécote.
- Couverture en nombre de cartes françaises avec prix : aucune mesure faite (pas d'extraction en masse) ; seuls des chiffres déclaratifs.
- Écart Noctali VMAX 1 199 € contre 3 000 € : non expliqué.

## Crédits Firecrawl dépensés

0. Aucun appel à Firecrawl (ni scrape, ni recherche, ni exécution de fournisseur Alexandria).

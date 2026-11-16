# Sociétés de gradation, registres de population et prix gradés

Inventaire du 16 novembre 2026, rédigé selon `_consignes.md`. Pages lues avec WebFetch, `curl` (robots.txt) et un navigateur Playwright sans compte. « Non vérifié » signifie : pas lu par moi-même.

## Récapitulatif

(complété en fin de travail)

## Fiches

### PSA (Professional Sports Authenticator, groupe Collectors)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.psacard.com — États-Unis (Collectors Holdings). Société de gradation : Population Report, Auction Prices Realized, Price Guide, CardFacts, API publique. |
| Langue de la carte distinguée ? | Dans le libellé de la fiche PSA (nom du set ou variété, ex. « French » dans les intitulés des ventes eBay de dalles PSA) ; non vérifié directement : la recherche du Pop Report m'a renvoyé vers la page de connexion. |
| Non gradé, gradé | Gradé PSA seulement, notes 1 à 10 avec demi-notes et qualificatifs (le modèle `PSASpecPopSummmaryModel` de l'API liste `Grade1` … `Grade10`, `Grade1Q` …, `Auth`). |
| Nature du prix | Auction Prices Realized : ventes réalisées (enchères eBay et maisons partenaires). Price Guide : cote PSA. Non lus : accès refusé (voir Accès). |
| Profondeur | Non mesurée (pages fermées sans compte). |
| Historique | Non vérifié. |
| Accès | **Pages** : le 16/11/2026, `/pop` et `/pop/search?q=…` redirigent vers `app.collectors.com/signin` (« Sign in or create an account by entering your email below ») ; `/auctionprices/search?q=…` redirige aussi vers la connexion ; `/auctionprices` affiche un défi Cloudflare (« Vérification de sécurité en cours », statut 403). **API** : `https://api.psacard.com/publicapi/` (Swagger lu : `https://api.psacard.com/publicapi/swagger.json`) expose six méthodes, dont `GET /pop/GetPSASpecPopulation/{specID}` (population par note pour une fiche « spec ») et `GET /cert/GetByCertNumber/{certNumber}` (renvoie `SpecID`, `Variety`, `CardGrade`, `TotalPopulation`, `PopulationHigher`). Aucune méthode de prix. Jeton obtenu « using your PSA login credentials » : compte PSA gratuit obligatoire. |
| Conditions | Page API (https://www.psacard.com/publicapi/documentation) : « All PSA Public API requests must be made over HTTPS » ; « Review the PSA API End User Agreement » — le lien renvoie à https://www.psacard.com/publicapi, qui n'affiche l'accord qu'après connexion : **texte de l'accord non lu**. Le quota gratuit de 100 appels par jour est cité par des tiers (cardgrader.ai, Apify) ; **non vu sur les pages PSA lues**. Conditions générales du groupe, « User Agreement, Last Updated: September 29, 2026 » (https://app.collectors.com/collectorsuseragreement) : « We grant you a limited, revocable, non-transferrable, non-sublicensable, non-exclusive license to access and make informational, personal and non-commercial use of the Services and Content » ; « It is strictly prohibited to modify, transmit, distribute, reuse, repost, “frame” or use the Content for public or commercial purposes […] without written permission from an authorized representative of Collectors » ; interdiction d'utiliser « any “deep-link”, “page-scrape”, “robot”, “spider”, or other automatic device […] to: (1) retrieve, scrape, access, acquire, copy, or monitor any portion of the Services or Content ». `robots.txt` (lu via navigateur, `curl` reçoit un défi Cloudflare) : `User-agent: * / Crawl-delay: 1 / Disallow: /content/pdf/ /dealers/gotodealer/ /myaccount/`. |
| Contact | `collectors-apis@collectors.com` (publié sur https://www.psacard.com/publicapi/documentation : « For questions, please contact collectors-apis@collectors.com »). |
| Verdict | **C**. L'API de population existe et est gratuite avec compte, mais l'accord d'utilisation de l'API n'est lisible qu'après inscription, et l'accord général interdit toute réutilisation publique du contenu sans permission écrite. Pages pop et prix : fermées sans compte (connexion, Cloudflare) et collecte automatisée interdite. Demander par écrit à `collectors-apis@collectors.com` l'autorisation d'afficher des populations PSA de cartes françaises (et l'accès au quota). |
| Essai | Non fait (verdict C ; pages refusées sans compte). |

Note : le même accord couvre, selon son préambule, « New SGC LLC; Ladder Studios, Inc.; […] Beckett Collectibles, LLC » : SGC, Card Ladder et Beckett relèvent désormais des mêmes conditions que PSA (voir leurs fiches).

### PCA (Professional Cards Authenticator, France)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://pcagrade.com/fr/ — France. Société de gradation (« PCA, Leader Européen de la Certification de Cartes »), boutique d'accessoires (`/fr/produit/`). Attention : `pcagrading.com` est un autre site (« Coming Soon », `robots.txt` `Disallow: /` pour tous). |
| Langue de la carte distinguée ? | Non vérifié (la page de vérification de certificat est bloquée). |
| Non gradé, gradé | Gradé PCA, échelle sur 10 (page d'accueil : « Échelle de notation »). |
| Nature du prix | Aucun prix de carte publié : la page d'accueil n'affiche que le tarif du service (« Certification de vos cartes à partir de 10,90 euros »). |
| Profondeur | Aucun registre de population trouvé : pas de lien « population » dans le menu de la page d'accueil (liens lus : Blog, Ressources, Tarifs, Shop, À propos, Services, Vérifier l'authenticité) ; recherches web sans résultat. |
| Historique | Sans objet. |
| Accès | Pages seulement. `/fr/verif` redirige vers `/fr/check-certification`, qui renvoie un défi Cloudflare (statut 403). `/fr/mentions` et `/fr/contact` : « Sorry, you have been blocked » (Cloudflare). WebFetch reçoit 403 sur `/en/ressources`. Pas d'API publique connue. |
| Conditions | `robots.txt` (https://pcagrade.com/robots.txt) : `User-agent: *` avec notamment `Disallow: /api/`, `Disallow: /carte/`, `Disallow: /guide/`, `Disallow: /pdf/`. Mentions légales et CGV (`/fr/conditions`) : **non lues**, bloquées par Cloudflare. |
| Contact | Téléphone publié en page d'accueil : 01 88 61 04 08. Formulaire `/fr/contact` (bloqué pour moi). Adresse électronique : non vérifiée. |
| Verdict | **D** (inaccessible) pour la collecte : pas de population publiée, vérification de certificat derrière Cloudflare, `/carte/` interdit par le `robots.txt`. Seule voie : un accord écrit avec PCA (cela deviendrait **C**), qui serait précieux puisque PCA est la société française la plus citée. |
| Essai | Non fait. |

### Collect Aura (CollectAura, France)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.collectaura.com — France. Société de gradation (boutique Shopify), avec **rapport de population public** : https://www.collectaura.com/pages/rapport-de-population. |
| Langue de la carte distinguée ? | **Oui, champ distinct** : colonne « Lng » de la page, champ `language` (`fr`, `jp`, `en`…) dans les données. Les noms de cartes et d'extensions sont en français pour les cartes `fr` (« Wizards Set de base », « E&B Évolution Céleste »). |
| Non gradé, gradé | Gradé Collect Aura seulement. Échelle (https://www.collectaura.com/pages/grading-scale) : 1 à 10 avec 9.5, deux « 10 » (« Perfect » : « Carte dont les 4 subgrades affichent une note de 10 », et « Gem Mint »), plus A (Authentic), OC, MP (Misprint), MC, CP (Crimped), MK (Marked). Dans les données, une clé `11` apparaît à côté de `10` : probablement le « Perfect » (déduction, non documentée), et des clés combinées comme `9 MP`. |
| Nature du prix | **Aucun prix** : population seulement. Le site vend des services et des accessoires, pas de cartes. |
| Profondeur | Non mesurée dans son ensemble. Mesuré le 16/11/2026 : la recherche « charizard » renvoie `total: 331` fiches ; la recherche « dracaufeu » est plafonnée à 20 résultats par requête (« 20 cartes max, veuillez affiner votre recherche »). Les cartes modernes françaises ont des populations de plusieurs centaines par fiche (Dracaufeu ex 199/165 : 868). |
| Historique | Population cumulée à la date de lecture ; pas d'historique publié. |
| Accès | La page appelle une interface JSON sans authentification : `GET https://population-api.collectaura.com/api/public/reports/search?limit=20&name=<nom>` (paramètre `number` accepté, ex. `number=4%2F102`). Réponse : `card_name`, `variant`, `number`, `expansion_name`, `language`, `grades` (effectif par note), `total`. Non documentée, pas de clé. `https://population-api.collectaura.com/robots.txt` : 403. |
| Conditions | `robots.txt` du site (https://www.collectaura.com/robots.txt) : `User-agent: * / Allow: /` (pages), et commentaire « Agents must: - Identify agent-initiated requests using the integration's required identity and authentication mechanisms ». `agents.md` : « You may also read public HTML pages for additional context, provided your requests follow the agent-identification guidance above. » **Mais** mentions légales (https://www.collectaura.com/policies/legal-notice) : « Toute forme de reproduction totale ou partielle, d’aspiration et de reproduction de la base de données produite et exploitée par CollectAura sur le Site est formellement interdite sans son accord écrit et préalable » ; « Il est également interdit d’extraire, de reproduire ou de réutiliser par tout moyen et sur tout support tout ou partie du Contenu sans l’autorisation expresse et écrite de CollectAura. » Et même : « Il est strictement interdit de mettre en place un lien hypertexte en direction du site sans l'autorisation écrite et préalable de CollectAura. » |
| Contact | `contact@collectaura.com` (publié dans les CGV, https://www.collectaura.com/policies/terms-of-sale, et les mentions légales, qui l'indiquent pour les demandes d'autorisation). |
| Verdict | **C**. Techniquement la meilleure source de population de cartes françaises trouvée (langue en champ distinct, notes détaillées, interface JSON publique), mais l'extraction et la réutilisation de la base sont interdites sans accord écrit. Demande d'accord prioritaire à `contact@collectaura.com` (la même adresse sert aux demandes de lien). |
| Essai | Lecture ponctuelle de caractérisation (5 requêtes), 16/11/2026 : **Dracaufeu 4/102 « Wizards Set de base », `fr`** : total 51 — A 16, AA 2, 1 : 6, 2 : 2, 3 : 4, 4 : 9, 5 : 6, 6 : 1, 7 : 3, 8 : 1, « NO HOLDER » 1. **Dracaufeu 1ère Éd. 4/102** : deux fiches, total 25 (dont 9.5 : 1, 9 : 2) et total 1. **Mew ex 205/165 « E&V 151 », `fr`** : total 329 (10 : 61, 9.5 : 183, 9 : 55). **Noctali VMAX 215/203 « E&B Évolution Céleste », `fr`** : total 86 (10 : 18, 9.5 : 35). Aucun prix (la source n'en publie pas). |

### CGC Cards (Certified Guaranty Company)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.cgccards.com (États-Unis) et https://www.cgccards.uk (Royaume-Uni, même base) — société de gradation ; Population Report public, registre de collections (`/registry/trading-cards/`). |
| Langue de la carte distinguée ? | **Oui, par extension** : la langue fait partie du nom de l'extension dans la population (« Base Set - 1st Edition - French », « Base Set - Unlimited - French », « Scarlet & Violet 151 - MEW FR - French », 16 extensions « French » dans la seule série Écarlate et Violet). Les noms de cartes restent en anglais (« Charizard »). |
| Non gradé, gradé | Gradé CGC : Perfect 10, Pristine 10, Gem Mint 10, Mint+ 9.5, 9 à 1 par demi-points, AU, AA. |
| Nature du prix | Aucun prix dans la population ; un lien « Shop Now! » par carte (eBay Partner Network : « Affiliate programs and affiliations include, but are not limited to, the eBay Partner Network »). |
| Profondeur | Mesuré sur la page Pokémon le 16/11/2026 : « 13,244,923 graded » pour Pokémon (toutes langues) ; « Last Updated 16/11/2026 ». Extensions françaises : « Base Set - 1st Edition - French » 5 145 cartes notées, « Base Set - Unlimited - French » 448, « Scarlet & Violet 151 - MEW FR - French » 87. Les volumes français modernes sont faibles. |
| Historique | Population cumulée, mise à jour quotidienne (date affichée). Pas d'historique. |
| Accès | Pages HTML sans compte sur `cgccards.uk`. `cgccards.com` m'a bloqué (Cloudflare « Sorry, you have been blocked », Playwright et WebFetch, y compris `robots.txt`). Pas d'API publique trouvée. |
| Conditions | `robots.txt` de https://www.cgccards.uk/robots.txt : `user-agent: * / Allow: /` (seul AhrefsBot est exclu). Conditions (https://www.cgccards.uk/legal/terms-of-use/) : « You may print off one copy, and may download extracts, of any page(s) from our sites for your personal use » ; « You must not use any part of the content on our sites for commercial purposes without obtaining a licence to do so from us or our licensors. » ; « If you wish to link to or make any use of content on our sites other than that set out above, please contact us by email at […] Service@CGCcards.uk ». Conditions de `cgccards.com` : non lues (bloqué). |
| Contact | `Service@CGCcards.uk`, +44 (0) 20 3968 3848 (publiés dans les conditions ci-dessus). |
| Verdict | **C**. La lecture de pages est permise par le `robots.txt` mais les conditions limitent l'usage au personnel et renvoient à une demande écrite pour tout autre usage. Accord à demander à `Service@CGCcards.uk`. |
| Essai | Lecture ponctuelle de caractérisation, 16/11/2026, `cgccards.uk`. **Charizard 4/102, « Base Set - 1st Edition - French »** : total 135 — Pristine 10 : 3, Gem Mint 10 : 25, 9.5 : 6, 9 : 37, 8.5 : 20, 8 : 10, 7.5 : 8, 7 : 3, 6.5 : 5, 6 : 2, 5.5 : 1, 5 : 1, 4 : 3, 3.5 : 2, 3 : 1, 2 : 2, 1.5 : 1, 1 : 3, AA : 2. **Charizard 4/102, « Base Set - Unlimited - French »** : total 36 — 9 : 3, 8.5 : 1, 8 : 4, 7.5 : 2, 7 : 3, 6.5 : 2, 6 : 1, 5.5 : 6, 5 : 2, 4.5 : 3, 4 : 4, 3.5 : 2, 3 : 1, 2.5 : 1, AU : 1. **Mew ex 205/165, « Scarlet & Violet 151 - MEW FR - French »** : total 1. Noctali VMAX 215/203 : non cherché. Aucun prix. |

### Beckett (BGS, groupe Collectors)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.beckett.com — États-Unis. Société de gradation BGS/BVG, population report (`/grading/pop-report`), guides de prix (abonnement, non examiné). Le « User Agreement » de Collectors (29/09/2026) compte « Beckett Collectibles, LLC » parmi les entités du groupe. |
| Langue de la carte distinguée ? | Non vérifié (page bloquée). |
| Non gradé, gradé | Gradé BGS (notes à demi-point, sous-notes) ; non vérifié sur pièce. |
| Nature du prix | Non vérifié. |
| Profondeur | Non vérifiée. |
| Historique | Non vérifié. |
| Accès | `https://beckett.com/grading/pop-report` : défi Cloudflare (« Vérification de sécurité en cours », statut 403) avec Playwright, le 16/11/2026. Pas d'API publique trouvée. |
| Conditions | `robots.txt` (https://beckett.com/robots.txt, lu via navigateur) : une seule ligne `User-agent: *`, sans règle. Conditions : celles de Collectors citées dans la fiche PSA (usage « informational, personal and non-commercial », interdiction de « page-scrape », « robot », « spider »). |
| Contact | Non vérifié sur le site de Beckett ; à défaut, `collectors-apis@collectors.com` (fiche PSA). |
| Verdict | **D** (inaccessible : protection Cloudflare ; conditions du groupe Collectors restrictives). Une éventuelle demande passe par Collectors, avec celle de PSA. |
| Essai | Non fait. |

### SGC (Sportscard Guaranty, groupe Collectors)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://gosgc.com — États-Unis. Société de gradation, population report (`/pop-report`). Le « User Agreement » de Collectors compte « New SGC LLC » parmi les entités du groupe. |
| Langue de la carte distinguée ? | Non vérifié (page bloquée). |
| Non gradé, gradé | Gradé SGC ; non vérifié sur pièce. |
| Nature du prix | Aucun prix connu sur le site ; non vérifié. |
| Profondeur | Non vérifiée. |
| Historique | Non vérifié. |
| Accès | `https://gosgc.com/pop-report` : défi Cloudflare (statut 403) avec Playwright, le 16/11/2026. |
| Conditions | `https://gosgc.com/robots.txt` renvoie la page HTML de l'application (pas de fichier `robots.txt`). Conditions : celles de Collectors (fiche PSA). |
| Contact | Non vérifié ; voie Collectors (fiche PSA). |
| Verdict | **D** (inaccessible : protection Cloudflare ; conditions du groupe Collectors). |
| Essai | Non fait. |

### TAG Grading (Technical Authentication & Grading)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://taggrading.com (boutique Shopify) et https://my.taggrading.com/pop-report (population) — États-Unis (Los Angeles). Société de gradation, notes 1-10 et « TAG Score » sur 1000. |
| Langue de la carte distinguée ? | **Par extension** (« WOTC Pokémon French », « Pokémon Pikachu World Collection French »), comme pour le japonais (« P.M. Pokémon Japanese… »). |
| Non gradé, gradé | Gradé TAG. |
| Nature du prix | Aucun prix dans la population. |
| Profondeur | Mesuré le 16/11/2026 sur `/pop-report/Pokemon` : « TOTALS 2,894 [extensions] 28,597 [cartes] 957,837 [notées] », toutes langues. Extensions françaises relevées : en 2000, une seule (« WOTC Pokémon French Fossil - 1st Edition ») ; **pas de Set de Base français** en 1999 ni 2000 ; aucune extension française trouvée en 2023 (seulement des japonaises). Couverture française estimée très faible (sur ces trois années lues). |
| Historique | Population cumulée. |
| Accès | Pages publiques sans compte. Pas d'API publique trouvée. |
| Conditions | `robots.txt` de `my.taggrading.com` : `User-agent: * / Allow: /pop-report/` et `Allow: /card/`. Conditions (https://taggrading.com/pages/terms) : « We hereby permit you to use the Services for your personal non-commercial use only » ; interdiction de « (a) download, modify, copy, distribute, transmit, display, perform, reproduce, duplicate, publish […] any information contained on, or obtained from or through, the Services » et de « (j) use any robot, spider, crawlers, scraper, or other automatic device […] to monitor, extract, copy or collect information or data from or through the Services ». |
| Contact | `info@taggrading.com` (section « 10.7 How to Contact Us » des conditions). |
| Verdict | **C**, et peu utile : `robots.txt` ouvert mais conditions qui interdisent la collecte et la republication ; quasi pas de cartes françaises. |
| Essai | Dracaufeu Set de Base français : absent (pas d'extension correspondante). Autres cartes : non cherchées. |

# Sociétés de gradation, registres de population et prix gradés

Inventaire du 16 novembre 2026, rédigé selon `_consignes.md`. Pages lues avec WebFetch, `curl` (robots.txt) et un navigateur Playwright sans compte. « Non vérifié » signifie : pas lu par moi-même.

## Récapitulatif

Verdicts : A 0, B 1, C 9, D 18 (28 sources). Lecture du tableau : « Gradé » = sociétés présentes ; « Prix » = nature du prix publié ; « Langue » = la langue de la carte est-elle distinguée.

| Source | Adresse | Type | Langue distinguée | Gradé | Nature du prix | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| PSA | psacard.com | Société, population, API | Dans le libellé (non vérifié) | PSA 1-10 | Ventes réalisées et cote, fermées sans compte | C |
| PCA | pcagrade.com | Société (France) | Non vérifié | PCA /10 | Aucun | D |
| Collect Aura | collectaura.com | Société (France), population | Oui, champ `language` | Collect Aura | Aucun | C |
| CGC | cgccards.uk / .com | Société, population | Oui, dans le nom de l'extension | CGC | Aucun (lien eBay) | C |
| Beckett | beckett.com | Société, population | Non vérifié | BGS | Non vérifié | D |
| SGC | gosgc.com | Société, population | Non vérifié | SGC | Non vérifié | D |
| TAG | taggrading.com | Société, population | Par extension | TAG | Aucun | C |
| ACE | acegrading.com | Société (Royaume-Uni) | Non vérifié | ACE | Aucun | D |
| AP Grading | apgrading.net | Société | Non vérifié | Non vérifié | Non vérifié | D |
| GRAAD | graad.eu | Société (Italie), registre | Oui, filtre `FRE` | GRAAD | Aucun | C |
| MNT | mntgrading.com | Société (sport) | Non | MNT | Aucun | D |
| CCC Grading | cccgrading.com | Société (France), population | Oui, colonne « Lan. » (FR) | CCC | Aucun | C |
| PCC Grading | pcc-grading.com | Société (France), population | Non vérifié | PCC | Aucun | D |
| Pure Grading | puregrading.com | Société | Non vérifié | Non vérifié | Non vérifié | D |
| GemRate | gemrate.com | Agrégateur de population | Non vérifié (site bloqué) | PSA, BGS, SGC, CGC | Aucun | D |
| PriceCharting | pricecharting.com | Agrégateur de prix | Par set : japonais, chinois ; aucun set français | Grade 7 à PSA 10 | Non vérifié sur la page | D |
| 130point | 130point.com | Agrégateur de ventes eBay | Non vérifié (site bloqué) | Oui | Ventes réalisées (déclaré par des tiers) | D |
| Card Ladder | cardladder.com | Agrégateur de ventes | Non vérifié (site bloqué) | Oui | Ventes réalisées (non vérifié) | D |
| Alt | alt.xyz | Place de marché, coffre | Non vérifié | PSA, BGS, SGC (non vérifié) | Non vérifié | D |
| PokeData | pokedata.io | Agrégateur de prix | Anglais, japonais, chinois ; pas de français | Non vérifié | Non vérifié | D |
| PokemonPriceTracker | pokemonpricetracker.com | Agrégateur, API | Anglais et japonais seulement | PSA 8, 9, 10 (eBay) | Ventes eBay et Fanatics Collect | C |
| PokeTrace | poketrace.com | Agrégateur, API | Non vérifié ; marché « EU » distinct | Gradé réservé au forfait Pro | Annonces Cardmarket, eBay | D |
| getcardbase | getcardbase.com | Agrégateur de ventes | Par déduction du titre (« French ») | Oui | Ventes eBay, page de 2024 | C |
| Fanatics Collect | fanaticscollect.com | Enchères | Par le titre des lots | PSA, CGC, BGS… | Ventes réalisées | D |
| Goldin | goldin.co | Enchères | Non vérifié | Oui | Ventes réalisées | D |
| Courtyard | courtyard.io | Coffre, places de marché | Non | PSA | Non vérifié | D |
| Cards N Packs | cardsnpacks.com | Revendeur (Pologne, site français) | Oui, filtre « Langue » | PSA, CGC | Prix demandés | C (B proposé, reclassé à la relecture) |
| Graded Card Center | gradedcardcenter.com | Place de marché | Non vérifié | PSA, CGC | Enchères et prix fixes | C |

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

### ACE Grading (Royaume-Uni)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://acegrading.com — Royaume-Uni. Société de gradation, « Population Report » (`/pop`), « Grading Reports ». |
| Langue de la carte distinguée ? | Non vérifié (page bloquée). |
| Non gradé, gradé | Gradé ACE ; détail non vérifié. |
| Nature du prix | Aucun prix connu ; non vérifié. |
| Profondeur | Non vérifiée. |
| Historique | Non vérifié. |
| Accès | La page d'accueil se lit ; `https://acegrading.com/pop` renvoie un défi Cloudflare (« Vérification de sécurité en cours », statut 403) avec Playwright le 16/11/2026. Pas d'API trouvée. |
| Conditions | `robots.txt` (https://acegrading.com/robots.txt) : `User-agent: * / Disallow:` (aucune restriction). Conditions (https://acegrading.com/terms-of-service) lues : aucune clause sur la collecte ou la réutilisation des données trouvée ; seule mention d'usage : « If you are a consumer we only supply the products to you for domestic and private use. » |
| Contact | `support@acegrading.com` (lien en page d'accueil). |
| Verdict | **D** (inaccessible : la population est derrière une protection Cloudflare). Si ACE ouvrait l'accès, le `robots.txt` et des conditions muettes laisseraient un B possible ; à demander par écrit (C). |
| Essai | Non fait. |

### AP Grading

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | `apgrading.com` redirige vers https://www.apgrading.net. Pays et offre : non vérifiés. |
| Langue de la carte distinguée ? | Non vérifié. |
| Non gradé, gradé | Non vérifié. |
| Nature du prix | Non vérifié. |
| Profondeur | Non vérifiée. |
| Historique | Non vérifié. |
| Accès | Page d'accueil et `robots.txt` : défi Cloudflare (« Just a moment... », statut 403) avec `curl` et Playwright, le 16/11/2026. Recherche web : aucun résultat sur une population AP Grading. |
| Conditions | Non lues (bloquées). |
| Contact | Non vérifié. |
| Verdict | **D** (inaccessible). |
| Essai | Non fait. |

### GRAAD (Italie)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.graad.eu (Milan, Italie ; `graad.it` ne répond pas, 502). Société de gradation ; « Certified card register: all statistical data » : https://www.graad.eu/en/plaza/card-register/. |
| Langue de la carte distinguée ? | **Oui, champ distinct** : le formulaire du registre a un filtre `lingua_item` avec la valeur `FRE` (parmi ITA, ENG, JPN, GER, FRE, SPA, KOR, CHI…), et un filtre par pays (`id_nazione`, dont « France »). |
| Non gradé, gradé | Gradé GRAAD, échelle 1-10 (« Standard grading scale »). Filtres `voto_min`/`voto_max`. |
| Nature du prix | Aucun prix de carte vu. |
| Profondeur | Non mesurée (recherche non aboutie). |
| Historique | Filtres de date de certification (`data_dal`, `data_al`) : historique de certification probablement consultable (déduit du formulaire, non vérifié). |
| Accès | Pages sans compte, mais la recherche du registre est protégée par reCAPTCHA Enterprise (script `recaptcha/enterprise` chargé par la page) ; je n'ai pas obtenu de résultat et n'ai pas insisté. Pas d'API publique trouvée. |
| Conditions | `robots.txt` : https://www.graad.eu/robots.txt renvoie une page HTML « GRAAD - 404 » (pas de fichier). Conditions (https://www.graad.eu/en/terms-condition) : « Any reproduction, partial or total, of the content of the website, by means of any process and on any device, must be explicitly authorised in writing by graad.eu. » |
| Contact | `info@graad.eu` (https://graad.eu/en/contanct-and-help/). |
| Verdict | **C** (reproduction soumise à autorisation écrite ; recherche protégée par captcha). Intérêt français probablement faible (société italienne), non mesuré. |
| Essai | Non abouti (captcha). |

### MNT Grading (Canada)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://mntgrading.com — société de gradation orientée cartes de sport (pays non vérifié). Population : https://mntgrading.com/population-report/. |
| Langue de la carte distinguée ? | Non : le formulaire de population ne propose que « Player Name, Year, Company name, Set Name, Sub set ». |
| Non gradé, gradé | Gradé MNT, colonnes de 3.00 à 10.00 par demi-point et « 10.0F ». |
| Nature du prix | Aucun prix. |
| Profondeur | Non mesurée ; outil pensé pour le sport (« Player »). Cartes Pokémon françaises : non cherchées. |
| Historique | Non vérifié. |
| Accès | Pages sans compte. |
| Conditions | `robots.txt` : uniquement le préambule « content signals » de Cloudflare, sans règle ni signal déclaré. Conditions (https://mntgrading.com/terms-conditions/) : aucune clause sur la collecte trouvée. |
| Contact | `mntgrading@gmail.com` (en-tête du site). |
| Verdict | **D** pour notre besoin (hors sujet : pas de langue, pas de prix, orientation sport). |
| Essai | Non fait (sans objet). |

## Fiches ajoutées le 17 novembre 2026

Même méthode : pages lues avec WebFetch, `curl` (robots.txt) et Playwright sans compte. Les lectures de caractérisation sont ponctuelles (quelques pages par site).

### CCC Grading (Certified Collectible Cards, France)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.cccgrading.com — France (dépôt en main propre « à 5 min de Paris » d'après le site). Société de gradation fondée en 2020 (d'après un guide tiers, holora.net), avec « GradeReport® » et un **rapport de population** : https://www.cccgrading.com/fr/rapport-de-population. Le site dit pouvoir expertiser « plus de 120000 cartes réparties sur 14 TCG ». |
| Langue de la carte distinguée ? | **Oui, colonne « Lan. »** (FR, EN…). Consigne de la page : « Pour rechercher une carte française, saisissez le nom en français (sans accent). » La page annonce un futur « filtre par jeu, extension, langue ». |
| Non gradé, gradé | Gradé CCC. Colonnes : A, 1 à 8, 8.5, 9, 9.5, 10, 10G (Gold), 10B (Black), Total. |
| Nature du prix | Aucun prix : population seulement. |
| Profondeur | Mesuré le 17/11/2026 : la recherche « dracaufeu » renvoie 84 lignes (extensions et numéros distincts, toutes en FR). Les populations françaises sont substantielles (Dracaufeu 30e Anniversaire 4 : 550 ; Celebrations : 265). |
| Historique | Population cumulée, pas d'historique publié. |
| Accès | Pages sans compte, sans défi Cloudflare. La page appelle `GET https://www.cccgrading.com/api/v2/cards/report?name=<nom>&page=1` (réponse 200 sans clé, y compris avec `curl`). Non documentée. |
| Conditions | `robots.txt` (https://www.cccgrading.com/robots.txt) : `User-agent: * / Disallow:` (aucune restriction). CGU du site (https://www.cccgrading.com/fr/conditions-generales-utilisation-site) : « L'Utilisateur doit solliciter l'autorisation préalable du site pour toute reproduction, publication, copie des différents contenus. » et « Il s'engage à une utilisation des contenus du site dans un cadre strictement privé, toute utilisation à des fins commerciales et publicitaires est strictement interdite. » Mentions légales (https://www.cccgrading.com/fr/mentions-legales) : « Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou partie du Site, sans autorisation de l'Editeur est prohibée ». |
| Contact | `support@cccgrading.com` (mentions légales). |
| Verdict | **C**. Avec Collect Aura, la meilleure population française lisible sans compte, mais accord écrit nécessaire (CGU). À demander ensemble : population par carte française, y compris par API. |
| Essai | Lecture ponctuelle, 17/11/2026 (3 recherches). **Dracaufeu 4, FR, 1999, « Set de base »** : total 227 — A 35, 1 : 11, 2 : 13, 3 : 19, 4 : 12, 5 : 15, 6 : 17, 7 : 19, 8 : 21, 8.5 : 14, 9 : 26, 9.5 : 25, 10 : 0 (pas de ligne « 1ère édition » vue ; les variantes sont derrière « Afficher toutes les variantes », non explorées). **Mew ex 205, FR, 2023, « Pokemon 151 »** : total 134 — 8 : 3, 8.5 : 3, 9 : 39, 9.5 : 86, 10 : 3 (la ligne EN voisine : 81). **Noctali VMAX 215, FR, 2021, « Evolution Celeste »** : total 159 — A 2, 3 : 1, 5 : 1, 6 : 3, 7 : 6, 8 : 8, 8.5 : 9, 9 : 36, 9.5 : 70, 10 : 20, 10G : 3. Aucun prix. |

### PCC Grading (France)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://pcc-grading.com — société de gradation française (titre : « Gradation de cartes Pokémon, One-Piece, RiftBound »), avec une page « Rapport de population » (`/population-report`). |
| Langue de la carte distinguée ? | Non vérifié. |
| Non gradé, gradé | Gradé PCC ; échelle non lue. |
| Nature du prix | Aucun. |
| Profondeur | Non mesurée : le 17/11/2026, `/population-report` n'a affiché que l'écran de connexion et d'inscription (« Connexion », « Créer un compte »). Je n'ai pas insisté. |
| Historique | Non vérifié. |
| Accès | Compte requis (constaté). |
| Conditions | `robots.txt` (https://pcc-grading.com/robots.txt) : `Allow: /` mais `Disallow: /population-report/result`. CGU (https://pcc-grading.com/fr/terms-of-use/) : « L'Utilisateur devra obtenir l'autorisation de l'éditeur du site avant toute reproduction, copie ou publication de ces différents contenus. » et « tout usage commercial est interdit. » |
| Contact | `contact@pcc-grading.com` (mentions légales, https://pcc-grading.com/fr/legal/), `support@pcc-grading.com` (CGU). |
| Verdict | **D** : population non lisible sans compte, `/population-report/result` interdit aux robots. |
| Essai | Non fait. |

### Pure Grading

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.puregrading.com — société de gradation citée dans des guides français (pays non vérifié). |
| Langue, gradé, prix, profondeur, historique, accès | Non vérifiés. |
| Conditions | `robots.txt` (https://www.puregrading.com/robots.txt) : `User-agent: Googlebot / Allow: /` puis `User-agent: * / Disallow: /`. Conditions non lues. |
| Contact | Non vérifié. |
| Verdict | **D** : `robots.txt` interdit tout aux robots autres que Googlebot. |
| Essai | Non fait. |

### GemRate (agrégateur de population)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.gemrate.com — États-Unis (non vérifié). Population « universelle » PSA, BGS, SGC, CGC d'après des articles de presse et la fiche d'un outil tiers ; non vérifié sur le site. |
| Langue de la carte distinguée ? | **Non vérifié.** Une recherche web sur GemRate et le français n'a rien donné. |
| Non gradé, gradé | Gradé : PSA, BGS, SGC, CGC (d'après des tiers). |
| Nature du prix | Population et statistiques ; les ventes « sales data » sont mentionnées par un tiers, non vérifiées. |
| Profondeur, historique | Non vérifiés. |
| Accès | Défi Cloudflare (« Just a moment... », statut 403) sur `/`, `/terms` et `/robots.txt` avec `curl` et Playwright, le 17/11/2026. Je n'ai pas insisté. |
| Conditions | Non lues (bloquées). `robots.txt` illisible. |
| Contact | Non vérifié. |
| Verdict | **D** (inaccessible). Si GemRate agrège les populations de PSA, BGS, SGC et CGC, ses conditions dépendent probablement des leurs (non vérifié). |
| Essai | Non fait. |

### PriceCharting

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.pricecharting.com — États-Unis. Agrégateur de prix de jeux et de cartes (« Price Data »). |
| Langue de la carte distinguée ? | **Par set, et sans français.** Mesuré le 17/11/2026 sur `https://www.pricecharting.com/category/pokemon-cards` : 302 pages de set Pokémon ; 118 « japanese », 22 « chinese », 2 « korean », **0** contenant « french », « fran », « german », « spanish » ou « ital ». L'interface existe en français (`/fr/`), mais les cartes françaises n'ont pas de page propre. |
| Non gradé, gradé | Sur la page du Dracaufeu anglais Set de Base (lue le 17/11/2026) : colonnes Ungraded, Grade 7, 8, 9, 9.5, PSA 10. Champs de l'API : `loose-price`, `cib-price`, `new-price`, `graded-price`, `bgs-10-price`, `condition-*`. |
| Nature du prix | Non vérifiée sur la page (la page ne le dit pas dans le texte lu). |
| Profondeur | Aucune carte française. |
| Historique | Non vérifié. |
| Accès | Pages publiques. API et CSV : « API's are a premium tool. You must have a paid subscription to access the API. » (https://www.pricecharting.com/api-documentation) ; CSV : « only available to Legendary subscribers ». Tarif non publié sur la page lue. |
| Conditions | https://www.pricecharting.com/page/terms-of-service : « All Price Data on the site is sole property of PriceCharting. » ; « Price Data cannot be used in any software, application, or system that is accessible to third parties, » sans « express written permission » ; citation de la source avec lien visible autorisée pour une référence externe. API : « The API and CSV data are licensed for internal use only. » `robots.txt` (https://www.pricecharting.com/robots.txt) : `Disallow: /stripe-connect`, `/publish-offer`, `/buy`. |
| Contact | `brady@vgpc.com` (adresse masquée par Cloudflare sur la page des conditions, décodée par WebFetch ; indiquée pour les demandes d'autorisation). |
| Verdict | **D** : payant (API) et aucune carte française. |
| Essai | Dracaufeu 4/102 français : absent (pas de set français). Mew ex 205/165 et Noctali VMAX : non cherchés (même raison). |

### 130point

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://130point.com — États-Unis (non vérifié). Moteur de ventes réalisées eBay et autres, d'après des tiers ; non vérifié sur le site. |
| Langue, gradé, prix, profondeur | Non vérifiés (site bloqué). |
| Accès | Défi Cloudflare (403) sur `/` et `/terms-of-service/`, Playwright, 17/11/2026. |
| Conditions | `robots.txt` (https://130point.com/robots.txt, lu avec `curl`) : `User-Agent: * / Allow: /` et `Disallow: /api/`. Conditions : non lues (bloquées). |
| Contact | Non vérifié. |
| Verdict | **D** (inaccessible). Les ventes eBay terminées sont de toute façon un prix réalisé que seul eBay détient (voir `ROADMAP.md`, licence de l'API eBay). |
| Essai | Non fait. |

### Card Ladder

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.cardladder.com — États-Unis. Le « User Agreement » de Collectors cite « Ladder Studios, Inc. » (voir fiche PSA), donc Card Ladder relève des mêmes conditions que PSA. |
| Langue, gradé, prix, profondeur | Non vérifiés. |
| Accès | Défi Cloudflare (403), Playwright, 17/11/2026. `robots.txt` : 404. |
| Conditions | Celles de Collectors (fiche PSA) : usage « informational, personal and non-commercial », interdiction de « page-scrape », « robot », « spider ». |
| Contact | Non vérifié ; voie Collectors (fiche PSA). |
| Verdict | **D** (inaccessible ; conditions restrictives du groupe). |
| Essai | Non fait. |

### Alt (alt.xyz)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://alt.xyz — États-Unis. Place de marché et coffre de cartes gradées (titre : « Buy & Sell Graded Sports Cards »). |
| Langue, gradé, prix, profondeur | Non vérifiés. Aucune carte française établie ; titre orienté cartes de sport. |
| Accès | Pages publiques ; contenu des fiches non examiné. |
| Conditions | `robots.txt` (https://alt.xyz/robots.txt) : `User-agent: * / Disallow:` (rien d'interdit). Conditions (https://alt.xyz/terms) : j'ai cherché « scrape », « spider », « robot », « crawl », « data mining » : **aucune clause trouvée** ; la seule limite de réutilisation lue concerne le contenu protégé de tiers (« You will not upload, post, reproduce, or distribute any information, software, or other material protected by copyright »). |
| Contact | `legal@alt.xyz`, `support@alt.xyz` (conditions). |
| Verdict | **D** pour notre besoin (aucune preuve de cartes françaises ni de prix lisible ; non examiné). |
| Essai | Non fait. |

### PokeData (pokedata.io)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.pokedata.io (Browse LLC, mentionné en pied de page) — agrégateur de valeurs de cartes et de produits scellés. |
| Langue de la carte distinguée ? | Sets « English », « Japanese », « Chinese » seulement (pied de page et page d'accueil). **Pas de français.** |
| Gradé, prix | Non mentionnés sur la page d'accueil ; « Pokedata PRO » sans tarif lu. |
| Accès | Pages ; API non mentionnée. |
| Conditions | `robots.txt` (https://www.pokedata.io/robots.txt) : `User-agent: * / Disallow:`. Page des conditions (https://www.pokedata.io/termsandconditions) : texte non récupérable (281 caractères de gabarit vides) : **non lue**. |
| Contact | `info@pokedata.io` (https://www.pokedata.io/contact). |
| Verdict | **D** pour notre besoin (pas de français ; conditions non lues). |
| Essai | Non fait. |

### PokemonPriceTracker (pokemonpricetracker.com)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.pokemonpricetracker.com — agrégateur et API de prix Pokémon. |
| Langue de la carte distinguée ? | **Non : « English and Japanese Pokémon cards and sealed products. No other languages or games. »** (page de couverture, https://www.pokemonpricetracker.com/data-coverage). |
| Non gradé, gradé | Prix PSA 8, 9, 10 issus de ventes eBay (page de couverture : sources de ventes gradées « eBay and Fanatics Collect ») ; populations « current only », pour la plupart des cartes anglaises. Cardmarket (EUR, bêta) : cartes anglaises, historique depuis le 16/03/2026. |
| Nature du prix | Ventes réalisées (eBay, Fanatics Collect) pour le gradé, d'après la page de couverture. |
| Profondeur | Aucune carte française. |
| Accès | API. Page tarifs (https://www.pokemonpricetracker.com/pricing) : Free 0 $/mois, 100 crédits par jour, prix PSA inclus, populations non incluses ; API 9,99 $/mois ; Business 99 $/mois (populations incluses) ; Enterprise 300 $/mois. |
| Conditions | `robots.txt` : `Allow: /`, `Disallow: /api/`. Conditions (https://www.pokemonpricetracker.com/terms) : « Scraping, data mining, or otherwise collecting data from the Service without our prior written consent » (section 8) ; « Using PokePriceTracker Data for any commercial purpose requires an active Business or Enterprise subscription. » (section 6) ; « you may not resell, sublicense, syndicate, or redistribute the raw data itself as a standalone product or data service » (section 6). |
| Contact | Adresse masquée sur la page des conditions (section 16) : non lue. |
| Verdict | **C** (accord écrit pour la collecte, abonnement pour l'usage commercial), et **sans intérêt pour le français** : pas de cartes françaises. |
| Essai | Non fait. |

### PokeTrace (poketrace.com)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://poketrace.com — API et catalogue de prix Pokémon (« Free tier available » dans son `robots.txt`). |
| Langue de la carte distinguée ? | Non vérifié. Les pages du catalogue portent un suffixe de marché (« …-eu ») ; le marché « EU » est annoncé à partir du forfait Pro (https://poketrace.com/docs/authentication : « Pro unlocks EU and graded data »). |
| Non gradé, gradé | « Raw conditions and graded tiers » ; PSA, BGS, CGC d'après un résultat de recherche (non vérifié sur page). |
| Nature du prix | « TCGPlayer and eBay pricing for the US market » (page d'accueil) ; pour l'Europe, des annonces Cardmarket vues dans des résultats de recherche, avec la colonne « CardMarket Sold » vide (« — ») : annonces, pas ventes (lecture d'un extrait de recherche, non vérifiée sur page). |
| Profondeur | Non mesurée. |
| Accès | API ; le gradé et l'UE sont réservés aux forfaits payants ; tarifs non publiés sur la page lue. |
| Conditions | `robots.txt` : `Allow: /`, avec `Content-Signal: ai-train=no, search=yes, ai-input=yes`. Conditions (https://poketrace.com/terms) : « Free access is for personal, non-commercial use. » ; « Not resell datasets or operate a standalone data feed or competing data API, except with separate written authorization » ; « Scrape, crawl, or harvest data in a manner that degrades service for other users ». |
| Contact | `contact@poketrace.com` (section 12 des conditions). |
| Verdict | **D** : le gradé et l'Europe sont payants. |
| Essai | Non fait. |

### getcardbase.com

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://getcardbase.com — agrégateur de ventes de cartes (pays non vérifié). |
| Langue de la carte distinguée ? | **Par déduction du titre** : « 1999 Pokemon Base Set French #4/102 Charizard » et « 1999 Pokemon Base Set 1st Edition French #4/102 Charizard » ont leurs pages. |
| Non gradé, gradé | Colonne par note (« Adjust grade »). |
| Nature du prix | Ventes eBay (« Ebay » en colonne maison de ventes), mais **très peu de ventes** : la page du Set de Base français non-1ère édition (lue le 17/11/2026) repose sur « 3 sales prices in our database history », dernière vente le 26/05/2021, mise à jour le 28/06/2024 ; seule la ligne « Ungraded » est remplie (plus bas 350 $, plus haut 610 $), avec une incohérence interne (moyenne 150 $ inférieure au minimum). |
| Profondeur | Non mesurée ; données anciennes. |
| Accès | Pages. |
| Conditions | `robots.txt` (https://getcardbase.com/robots.txt) : `User-agent: * / Disallow: /_next/image` et `/_esa-image`. Conditions non lues. |
| Contact | Non vérifié. |
| Verdict | **C** (conditions non lues ; dans le doute C). Valeur faible : peu de ventes, page périmée. |
| Essai | Dracaufeu 4/102 français : une page, données de 2021, ungraded seulement. |

### Fanatics Collect (ex-PWCC)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.fanaticscollect.com — États-Unis. Enchères et achat immédiat de cartes gradées. |
| Langue de la carte distinguée ? | Par le titre des lots. Un résultat de recherche (non lu par moi) mentionne un Dracaufeu 1ère édition français CGC 10 vendu le 17/02/2023, 21 600 $ : **non vérifié**. |
| Gradé, prix | Gradé (PSA, CGC et autres) ; ventes réalisées. |
| Accès | Pages ; défi non rencontré sur la page d'accueil. |
| Conditions | `robots.txt` (https://www.fanaticscollect.com/robots.txt) : `Disallow: /login`, `/join`, `/share/`… (pas de `Disallow: /`). Conditions (https://support.fanaticscollect.com/en_us/terms-of-use-r11C70QTge) : « use any manual or automated software, devices or other processes (including but not limited to spiders, robots, scrapers, crawlers, avatars, data mining tools or the like) to “scrape” or download data from any portion of the Platform and/or Services » ; « no part of the Platform and no Services […] may be copied, reproduced, aggregated, republished […] or otherwise exploited for any commercial purpose whatsoever, without Fanatics Collect’s express prior written permission ». |
| Contact | `policy@fanatics.live` (conditions). |
| Verdict | **D** (collecte interdite sans accord écrit ; quasi pas de français). |
| Essai | Non fait. |

### Goldin (goldin.co)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://goldin.co — États-Unis. Maison d'enchères et vente à prix fixe de pièces de collection haut de gamme. |
| Langue, gradé, prix | Gradé ; ventes réalisées (« Past Sales » dans le menu). Langue française : non vérifiée. |
| Conditions | `robots.txt` (https://goldin.co/robots.txt) : `Disallow: /account/`, `/api/`… ; `Allow: /item/`, `/auction/`. Conditions d'utilisation : **non lues** (les adresses essayées renvoient un gabarit vide ou une page d'erreur). |
| Contact | Page https://goldin.co/company/contact (non lue). |
| Verdict | **D** (conditions non lues, aucune carte française établie). |
| Essai | Non fait. |

### Courtyard (courtyard.io)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://courtyard.io — Courtyard, Inc., New York. Coffre et marché « Digital Packs, Physical Cards », cartes « vaulted and insured ». |
| Langue, gradé, prix | PSA seulement sur la page d'accueil ; français non mentionné ; Pokémon présent. |
| Conditions | `robots.txt` : `User-Agent: * / Allow: /`. Conditions : `/terms-of-service` renvoie 403 : **non lues**. |
| Contact | Non vérifié. |
| Verdict | **D** (conditions non lues, aucune carte française établie). |
| Essai | Non fait. |

### Cards N Packs (cardsnpacks.com)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.cardsnpacks.com — site en français ; les CGV indiquent une société établie en Pologne. Revendeur et enchères eBay (« Les enchères du dimanche soir, sur eBay »), catalogue de pièces raw et gradées. |
| Langue de la carte distinguée ? | **Oui, filtre « Langue »**. |
| Non gradé, gradé | Mesuré le 17/11/2026 sur `/catalogue/` : 898 pièces en vente ; Français 476, Japonais 360, Anglais 37 ; 292 gradées, 591 raw ; PSA 276, CGC 16 ; notes : 10 : 102, 9,5 : 1, 9 : 142, 8,5 : 0, 8 : 41, moins de 8 : 6. |
| Nature du prix | **Prix demandés** du revendeur, non des ventes. |
| Profondeur | 476 pièces françaises en vente à l'instant de la lecture (mesuré) ; stock mouvant, pas d'historique. |
| Historique | Aucun (la fiche d'une pièce vendue disparaît ou change). |
| Accès | Pages publiques, sans compte. |
| Conditions | `robots.txt` (https://www.cardsnpacks.com/robots.txt) : groupe `*` : `Allow: /`, `Disallow: /api/`, `/catalogue/*,` (facettes multiples) ; groupe `Claude-User` : `Allow: /`, mêmes interdictions, `Crawl-delay: 5` ; `ClaudeBot`, `GPTBot`, `CCBot` : `Disallow: /` (« robots d'ENTRAINEMENT bloques »). Mentions légales et CGV (https://www.cardsnpacks.com/mentions-legales/, `/cgv/`) : aucune clause de réutilisation de contenu trouvée à la lecture (non exhaustive). |
| Contact | `support@cardsnpacks.com` (mentions légales), `contact@cardsnpacks.com` (CGV). |
| Verdict | **C** (relu par l'assistant principal le 17 novembre : le sous-agent proposait B ; même reclassement que dans `02-boutiques-francaises.md`). Le `robots.txt` autorise une lecture ponctuelle, pas un relevé régulier, et le site se protège depuis un incident de charge : accord écrit à demander. Détail d'origine : lecture permise par le `robots.txt`, mais ce sont les prix d'un seul revendeur, pas une cote ; usage limité à un contrôle de vraisemblance du gradé français, à faire avec le délai de 5 secondes. Dans le doute, une demande à `support@cardsnpacks.com` règlerait la question. |
| Essai | **Dracaufeu 4/102 Set de Base, 1ère édition, français, PSA 10 Gem Mint** (https://www.cardsnpacks.com/cartes/set-de-base/dracaufeu-4-102/, lu le 17/11/2026) : « À partir de » 94 050,00 EUR (prix demandé) et une annonce eBay à 149 000,00 EUR (« Achat immédiat »). Aucune vente, aucune date, aucune population. Mew ex et Noctali VMAX : non cherchés. |

### Graded Card Center (gradedcardcenter.com)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.gradedcardcenter.com (« GCC ») — place de marché de cartes gradées, interface en français ; hébergement O2switch (France) d'après ses conditions ; pays de la société non vérifié. |
| Langue de la carte distinguée ? | Non vérifié. |
| Non gradé, gradé | PSA et CGC (page d'accueil). |
| Nature du prix | Enchères (hebdomadaires, premium, événement) et prix fixes : prix demandés ou enchères, pas de cote. Un résultat de recherche donne un Dracaufeu 4/102 à 250 000 € (non lu par moi). |
| Profondeur, historique | Non mesurés. |
| Accès | Pages, applications mobiles. |
| Conditions | `robots.txt` (https://gradedcardcenter.com/robots.txt) : `Allow: /`. CGU (https://www.gradedcardcenter.com/conditions-generales) : aucune clause de collecte trouvée (seule mention : « La simple connexion au Site, par quelque moyen que ce soit, notamment par l'intermédiaire d'un robot ou d'un navigateur, emportera acceptation pleine et entière des présentes conditions générales. »), ce qui vaut acceptation des conditions par un robot. |
| Contact | `support@gradedcardcenter.com` (CGU). |
| Verdict | **C** (aucune fiche carte examinée ; dans le doute C). |
| Essai | Non fait. |

### Couvertes par la fiche PSA, non refaites

PSA CardFacts et Auction Prices Realized : couverts par la fiche PSA (Auction Prices Realized derrière Cloudflare et connexion, 16/11/2026 ; CardFacts non examiné séparément). Fiche non ajoutée.

## Sociétés et intermédiaires français et européens cherchés

- **Sociétés trouvées et examinées** : CCC Grading et PCC Grading (France), Pure Grading (voir fiches). Autres noms vus dans des guides de comparaison et **non examinés** : SGS.
- **SFG, UCG, EGS, Mana Fix** : recherche web, aucun résultat sur ces noms ; **non vérifié**, je n'affirme ni existence ni inexistence.
- **PSA Europe** : un guide marchand évoque un centre de gradation PSA à Francfort ; non vérifié sur une source PSA.
- **Intermédiaires d'envois groupés vers PSA** : PokéLoutre (https://www.pokeloutre.fr) propose un service PSA groupé en France ; ses tarifs et dates sont ceux de son propre site (non vérifiés ailleurs). `robots.txt` lu : `Disallow` limité à `/wp-admin/`, aux paniers et aux transients WooCommerce. Il s'agit d'un service de prestation, pas d'une source de prix ; fiche non faite.
- **Revendeurs de cartes gradées** : Cards N Packs et Graded Card Center (fiches ci-dessus). Safebox TCG apparaît dans un comparatif (non examiné).

## Dracaufeu 4/102 (Set de Base français) : ce qui se lit sans compte, le 17/11/2026

| Source | Population par note | Prix gradé |
| --- | --- | --- |
| Collect Aura | 51 (set de base, `fr`) ; 25 + 1 (1ère édition) : voir la fiche | Aucun |
| CGC (`cgccards.uk`) | 135 (1ère édition FR), 36 (Unlimited FR) : voir la fiche | Aucun |
| CCC Grading | 227 (« Set de base », FR) : voir la fiche | Aucun |
| PSA | Fermé sans compte (connexion), API avec compte | Fermé (Cloudflare, connexion) |
| PCA | Aucune population publiée | Aucun |
| Beckett, SGC, ACE, GemRate, 130point, Card Ladder | Fermés (Cloudflare) | Fermés |
| PCC Grading | Connexion requise | Aucun |
| TAG | Pas de Set de Base français | Aucun |
| PriceCharting, PokeData, PokemonPriceTracker | Pas de carte française | Pas de carte française |
| Cards N Packs | Aucune | Prix **demandé** PSA 10 1ère édition FR : 94 050 EUR (« À partir de ») ; 149 000 EUR sur eBay (17/11/2026) |
| getcardbase | Aucune | Page périmée (2021, 3 ventes, ungraded seulement) |

Les écarts entre sociétés (51, 135, 227) ne sont pas des erreurs : ce sont des populations propres à chaque société, qui ne s'additionnent pas et dont le périmètre « Set de base » / « 1ère édition » diffère. Une population PSA lisible sans compte : **aucune**. Un prix gradé réalisé lisible sans compte pour cette carte : **aucun** ; des résultats de recherche citent des ventes (par exemple Fanatics Collect, CGC 10, 17/02/2023) que je n'ai pas lues moi-même.

## Sources croisées hors de la famille

- Cardmarket : annonces gradées vues via PokeTrace (colonne « CardMarket Sold » vide), à examiner dans la famille des places de marché.
- eBay (ventes terminées) : source des prix gradés de PokemonPriceTracker, 130point et getcardbase ; sa licence interdit la réutilisation (voir `ROADMAP.md`).
- PokéLoutre (pokeloutre.fr) et Safebox TCG (safeboxtcg.fr) : revendeurs et intermédiaires français, à rattacher à la famille des boutiques.

## Marchés anglais, américain, japonais (noté sans approfondir)

- Américain : PSA, Beckett, SGC, Card Ladder, 130point, Fanatics Collect, Goldin, Alt, Courtyard sont fermés (connexion, Cloudflare) ou restreints par des conditions du groupe Collectors ou de la plateforme.
- Anglais et japonais : PriceCharting couvre 118 sets japonais et 22 chinois (mesuré) ; PokemonPriceTracker anglais et japonais seulement ; PokeData anglais, japonais, chinois. Aucune de ces sources ne donne un prix pour la carte française.
- Japonais : TAG et CGC distinguent le japonais par extension (voir leurs fiches).

## Crédits Firecrawl

**0 crédit dépensé.** Aucun appel Firecrawl (ni lecture, ni recherche, ni Alexandria). Outils utilisés : WebSearch, WebFetch, `curl`, Playwright.

## Meilleures voies permises

**(a) Prix gradés français.** Aucune voie permise et gratuite à ce jour n'a donné de prix gradé *réalisé* pour une carte française. Pistes, par ordre :
1. Les prix demandés d'un revendeur français comme Cards N Packs (verdict B) : 476 pièces françaises, 292 gradées dans l'ensemble du catalogue (mesuré le 17/11/2026) ; ce sont des prix d'offre d'un seul vendeur, à présenter comme tels, jamais comme une cote.
2. Une demande d'accord écrit à Graded Card Center (`support@gradedcardcenter.com`), qui publie des enchères en français.
3. Pour tout le reste (PSA, Fanatics Collect, 130point, Card Ladder), la collecte est interdite ou inaccessible : ne pas contourner.
Le modèle appris sur des ventes observées reste faisable seulement avec un accord, ou avec un jeu de données maison construit à la main.

**(b) Populations.** Meilleures sources : **CCC Grading** (langue FR en colonne, interface JSON publique, robots ouvert) et **Collect Aura** (langue en champ, interface JSON publique), les deux de verdict **C** : demander l'accord par écrit à `support@cccgrading.com` et `contact@collectaura.com`. Ensuite **CGC** (`cgccards.uk`, langue dans le nom de l'extension, `Service@CGCcards.uk`) et, pour PSA, `collectors-apis@collectors.com` (API gratuite avec compte, accord à lire après inscription). Une demande groupée aux trois sociétés françaises ou à PSA donnerait la couverture la plus utile pour le français.

## Ce que je n'ai pas pu vérifier

GemRate, 130point, Card Ladder (Cloudflare) ; conditions de GemRate, 130point, Goldin, Courtyard, PokeData, getcardbase ; PCC Grading au-delà de la page de connexion ; variantes 1ère édition chez CCC ; Mew ex et Noctali VMAX chez Cards N Packs ; existence de SFG, UCG, EGS, Mana Fix ; les ventes citées par des résultats de recherche (Fanatics Collect, PSA 9 français).

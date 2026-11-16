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

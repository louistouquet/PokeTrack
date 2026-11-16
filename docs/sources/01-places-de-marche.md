# Sources de prix : les places de marché

Inventaire du 16 novembre 2026. Famille : places de marché où des cartes Pokémon françaises à l'unité se vendent entre particuliers ou professionnels. Rédigé selon `_consignes.md`.

Méthode : `robots.txt` lu par `curl` (ou, quand `curl` était refusé, par le navigateur Playwright) ; conditions lues par le navigateur Playwright quand la page s'ouvrait ; recherche web pour le reste. Aucun compte créé, aucune recherche de cartes lancée sur un site dont les conditions interdisent la collecte, donc **aucune carte d'essai n'a été passée** : aucun verdict de cette famille n'est A ou B. Une page protégée (défi de sécurité, captcha, 403) n'a pas été contournée : c'est écrit comme tel.

Convention : « cité » = phrase relue par moi sur la page ; « rapporté » = dit par un résumé de recherche, non relu ; « non vérifié » = je n'ai pas pu le lire.

## Tableau récapitulatif

| Source | Adresse | Type | Langue de la carte | Gradé | Nature du prix | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| Vinted | vinted.fr | Particuliers et pros, FR | Non vérifié (pas de recherche faite) | Slabs présents (rapporté) | Demandé ; pas de vente réalisée visible (non vérifié) | C |
| Leboncoin | leboncoin.fr | Petites annonces, FR | Non vérifié | Non vérifié | Demandé | C |
| Rakuten France | rakuten.fr | Place de marché, FR | sans objet | sans objet | sans objet | D (fermée le 30 septembre 2026) |
| Catawiki | catawiki.com | Enchères, NL | Non vérifié | Lots gradés présents (rapporté) | Enchère finale visible sur lots clos (rapporté) | D (inaccessible) |
| Delcampe | delcampe.net | Petites annonces et enchères de collection, BE | Non vérifié | Non vérifié | Demandé / enchère | C |
| Voggt | voggt.com | Ventes en direct et place de marché | Non vérifié | Non vérifié | Demandé / enchère | C |
| Whatnot | whatnot.com | Ventes en direct, US/EU | Non vérifié | Oui (rapporté) | Demandé / enchère ; mention « Vendu » sans prix (rapporté) | C |
| Facebook Marketplace et groupes | facebook.com | Petites annonces | Non | Non vérifié | Demandé | D |
| Amazon.fr | amazon.fr | Marketplace généraliste | Dans le titre (non vérifié) | Non vérifié | Demandé | C |
| Cdiscount | cdiscount.com | Marketplace généraliste, FR | Non vérifié | Non vérifié | Demandé | C |
| Fnac marketplace | fnac.com | Marketplace généraliste, FR | Non vérifié | Non vérifié | Demandé | D (inaccessible) |
| Etsy | etsy.com | Marketplace généraliste | Dans le titre (non vérifié) | Non vérifié | Demandé | C |
| Wallapop | wallapop.com | Petites annonces, ES | Non vérifié | Non vérifié | Demandé | D (inaccessible, recherche interdite) |
| 2ememain / Marktplaats | 2ememain.be, marktplaats.nl | Petites annonces, BE/NL | Non vérifié | Non vérifié | Demandé | C |
| Ricardo | ricardo.ch | Enchères et annonces, CH | Non vérifié | Non vérifié | Demandé / enchère | D (inaccessible) |
| Kleinanzeigen | kleinanzeigen.de | Petites annonces, DE | Non vérifié | Non vérifié | Demandé | C |
| Subito | subito.it | Petites annonces, IT | Non vérifié | Non vérifié | Demandé | D (inaccessible) |
| CardNexus | cardnexus.com | Place de marché de cartes, multi-jeux, lancée en mars 2026 | Filtre « Language » avec le français (rapporté) | Filtres gradé et société de gradation (déduit de robots.txt) | Demandé | D (inaccessible à mes outils) |
| Cardpeer | cardpeer.com | Place de marché de cartes, NL | Oui : sélecteur de langue FR/EN/DE/IT (vu) | Non vérifié | Demandé (« From », « Est. ») | C |
| Play-in | play-in.com | Boutique (pas une place de marché) | Non vérifié | Non | Prix de la boutique | C |
| UltraJeux | ultrajeux.com | Boutique (pas une place de marché) | Oui : catégorie « Cartes à l'Unité Français » (rapporté) | Non vérifié | Prix de la boutique | C |
| Bazaar of Magic | bazaarofmagic.eu | Boutique NL (pas une place de marché) | Non vérifié | Non vérifié | Prix de la boutique | C |
| Ludikbazar | ludikbazar.com | Site éditorial jeux | sans objet | sans objet | aucun prix | D (hors sujet) |
| Collectr | getcollectr.com | Application de suivi de collection | Non vérifié | Rapports « brutes et gradées » (rapporté) | Valeurs « calculées à partir de données de ventes réelles » (rapporté) | C |
| Dex | dextcg.com | Application de collection | Pas de place de marché | sans objet | aucun | D (hors sujet) |
| Cardlines | cardlines.com | Média et boutique de cartes de sport US | sans objet | sans objet | aucun | D (hors sujet) |
| eBay, ventes réalisées en France | ebay.fr | Voies officielles aux ventes réalisées | Titre / « aspects » | Oui | Vente réalisée | C pour l'API Marketplace Insights, D pour le reste |
| Magic Bazar | magic-bazar.com | Non vérifié : le nom de domaine essayé ne répond pas | | | | non examiné |

Déjà établis, hors examen : Cardmarket (prix publics toutes langues, API fermée aux nouveaux inscrits, demande envoyée), CardTrader (API branchée, annonces par langue), eBay API Browse (licence interdisant de modéliser des prix sans accord écrit), TCGplayer (marché américain, exclu).

Décompte : 27 sources examinées (dont 3 hors sujet, 1 fermée et 1 ensemble de voies eBay), 1 non examinée (Magic Bazar). Verdicts : A 0, B 0, C 16 (Vinted, Leboncoin, Delcampe, Voggt, Whatnot, Amazon.fr, Cdiscount, Etsy, 2ememain/Marktplaats, Kleinanzeigen, Cardpeer, Collectr, Play-in, UltraJeux, Bazaar of Magic, et eBay ventes réalisées pour l'API Marketplace Insights), D 11 (Rakuten, Catawiki, Facebook, Fnac, Wallapop, Ricardo, Subito, CardNexus, Ludikbazar, Dex, Cardlines). Cinq des C sont des boutiques ou des applications, pas des places de marché.

---

## Fiches

### Vinted

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.vinted.fr ; Lituanie (Vinted, UAB, Vilnius) ; particuliers et professionnels |
| Langue de la carte distinguée ? | Non vérifié : je n'ai pas lancé de recherche, pour ne pas collecter. Une page de catalogue « cartes à collectionner à l'unité » avec filtre de marque Pokémon existe (adresse remontée par la recherche : `/catalog/4875-single-trading-cards/brand/191646-pokemon`) ; rien ne dit que la langue y soit un champ |
| Non gradé, gradé | Un guide commercial dit que Vinted ne vérifie pas la légitimité des slabs (rapporté, cardsnpacks.com) ; sociétés et notes non vérifiées |
| Nature du prix | Prix demandé. Vente réalisée visible : non vérifié |
| Profondeur | Non mesurée |
| Historique | Non vérifié |
| Accès | Pas d'API publique de recherche. Une API « Vinted Pro Integrations » existe, côté vendeur, réservée aux comptes pros acceptés (rapporté, page `vinted.co.uk/pro/integrations`) ; elle ne sert pas à lire le catalogue |
| Conditions | Cité (https://www.vinted.fr/terms-and-conditions, lu le 16/11/2026) : « utiliser tout type d'outil logiciel externe (y compris, mais sans s'y limiter, des bots, des programmes de grattage [« scraping »], des programmes d'exploration [« crawling »], des robots d'indexation [« spiders »]) […] à moins qu'une telle utilisation ne soit autorisée, proposée ou permise d'une autre manière par nous » ; et : « extraire des données (« data mining »), collecter des données disponibles sur votre écran (« screen scraping »), explorer des données (« data crawling »)… » ; et : « adapter, copier, modifier, distribuer ou commercialiser tout contenu du Site sans notre consentement écrit préalable ». `robots.txt` (https://www.vinted.fr/robots.txt) : `User-agent: *` sans interdiction du catalogue, mais « Content-Signal: ai-train=no, search=yes, ai-input=yes » ; GPTBot, ClaudeBot, Google-Extended, Amazonbot, CCBot : `Disallow: /` ; et « Automated agents, bots, or AI systems are NOT permitted to: Create, register, or manage user accounts. » |
| Contact | Pas d'adresse électronique sur la page ; elle renvoie à un centre d'aide (« help/1253 ») |
| Verdict | C : les conditions interdisent la collecte automatique sauf autorisation de Vinted ; le `robots.txt` ne l'interdit pas mais les conditions priment. Aucun prix de vente réalisée connu |
| Essai | Non fait (conditions) |

### Leboncoin

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.leboncoin.fr ; France ; petites annonces, particuliers et pros |
| Langue de la carte distinguée ? | Non vérifié (aucune recherche faite). Pas de champ de langue connu |
| Non gradé, gradé | Non vérifié |
| Nature du prix | Prix demandé |
| Profondeur | Non mesurée |
| Historique | Non vérifié |
| Accès | Pas d'API publique documentée pour des tiers (une source commerciale de scraping le dit ; non officiel). Les pros passent par des intégrateurs (Lengow/Octopia, rapporté) |
| Conditions | Cité, `robots.txt` (https://www.leboncoin.fr/robots.txt) : « It's forbidden to use search robots or other automatic methods to access Leboncoin.fr. » et « Access is only permitted with special permission from Leboncoin.fr. » ; `Disallow: /*?*`, `Disallow: /recherche`, `Disallow: /ad/`. Les CGU (`/dc/cgu`) ont refusé l'accès (403) à `curl` et au navigateur : non lues, je n'ai pas insisté. Une décision de justice sur l'extraction de leurs annonces est évoquée par des sources secondaires (non relue) |
| Contact | Non relevé |
| Verdict | C : accord écrit (« special permission ») nécessaire ; sans lui, c'est interdit |
| Essai | Non fait |

### Rakuten France (ex-PriceMinister)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.rakuten.fr ; France ; place de marché |
| Langue de la carte distinguée ? | sans objet |
| Conditions | Cité (page https://www.rakuten.fr/, lue le 16/11/2026) : « La marketplace Rakuten France a cessé son activité le 30 septembre 2026. » Plusieurs articles de presse concordent (rapporté) |
| Verdict | D : n'existe plus. Ne plus la compter dans les sources futures |

### Catawiki

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.catawiki.com ; Pays-Bas ; enchères sélectionnées par des experts |
| Langue de la carte distinguée ? | Non vérifié |
| Non gradé, gradé | Lots Pokémon présents, dont des lots en vrac (rapporté) ; gradés non vérifiés |
| Nature du prix | Rapporté : une page de lot clos affiche « Final bid » (enchère finale). Non relu par moi |
| Accès | Pas d'API officielle trouvée. Des prestataires de scraping utilisent des points d'accès internes non documentés (rapporté) |
| Conditions | `robots.txt`, conditions et page d'accueil : « Access Denied » (réponse HTTP 403) pour `curl` et pour le navigateur. Rien lu, rien contourné |
| Verdict | D : inaccessible. À reprendre seulement si le fondateur obtient un accord (contact non trouvé) |

### Delcampe

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.delcampe.net ; Belgique ; petites annonces et enchères d'objets de collection (cartes postales, timbres, etc.) |
| Langue de la carte distinguée ? | Non vérifié ; la place est centrée sur d'autres collections |
| Accès | Pages. Une API vendeur est annoncée mais pas lancée : le `robots.txt` contient « Seller API documentation: unlisted until the official launch on developers.delcampe.net » |
| Conditions | `robots.txt` (https://www.delcampe.net/robots.txt) : `Disallow: /fr/collections/search` (et ses équivalents dans les autres langues). Conditions générales : lien présent en pied de page, adresse non trouvée par `curl` (404 sur mes essais), **non lues** |
| Contact | Formulaire https://www.delcampe.net/fr/contact (page ouverte) |
| Verdict | C : recherche interdite aux robots, conditions non lues, couverture Pokémon probablement faible |

### Voggt

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://voggt.com ; pays non précisé par la page ; ventes en direct et place de marché (« Buy and sell live ») |
| Langue de la carte distinguée ? | Non vérifié. Catégories « Trading cards » ; « Pokémon Cards » parmi les plus populaires (rapporté) |
| Accès | Pas d'API mentionnée. Plans de site publiés : produits, utilisateurs, « shows » |
| Conditions | `robots.txt` (https://voggt.com/robots.txt) : « User-agent: * Allow: / ». La page de conditions s'affiche vide dans le navigateur (1 062 caractères, pas de texte de conditions) : **non lues** |
| Contact | Page d'aide `help.voggt.com/fr/contact/contact-us-H1KMdxqle` (annoncée par la page d'accueil, non ouverte) |
| Verdict | C : `robots.txt` permissif mais conditions non lues. Pas de prix de vente réalisée connu |

### Whatnot

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.whatnot.com ; États-Unis, présent en France (pages `fr-FR`) ; ventes en direct |
| Langue de la carte distinguée ? | Non vérifié |
| Non gradé, gradé | Vendeurs de cartes gradées présents (rapporté) |
| Nature du prix | Enchère ou prix demandé ; annonces marquées « Vendu » sans prix exploitable dans ce que j'ai vu (rapporté) |
| Accès | Pas d'API publique trouvée |
| Conditions | Cité (https://www.whatnot.com/terms, lu le 16/11/2026, conditions pour l'UE/Royaume-Uni en français disponibles) : « Use any software, technology, or device to scrape, spider, or crawl the App or harvest or manipulate data; » et « Use any manual process to monitor or copy any of the material on the App or for any other unauthorized purpose without our prior written consent; ». `robots.txt` : défi de sécurité Cloudflare (403), non lu |
| Verdict | C : accord écrit nécessaire |

### Facebook Marketplace et groupes

| Champ | Contenu |
| --- | --- |
| Conditions | Cité, `robots.txt` (https://www.facebook.com/robots.txt) : « Collection of data on Facebook through automated means is prohibited unless you have express written permission from Facebook ». Cité, conditions de service (https://www.facebook.com/terms.php) : « Vous ne devez pas collecter des données sur nos Produits ni accéder à de telles données par des moyens automatisés (sans notre autorisation préalable)… » |
| Accès | Pas d'API de lecture des annonces Marketplace trouvée (non vérifié) ; les groupes sont privés ou semi-privés |
| Verdict | D : interdit sauf accord de Meta, que rien ne laisse espérer pour ce projet |

### Amazon.fr

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.amazon.fr ; marketplace généraliste, vendeurs tiers |
| Langue de la carte distinguée ? | Probablement dans le titre ; non vérifié (aucune recherche faite) |
| Accès | L'ancienne API publicitaire (PA-API 5) est remplacée par la « Creators API », réservée aux affiliés Amazon Associates (rapporté, documentation Amazon via recherche ; dates de fin divergentes selon les sources). Éligibilité et règles sur amazon.fr : non vérifiées |
| Conditions | Page de conditions refusée (403) : non lue. `robots.txt` (https://www.amazon.fr/robots.txt) : 190 lignes `Disallow`, `User-agent: *` ; pas relu en détail |
| Verdict | C : API possible pour affiliés, mais conditions non lues et rien ne dit que des cartes à l'unité françaises y soient identifiables |

### Cdiscount

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.cdiscount.com ; France ; marketplace généraliste (réseau Octopia) |
| Conditions | `robots.txt` lu (https://www.cdiscount.com/robots.txt) : interdictions ciblées sur des rubriques et paramètres ; rien de précis sur les cartes. La page de conditions que j'ai essayée est introuvable (404) : **non lues** |
| Verdict | C : conditions non lues ; couverture Pokémon non mesurée |

### Fnac (marketplace)

`https://www.fnac.com/robots.txt` répond par une page de blocage (403) à `curl`. Rien lu. Verdict D : inaccessible.

### Etsy

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.etsy.com ; États-Unis ; marketplace généraliste |
| Accès | API « Open API v3 ». Cité (https://developer.etsy.com/documentation) : « Personal App access allows you to build with Etsy's API beyond your own shop, subject to Etsy's review and applicable limits. » ; l'accès commercial suppose une demande après approbation d'une application personnelle. Si la recherche d'annonces par mot-clé y est ouverte à un tiers : non vérifié |
| Conditions | `robots.txt` : `Disallow: /api/` sous `User-agent: *`. Conditions d'utilisation et conditions de l'API : refus 403, non lues |
| Verdict | C : API officielle possible mais sous approbation ; carte à l'unité française marginale sur Etsy (non mesuré) |

### Wallapop, Ricardo, Subito, 2ememain / Marktplaats, Kleinanzeigen

| Source | Constat |
| --- | --- |
| Wallapop (Espagne) | `robots.txt` lu : « Disallow: /search » et « Disallow: /*? » sous `User-agent: *`. Page de conditions : « Confirm you are human » (défi, non contourné). Verdict D |
| Ricardo (Suisse) | `robots.txt` lu (pas d'interdiction du catalogue repérée en première lecture). Pages du site : captcha « One more step to access our website ». Conditions non lues. Verdict D |
| Subito (Italie) | `robots.txt` : « Access Denied » (403). Page d'accueil ouverte avec bandeau de cookies seulement. Conditions non lues. Verdict D |
| 2ememain.be / Marktplaats.nl (Belgique, Pays-Bas) | `robots.txt` lu : interdictions de pages de compte et de messagerie, pas de recherche repérée. Page de conditions introuvable à l'adresse essayée (404) : non lues. API publique : aucune trouvée ; des prestataires de scraping utilisent un point d'accès interne non documenté (rapporté). Verdict C |
| Kleinanzeigen (Allemagne) | Cité (https://themen.kleinanzeigen.de/nutzungsbedingungen/) : « ohne die ausdrückliche schriftliche Zustimmung von Kleinanzeigen Crawler, Spider, Scraper oder andere automatisierte Mechanismen zu nutzen, um auf die Kleinanzeigen-Dienste zuzugreifen und Inhalte zu sammeln ». `robots.txt` : `Disallow: /ad/`, `Disallow: /s-suchanfrage.html`. Verdict C. Marché allemand : peu utile pour une carte française |

### CardNexus

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://cardnexus.com ; place de marché multi-jeux, annoncée comme lancée le 10 mars 2026 (recherche web), États-Unis et Union européenne (rapporté) |
| Langue de la carte distinguée ? | Rapporté (aide en ligne `help.cardnexus.com/articles/4611539`) : filtre « Language » avec le français. Déduit : le `robots.txt` interdit les paramètres `?language=`, `?graded=`, `?gradingService=`, `?sellerType=`. Un journal de modifications dit que le contenu français de Pokémon était à venir en septembre 2025 ; état actuel non vérifié |
| Accès | Pas d'API publique trouvée. Pages et contenu : refusés (voir plus bas) |
| Conditions | `robots.txt` (https://cardnexus.com/robots.txt) lu : `Disallow: /*/search` et les paramètres de filtre ci-dessus. Le site et ses conditions ont répondu « Vérification de sécurité en cours » (403) au navigateur : non lues |
| Verdict | D pour l'instant (inaccessible à mes outils). À reprendre avec une lecture humaine des conditions : c'est la seule place de marché trouvée qui combine filtre de langue et filtre gradé |

### Cardpeer

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://cardpeer.com ; exploité par Minefort.com B.V., Amsterdam (Pays-Bas) ; place de marché de cartes « indépendante et non officielle » ; commission vendeur de 5 % (cité, conditions) |
| Langue de la carte distinguée ? | Oui, vu sur la page https://cardpeer.com/pokemon/series/base-fr/cards : liste « base-fr », sélecteur de langue FR, EN, DE, IT ; noms de cartes en français. Valeurs de prix de cette page non relevées (aucune carte d'essai passée) |
| Nature du prix | « From €… » (prix de l'annonce la plus basse, à confirmer) et « Est. » (estimation, origine non indiquée) |
| Accès | Pages ; pas d'API trouvée |
| Conditions | Cité (https://cardpeer.com/terms-of-service, version du 24 décembre 2025) : « (g) systematically retrieve data or other content from the Service to create or compile, directly or indirectly, in single or multiple downloads, a collection, compilation, database, directory or the like, whether by manual methods, through the use of bots, crawlers, or spiders, or otherwise ». `robots.txt` (https://cardpeer.com/robots.txt) : n'interdit que comptes, vendeurs, messages ; catalogue ouvert |
| Contact | support@cardpeer.com (page https://cardpeer.com/contact), hello@cardpeer.com (page « about-us ») |
| Verdict | C : la lecture systématique est interdite par les conditions ; un accord écrit est à demander. Petit exploitant néerlandais, accord envisageable |
| Essai | Non fait (conditions) |

### Boutiques rencontrées (hors famille, notées pour le recoupement)

| Source | Constat |
| --- | --- |
| Play-in (https://www.play-in.com) | Boutique avec cartes à l'unité en français (adresses `/fr/carte/<n>/<nom>`), « majoritairement d'occasion » (cité par la page). Pas de vendeur tiers vu. Un service de rachat existe (domaine `rachat.play-in.com`). `robots.txt` : interdit les paramètres de recherche et de langue (`/*lang=`). Conditions non lues. C |
| UltraJeux (https://www.ultrajeux.com) | Boutique parisienne ; catégorie « Cartes à l'Unité Français » pour Pokémon (rapporté). `robots.txt` : seulement quatre pages interdites (`/search3.php`, panier, compte, commande). Conditions de vente non lues. C. Piste utile : des prix français explicitement en langue française |
| Bazaar of Magic (https://bazaarofmagic.eu) | Boutique néerlandaise « Powered by spellenwinkel.nl » ; vend aussi Pokémon ; `robots.txt` : « Content-Signal: search=yes,ai-train=no,use=reference ». Langue du site : anglais et néerlandais. Conditions non lues. C, intérêt faible |
| Ludikbazar | Site éditorial, aucune fiche produit vue. D, hors sujet |
| Cardsnpacks (https://www.cardsnpacks.com) | Boutique française ; son `robots.txt` bloque les robots d'entraînement et encadre les autres (« /catalogue/ nu, pagine ou mono-valeur reste ouvert »). Page « Nos Ventes » : introuvable (404). Hors famille, non fiché |

### Applications

| Source | Constat |
| --- | --- |
| Collectr (https://www.getcollectr.com) | Suivi de collection. Rapporté par la page : valeurs « calculées chaque jour à partir de données de ventes réelles », rapports bruts et gradés sur jusqu'à 5 ans. Pas de place de marché, pas d'API vue, langues de cartes non précisées. Cité (https://www.getcollectr.com/terms-and-conditions) : « involve crawling, scraping or otherwise caching any content from the Website and/or App ». Verdict C pour une éventuelle donnée de ventes (accord à demander). Un concurrent affirme que Collectr n'a pas de ventes réalisées détaillées (source partisane, non retenue) |
| Dex (https://dextcg.com) | Application de scan et de collection, pas de place de marché. D, hors sujet |
| Cardlines (https://cardlines.com) | Média américain de cartes de sport avec boutique et affiliation eBay. Pas une place de marché. D, hors sujet. Le contenu fourni par la page ne parle ni de langue ni de prix de vente |

### eBay : voies officielles aux ventes réalisées (France)

| Voie | Constat | Verdict |
| --- | --- | --- |
| API Marketplace Insights (`item_sales/search`) | Rapporté par la recherche web : ventes des 90 derniers jours, « Limited Release », sur invitation des unités commerciales d'eBay. Sur le forum développeurs, un demandeur écrit qu'il ne trouve pas où demander l'accès et qu'un autre refusé dit qu'eBay ne l'accorde plus qu'aux gros partenaires (rapporté). La documentation officielle de cette API est derrière une connexion : prise en charge de la place de marché `EBAY_FR` **non vérifiée** | C : accord d'eBay à demander, chances faibles pour un projet gratuit |
| Autres API « Buy » | Cité (https://developer.ebay.com/api-docs/buy/static/buy-requirements.html) : « The use of eBay's Buy APIs in production is intended for eBay partners only. You must apply for production access through the eBay Partner Network. » et « There is no guarantee that your application for production use of the APIs will be approved. » Elles donnent des annonces en cours, pas des ventes | Annonces seulement |
| Flux du Partner Network | Cité (https://developer.ebay.com/api-docs/buy/static/api-feed.html) : « This feed is available exclusively to approved EPN partners. » ; `EBAY_FR` figure parmi les places de marché listées pour les flux d'objets actifs. Aucun flux de ventes réalisées vu | Annonces seulement ; programme d'affiliation à rejoindre |
| Terapeak (outil « Product research » de Seller Hub) | Rapporté par eBay (page `export.ebay.com`) : gratuit pour les vendeurs de Seller Hub depuis 2021, trois ans de ventes. Outil d'interface, sans API. Hors accès à un compte vendeur. Cité, conditions eBay.fr (https://www.ebay.fr/help/policies/member-behavior-policies/conditions-dutilisation-des-services-debayfr?id=4259, section 3, lue en partie) : « utiliser tout type de robots informatiques, scraper ou encore utiliser tout autre procédé automatique » est interdit, comme « distribuer ou divulguer au public tout contenu (excepté pour votre propre information) » sauf accord écrit | D pour tout usage automatique ou public |
| Pages « objets vendus » d'ebay.fr | Visibles à la main, mais les conditions interdisent le procédé automatique | D |

Conclusion eBay : la seule voie officielle vers des ventes réalisées sur eBay France est l'API Marketplace Insights, sur approbation individuelle, dont l'ouverture à `EBAY_FR` et à un projet non commercial n'est pas vérifiée. Terapeak ne peut pas être réutilisé.

---

## Les sources les plus prometteuses pour un prix français

1. **Cardpeer** : place de marché dont la langue de la carte est un vrai sélecteur, exploitant petit et joignable (support@cardpeer.com). Un accord écrit lèverait l'interdiction de lecture systématique.
2. **CardNexus** : filtres langue et gradé annoncés ; bloquée à mes outils ; à lire par un humain avant toute démarche.
3. **UltraJeux** (boutique) : catégorie « Cartes à l'Unité Français » ; `robots.txt` presque ouvert ; reste à lire les conditions de vente. Pas une place de marché mais un prix français net.
4. **API Marketplace Insights d'eBay** : seule voie officielle aux ventes réalisées ; probabilité d'accord faible, demande à tenter.
5. **Vinted et Leboncoin** : les plus gros volumes de cartes françaises, mais ni l'un ni l'autre n'a d'API de lecture, et tous deux interdisent la collecte sans accord ; la langue n'est pas un champ.

## Ce qui n'a pas pu être vérifié

- Conditions de : Leboncoin, Catawiki, CardNexus, Amazon.fr, Cdiscount, Fnac, Etsy, Wallapop, Ricardo, Subito, 2ememain/Marktplaats, Delcampe, Voggt, Play-in, UltraJeux, Bazaar of Magic (pages protégées, vides ou introuvables).
- Le champ de langue réel sur Vinted, Leboncoin, 2ememain, Etsy, Whatnot (aucune recherche de carte n'a été faite).
- Les ventes réalisées visibles sur Vinted, Voggt, Whatnot, Catawiki (rapporté seulement).
- Prise en charge d'`EBAY_FR` par Marketplace Insights.
- Magic Bazar : le nom de domaine essayé ne répond pas ; le site n'a pas été identifié.
- Les chiffres de couverture : aucun n'a été mesuré.

## Sources croisées hors de ma famille

- PkmCards.fr (pkmcards.fr) : site de valeurs de cartes qui annonce partir du prix le plus bas de Cardmarket (rapporté par la recherche).
- Poketrace, Pokemon Price Tracker, PokéWallet : API de prix de cartes citées par les recherches ; à examiner par la famille « agrégateurs ».
- Les sites de scraping commerciaux (Apify, etc.) proposent d'extraire Vinted, Leboncoin, Catawiki : ils n'offrent aucun droit supplémentaire et ne sont pas retenus.
- Parkage.com (boutique de cartes importées, remontée par une recherche) : non examinée.

## Marchés anglais, américain, japonais

Whatnot, Etsy, Collectr et Cardlines sont américains ; Catawiki est néerlandais ; les marchés anglais et japonais n'ont pas été approfondis. TCGplayer reste exclu.

## Crédits Firecrawl dépensés

0. Aucun appel Firecrawl (ni catalogue Alexandria, ni recherche, ni lecture).

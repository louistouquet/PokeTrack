# Sources de prix : les enchères

Famille 5 de l'inventaire (`_consignes.md`). Lecture faite le 16 novembre 2026. Question posée : peut-on tirer d'une maison de ventes ou d'une plateforme d'enchères, de façon permise et gratuite, un prix réalisé pour une carte Pokémon française ?

**Conclusion en une ligne : aucune source de cette famille n'est exploitable telle quelle (zéro A, zéro B).** Toutes celles qui se laissent lire interdisent par écrit l'extraction sans accord préalable ; les autres sont derrière Cloudflare ou Akamai. Le seul chemin est un accord écrit (verdict C) avec une ou deux maisons françaises, et le volume restera faible : il ne servira qu'aux cartes chères, gradées ou vintage.

Méthode : `robots.txt` lu par `curl` pour chaque site ; conditions lues par `curl` ou Playwright quand la page répondait ; recherches web ciblées sur chaque domaine pour repérer les lots Pokémon. Aucune extraction en masse : une à trois pages de lots par site. Quand un mur Cloudflare ou Akamai (« Just a moment », « Access Denied ») est apparu, je n'ai pas insisté (un seul essai Playwright sans aucun contournement). Les résultats d'une recherche web que je n'ai pas relus sur la page elle-même sont marqués « rapporté, non relu ».

## Tableau récapitulatif

| Source | Adresse | Type | Langue de la carte distinguée | Gradé | Nature du prix | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| Aguttes | aguttes.com | Maison française, ventes en ligne dédiées TCG | Oui, champ « Langue : français » (vu sur un lot) | PSA, PCA | Réalisé, frais et taxes compris | C |
| Vermot et Associés | vermotetassocies.com | Maison française (Drouot), ventes Pokémon depuis 2021 au moins | Par le titre (« Bloc Wizards », « Carte pokémon FR » selon les lots) | PCA surtout | Réalisé, affiché sans frais | C |
| Drouot (plateforme) | drouot.com | Agrégateur de maisons françaises | Par le titre | PCA, PSA | Réalisé, frais variables selon la maison | C |
| Gazette Drouot | gazette-drouot.com | Archive de résultats Drouot | Non vérifié | Non vérifié | Non vérifié | D |
| Interenchères | interencheres.com | Plateforme française, nombreuses petites maisons | Par le titre | PCA, PSA, Beckett | Estimation visible ; adjugé non confirmé | D (mur Cloudflare) |
| Auction.fr | auction.fr | Plateforme française | Par le titre | PCA | Non vérifié | D (mur Cloudflare) |
| Millon | millon.com | Maison française, département Pop Culture | Par le titre | PSA, PCA | Réalisé (rapporté) | D (blocage Cloudflare) |
| Barnebys | barnebys.com | Agrégateur suédois de résultats | Par le titre | Oui | Réalisé, converti en dollars | C |
| Catawiki | catawiki.com | Plateforme néerlandaise | Par le titre | PSA, CGC, PCA | Offre finale | D (Akamai) |
| Invaluable | invaluable.com | Agrégateur américain | Non vérifié | Non vérifié | Réalisé | C |
| LiveAuctioneers | liveauctioneers.com | Agrégateur américain | Non vérifié | Non vérifié | Réalisé | C |
| the-saleroom | the-saleroom.com | Agrégateur britannique (ATG) | Par le titre (« FR ») | Oui | Réalisé | C |
| Lot-tissimo | lot-tissimo.com | Agrégateur allemand (ATG) | Non vérifié | Non vérifié | Non vérifié | C (conditions non lues) |
| Ewbank's | ewbankauctions.co.uk | Maison britannique, ventes de cartes régulières | Oui, « French » dans le titre | PSA | Réalisé, frais compris | D (robots.txt) |
| Heritage Auctions | ha.com | Maison américaine | Rarement | PSA, CGC, BGS | Réalisé | C |
| Goldin | goldin.co | Maison américaine | Non vérifié | PSA, etc. | Réalisé | C |
| Fanatics Collect (ex-PWCC) | fanaticscollect.com | Plateforme américaine | Non vérifié | PSA, etc. | Non vérifié | C |
| Voggt | voggt.com | Ventes en direct, groupe Fanatics | Non vérifié | Non vérifié | Non vérifié | C (non vérifié) |
| Whatnot | whatnot.com | Ventes en direct américaines | Non vérifié | Non vérifié | Non vérifié | D (mur Cloudflare) |
| Auctionet | auctionet.com | Plateforme suédoise | Non vérifié | Non vérifié | Estimation et réalisé | C (conditions non lues, volume nul) |
| eBay enchères | ebay.fr | Rappel seulement | Par le titre | Oui | Réalisé | D (voir `ROADMAP.md`) |
| Artcurial | artcurial.com | Maison française | Aucun lot Pokémon trouvé | | | C (non vérifié, sans objet) |
| Tessier & Sarrou | tessier-sarrou.com | Maison française | Aucun lot Pokémon trouvé | | | C (non vérifié, sans objet) |
| Ader | ader-paris.fr | Maison française | Aucun lot Pokémon trouvé | | | C (non vérifié, sans objet) |
| Boisgirard-Antonini | boisgirard-antonini.com | Maison française | Aucun lot Pokémon trouvé | | | C (non vérifié, sans objet) |
| Rossini | rossini.fr | Maison française | Non examinée au-delà de `robots.txt` | | | C (non vérifié, sans objet) |
| Crédit Municipal de Paris | creditmunicipal.fr | Maison publique, ventes diffusées par Interenchères | Aucun lot Pokémon trouvé | | | C (non vérifié, sans objet) |
| Hake's | hakes.com | Maison américaine | Aucun lot Pokémon français trouvé | | | C (non vérifié, sans objet) |

28 lignes. Les sept dernières ont été examinées au minimum (robots.txt, une recherche) : à ne pas compter comme des fiches complètes.

## Fiches

### Aguttes

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.aguttes.com, France. Maison de ventes volontaires, département « Cartes de collection & TCG ». |
| Langue de la carte distinguée ? | Oui sur la fiche de lot : j'ai lu « État : scellée Langue : français » sur le lot 12 de https://www.aguttes.com/online/lot/pokemon-dracaufeu-set-de-base-1ere-edition-psa-9-signee-et-dessinee-par-arita-psa-10-101262. Les titres de liste, eux, sont courts (« Pokémon : Dracaufeu V 154/172 ») et parfois approximatifs (un lot « Mentali Vmax 270/26 », numéro tronqué). |
| Non gradé, gradé | Les deux. Lots vus : PSA 9 / PSA 10, PCA 10 (rapporté, non relu), scellés, cartes seules. |
| Nature du prix | Vente réalisée, **frais et taxes compris**. Texte lu sur la fiche : « Vendu : 4 100 € Les prix s'entendent commission et taxes comprises. » Pas de prix demandé. |
| Profondeur | Vente « Cartes de collection » du 24 mai au 2 juin 2026 : 10 pages de 24 lots, soit environ 240 lots (estimé par la pagination, pas tous Pokémon ni tous français). La page des ventes passées liste deux ventes de cartes closes le 11 novembre 2026 et d'autres en 2026. Recherche web : ventes « Trading Cards » du 22 octobre 2025 (115 960 €) et « Collector's Cards » du 11 février 2026 (188 046 €), rapporté, non relu. Estimation du rythme : une vente de cartes tous les un à deux mois ; quelques dizaines de lots Pokémon français par vente. Non mesuré lot par lot. |
| Historique | Ventes TCG repérées depuis au moins octobre 2025. Archive des ventes passées en ligne. Non vérifié plus loin. |
| Accès | Pages HTML, sans compte. Filtres « Vendu / Invendu », tri par résultat. Aucune API ni flux constatés. |
| Conditions | CGU, article 7 : « L'Utilisateur s'interdit de reproduire, représenter, extraire, ou utiliser de quelque manière que ce soit tout ou partie du Site ou de son Contenu et notamment les Catalogues sans avoir obtenu une autorisation préalable et écrite de l'Opérateur de Ventes sous peine de voir une action judiciaire en contrefaçon engagée à son égard » (https://www.aguttes.com/legals/conditions-generales-d-utilisation). `robots.txt` (https://www.aguttes.com/robots.txt) : pour `*`, `Content-Signal: search=yes,ai-train=no,use=reference`, `Allow: /` ; la ligne `Disallow: /api/` figure dans un bloc distinct. Le fichier réserve expressément les droits au titre de l'article 4 de la directive 2019/790 (fouille de textes). |
| Contact | https://www.aguttes.com/legals/nous-contacter : standard +33 1 47 45 55 55, adresses de courriel masquées par le site ; le département cartes figure sur https://expertise.aguttes.com/cartes-de-collection/dracaufeu/ avec le même téléphone d'équipe (+33 1 41 92 06 69). |
| Verdict | **C.** Le site est lisible et propre, mais la clause d'extraction exige un accord écrit. C'est la meilleure source de la famille : prix frais compris et datés, champ de langue, lots gradés. |
| Essai | Pas de verdict A ou B : non lancé. Observation manuelle d'un seul lot : Dracaufeu Set de Base 1re édition PSA 9, signée et dessinée par Arita, 4 100 € frais compris (carte modifiée, pas une 4/102 standard). Mew ex 205/165 et Noctali VMAX 215/203 : aucun lot trouvé par la recherche web. |

### Vermot et Associés

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.vermotetassocies.com, Paris. Maison de ventes qui organise des ventes 100 % Pokémon, vendues aussi sur Drouot. |
| Langue de la carte distinguée ? | Par le titre. Certains lots portent « Jap », « Wizards », « FR » ; d'autres rien. Non systématique. |
| Non gradé, gradé | Les deux, PCA surtout (« notée PCA 10/10 »). |
| Nature du prix | Vente réalisée, **hors frais** : la page de vente affiche « Résultat 210 EUR Résultats sans frais ». Frais acheteur 26 % TTC dans la vente de décembre 2022 (« une commission de 26% T. T. C (T. V. A. en sus au taux en vigueur: 20% ou 5,5% selon les cas) »). La recherche web rapporte 28 % TTC sur une vente plus récente, non relu. |
| Profondeur | Au moins quatre ventes Pokémon repérées (catalogues 117487, 124185, 133919, 149407). Une seule relue : « Cartes Pokémon », 12 décembre 2022, vente 100 % en ligne. Volume sur douze mois : non mesuré. Les ventes générales actuelles de la page d'accueil ne sont pas des ventes de cartes. Un Dracaufeu XY Évolutions 11/108 à 291 $ le 13 octobre 2025 est rapporté par Barnebys (non relu), preuve d'une activité récente. |
| Historique | 2021 à aujourd'hui, d'après les numéros de catalogue. |
| Accès | Pages HTML sans compte, « Résultats imprimables ». Pas d'API constatée. |
| Conditions | https://www.vermotetassocies.com/conditions-generales-utilisation : « L'Utilisateur s'interdit de reproduire, représenter, extraire, ou utiliser de quelque manière que ce soit tout ou partie du Site ou de son Contenu et notamment les Catalogues sans avoir obtenu une autorisation préalable et écrite de l'Opérateur de Ventes ». Et : « Une utilisation des Contenus à des fins commerciales est strictement interdite. » `robots.txt` : `Disallow: /recherche/*` seulement pour `*`. |
| Contact | info@vermotetassocies.com, tél. +33 1 71 19 42 16, affichés dans le pied de page de https://www.vermotetassocies.com/. |
| Verdict | **C.** Source intéressante parce que spécialisée Pokémon, avec prix hors frais (à corriger du taux de la vente). |
| Essai | Non lancé (pas A ou B). |

### Drouot (plateforme)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://drouot.com, France. Plateforme des ventes en direct et en ligne de nombreuses maisons ; les résultats terminés sont renvoyés vers la Gazette Drouot. |
| Langue de la carte distinguée ? | Par le titre (« Carte pokémon gradée PCA 7 »). Pas de champ. |
| Non gradé, gradé | Les deux, PCA et PSA. |
| Nature du prix | Vente réalisée ; frais selon la maison (les CGU renvoient aux CGV de chaque opérateur). |
| Profondeur | Recherche web limitée à drouot.com : une dizaine de lots Pokémon français d'avril à novembre (prix de 15 € à 350 €), typiquement des maisons de la famille Vermot. Volume réel : non mesuré, la recherche interne est interdite par `robots.txt`. |
| Historique | Non vérifié. |
| Accès | Pages HTML. Aucune API publique constatée. |
| Conditions | CGU en vigueur au 15 juillet 2025 (https://drouot.com/fr/cgu) : « l'Utilisateur s'interdit de reproduire, représenter, extraire, ou utiliser de quelque manière que ce soit tout ou partie des Plateformes ou de leur contenu et notamment les Catalogues sans avoir obtenu une autorisation préalable et écrite de Drouot SI ». Et : « Toute vente terminée, il est possible de consulter les résultats des enchères terminées sur le site www.gazette-drouot.com ». `robots.txt` (https://drouot.com/robots.txt) : `Disallow: /l/*` (pages de lots), `Disallow: /auctions/past`, `Disallow: /s?`, `Disallow: /s/` pour `*`. |
| Contact | https://drouot.com/fr/contact : aucune adresse lue dans le HTML. |
| Verdict | **C.** Les pages de lots et l'archive des ventes passées sont exclues par `robots.txt` : même avec un accord, il faudrait un flux, pas un robot. |
| Essai | Non lancé. |

### Gazette Drouot

Adresse https://www.gazette-drouot.com. `robots.txt` et pages renvoient un défi Cloudflare (« Just a moment », HTTP 403), en `curl` comme en Playwright. Je n'ai pas insisté. Conditions et contenu : non vérifié. **D** (inaccessible). La CGU de Drouot la désigne comme le lieu des résultats terminés : c'est la porte à frapper si l'on demande un accord à Drouot.

### Interenchères

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.interencheres.com, France (société Commissaires-Priseurs Multimedia). Plateforme de centaines de petites maisons, dont l'Hôtel des Ventes de Troyes, pionnier des ventes Pokémon (rapporté par une recherche web, non relu). |
| Langue de la carte distinguée ? | Par le titre (« Carte Pokémon française Dracaufeu EX 223/197 »), pas de champ constaté. |
| Non gradé, gradé | Les deux : PCA 8 / 9,5, Beckett 6,5, non gradées. |
| Nature du prix | Estimations visibles dans les extraits de recherche ; prix adjugé non confirmé. Conditions types publiées : les enchères sont « annoncées par le commissaire-priseur hors frais et hors taxe », frais « qui peuvent varier entre chaque commissaire-priseur » (https://static.interencheres.com/v4/legal/INTERNAUTES/CGVtemp_INTERNAUTES_IE.pdf). |
| Profondeur | Beaucoup de ventes TCG (ventes de 360 lots, lots Pokémon en série), mais non mesuré : le site est derrière Cloudflare. Probablement le plus gros volume français de la famille, à ne pas chiffrer. |
| Historique | Non vérifié. |
| Accès | Pages HTML. `robots.txt` et pages renvoient « Just a moment », HTTP 403, en `curl`, en Playwright et en lecture de page web. |
| Conditions | CGU du site non lues (seules la charte de données personnelles et les conditions de vente types sont téléchargeables hors Cloudflare). `robots.txt` non lisible. |
| Contact | Non vérifié. |
| Verdict | **D** (inaccessible à la lecture automatique). À reprendre si le fondateur obtient un accord écrit : c'est alors probablement la source la plus riche. |
| Essai | Non lancé. |

### Auction.fr

Adresse https://www.auction.fr. Défi Cloudflare sur `robots.txt` et sur les pages (HTTP 403, `curl` et Playwright). La recherche web montre des lots Pokémon (Dracaufeu 4/102 édition 1 FR, PCA 9,5) mais je n'ai pu lire ni prix, ni conditions. **D.** Non vérifié : tout le reste.

### Millon

Adresse https://www.millon.com. `robots.txt` lu par `curl` (200) : `User-agent: *` avec interdictions techniques classiques (`/admin/`, `/search/`, facettes) et blocage nominal de GPTBot, ClaudeBot, CCBot, etc. Mais les pages de lots répondent « Attention Required! Cloudflare … Sorry, you have been blocked » (HTTP 403) à `curl`, et 403 à la lecture de page web. Millon a un département Pop Culture et plusieurs ventes Pokémon (catalogues vente2887 « Trading cards Pokémon », vente3686 « TCG Pokémon, Magic et divers »). La recherche web rapporte, non relus : Dracaufeu 4/102 Set de Base édition 2 FR à 150 €, édition 1 à 1 200 €. Conditions non lues. **D** (blocage). Profondeur : plusieurs ventes, non mesuré.

### Barnebys

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.barnebys.com, Suède. Agrégateur d'annonces et de résultats d'enchères de nombreuses maisons, dont des maisons françaises. |
| Langue de la carte distinguée ? | Par le titre ; les maisons françaises y gardent leurs libellés (« POKEMON Dracaufeu - Set de Base - 4/102 »). |
| Non gradé, gradé | Les deux. |
| Nature du prix | Vente réalisée, **convertie en dollars**, frais inclus ou non selon la maison d'origine (non indiqué sur la page de liste). |
| Profondeur | Une seule page lue, https://www.barnebys.com/realized-prices/dracaufeu.html : 18 résultats « dracaufeu », dont 3 à 4 Dracaufeu 4/102 FR de 370 $ à 516 $, un Dracaufeu brillant Neo Destiny à 762 $, des boosters à 560-617 $. Le site est un index : la profondeur dépend de ses partenaires, non mesurée. Pas de date de vente lue sur la liste. |
| Historique | Non vérifié. |
| Accès | Pages HTML sans compte. Aucune API constatée (non vérifié). |
| Conditions | `robots.txt` (https://www.barnebys.com/robots.txt), phrase exacte : « Notice: Crawling Barnebys is prohibited unless you have express written permission. » Et, sous « Realised-price lot pages (closed to protect crawl budget) » : `Disallow: /realized-prices/lot`, `/adjudications/objet`, etc. Conditions d'utilisation (lien du pied de page) non lues. |
| Contact | Siège indiqué dans le pied de page : Brahegatan 10, Stockholm. Aucune adresse lue. |
| Verdict | **C.** Un accord écrit avec un seul interlocuteur donnerait accès à plusieurs maisons françaises, ce qui en fait la piste la plus économique à demander. |
| Essai | Non lancé (pas A ou B). Observation manuelle : le Dracaufeu 4/102 FR s'y affiche entre 370 $ et 516 $ ; rien pour Mew ex 205/165 ni Noctali VMAX 215/203 (non cherché au-delà d'une recherche web). |

### Catawiki

Adresse https://www.catawiki.com, Pays-Bas. `robots.txt` et pages de lots : « Access Denied » (Akamai, HTTP 403), en `curl` et en Playwright. Je n'ai pas insisté. Par la recherche web (rapporté, non relu), les lots Pokémon sont nombreux, en français (titres « Dracaufeu », « Mew EX Full Art 205/165 UCG 10 », « Dracaufeu PCA 9 ») avec gradation PSA, CGC, PCA ; les enchères terminées montrent une offre finale (35 € à 399 € pour des Dracaufeu modernes gradés). Frais acheteur, conditions et possibilité de lire les résultats sans compte : non vérifié. Volume : probablement le plus visible en continu, non chiffré. **D** (inaccessible).

### Invaluable

Adresse https://www.invaluable.com, États-Unis. `robots.txt` (https://www.invaluable.com/robots.txt) : « The use of robots or other automated means to access the Invaluable site without the express permission of Invaluable is strictly prohibited. » ; `Crawl-delay: 10` ; `Disallow: /search?keyword=`. Conditions (https://www.invaluable.com/inv/agreements/) : « You may not collect and use e-mail addresses of other users of the Sites or other user account information, listings, or perform any form of data extraction or data-mining whatsoever. » et « You agree that you will not use any robot, spider, other automatic device, or manual process to monitor or copy our web pages or the content contained herein without our prior expressed written permission. » Langue, gradé, volume Pokémon français : non mesurés (recherche interne interdite). Prix réalisé, frais non vérifiés. **C.**

### LiveAuctioneers

Adresse https://www.liveauctioneers.com, États-Unis. `robots.txt` : `Disallow: /search?`, `/statistics/`, `*keyword=*`, `*hammer_price=*`, `*sort=*`, etc. Conditions (https://www.liveauctioneers.com/termsandconditions) : « The sites contain robot exclusion headers. … You agree that you will not use any robot, spider, scraper, or other automated means to access the sites for any purpose without our express written permission. » Page « Intellectual Property » (https://www.liveauctioneers.com/intellectualproperty) : exclut « the collection and use of product listings, descriptions, or prices; … data mining, robots, or similar data gathering and extraction tools ». Pages de catalogue publiques avec « Price Results ». Volume Pokémon français : non mesuré (recherche interdite par robots), très probablement très faible. **C.**

### the-saleroom (et Lot-tissimo)

Adresse https://www.the-saleroom.com, Royaume-Uni (groupe ATG, qui édite aussi lot-tissimo.com). Les « Price Guide » et « Realised Prices » sont publics ; page https://www.the-saleroom.com/en-gb/price-guide/pokemon lue : une recherche « dracaufeu » renvoie 18 résultats, dont des lots d'une maison française : Dracaufeu Set de Base 4/102 FR à 515,78 $, 381,23 $, 392,44 $, 370,02 $ (prix réalisés convertis, frais non indiqués sur la liste), Dracaufeu brillant Neo Destiny à 762,46 $. Volume mesuré par une seule recherche : environ une douzaine de lots français « dracaufeu », dates non lues. Conditions (https://www.the-saleroom.com/en-gb/about-us/legal/website-terms-and-conditions) : « … create a database in electronic or structured manual form by systematically and/or regularly downloading, caching, printing and/or storing the material available on or through the Website or the Service (by spidering or otherwise) or enable or permit others to do so » et « the User may not copy, extract, utilise, download, distribute, re-sell, use or publish (including by any means of electronic dissemination or extraction) the Content in any way without the prior written consent of the Website Operator ». `robots.txt` : pas d'interdiction des pages de résultats mais `Disallow: */archivelot*`. **C.** Lot-tissimo : même `robots.txt` (à `Disallow: */en-gb*` près), page de conditions en erreur à la lecture, contenu Pokémon non examiné : **C** (conditions non lues).

### Ewbank's

Adresse https://www.ewbankauctions.co.uk, Royaume-Uni. Département « Trading Cards » avec ventes régulières. Les lots portent « French » dans le titre (lot 7039, 19 décembre 2024 : « Pokemon TCG. French Neo Destiny Complete Shining Set », rapporté, estimation 1 500-3 000 £, adjugé 3 900 £ « inc. buyer fees » selon la recherche web, non relu) ; Dracaufeu [Gold Star] EX Dragon Frontiers 100/101 FR le 10 mars 2026 à 4 030 £ frais compris (rapporté, non relu). `robots.txt` (https://www.ewbankauctions.co.uk/robots.txt) : des blocs nominatifs (Googlebot, etc.) avec crawl-delay, puis, en fin de fichier, `User-agent: *` / `Disallow: /`. **D** (tout robot hors liste nommée est exclu). Les conditions ne changent rien ici ; non lues. Bon exemple de maison qui distingue le français et publie le prix frais compris, mais fermée.

### Heritage Auctions

Adresse https://www.ha.com (lots Pokémon sur comics.ha.com), États-Unis. `robots.txt` : `Crawl-delay: 15` pour `*`, pages de lots non exclues, `/c/search-results.zx` exclu pour quelques robots seulement. Page « Website Use Agreement » : HTTP 403 à `curl` et à Playwright ; je n'ai donc pas lu les conditions (la recherche web en résume une interdiction du « screen scraping » et du « database scraping », paraphrase non relue). Cartes françaises : une recherche ne trouve que des cartes anglaises 1re édition ; seul article français repéré, un display Set de Base 1re édition français scellé vendu 36 000 $ (communiqué de février 2022, rapporté, non relu). Pour la cote française, volume proche de zéro. **C.**

### Goldin

Adresse https://goldin.co, États-Unis. `robots.txt` : `Disallow: /api/`, `/account/` ; `Allow: /item/`, `/auction/`, `/buy/`. User Agreement (https://goldin.co/useragreement, lu par Playwright) : « use any robot, spider, scraper, data mining tools, data gathering and extraction tools, or other automated means to access our Services for any purposes, except with the prior express permission of Goldin ». Cartes françaises : non cherchées en profondeur ; la maison est connue pour les cartes très chères (record mondial, voir plus bas). **C.**

### Fanatics Collect (ex-PWCC)

Adresse https://www.fanaticscollect.com, États-Unis. `robots.txt` : `Disallow: /login`, `/join`, `/share/` seulement. Conditions (https://support.fanaticscollect.com/en_us/terms-of-use-r11C70QTge, lues) : « use any manual or automated software, devices or other processes (including but not limited to spiders, robots, scrapers, crawlers, avatars, data mining tools or the like) to "scrape" or download data from any portion of the Platform and/or Services » et « Bypass any robot exclusion headers or other measures Fanatics Collect takes to restrict access ». Données Pokémon françaises : non examinées. **C.**

### Voggt

Adresse https://voggt.com (ventes en direct, achat et vente). `robots.txt` : `User-agent: *`, `Allow: /`. Les conditions générales (https://about.voggt.com/general-terms-and-conditions) ne contiennent, à ma lecture par mots-clés, aucune clause contre l'extraction ; texte non relu en entier. Plusieurs pages citent Fanatics Collectibles France SAS comme opérateur. Je n'ai pas trouvé d'archive publique de résultats de ventes ni de lots Pokémon français datés. **C** par prudence (non vérifié). Verdict à revoir si l'on découvre des pages de résultats publiques.

### Whatnot

Adresse https://www.whatnot.com. `robots.txt` : défi Cloudflare (403) en `curl` et en Playwright. Conditions et résultats publiés : non vérifié. **D.**

### Auctionet

Adresse https://auctionet.com, Suède. `robots.txt` : `Disallow: /admin/`, `/tv`, `/*/my/*` (le reste est permis). Une seule recherche, « pokemon », sur https://auctionet.com/en/search?q=pokemon : 5 enchères actives (mesuré le 16 novembre 2026), dont 3 jouets et 2 objets de collection. Volume Pokémon français : nul pour notre usage. Conditions non lues. **C** (non lues).

### Maisons françaises sans lot Pokémon trouvé

Artcurial, Tessier & Sarrou, Ader, Boisgirard-Antonini, Rossini, Crédit Municipal de Paris : une recherche web ciblée sur chaque domaine ne renvoie aucun lot de carte Pokémon (pour Rossini, seulement `robots.txt` lu, aucune recherche utile). `robots.txt` lus : Artcurial (`Disallow: /motorcars` et quelques robots nommés exclus), Tessier-Sarrou et Ader (`Disallow: /recherche/*`, nombreux robots nommés exclus), Boisgirard-Antonini (`/search/`, `/wp-json/`). Tessier & Sarrou et Ader partagent probablement le modèle de CGU de Vermot et Aguttes : non vérifié. Frais acheteur Tessier & Sarrou : 25 % ou 28 % TTC selon la vente, sur des ventes sans rapport (rapporté). Crédit Municipal : environ 80 ventes par an, diffusées via Interenchères (rapporté). Verdict **C** par défaut, sans objet : rien à collecter.

### Hake's

Adresse https://www.hakes.com. `robots.txt` : `Disallow: /search`, `/user` ; plusieurs robots nommés exclus. Aucun lot Pokémon français trouvé. Sans objet.

### eBay enchères (rappel)

Adresse https://www.ebay.fr. Les ventes terminées sont le plus gros gisement de prix réalisés, mais l'API est interdite par sa licence (voir `ROADMAP.md`) ; décision du fondateur : n'afficher que les annonces en cours avec un lien vers eBay. Non réexaminé. **D.**

## Ce que ces sources valent pour PokéTrack

- **Volume.** Le total français de lots Pokémon par an se compte vraisemblablement en milliers sur Interenchères, en centaines chez Aguttes, Vermot et Millon. Pour le catalogue de PokéTrack (des dizaines de milliers de cartes françaises), cela couvre au mieux quelques centaines de cartes, surtout vintage (Set de Base, Neo) et gradées, plus des lots de dizaines de cartes sans détail. Trop faible pour servir à autre chose qu'aux cartes les plus chères et aux repères gradés.
- **Lots hétérogènes.** Beaucoup de lots sont des collections (« Ensemble de 18 cartes », « lot d'environ 2 200 cartes ») : inutilisables comme prix unitaire.
- **Frais.** Il faut ramener tous les prix au même régime : Aguttes publie frais compris, Vermot et Interenchères hors frais (taux variable, 25 à 30 % TTC selon la maison), Ewbank's frais compris. Un mélange sans correction fausserait la cote.
- **Qualité des titres.** La langue est souvent absente ou déduite du titre ; seuls Aguttes (champ « Langue ») et Ewbank's (« French ») la disent. Les numéros de carte sont parfois inexacts (« Mentali Vmax 270/26 »).
- **Cartes d'essai.** Aucune des trois cartes d'essai n'a été essayée (aucun verdict A ou B). Pour le Dracaufeu 4/102 FR, les ordres de grandeur lus à la main : 370 à 516 $ (the-saleroom et Barnebys, non gradé, converti), 4 100 € pour une carte modifiée gradée (Aguttes). Mew ex 205/165 et Noctali VMAX 215/203 : aucun lot trouvé hors Catawiki (Mew ex 205/165 UCG 10, prix non lu).

## Démarches recommandées (c'est au fondateur de décider)

Un accord écrit est la seule voie. Par ordre d'intérêt et de facilité :
1. **Aguttes** (département cartes, contact page https://www.aguttes.com/legals/nous-contacter) : prix frais compris, langue dans la fiche.
2. **Vermot et Associés** (info@vermotetassocies.com) : ventes spécialisées Pokémon, prix hors frais.
3. **Barnebys** : un seul accord, plusieurs maisons ; contact non trouvé dans les pages lues.
4. **Interenchères / Drouot** : volume plus grand mais interlocuteurs et conditions inconnus à ce stade.

## Sources croisées hors de ma famille

- Cards N Packs (https://www.cardsnpacks.com) : boutique française de cartes gradées avec « Enchères du dimanche » sur eBay, historique de ventes ; à voir dans la famille boutiques.
- GradedCardCenter (https://www.gradedcardcenter.com) : fiches de cartes gradées vendues, prix fixe et enchères privées ; à voir dans la famille gradées.
- PCA (société de gradation française) : population et résultats ; à voir dans la famille gradation.
- Mile High Card Co. : un Dracaufeu FR 1re édition PSA 9 à 2 879 $ (annonce de novembre 2021 vue via Barnebys) ; famille boutiques américaines.
- Cardmarket : déjà la base du prix affiché.

## Marchés anglais, américain, japonais (à noter sans approfondir)

- États-Unis : Heritage (Dracaufeu 1re édition PSA 10 anglais, record rapporté à 550 000 $ en décembre 2025, non relu), Goldin (Pikachu Illustrator PSA 10 à 16 492 000 $ frais compris, février 2026, rapporté, non relu), Fanatics Collect. Aucune carte française repérée, hormis un display Set de Base FR scellé chez Heritage.
- Royaume-Uni : Ewbank's, forte activité cartes (collection de 1,56 million de livres, rapportée non relue), avec des lots français.
- Japon : Catawiki, Heritage et Goldin vendent des cartes japonaises ; hors périmètre.

## Ce que je n'ai pas pu vérifier

Interenchères, Auction.fr, Gazette Drouot, Millon, Whatnot (Cloudflare) et Catawiki (Akamai) : aucune condition lue, aucun prix lu sur la page. Heritage : conditions illisibles (403). Voggt : résultats publics non trouvés. Lot-tissimo, Auctionet, Artcurial, Tessier-Sarrou, Ader, Boisgirard, Rossini, Crédit Municipal : conditions non lues. Volumes sur douze mois : jamais mesurés au sens strict (les recherches internes sont interdites par `robots.txt` chez Drouot, Invaluable, LiveAuctioneers) ; chiffres donnés comme estimés. Quand une phrase vient d'un résumé de recherche web sans relecture de la page, elle est marquée « rapporté, non relu ».

## Crédits Firecrawl dépensés

0. Aucun appel Firecrawl (ni recherche, ni lecture, ni Alexandria).

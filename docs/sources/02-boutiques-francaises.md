# Boutiques en ligne françaises et francophones (cartes à l'unité)

Inventaire du 16 novembre 2026, rédigé selon `_consignes.md`. Trente boutiques examinées (lecture du `robots.txt`, de la page d'accueil, des conditions quand elles étaient accessibles, et d'une à quatre pages de catalogue). Cinq autres adresses citées par des pistes (Magic Bazar, Poké-Shop, Card Corner, Fantasy Sphere, Pokemon-singles) ne répondent pas depuis la session (code 000) : « non vérifié », elles ne sont pas comptées.

Aucune extraction en masse : les comptes viennent de compteurs publiés par les sites (catégories, API de catégories, en-têtes de total) et non du parcours du catalogue. Les prix cités sont des prix demandés en ligne, lus le 16 novembre 2026.

## Règle de verdict utilisée ici

- **B** : le `robots.txt` autorise la lecture des pages et aucune phrase des conditions n'interdit expressément la reproduction ou l'extraction des contenus du site. Une clause qui dit seulement que les textes, images ou logos sont protégés ne vaut pas interdiction. Le droit sui generis des producteurs de bases de données (directive 96/9/CE) s'applique de toute façon à une extraction substantielle : B veut dire « lecture ponctuelle de pages », pas « aspirer le catalogue ».
- **C** : une phrase des conditions interdit la reproduction ou l'extraction « sans autorisation écrite préalable », limite l'usage au personnel et non commercial, ou les conditions n'ont pas pu être lues. Dans le doute entre B et C, C.
- **D** : accès bloqué par Cloudflare (même en navigateur) ou hors sujet payant. « Sans objet » : la boutique ne vend pas de cartes françaises à l'unité.

## Constat d'ensemble

1. **Les prix des boutiques ne sont presque jamais indépendants de Cardmarket.** MangaCash écrit noir sur blanc « proposées au prix Cardmarket » ; LorenZone affiche la cote Cardmarket dans son formulaire de dépôt et marque les cartes non tarifées « a-tarifer » à 0,00 € ; Le Dépôt TCG écrit « je ne paie pas le prix Cardmarket » pour le rachat. Un prix de boutique ne sert de contrôle que s'il diffère de la cote : à traiter comme une confirmation, pas comme une source neuve.
2. **Aucune boutique n'affiche de prix de rachat public, carte par carte, sans compte.** Parkage dit en avoir (« indiqués avec leur prix de rachat unitaire ») mais la page est derrière une connexion : non lue. Toutes les autres fonctionnent sur estimation à la demande. C'est la lacune la plus nette de la famille.
3. **L'offre gradée française existe et se lit** : MangaCash (PCA, PSA, Collect Aura, SFG, note dans le titre), Cards N Packs (228 pièces françaises gradées), OozeShopFR, LorenZone (49), DracauGames (26), Cardshunter (267), Guizette Family (PSA, Collect Aura).
4. **Les plateformes Shopify exposent `/products.json`**, mais le fichier n'est ni documenté comme offert à la réutilisation, ni interdit par les `robots.txt` lus. LorenZone et MangaCash publient un `agents.md` qui autorise la lecture des pages HTML publiques et demande de s'identifier comme agent.
5. **Flux Google Shopping ou affiliation (Awin, Effinity, Kwanko)** : une recherche ciblée n'a rien trouvé. Non vérifié pour toutes les boutiques.

## Tableau récapitulatif

| Source | Adresse | Type | Langue distinguée | Gradé | Nature du prix | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| MangaCash | mangacash.be (BE, Ans) | Shopify, boutique + en ligne | Oui (titre « · FR », étiquettes) | PCA, PSA, Collect Aura, SFG, AP (201 pièces) | Demandé ; « prix Cardmarket » | C |
| LorenZone | lorenzone.fr | Shopify | Oui (étiquettes « FR », collections « Cartes Pokemon FR ») | PSA, PCA (49) | Demandé, dérivé de la cote ; 0,00 si non tarifé | B |
| Blazing Tail | blazingtail.fr | PrestaShop | Oui (français, anglais, japonais) | PCA, PSA, CGC, BGS | Demandé | C |
| Cards N Packs | cardsnpacks.com (société polonaise, site français) | Site maison | Oui (« FR » dans le titre) | PSA, CGC, PCA : 228 pièces françaises | Demandé, pièces uniques | C (B proposé, reclassé à la relecture) |
| UltraJeux | ultrajeux.com | Site maison, 4 magasins parisiens | Oui (rubrique « Cartes à l'Unité Français ») | Non vu | Demandé | C |
| Parkage | parkage.com | Site maison (Next.js), magasins | Oui (filtre « Langue ») | Non vu | Demandé, état « Near mint » | B |
| DracauGames | dracaugames.com | Shopify | Par déduction du titre | 26 pièces | Demandé, neuf | C (B proposé, reclassé à la relecture) |
| Cardshunter | cardshunter.fr | WooCommerce | Oui (rubriques Française / Japonaise) | 267 pièces Pokémon | Demandé | C |
| OozeShopFR | oozeshopfr.com | WooCommerce | Oui (attribut « Langue », « · FR », « · KR ») | PSA, PCA | Demandé | B |
| Pokegourou | pokegourou.com | WooCommerce | Oui (catégorie « Cartes Pokémon françaises ») | Non vu | Demandé, near mint / mint | C |
| Le Dépôt TCG | ledepottcg.fr | Site maison | Oui (cartes françaises) | Non | Demandé, 7 états | C |
| Guizette Family | guizettefamily.com | WordPress / WooCommerce | Non vérifié | PSA 9 et 10, Collect Aura 9,5 et 10 | Demandé (prix non lus) | C |
| Hikaru Distribution | hikarudistribution.com | Shopify | Oui (collections « Français », « JPN ») | 1 300 pièces gradées, très majoritairement japonaises d'après les noms de collections | Demandé | C |
| Ludik' | ludikpro.fr | Site maison | Oui (filtre langue) | Non | Demandé, filtre d'état | C |
| Pikastore | pikastore.fr | PrestaShop | Par déduction | Non vu | Demandé | C |
| Play-in | play-in.com | Site maison, boutique à Paris | Oui d'après les résultats de recherche (non lu) | Non vu | Demandé, cartes d'occasion | D |
| Investcollect | investcollect.com | PrestaShop | Non vérifié | Rubrique « cartes gradées » vue en recherche | Demandé | D |
| Le Coin des Barons | lecoindesbarons.com | WooCommerce | Non vérifié | Non vérifié | Non vérifié | D |
| Oupi | oupi.eu | Non vérifié | Non vérifié | Non vérifié | Non vérifié | D |
| Good Games Bern | goodgamesbern.ch (CH) | WooCommerce | Non vérifié | Non vérifié | Non vérifié | D |
| Vinticards | vinticards.be (BE) | Non vérifié | Non vérifié | Non vérifié | Non vérifié | D |
| Pokécardshop | pokecardshop.fr | WooCommerce | Sans objet | Sans objet | 8 produits Pokémon au total | Sans objet |
| Pokemoms | pokemoms.fr | WooCommerce | Sans objet | Sans objet | Scellé et dérivés | Sans objet |
| Cartes-Pokemon.fr | cartes-pokemon.fr | Site maison | Sans objet | Sans objet | Lots de cartes, pas d'unités | Sans objet |
| Ludifolie | ludifolie.com | PrestaShop | Sans objet | Sans objet | Jeux de société ; rubrique Pokémon non détaillée | Sans objet |
| Philibert | philibert.com | Site maison | Sans objet | Sans objet | Aucun lien Pokémon sur l'accueil | Sans objet |
| Okkazeo | okkazeo.com | Occasion entre particuliers | Sans objet | Sans objet | Autre agent | Sans objet |
| Wellplayed | wellplayed.ch (CH) | Shopify | Sans objet | Sans objet | 254 produits « Pokémon », vus : scellé | Sans objet |
| Lotana | lotana.be (BE) | Magento | Sans objet | Sans objet | Scellé | Sans objet |
| Samurai Sword Tokyo | samuraiswordtokyo.com | WooCommerce, Japon | Japonais | PSA | Voir fin de fichier | Sans objet |

---

## Fiches

### 1. MangaCash (Belgique)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://mangacash.be, Belgique (Ans, près de Liège). Shopify. Boutique physique et en ligne. |
| Langue de la carte distinguée ? | Oui : « FR » en fin de titre sur les gradées, étiquettes « Français » / « Japonais », collections par extension. Les unités se titrent « 205/165 : Mew EX - 151 - MEW » sans langue dans le titre ; la description dit « Cartes à l'unité, contrôlées avec soin, proposées au prix Cardmarket ». |
| Non gradé, gradé | Non gradé : état non indiqué sur la fiche vue. Gradé : collections PCA (56), PSA (70), Collect Aura (34), SFG (21), autres sociétés (20), total 201. La note est dans le titre (« PCA 9 · FR »). |
| Nature du prix | Demandé. Pour les unités, le site dit lui-même qu'il s'aligne sur Cardmarket. Les gradées ont des prix propres (ex. Méga Dracaufeu EX 108/106 PCA 9 FR à 1 500,00 €). |
| Profondeur | Mesuré (compteurs de `/collections.json`, 16/11/2026) : bloc Écarlate et Violet 1 934 cartes, Épée et Bouclier 1 941, Soleil et Lune 946, XY 617, Méga-Évolution 617, « autres extensions » 1 687 ; ensemble des langues confondues, la part française n'est pas mesurée. |
| Historique | Cartes marquées « Nouvel arrivage » avec date de réassort (ex. 2026-10-13) ; pas d'historique de prix. |
| Accès | Pages HTML ; `/products.json` et `/collections/<x>/products.json` répondent (200). Sitemap Shopify standard. Pas de flux produit repéré. |
| Conditions | Conditions d'utilisation, https://mangacash.be/policies/terms-of-service : « Toute reproduction, extraction, modification, diffusion ou exploitation, totale ou partielle, sans autorisation écrite préalable est interdite. » Mentions légales : « Toute reproduction, représentation, modification, adaptation ou exploitation, totale ou partielle, sans autorisation écrite préalable de Manga Cash est strictement interdite et constitue une contrefaçon. » `robots.txt` (https://mangacash.be/robots.txt) : pages publiques « crawlable », interdit seulement `/collections/*sort_by*`, filtres combinés, panier, compte. `agents.md` publié. |
| Contact | info@mangacash.be (mentions légales). |
| Verdict | **C**. Les conditions interdisent expressément l'extraction ; il faut un accord écrit. Intérêt réel : seule boutique vue avec des gradées françaises PCA / PSA / Collect Aura bien étiquetées. |
| Essai | Pas d'essai (verdict C). Lu pour information, sans enregistrer : Mew EX 205/165 (151) à 29,00 €, indisponible ; une variante « gold métal anglaise » à 20,00 €. Gradées trouvées : aucune Dracaufeu 4/102 du Set de Base ; Noctali VMAX FA TG23/TG30 PSA 10 FR à 350,00 € ; Mew ex 053 Promo EV PSA 9 FR à 180,00 €. |

### 2. LorenZone

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://lorenzone.fr, France. Shopify, société LorenZone SAS. |
| Langue de la carte distinguée ? | Oui : étiquettes « Cartes Pokemon FR », « Cartes a l'unite FR », collections par extension (ex. `set-de-base-base1-cartes-pokemon-fr`), SKU « PKM-BASE1-004-H ». |
| Non gradé, gradé | Non gradé : variantes de finition (Normal, Reverse, Holo, « 1re édition », Tinsel, Play! Pokémon) ; état non indiqué. Gradé : collection « Cartes Pokémon gradées » 49 pièces (PSA, PCA) et « Vintage gradées – Édition 1 FR » 49. |
| Nature du prix | Demandé, mais dérivé de la cote : le formulaire de dépôt indique « la cote Cardmarket quand elle existe » ; les cartes nouvellement importées portent l'étiquette `a-tarifer` et un prix de 0,00 €. |
| Profondeur | Mesuré (`/collections.json`, 16/11/2026) : « Cartes Pokémon à l'unité » 20 589 produits ; sitemap : 31 060 URL produits tous jeux. Sur les 250 premiers produits de la collection, 250 sont disponibles et 10 prix sur 569 sont à 0,00. Sur les trois collections consultées (Set de Base, 151, Évolution Céleste), toutes les cartes cherchées sont marquées indisponibles : le catalogue contient des cartes sans stock. |
| Historique | `created_at` des cartes importées le 2026-11-08 (import massif) ; `updated_at` du 16/11/2026. Pas d'historique de prix. |
| Accès | `/products.json` et `/collections/<x>/products.json` (200), sitemap produits (32 fichiers), pages HTML. Agent MCP annoncé (`/api/ucp/mcp`), non utilisé. |
| Conditions | `robots.txt` : « Shopify storefront. Public product, collection, page, blog, policy, cart, and localized HTML is crawlable. » Interdit `/cart.js`, `/collections/*sort_by*`, filtres combinés. `agents.md` (https://lorenzone.fr/agents.md) : « You may also read public HTML pages for additional context » ; « Agents must identify their requests as agent-initiated » ; en cas de 429, ralentir. CGU, https://lorenzone.fr/policies/terms-of-service : « Tout le contenu présent sur le site LorenZone, incluant les textes, graphiques, logos, et images, est la propriété de LorenZone SAS ou de ses fournisseurs de contenu, et est protégé par les lois internationales sur le droit d'auteur. » Aucune interdiction d'extraction trouvée. |
| Rachat | Page https://lorenzone.fr/pages/rachat-de-cartes-pokemon : « Le rachat de cartes au comptant est suspendu pour le moment ». Remplacé par un dépôt-vente (« Tu fixes ton prix »), conditions sur rachat-cartes.lorenzone.fr (non lu). Aucun barème de rachat. |
| Contact | info@lorenzone.fr (pied de page des mentions légales). |
| Verdict | **B**, avec trois réserves : (1) le prix est calé sur Cardmarket, donc peu informatif ; (2) beaucoup de cartes sans stock ; (3) pour un usage régulier, demander un accord écrit. |
| Essai (16/11/2026, `collections/<x>/products.json`) | Dracaufeu 004/102 Set de Base : « Holo » 430,30 €, indisponible ; « Holo 1re édition » 0,00 € (non tarifé), indisponible. Mew-ex 205/165 (151) : 20,00 € (variantes Normal et Métal), indisponible. Noctali VMAX 215/203 (Évolution Céleste) : 5,00 €, indisponible, chiffre manifestement trop bas pour cette carte alternative, à ne pas retenir. |

### 3. Blazing Tail

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.blazingtail.fr, France (Paris). PrestaShop. |
| Langue de la carte distinguée ? | Oui d'après le site : « toutes les langues : françaises, anglaises et japonaises » (annoncé ; non contrôlé carte par carte). |
| Non gradé, gradé | Non gradé : « plus de 21 000 références » annoncées ; « 21 140 cartes en stock » sur l'accueil. Gradé : PCA (fiches « PCA 9,5 »), PSA, CGC, BGS ; la rubrique `/2061-cartes-gradees` affichait « Aucun produit disponible pour le moment » le 16/11/2026. |
| Nature du prix | Demandé. |
| Profondeur | Estimé par le site lui-même (affiché sur l'accueil), non recompté : 21 140 cartes en stock, toutes langues. |
| Historique | Boutique « depuis 2021 » (accueil). |
| Accès | Pages HTML. `/products.json` : 404. `/sitemap.xml` : 404. |
| Conditions | Mentions légales, https://www.blazingtail.fr/content/2-mentions-legales : « Ces contenus sont mis à votre disposition pour une consultation et une utilisation personnelle et non commerciale lors de votre navigation sur le Site. Toute autre forme d'exploitation de ces contenus, par vous-même ou une personne que vous auriez autorisée, est proscrite. » `robots.txt` : PrestaShop standard, interdit `?search_query=`, `?order=`, `?q=`, `controller=search`. |
| Rachat | Page https://www.blazingtail.fr/rachat-cartes : « nous rachetons vos collections Pokémon à des prix compétitifs ». Panier de rachat en ligne par type (cartes à l'unité, communes, peu communes, reverse + holo, scellés) : un prix y apparaît peut-être après saisie, non vérifié (remplir le formulaire est exclu). |
| Contact | Formulaire de rachat et page Contact ; aucune adresse électronique lue dans les mentions légales. |
| Verdict | **C** (usage « personnel et non commercial » seulement). |
| Essai | Sans objet. |

### 4. Cards N Packs

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.cardsnpacks.com. Site en français, société MPH INVEST Sp. z o.o., Varsovie (Pologne) d'après les mentions légales. Site maison ; enchères eBay le dimanche soir. |
| Langue de la carte distinguée ? | Oui : « FR », « JP », « EN », « DE » dans le titre de chaque pièce. |
| Non gradé, gradé | Non gradé : états NM, EXC, MP (ex. « CNP EXC Excellent DE Dracaufeu 4/102 », 1 800 €). Gradé : PSA, CGC, PCA ; rubrique « Cartes Pokémon françaises gradées » : 228 pièces de 24,00 € à 94 050,00 € (16/11/2026). |
| Nature du prix | Demandé, pièce unique. |
| Profondeur | Mesuré : 228 pièces françaises gradées (page de catégorie) ; 1 986 URL de pièces dans `sitemap-front-pieces.xml`, toutes langues et jeux. |
| Historique | Numéro de pièce croissant (ex. 04078) ; pas de série de prix. |
| Accès | Pages HTML, sitemaps (`sitemap-products-fr.xml`, `sitemap-front-pieces.xml`). `/products.json` : 404. |
| Conditions | `robots.txt` (https://www.cardsnpacks.com/robots.txt) : `User-agent: *` `Allow: /`, interdit `/api/`, `/panier/`, `/catalogue/*,` ; commentaire du site : « /catalogue/ nu, pagine ou mono-valeur reste ouvert : c'est, avec /piece/<slug>/, le chemin d'exploration des fiches produit » ; robots d'entraînement bloqués, dont ClaudeBot ; `Crawl-delay: 5` pour les robots de recherche nommés. Mentions légales (https://www.cardsnpacks.com/mentions-legales/) : « La structure du site, ses textes, sa charte graphique et ses photographies de pièces sont la propriété de l'éditeur ». Pas d'interdiction d'extraction trouvée dans les CGV. |
| Rachat | Pas de rachat : une consignation (https://www.cardsnpacks.com/conditions-de-consignation/) : « COMMISSION 30 % TTC · PAIEMENT 14 JOURS APRÈS LA VENTE ». |
| Contact | support@cardsnpacks.com (mentions légales, CGV). |
| Verdict | **C** (relu par l'assistant principal le 16 novembre : le sous-agent proposait B). Le `robots.txt` bloque les robots d'entraînement et le site protège ses fiches depuis un incident de charge : dans le doute, accord écrit à demander. Détail d'origine : le site a subi un incident de charge (« 4,7M requêtes ») et protège ses fiches ; une lecture régulière doit rester très modeste, ou être convenue par écrit. |
| Essai (16/11/2026) | Dracaufeu 4/102 Set de Base, version française : absent. Le Dracaufeu 4/102 en vente est une version allemande « Excellent », 1 800 €. Gradées françaises : Dracaufeu-VSTAR 174/172 PSA 10 FR, prix tronqué à la lecture, non retenu ; Méga-Dracaufeu Y ex 22/217 PSA 9 FR 55 € ; Noctali Star 17/17 (PSA 10 FR, prix non lu). Mew ex 205/165 : non cherché. Noctali VMAX 215/203 : non cherché. |

### 5. UltraJeux

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.ultrajeux.com, France. Site maison, 4 magasins à Paris. |
| Langue de la carte distinguée ? | Oui : rubriques « Cartes à l'Unité Français » et « Cartes à l'Unité Anglais » ; 117 éditions Pokémon françaises listées. |
| Non gradé, gradé | Non gradé ; état non indiqué sur les lignes vues. Gradé : non vu. |
| Nature du prix | Demandé. |
| Profondeur | Mesuré sur deux pages : 332 prix sur la page de l'édition 151 et 330 sur celle d'Évolution Céleste. La page du Set de Base n'affichait aucune carte (0 prix). Total non estimé. |
| Historique | Aucun. |
| Accès | Pages HTML ; liste des cartes chargée dans la page (lue avec un navigateur). Pas de `/products.json`, pas de flux repéré. |
| Conditions | `robots.txt` (https://www.ultrajeux.com/robots.txt) : `User-agent: *` interdit `/search3.php`, `/monpanier.php`, `/moncompte.php`, `/commande.php`. Mentions légales (https://www.ultrajeux.com/page-119-mentions-legales.html) : « Les images, captures d'écran et autres contenus sont également protégés par des droits d'auteur. Pour toute question concernant l'utilisation de ces éléments ou pour obtenir une autorisation, veuillez nous contacter par e-mail à : contact@ultrajeux.com. » CGV (page-1) : aucune clause sur la reprise des contenus. |
| Contact | contact@ultrajeux.com (mentions légales et CGV). |
| Verdict | **C** : la clause renvoie à une autorisation pour l'usage des contenus ; dans le doute, accord à demander. |
| Essai (16/11/2026, lecture de pages d'édition) | Dracaufeu 4/102 Set de Base : absent (page vide). Mew Ex 205/165 « Hyper Rare » : 129,90 €. Noctali-VMAX 095/203 « Ultra Rare » 105,90 € ; 215/203 absent ; une ligne « Noctali-VMAX 214/203 Secret Rare » à 499,90 € dont la numérotation est à vérifier. |

### 6. Parkage

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.parkage.com, France (Paris et Seine-et-Marne). SAS Parkage, site Next.js, boutiques et vente à distance. |
| Langue de la carte distinguée ? | Oui : filtres « Langue », « Etat de la carte », « Rareté », « Série ». Non confirmé sur la ligne de résultat d'un Noctali VMAX (langue non affichée). |
| Non gradé, gradé | Non gradé : « Near mint » affiché. Gradé : non vu. |
| Nature du prix | Demandé. |
| Profondeur | Mesuré : 35 205 produits au total toutes catégories, 1 761 pages de 20 (recherche, 16/11/2026). Part Pokémon unités non mesurée. |
| Historique | Aucun. |
| Accès | Pages HTML. `https://www.parkage.com/robots.txt` : 404 (aucun fichier). `/sitemap.xml` : redirige vers `/fr/sitemap.xml`, qui répond 404. |
| Conditions | Pas de `robots.txt`. CGV (https://www.parkage.com/fr/conditions-generales-de-vente) : aucune clause de reprise de contenus ; « Les photographies et les textes reproduits et illustrant les produits présentés ne sont pas contractuels. » Informations légales : « Tous les jeux et visuels présentés sur le site de vente en ligne www.parkage.com sont la propriété de leurs éditeurs respectifs. » |
| Rachat | Page « Parkage Rachète » (https://www.parkage.com/fr/parkage-rachete) : redirige vers la connexion, **non lue**. Conditions générales de rachat (https://www.parkage.com/fr/conditions-generales-de-rachat) : « Les produits à l'unité que nous rachetons sont indiqués avec leur prix de rachat unitaire ainsi que la quantité reprise » ; « ne rachète que les produits à l'unité en langue Française ou Anglaise et Japonaises dans certains cas » ; état neuf exigé, décote de 10 % à 90 % sinon ; bon d'achat majoré de 10 %. Si ces prix de rachat sont lisibles sans compte, ce serait un plancher de marché précieux : à demander. |
| Contact | vpc@parkage.com (CGV, article 9) ; formulaire « Contactez-nous ». |
| Verdict | **B** pour les pages publiques (pas de `robots.txt`, pas de clause d'interdiction). Prix de rachat : non accessible sans compte (je ne crée pas de compte) ; accord à demander. |
| Essai (16/11/2026, recherche `?text=`) | Dracaufeu 4/102 : aucun résultat. Mew ex 205 : aucun résultat. « Noctali VMAX » : un résultat, série EB07 Évolution Céleste, « Holo Rare VMAX », Near mint, 35,00 €, 1 en stock à Paris ; numéro non affiché, donc probablement le 095/203, pas l'alternative 215/203. |

### 7. DracauGames

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.dracaugames.com, France. Shopify. |
| Langue de la carte distinguée ? | Par déduction : titres en français (« Carte Pokémon Rivalités Destinées »), variantes « Normale » / « Reverse ». Bandeau : « PRODUITS NEUFS & OFFICIELS ». |
| Non gradé, gradé | Non gradé : neuf, état non détaillé. Gradé : collection « Cartes Gradées Pokémon », 26 pièces. |
| Nature du prix | Demandé. |
| Profondeur | Mesuré (`/collections.json`) : « Cartes à l'Unité - Pokémon » 5 370 produits. |
| Historique | Aucun. |
| Accès | `/products.json`, sitemaps produits (200). |
| Conditions | `robots.txt` : bandeau « Checkouts are for humans. Automated scraping, “buy-for-me” agents, or any end-to-end flow that completes payment without a final human review step is not permitted. » (vise le paiement) ; interdit `/search`, `/cart`, `/policies/`. CGV (https://www.dracaugames.com/pages/c-g-v) et mentions légales : aucune clause sur la reprise de contenus. |
| Contact | discountmedia.shop@gmail.com (mentions légales). |
| Verdict | **C** (relu par l'assistant principal le 16 novembre : le sous-agent proposait B). Le bandeau du `robots.txt` écrit « Automated scraping […] is not permitted » ; la phrase vise surtout le paiement, mais elle est ambiguë : dans le doute, accord écrit à demander. |
| Essai (16/11/2026) | Sur les 500 premiers produits de la collection (sur 5 370) : aucune des trois cartes ; seul « Mew EX - 216/91 » à 29,90 € (hors cartes d'essai). Dracaufeu 4/102, Mew ex 205/165 et Noctali VMAX 215/203 : non vérifié. |

### 8. Cardshunter

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.cardshunter.fr, France (région parisienne). WooCommerce. |
| Langue de la carte distinguée ? | Oui : « Carte Pokémon Française », « Carte Pokémon Japonaise », sous-rubriques par extension. |
| Non gradé, gradé | Non gradé ; état non lu. Gradé : « Cartes gradées » 417, dont « Cartes Gradées Pokemon » 267. |
| Nature du prix | Demandé. |
| Profondeur | Mesuré (API publique des catégories WooCommerce, 16/11/2026) : « Cartes à l'unité » 28 558 (Écarlate et Violet 7 173, Épée et Bouclier 3 633, Bloc ex 1 828, cartes japonaises 1 713). La part française n'est pas isolée. |
| Historique | Aucun. |
| Accès | Pages HTML, API Store WooCommerce. Le site renvoie 429 « Ralentissez » après quelques requêtes rapprochées (message d'erreur renvoyant à l'hébergeur O2switch) : arrêt immédiat de mon côté. |
| Conditions | `robots.txt` : `Disallow: /wp-admin/`, `/*?add-to-cart=`, puis `User-agent: *` `Disallow:` (rien d'autre). Mentions légales : aucune clause de propriété intellectuelle. Conditions d'utilisation et CGV : **non lues** (429, puis 503). |
| Rachat | Page https://www.cardshunter.fr/rachat-de-cartes/ : estimation sur demande (« Recevez notre réponse sous 24h »), offre « sous 48h » selon « l'état des cartes, leur rareté, leur popularité actuelle sur le marché » ; aucun barème public. |
| Contact | sav@cardshunter.fr. |
| Verdict | **C** (conditions non lues ; débit limité par le site). |
| Essai | Sans objet. |

### 9. OozeShopFR

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://oozeshopfr.com, France (Heillecourt, près de Nancy). WooCommerce. |
| Langue de la carte distinguée ? | Oui : attribut « Langue » et suffixe « · FR », « · KR » dans le titre. |
| Non gradé, gradé | Non gradé : état non lu. Gradé : « Cartes Pokémon gradées », titres du type « Dracaufeu · 4 · FR · PCA 2 ». |
| Nature du prix | Demandé. |
| Profondeur | Mesuré (API des catégories) : « Cartes Pokémon à l'unité » 701 ; 875 produits au total. |
| Historique | « Plus de 20 000 ventes » annoncé par le site. |
| Accès | Pages HTML, API Store WooCommerce publique. |
| Conditions | `robots.txt` : mêmes règles WooCommerce standard, `User-agent: *` `Disallow:` vide. Informations (https://oozeshopfr.com/nos-informations/) : « Les textes, photos et logos du site appartiennent à OozeShopFR, sauf mention contraire. » Pas d'interdiction d'extraction. |
| Rachat | Page « Rachat de cartes Pokémon à Nancy, estimation 48 h » : sur estimation, pas de barème lu. |
| Contact | oozeshopfr@gmail.com (nos-informations). |
| Verdict | **B**. |
| Essai (16/11/2026, recherche de l'API) | Dracaufeu 4/102 Set de Base non gradé : absent. Dracaufeu 4 PCA 2 FR (boîtier, « Mauvais ») 355,00 €. « Dracaufeu obscur 4 FR Holo » 750,00 € (Team Rocket, autre carte). Mew-ex 205 : une seule fiche, version coréenne « KR », 125,00 €. Noctali VMAX : aucun résultat. |

### 10. Pokegourou

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://pokegourou.com, France. WooCommerce. |
| Langue de la carte distinguée ? | Oui : catégories « Cartes Pokémon françaises » (118) et « Cartes Pokémon japonaises » (76). |
| Non gradé, gradé | Annonce « near mint/mint » (lue en résultat de recherche, non revérifiée). Gradé : non vu. |
| Nature du prix | Demandé. |
| Profondeur | Mesuré : 395 produits au total, 118 cartes françaises. Petit catalogue. |
| Accès | Pages HTML, API Store WooCommerce. |
| Conditions | Mentions légales (https://pokegourou.com/mentions-legales/) : « Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Pokegourou. » `robots.txt` : standard WooCommerce. |
| Contact | contact@pokegourou.com. |
| Verdict | **C**. Trop petit pour justifier la demande. |

### 11. Le Dépôt TCG

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://ledepottcg.fr, France (Oise), entrepreneur individuel. Site maison. |
| Langue de la carte distinguée ? | Oui : « Cartes Pokémon françaises, vérifiées une par une » (pied de page). |
| Non gradé, gradé | Non gradé, **état par carte sur sept niveaux** (Mint, Near Mint, Excellent, Good, Light Played, Played, Poor) et filtre « 1re édition ». Gradé : non. |
| Nature du prix | Demandé, pièce unique avec nombre d'exemplaires. |
| Profondeur | Mesuré : « 33 cartes en stock, 46 bientôt en ligne » (page boutique, 16/11/2026). Très petit. |
| Accès | Pages HTML, `sitemap.xml` (50 URL). |
| Conditions | `robots.txt` : `Allow: /` ; interdit `/outil`, `/panier`, `/commande`, `/api/`, `/recherche?` ; nomme explicitement les robots de recherche, dont Claude-SearchBot et Claude-User, avec les mêmes règles. Mentions légales (https://ledepottcg.fr/mentions-legales) : « Le nom, le logo, les photos et les textes de ce site appartiennent au Dépôt TCG. Toute reproduction sans accord préalable est interdite. » |
| Rachat | https://ledepottcg.fr/rachat : « je rachète pour revendre, donc je ne paie pas le prix Cardmarket. Mais je t'explique mon offre : carte par carte pour les plus chères, au lot pour le vrac », offre sous 72 h. Pas de barème. |
| Contact | bonjour@ledepottcg.fr (mentions légales, CGV). |
| Verdict | **C**. Trop petit pour un usage de prix, mais le modèle (état par carte, rachat à décote assumée par rapport à Cardmarket) vaut d'être cité. |

### 12. Guizette Family

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.guizettefamily.com, France. WordPress / WooCommerce (non confirmé), protégé par Cloudflare (curl refusé, navigateur accepté). |
| Langue de la carte distinguée ? | Non vérifié. |
| Non gradé, gradé | Gradé : rubriques PSA 9, PSA 10, Collect Aura 9,5, Collect Aura 10 (avec Collect Aura revendu, rare dans cette famille). Non gradé : non vu. |
| Nature du prix | Non lu. |
| Profondeur | Non vérifié (aucun compteur lu). |
| Conditions | `robots.txt` : `Content-Signal: search=yes,ai-train=no,use=reference`, `Allow: /` ; liste de robots d'entraînement interdits dont ClaudeBot, anthropic-ai et Claude-Web. CGV (https://www.guizettefamily.com/conditions-generales-de-vente/) : « Toute reproduction, représentation, imitation ou exploitation, même partielle, sans autorisation écrite préalable, est strictement interdite et expose son auteur à des poursuites civiles et/ou pénales. » |
| Rachat | https://www.guizettefamily.com/rachat-collection/ : analyse « selon les cours actuels du marché », réponse sous 72 h ; pas de barème. |
| Contact | contact@guizettefamily.com ; rachatcollection@guizettefamily.com. |
| Verdict | **C**. |

### 13. Hikaru Distribution

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://hikarudistribution.com, France (Roubaix). Shopify. |
| Langue de la carte distinguée ? | Oui par collection (« Version Française », « JPN »). |
| Non gradé, gradé | Gradé : « Cartes Gradées » 1 300 pièces (mesuré), noms de collections presque tous japonais ; quelques collections françaises (« Cartes Gradées AP - FR » 4, « Cartes Gradées 151 » 9). Non gradé : surtout scellé dans la collection « Version Française » (156, vue : coffrets, bundles). |
| Nature du prix | Demandé ; variantes « Neuf » / « Abimé » pour le scellé. |
| Accès | Sitemaps Shopify ; `/products.json` a répondu 429 une fois (limite de débit), non réessayé. |
| Conditions | Mentions légales (https://hikarudistribution.com/policies/legal-notice) : « Tous les éléments du site (textes, images, logos, etc.) sont protégés par le droit d'auteur. Toute reproduction, modification, publication ou distribution est interdite sans autorisation préalable. » |
| Contact | support@hikarudistribution.com. |
| Verdict | **C**. Surtout du japonais et du scellé. |

### 14. Ludik'

Boutique de coloriages et de jeux, avec une rubrique « Cartes Pokémon à l'unité » filtrable par état minimum (« Mint, Near Mint, Excellent… »), langue et série. Site maison, https://ludikpro.fr ; 207 pages produit dans le sitemap, toutes catégories (volume de cartes non isolé). `robots.txt` : `Allow: /`, `Disallow: /auth`. Mentions légales : « Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site est interdite sans autorisation écrite préalable de Ludik'. » Contact : contact@ludikpro.fr. Verdict **C**.

### 15. Pikastore

PrestaShop, https://www.pikastore.fr, rubrique « Cartes à l'unité » avec Pokémon par extension (de XY à Soleil et Lune au moins) ; nombre de cartes non mesuré. CGV (https://www.pikastore.fr/content/8-conditions-generales-de-ventes-), article 6.1 : « Toute reproduction, usage ou apposition sans l'autorisation préalable de Blin Maria, gérante de la société Pikastore, est interdite » ; 6.2 sur les photographies ; l'article 6.3 commence par « De manière générale, les données, les textes, les inf… » (lecture tronquée, non citée en entier). `robots.txt` PrestaShop standard. Verdict **C**.

### 16. Play-in (Paris)

Site maison avec boutique à Paris. D'après les résultats de recherche (non relus sur le site) : cartes à l'unité « majoritairement d'occasion, soigneusement vérifiées », une fiche par carte (`/fr/carte/<n>/<nom>-<code>`). L'article « Comment vendre des cartes sur le site Playin » (lu par l'outil de lecture de pages) : « Plusieurs facteurs peuvent changer le prix d'une carte : son édition, son état et sa langue. » Pas de barème ; bon d'achat « bonus de 10% », espèces jusqu'à 1 000 € en boutique ; renvoie à l'outil de recherche pour les prix de rachat, non consultable. Le site est derrière Cloudflare : `curl` reçoit 403, et le navigateur affiche « Vérification de sécurité en cours ». Je n'ai pas insisté. `robots.txt` : illisible (page de blocage). Verdict **D** (inaccessible). Seul un accord écrit pourrait ouvrir un accès.

### 17. Autres boutiques bloquées (D)

- **Investcollect** (https://investcollect.com) : Cloudflare « Sorry, you have been blocked » en curl et en navigateur. Les résultats de recherche montrent une rubrique « Cartes Pokemon à l'unités » de plus de 420 pages et « 4 cartes gradées », prix en fourchettes (ex. 8 € à 10 €) ; non relu. `robots.txt` lisible : `Allow: /` ; contenu complet non relevé.
- **Le Coin des Barons** (https://www.lecoindesbarons.com) : défi Cloudflare en navigateur. `robots.txt` lu (WordPress : interdit `?*orderby`, `?*min_price`, `?*filter_stock_status`).
- **Oupi** (https://oupi.eu) : défi Cloudflare ; `robots.txt` avec signaux de contenu.
- **Good Games Bern** (CH) et **Vinticards** (BE) : Cloudflare ; produits vus en recherche : scellé seulement.

## Hors périmètre (sans cartes françaises à l'unité, vérifié sur la page citée)

- Pokécardshop (8 produits Pokémon au total, API WooCommerce), Pokemoms (scellé et dérivés), Cartes-Pokemon.fr (lots), Philibert (aucun lien Pokémon sur l'accueil), Ludifolie (PrestaShop, jeux de société ; rubrique `/59-cartes-pokemon` non détaillée), Wellplayed.ch (Suisse, 254 produits « Pokémon » dont le scellé vu en recherche), Lotana.be (Belgique, scellé), Okkazeo (particuliers, autre agent). Aucune boutique luxembourgeoise trouvée.

## Prix de rachat publiés

**Aucune boutique de cette famille n'affiche de prix de rachat lisible sans compte.** Parkage annonce un prix de rachat unitaire par carte dans ses conditions mais la page est derrière une connexion (non lue). Les autres : estimation sur demande (Cardshunter, Guizette Family, Blazing Tail, Le Dépôt TCG, Play-in) ou dépôt-vente (LorenZone, rachat au comptant suspendu ; Cards N Packs, commission 30 %). Les trois formulations utiles à citer : Le Dépôt TCG « je ne paie pas le prix Cardmarket » ; Play-in : bon d'achat « bonus de 10% » ; Parkage : bon d'achat « majorée de 10% », décote 10 % à 90 % si l'état n'est pas neuf.

## Sources croisées hors de ma famille

- Cardmarket : la cote sur laquelle MangaCash et LorenZone s'alignent.
- eBay : Cards N Packs vend ses gradées en enchères le dimanche soir ; plusieurs boutiques de cette famille ont aussi une boutique eBay (DID-KEMON, cartabaffe, Zora TCG vus en recherche).
- Comparateurs et cotes : Booster Breakerz, Blue Umbreon, PokéArgus, ValoTCG (médiane des trois dernières ventes eBay d'une carte française non gradée, d'après la page de recherche) : à traiter par l'agent concerné.
- PCA, PSA, Collect Aura : sociétés de gradation citées par MangaCash, Cards N Packs, Guizette Family, OozeShopFR.
- Samurai Sword Tokyo : boutique japonaise avec site en français (WooCommerce, `robots.txt` standard), cartes japonaises gradées PSA 10 et singles JP ; hors langue visée.

## Marchés anglais, américain, japonais (à noter sans approfondir)

Aucun relevé. Observations : Samurai Sword Tokyo (Japon, singles JP et PSA 10 japonais) ; MangaCash vend aussi des gradées JP ; Hikaru Distribution a surtout du japonais gradé ; Cardshunter 1 713 cartes japonaises et 473 « bloc ex jpn ».

## Ce que je n'ai pas pu vérifier

- Pistes injoignables depuis la session : Magic Bazar, Poké-Shop, Card Corner, Fantasy Sphere (code 000, ni avec ni sans `www`).
- Prix de rachat Parkage (connexion), panier de rachat de Blazing Tail (formulaire), conditions de rachat-cartes.lorenzone.fr.
- Conditions d'utilisation et CGV de Cardshunter (429 puis 503 : arrêt).
- Flux Google Shopping, Awin, Effinity, Kwanko : une recherche ciblée n'a rien donné ; non vérifié pour toutes.
- Trois cartes d'essai complètes pour DracauGames (500 produits sur 5 370 parcourus) ; part française de MangaCash, Cardshunter, DracauGames.

## Crédits Firecrawl dépensés

0 crédit. Aucun appel Firecrawl ; recherche web, lecture de pages, `curl` et Playwright seulement.

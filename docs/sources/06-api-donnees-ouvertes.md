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


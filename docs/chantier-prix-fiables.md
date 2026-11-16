# Chantier : un prix fiable pour toutes les cartes françaises

Dossier de lancement, écrit le 16 novembre 2026 pour une nouvelle session. À lire en entier avant d'agir, après `AGENTS.md`, `ROADMAP.md` et la section « Décisions du fondateur » de `CADRAGE.md`.

## Le but

Le site doit afficher, pour **toutes les cartes Pokémon françaises ou leur grande majorité**, un prix **fiable, robuste et réaliste** : non gradé d'abord, gradé ensuite. Aujourd'hui ce n'est pas le cas :

- Le prix repose sur Cardmarket, qui mélange les langues. Il n'est réellement français que pour 1 001 cartes sur 20 226 (trois annonces françaises ou plus chez CardTrader), presque toutes récentes.
- Aucun prix gradé n'est affiché : aucune source d'annonces gradées n'est branchée.

Le fondateur demande deux choses, dans cet ordre :

1. **Une recherche beaucoup plus large que ce que nous connaissons** : tous les sites qui parlent de cartes Pokémon ou en vendent, ceux qui vendent des cartes gradées, et pour chacun, si les cartes françaises y sont distinguées et à quel prix.
2. **Un modèle de prix** qui couvre toutes les cartes ou presque, parce que les données observées ne suffiront pas partout.

## Ce qui est déjà établi

À ne pas refaire. Les sources et citations sont dans `CADRAGE.md` (sections 3 et 4) et `ROADMAP.md`.

| Source | Ce qu'elle donne | Accès | État |
| --- | --- | --- | --- |
| TCGdex | Catalogue français, illustrations, prix Cardmarket et TCGplayer relayés | API ouverte | Branchée. Instable par moments (erreurs 503). 2 941 cartes sans illustration française. |
| Cardmarket | Ventes réalisées en Europe, un prix par carte toutes langues | Fichiers de prix publics, API fermée aux nouveaux inscrits | Utilisé via TCGdex. Demande de confirmation et de prix par langue envoyée le 16 novembre. |
| CardTrader | Annonces par langue, état, quantité ; 25 moins chères par carte | API avec jeton | Branchée. 4 649 cartes avec une annonce française, 1 001 avec trois ou plus. 20 annonces gradées en français au total. Demande d'accord à envoyer par leur formulaire. |
| eBay France | Annonces, y compris gradées | API Browse, clés demandées | Non branchée. La licence interdit de modéliser des prix sans accord écrit. Usage permis : annonces en cours avec lien. |
| TCGplayer | Marché américain, cartes anglaises | Via TCGdex | Exclu du prix par décision du fondateur. Sert d'alarme seulement. |
| PokéCardex | Scans français complets, prix agrégés | Site | Reprise des images interdite sans autorisation. Demande envoyée le 16 novembre. |
| TCG Sense | Concurrent français, valeurs par langue | Site et application | Non étudié comme source. |

## Les règles, non négociables

1. **Budget zéro euro.** Aucun abonnement, aucune API payante. Firecrawl : seulement les crédits compris dans le compte de base du fondateur (décision du 16 novembre). Outils gratuits d'abord, Firecrawl en dernier recours, chaque appel compté, jamais `firecrawl_agent`.
2. **On respecte les règles de chaque site.** Avant toute collecte sur un site : lire ses conditions d'utilisation et son `robots.txt`, et citer la phrase qui autorise ou interdit. « Contourner » veut dire trouver une voie permise (API officielle, fichier public, flux, partenariat, affiliation, accord écrit, données apportées par la communauté). Cela ne veut jamais dire passer outre une interdiction, une protection technique ou une limite de débit. Un outil de collecte ne rend pas une collecte permise.
3. **Classer chaque source :**
   - **A** : API ou fichier officiel, usage permis.
   - **B** : lecture de pages permise par les conditions et le `robots.txt`.
   - **C** : possible seulement avec un accord écrit. On le demande.
   - **D** : interdit ou inaccessible. On l'écrit et on n'y touche pas.
4. **Rien d'inventé.** Un prix est observé ou estimé, et le site dit lequel. Une estimation porte sa marge d'erreur.
5. **Pas de données personnelles.** Ni pseudonymes de vendeurs, ni annonces nominatives conservées.
6. **Prix gradés.** Le fondateur a refusé tout multiplicateur fixe du prix non gradé. Il a accepté le 16 novembre un modèle appris sur des ventes ou annonces gradées observées, à trois conditions : affiché comme estimation, « très solide », et qui continue d'apprendre en continu (réétalonné à chaque relevé).
7. **Le prix affiché est une fourchette** (décision du 16 novembre) : ce que la carte se vend, et ce qu'elle coûte à l'achat aujourd'hui.
8. **Marché français uniquement** pour l'instant. Les marchés anglais, américain et japonais viendront peut-être plus tard : noter ce qu'on croise, sans le construire.

## Déroulé

### Phase 1 : l'inventaire

Viser large : au moins soixante sources candidates, classées par famille. Les noms ci-dessous sont des points de départ **à vérifier**, pas des faits ; il faut en trouver d'autres.

- **Places de marché** : Cardmarket, CardTrader, eBay, Vinted, Leboncoin, Rakuten, Catawiki, Delcampe, les ventes en direct (Voggt, Whatnot), les places de marché des réseaux sociaux.
- **Boutiques françaises en ligne** qui vendent des cartes à l'unité, gradées ou non : à découvrir par la recherche, il y en a des dizaines.
- **Sociétés de gradation et registres** : PCA, Collect Aura, PSA, CGC, BGS ; registres de population, boutiques et ventes associées.
- **Cotes et agrégateurs** : PokéCardex, TCG Sense, PriceCharting, Collectr, et les autres.
- **Enchères** : maisons françaises et plateformes d'enchères publiant leurs résultats.
- **API et jeux de données ouverts** : API de cartes et de prix, dépôts GitHub, jeux de données publics. Regarder aussi le catalogue de fournisseurs de Firecrawl (`alexandria_library_search`, gratuit) pour les prix de détail.
- **Communautés** : forums, groupes, serveurs où des prix de vente sont rapportés. Utile pour comprendre le marché, rarement comme source automatique.

Pour chaque source, une fiche au même format :

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | |
| Langue de la carte distinguée ? | Oui, non, par déduction du titre |
| Non gradé, gradé | Sociétés et notes présentes |
| Nature du prix | Demandé, ou vente réalisée |
| Profondeur | Nombre de cartes françaises couvertes, mesuré ou estimé (le dire) |
| Historique | Depuis quand |
| Accès | API, fichier, pages |
| Conditions | Citation exacte et lien, plus le `robots.txt` |
| Contact | Adresse publiée, ou formulaire |
| Verdict | A, B, C ou D, avec la raison |
| Essai | Résultat réel sur les cartes témoins, si le verdict le permet |

### Phase 2 : les cartes témoins

Constituer environ deux cents cartes, réparties par famille, rareté et tranche de prix. Pour chacune, établir à la main un prix français de référence à partir de plusieurs sources, daté et sourcé. Ce jeu sert à noter chaque source et, plus tard, le modèle. Il n'existe aujourd'hui aucun contrôle de ce genre.

### Phase 3 : les demandes d'accord

Pour chaque source classée C : rédiger la demande, l'envoyer par Gmail quand une adresse est publiée et vérifiée, sinon la préparer pour le formulaire que le fondateur soumettra. Suivre les réponses dans `docs/demandes-sources.md`. Ne lire dans la boîte que les fils liés à ces demandes.

### Phase 4 : le modèle

À concevoir à partir de ce que l'inventaire aura réellement trouvé. Cadre proposé :

1. **Observations normalisées.** Chaque prix relevé porte sa source, sa date, la langue, l'état, la gradation et sa nature (demandé ou vendu).
2. **Estimation par carte.** Combinaison pondérée des observations, les poids venant de la fiabilité de chaque source mesurée sur les cartes témoins, de la fraîcheur et du nombre.
3. **Cartes sans observation française.** Estimer l'écart entre le prix français et le prix européen à partir des cartes où l'on a les deux, par extension, rareté, époque et tranche de prix, en partageant l'information entre groupes voisins quand un groupe est trop petit. Rendre un intervalle, pas seulement un point.
4. **Validation.** Mettre de côté une partie des cartes dont le prix français est connu, prédire, mesurer : erreur médiane en pourcentage, part des vraies valeurs tombant dans l'intervalle annoncé. Proposer au fondateur des seuils d'acceptation chiffrés ; en dessous, la carte est affichée comme « estimation large » ou sans prix.
5. **Robustesse.** Aucune source ne doit être indispensable : le modèle se dégrade proprement si l'une tombe. Anomalies détectées, relevé qui refuse de publier l'absurde, tests.

### Phase 5 : construire

Un plan d'implémentation par étapes, chacune livrable seule, testée, vérifiée dans un navigateur, fusionnée par une demande de fusion. La page « Méthode » du site est mise à jour dans la même étape que le calcul qu'elle décrit.

## Livrables

- `docs/sources/inventaire.md` : le tableau de toutes les sources avec leur verdict.
- `docs/sources/` : une fiche par source retenue ou en attente d'accord.
- `docs/cartes-temoins.md` et leurs données.
- `docs/modele-prix.md` : la méthode, les résultats de validation, les limites.
- `docs/demandes-sources.md` tenu à jour.
- `ROADMAP.md` tenu à jour à chaque fin de session.

## Façon de travailler

- **Skills superpowers**, déjà installés : `brainstorming` pour trancher les points ouverts avec le fondateur en début de session (questions groupées, il a peu de temps), `writing-plans` puis `executing-plans` pour le déroulé, `dispatching-parallel-agents` pour l'inventaire (un sous-agent par famille de sources, chacun rendant des fiches au format ci-dessus), `verification-before-completion` avant toute annonce.
- **Sous-agents** : le fondateur doit les autoriser explicitement dans son message de lancement. Sans cela, travailler seul.
- **Code** : skill `ponytail`. **Interface** : skills de design du dépôt.
- **Mémoire** : tout ce qui doit survivre à la session va dans le dépôt.
- Le chantier dépasse une session. Finir chaque session par un état net : ce qui est fait, ce qui est mesuré, ce qui reste, ce qui attend le fondateur.

## Outils disponibles

| Outil | Usage | Remarque |
| --- | --- | --- |
| Firecrawl | Recherche web, lecture de pages, catalogue de fournisseurs de données | Payant en crédits, sauf la consultation du catalogue. |
| Gmail | Envoi des demandes d'accord, lecture des réponses | Compte du fondateur : n'écrire qu'en son nom et pour ce projet. |
| GitHub, Vercel | Code, relevés, déploiements, journaux | Accès en place. |
| CardTrader | API avec le jeton du fondateur | `CARDTRADER_TOKEN=proxy-injected NODE_USE_ENV_PROXY=1` devant les commandes Node. |
| Navigateur (Playwright) | Vérifications, sites qui refusent `curl` | |

## Ce qui passe par le fondateur

- Soumettre les formulaires réservés aux comptes connectés (CardTrader, eBay développeur).
- Valider les seuils d'acceptation du modèle.
- Tout ce qui coûte, se signe ou engage.

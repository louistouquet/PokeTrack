# Feuille de route

État au 16 novembre 2026. Ce document dit où en est le projet, ce qui ne va pas encore, et la direction voulue par son fondateur. Il est fait pour être relu au début de chaque session de travail.

## Où on en est

État au soir du 16 novembre 2026.

- **En ligne** : `https://poke-track-tau.vercel.app`, à jour avec `main`. Vérifié dans un navigateur le 16 novembre après la fusion de la demande n° 3 : huit pages, deux largeurs, console sans erreur.
- **Relevé** : publié sur la branche `data` pour le 15 et le 16 novembre, aucun jour manquant. Le relevé du 16 novembre au soir a tourné sur GitHub avec CardTrader : 20 226 cartes, aucune perdue, 19 443 cotées. Le déclenchement planifié de GitHub fonctionne mais avec retard (celui de 4 h 17 UTC est parti à 12 h 41).
- **Prochain chantier** : la recherche de sources et le modèle de prix, décrits dans `docs/chantier-prix-fiables.md`. À démarrer dans une nouvelle session.
- **Cadrage** : `CADRAGE.md` porte les décisions du fondateur. L'architecture d'agents qu'il propose n'est ni validée ni construite.

### Ce que le site fait aujourd'hui, et ses limites

| Sujet | État |
| --- | --- |
| Prix non gradé | Cardmarket (Europe, toutes langues), plus les annonces de cartes françaises de CardTrader quand il y en a. Le marché américain n'entre plus dans le calcul. |
| Prix réellement français | 970 cartes sur 20 226 ont trois annonces françaises ou plus ; 4 632 en ont au moins une. Presque toutes sont récentes. Chaque fiche dit si son prix est français ou européen. |
| Prix douteux | 204 cartes signalées pour un écart de plus de dix fois avec le prix américain, 1 172 pour un produit partagé avec une autre carte. Affichées, plafonnées en confiance, hors classements. |
| Prix gradés | Aucun. Ils ne sont affichés que s'ils sont observés, et aucune source d'annonces gradées n'est branchée. Une carte gradée d'une collection n'a pas de valeur. |
| Illustrations | 2 941 cartes sans illustration française, dont 1 402 ont une illustration anglaise chez TCGdex. Rien de fait. |
| Relevé | Second essai des cartes illisibles, refus de publier un relevé anormal, ticket assigné au propriétaire en cas d'échec, veille trois fois par jour. L'alerte et la veille n'ont encore jamais eu à se déclencher : non éprouvées. |
| Dépendance à TCGdex | L'accueil, les familles et la construction du site lisent notre propre catalogue (`catalog.json`). La fiche d'une carte et la recherche interrogent encore TCGdex en direct ; une page d'erreur propose de réessayer. |
| Interface | Extensions affichées en entier, tri et filtre par rareté, listes déroulantes dessinées par le site. Non essayées dans Opera lui-même. |

### Déploiement : ce qui clochait

Deux causes, lues dans les journaux Vercel le 16 novembre.

1. **Vercel construisait la branche `data`** à chaque relevé. Elle ne contient que des fichiers de prix : erreur à chaque fois. Corrigé par un réglage du projet Vercel (« Ignored Build Step » : `[ "$VERCEL_GIT_COMMIT_REF" = "data" ]`). À confirmer au prochain relevé : le déploiement de `data` doit apparaître comme ignoré, plus comme en erreur.
2. **La construction appelait TCGdex**, qui répondait 503 par moments, et une seule erreur faisait tout échouer. Corrigé : le site lit `catalog.json` dans nos relevés.

### En attente du fondateur

- **CardTrader** : soumettre la demande d'accord par leur formulaire (texte dans `docs/demandes-sources.md`). Il est réservé aux comptes connectés.
- **eBay** : à l'arrivée des clés, soumettre la demande d'accord par l'espace développeur (même fichier).
- **Réponses attendues** dans sa boîte : Cardmarket et PokéCardex, écrits le 16 novembre.
- **Prix gradés** : accepte-t-il un modèle appris sur des ventes gradées observées, affiché comme estimation ? Question posée dans `docs/chantier-prix-fiables.md`.

## Chantier 1 : fiabiliser l'existant

Priorité immédiate. Les chiffres viennent du relevé du 15 novembre.

### Le prix n'est pas celui de la carte française

C'est le défaut le plus gênant aux yeux du fondateur.

- **TCGplayer** est le marché américain, pour des cartes anglaises. Retiré du calcul le 16 novembre.
- **Cardmarket** publie un prix par carte toutes langues confondues. Ce n'est pas non plus un prix français.
- Aucune source de prix propre à la version française n'est branchée. État des pistes au 16 novembre :
  - **CardTrader : confirmé par sa documentation.** `GET /marketplace/products?expansion_id=…&language=fr` renvoie les 25 annonces les moins chères par carte, avec état, quantité, pays du vendeur et mention « gradée ». Une requête par extension suffit (188 par jour). TCGdex fournit l'identifiant CardTrader des cartes (`variants_detailed[].thirdParty.cardtrader`), pas pour toutes. Il manque un jeton (compte du fondateur) et, d'après leurs conditions, une demande écrite pour l'usage « données de marché ». Ce sont des prix demandés, pas des ventes.
  - **eBay France : bloqué par la licence de l'API** tant qu'il n'y a pas d'accord écrit (voir « Prix gradés » plus bas).
  - Toute autre source française : à chercher.

### Prix douteux

- 1 169 cartes partagent leur produit Cardmarket avec une autre carte de la même extension (surtout des promos) : le prix affiché est probablement celui d'une autre carte. Elles sont signalées et exclues des classements, mais pas corrigées.
- 2 263 cartes cotées ont une confiance inférieure à 60.
- 467 cartes n'ont aucun prix.
- Éditions 1, tampons et erreurs d'impression ne sont pas distingués. Piste : TCGdex expose `variants_detailed`, avec un prix Cardmarket par variante (édition 1, sans ombre, illimitée). Le site ne lit que le prix principal.
- 202 cartes ont un prix sans commune mesure avec le marché américain (signalées depuis le 16 novembre). Exemple : Pikachu ☆ d'EX Fantômes Holon à 5,15 €. La correspondance de ces cartes est à corriger à la source.
- Les cartes vintage ont des indicateurs très dispersés (états de conservation mélangés).

Il n'existe aucun contrôle qui compare nos prix à une référence extérieure. Un jeu de cartes témoins vérifiées à la main serait le premier garde-fou.

### Illustrations manquantes

- 2 941 cartes sur 20 226 n'ont pas d'illustration côté TCGdex. Les plus touchées : Diamant & Perle (754), Soleil et Lune (692), Kits du dresseur (464), Épée et Bouclier (354), McDonald's (235), Méga-Évolution (154), L'appel des Légendes (106).
- En plus, certaines illustrations annoncées n'existent pas (7 des 60 cartes les plus chères). Le nombre total n'est pas connu : seules ces 60 cartes sont vérifiées.
- Mesuré le 16 novembre sur les 2 941 cartes sans illustration française : 1 402 ont une illustration de la version anglaise chez TCGdex (toutes vérifiées, le fichier existe) ; 1 539 n'en ont dans aucune des deux langues.
- Illustrations annoncées mais absentes : 1 sur un échantillon de 1 441 (sm5-147). Extrapolé au catalogue, de l'ordre d'une quinzaine de cartes : c'est une estimation.
- Pistes : afficher l'illustration anglaise avec une mention explicite (décision du fondateur, `CADRAGE.md`), contribuer les images manquantes à TCGdex, ou une source de repli (attention aux droits et à la langue de la carte).

### Relevé quotidien

- Le déclenchement planifié de GitHub Actions n'a pas eu lieu la première nuit (16 novembre, 4 h 17 UTC). Le relevé a été lancé à la main. Un second créneau à 13 h 47 UTC a été ajouté en rattrapage.
- Contrôle et alerte en place depuis le 16 novembre. Limite : la veille dépend du même planificateur GitHub que le relevé. Le fondateur a refusé une surveillance par tâche planifiée Claude : le relevé doit être fiable par lui-même.
- La branche `data` grossit chaque jour. À surveiller.

### Prix gradés

- Ce sont un modèle (multiples du prix non gradé par époque et par société), pas des ventes observées. Les coefficients de `src/lib/pricing/graded.ts` et les probabilités de `grading-roi.ts` sont des ordres de grandeur non étalonnés.
- L'adaptateur eBay (`scripts/ebay.ts`) n'a jamais tourné avec de vraies clés. **Ne pas l'activer tel quel.** La licence de l'API, lue le 16 novembre, interdit d'utiliser le contenu eBay pour « suggest or model prices », de le conserver hors des usages permis, et impose que les annonces affichées aient moins de 6 heures. Mêler eBay au prix juste et à l'historique y contrevient. Usage conforme possible : afficher les annonces en cours avec un lien vers eBay, hors du prix et de l'historique. Décision attendue du fondateur (`CADRAGE.md`, question 8).

### Divers

- Les animations (reflet holo, transition vignette → fiche, pages du classeur) n'ont été relues que sur captures figées.
- La collection n'existe que dans le navigateur : pas de compte, pas de synchronisation.
- Le site en production n'a pas été vérifié par l'assistant (pas d'accès à l'espace Vercel).

## Chantier 2 : la direction voulue

Paroles du fondateur, 16 novembre 2026. Rien de ce qui suit n'est encore conçu ni décidé dans le détail.

### Le modèle : celui de Supabase

Un logiciel open source au cœur, une communauté autour, et une offre hébergée en freemium qui fait vivre le projet. Le fondateur veut étudier de près comment Supabase a grandi (dépôt GitHub, site, communication, lancement) et suivre la même voie.

Question ouverte la plus importante : ce que l'offre payante vend. Supabase vend l'hébergement d'une infrastructure que l'on pourrait héberger soi-même. Pour un suivi de cote de cartes, l'équivalent reste à trouver.

### Multi-TCG

Après Pokémon, le même concept pour d'autres jeux de cartes à collectionner. Idée du fondateur, à prendre, laisser ou améliorer : un monde visuel original par jeu.

### Un nouveau nom

Le projet ne s'appellera pas PokéTrack. Le nom doit convenir à plusieurs jeux et ne pas reposer sur une marque d'autrui.

### Un projet piloté par des agents

Le fondateur mène une autre entreprise et n'aura pas de temps pour celle-ci. Il veut que l'assistant gère tout : décisions, code, marketing, sécurité, juridique, communauté. Il fixe la ligne, lance quelques routines par semaine, et attend une architecture d'agents et de sous-agents (rôles, mémoire, skills, connecteurs, garde-fous, modèles) conçue en amont. Il attend des conseils sur la façon de la monter.

Règles à fixer dès le cadrage : design (avec les skills déjà installés), développement, sécurité.

### Ce qui reste à décider avant de construire

- Ce que vend l'offre hébergée, et à qui.
- Le nom, et sa disponibilité (domaine, GitHub, marques).
- Le périmètre de ce que les agents peuvent faire seuls, et ce qui exige toujours le fondateur : structure juridique, paiements, engagements, publications au nom du projet.
- Les risques juridiques : usage des marques et des illustrations des éditeurs, conditions d'utilisation des sources de prix.
- L'ordre : fiabiliser d'abord, s'étendre ensuite.

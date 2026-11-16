# Feuille de route

État au 16 novembre 2026. Ce document dit où en est le projet, ce qui ne va pas encore, et la direction voulue par son fondateur. Il est fait pour être relu au début de chaque session de travail.

## Où on en est

- Première version fusionnée dans `main` le 15 novembre 2026 et mise en ligne sur Vercel par le fondateur.
- Relevé des prix publié sur la branche `data` : deux jours d'historique (15 et 16 novembre), aucun jour manquant. Les deux relevés ont été déclenchés par une fusion ou à la main : le déclenchement planifié de GitHub n'a encore jamais fonctionné.
- 20 226 cartes françaises suivies.
- Le document de cadrage (`CADRAGE.md`) est un brouillon soumis au fondateur. Rien de l'architecture d'agents n'est construit.

### Corrigé le 16 novembre (branche `claude/zealous-mayer-ain5x3`, pas encore dans `main`)

- **Le marché américain n'entre plus dans le prix.** Le prix juste repose sur Cardmarket seul. Mesuré sur un relevé complet : 12 366 prix changent de plus de 5 %, la valeur totale suivie passe de 295 849 € à 252 143 €, et 331 cartes qui n'étaient cotées qu'aux États-Unis n'ont plus de prix (19 428 cartes cotées). La courbe historique aura donc une marche le jour de la mise en ligne.
- **Nouveau signal de prix douteux.** 202 cartes d'au moins 5 € dont le prix européen est plus de dix fois au-dessus ou au-dessous du prix américain sont signalées, plafonnées en confiance et exclues des classements. Le prix américain sert d'alarme, jamais de prix.
- **Le relevé ne perd plus de cartes en silence.** Un essai local avait perdu 40 cartes sur des erreurs passagères de TCGdex. Désormais : second essai, la carte garde sa fiche de la veille si elle reste illisible, et le relevé refuse de publier s'il manque trop de cartes ou si le nombre de cartes cotées chute.
- **Alerte.** Un relevé en échec ouvre un ticket assigné au propriétaire du dépôt. Une veille (`.github/workflows/veille.yml`) vérifie trois fois par jour que le relevé du jour existe, le relance sinon et ouvre le même ticket. Ces deux flux n'ont pas encore tourné : ils ne s'activent qu'une fois dans `main`.
- L'indice de liquidité est ramené sur 100 sans le marché américain.

### Fait le 16 novembre, deuxième passage (même branche, pas encore dans `main`)

Suite aux décisions du fondateur (voir `CADRAGE.md`, « Décisions du fondateur »).

- **Annonces de cartes françaises (CardTrader) branchées**, premier passage contrôlé avec le jeton du fondateur. Mesuré sur un relevé complet : 157 extensions reliées sur 188, 4 649 cartes avec au moins une annonce française en très bon état, dont 2 367 avec une seule, 1 001 avec trois ou plus et 137 avec cinq ou plus. Presque tout est dans Écarlate et Violet, Méga-Évolution et Épée et Bouclier ; les séries anciennes n'ont quasiment rien. 685 annonces ont été écartées parce que le nom de la carte ne correspondait pas.
- **Chaque fiche dit sur quoi repose son prix** : « prix français » à partir de trois annonces de cartes françaises, sinon « prix européen, toutes langues ». Le prix n'est donc réellement français que pour 5 % des cartes aujourd'hui.
- **Prix gradés : plus aucun multiplicateur.** Un prix gradé n'est affiché que s'il vient d'au moins trois annonces observées. Aucune source d'annonces gradées n'étant branchée (CardTrader n'en a que 20 en français, tous jeux Pokémon confondus), les prix gradés sont vides sur tout le site, une carte gradée d'une collection n'a pas de valeur, et le calcul « faut-il la faire grader » n'affiche que les frais.
- **Interface** : extensions affichées en entier, sans bouton « afficher plus », illustrations chargées d'emblée ; tri et filtre par rareté ; listes déroulantes dessinées par le site (la liste native s'affichait sans style sous Opera).
- **Relevé** : il patiente jusqu'à 25 secondes par requête quand TCGdex répond 503 (un essai avait échoué là-dessus), et continue sans les annonces françaises si CardTrader est en panne.
- **Activation en production** : le relevé GitHub n'utilisera CardTrader qu'une fois le secret `CARDTRADER_TOKEN` ajouté au dépôt par le fondateur. Les demandes d'accord écrit à CardTrader et à eBay sont rédigées dans `docs/demandes-sources.md`.

### Ce qui reste ouvert après ce passage

- **Le prix français des cartes chères et anciennes.** Aucune source autorisée ne le donne. Pistes : accord écrit d'eBay, accord de Cardmarket, déclarations de la communauté.
- **Les prix gradés** : même constat, il faut au moins l'accord d'eBay.
- **Illustrations** : rien de changé. PokéCardex interdit la reprise de ses images. Le repli sur l'illustration anglaise (1 402 cartes) reste à faire.
- **Déploiement en production** : le fondateur signale un problème depuis la dernière mise à jour. Les journaux Vercel n'ont pas pu être lus (pas d'accès à l'espace « clip-studio »). Cause très probable, reproduite ici : la construction du site appelait TCGdex, qui répondait 503 par moments le 16 novembre, et une seule erreur faisait échouer toute la construction. Corrigé sur cette branche : le relevé publie le catalogue (`catalog.json`) et le site le lit dans nos relevés ; la construction patiente davantage tant que ce fichier n'existe pas. À confirmer dans les journaux Vercel.
- **Dépendance restante à TCGdex en direct** : la fiche d'une carte et la recherche l'interrogent encore à chaque visite. Quand il ne répond pas, une page d'erreur propose de réessayer (ajoutée le 16 novembre). Pour un site vraiment robuste, il faut publier aussi un index de recherche et le détail des cartes dans nos relevés.
- **Données publiées** : le relevé en ligne du 16 novembre a perdu 94 cartes (20 132 sur 20 226), à cause du défaut corrigé sur cette branche.

## Chantier 1 : fiabiliser l'existant

Priorité immédiate. Les chiffres viennent du relevé du 15 novembre.

### Le prix n'est pas celui de la carte française

C'est le défaut le plus gênant aux yeux du fondateur.

- **TCGplayer** est le marché américain, pour des cartes anglaises. Retiré du calcul le 16 novembre (voir plus haut).
- **Cardmarket** publie un prix par carte toutes langues confondues. Ce n'est pas non plus un prix français.
- Aucune source de prix propre à la version française n'est branchée. État des pistes au 16 novembre :
  - **CardTrader : confirmé par sa documentation.** `GET /marketplace/products?expansion_id=…&language=fr` renvoie les 25 annonces les moins chères par carte, avec état, quantité, pays du vendeur et mention « gradée ». Une requête par extension suffit (188 par jour). TCGdex fournit l'identifiant CardTrader des cartes (`variants_detailed[].thirdParty.cardtrader`), pas pour toutes. Il manque un jeton (compte du fondateur) et, d'après leurs conditions, une demande écrite pour l'usage « données de marché ». Ce sont des prix demandés, pas des ventes.
  - **eBay France : bloqué par la licence de l'API** (voir « Prix gradés » plus bas).
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
- Contrôle et alerte écrits le 16 novembre (voir plus haut), à confirmer en conditions réelles après fusion. Limite : la veille dépend du même planificateur GitHub que le relevé. Une surveillance indépendante (tâche planifiée Claude) est proposée dans `CADRAGE.md`, question 6.
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

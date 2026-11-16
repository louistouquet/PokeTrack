# Feuille de route

État au 16 novembre 2026. Ce document dit où en est le projet, ce qui ne va pas encore, et la direction voulue par son fondateur. Il est fait pour être relu au début de chaque session de travail.

## Où on en est

- Première version fusionnée dans `main` le 15 novembre 2026 et mise en ligne sur Vercel par le fondateur.
- Relevé des prix publié sur la branche `data` : deux jours d'historique (15 et 16 novembre).
- 20 226 cartes françaises suivies, 19 759 avec un prix.

## Chantier 1 : fiabiliser l'existant

Priorité immédiate. Les chiffres viennent du relevé du 15 novembre.

### Le prix n'est pas celui de la carte française

C'est le défaut le plus gênant aux yeux du fondateur.

- **TCGplayer** est le marché américain, pour des cartes anglaises. Il entre aujourd'hui dans le prix juste avec un poids de 0,3 (`src/lib/pricing/raw.ts`). À retirer du calcul ou à réduire à un simple repère affiché.
- **Cardmarket** publie un prix par carte toutes langues confondues. Ce n'est pas non plus un prix français.
- Aucune source de prix propre à la version française n'est branchée. Pistes à vérifier, aucune n'est confirmée :
  - CardTrader : TCGdex fournit un identifiant CardTrader par carte (`variants_detailed[].thirdParty.cardtrader`). Si son API donne les annonces par langue, ce serait un prix français et une quantité en vente.
  - eBay France, en ne gardant que les annonces de cartes françaises (adaptateur écrit, jamais essayé, voir plus bas).
  - Toute autre source française : à chercher.

### Prix douteux

- 1 169 cartes partagent leur produit Cardmarket avec une autre carte de la même extension (surtout des promos) : le prix affiché est probablement celui d'une autre carte. Elles sont signalées et exclues des classements, mais pas corrigées.
- 2 263 cartes cotées ont une confiance inférieure à 60.
- 467 cartes n'ont aucun prix.
- Éditions 1, tampons et erreurs d'impression ne sont pas distingués.
- Les cartes vintage ont des indicateurs très dispersés (états de conservation mélangés).

Il n'existe aucun contrôle qui compare nos prix à une référence extérieure. Un jeu de cartes témoins vérifiées à la main serait le premier garde-fou.

### Illustrations manquantes

- 2 941 cartes sur 20 226 n'ont pas d'illustration côté TCGdex. Les plus touchées : Diamant & Perle (754), Soleil et Lune (692), Kits du dresseur (464), Épée et Bouclier (354), McDonald's (235), Méga-Évolution (154), L'appel des Légendes (106).
- En plus, certaines illustrations annoncées n'existent pas (7 des 60 cartes les plus chères). Le nombre total n'est pas connu : seules ces 60 cartes sont vérifiées.
- Pistes : contribuer les images manquantes à TCGdex, ou une source de repli (attention aux droits et à la langue de la carte).

### Relevé quotidien

- Le déclenchement planifié de GitHub Actions n'a pas eu lieu la première nuit (16 novembre, 4 h 17 UTC). Le relevé a été lancé à la main. Un second créneau à 13 h 47 UTC a été ajouté en rattrapage.
- Rien n'alerte quand un jour manque. Il faut un contrôle (jour manquant, nombre de cartes cotées en chute) et un moyen d'être prévenu.
- La branche `data` grossit chaque jour. À surveiller.

### Prix gradés

- Ce sont un modèle (multiples du prix non gradé par époque et par société), pas des ventes observées. Les coefficients de `src/lib/pricing/graded.ts` et les probabilités de `grading-roi.ts` sont des ordres de grandeur non étalonnés.
- L'adaptateur eBay (`scripts/ebay.ts`) n'a jamais tourné avec de vraies clés. La demande de clés est en cours côté fondateur. Avant de l'activer : lire les conditions d'utilisation de l'API eBay sur la publication de prix dérivés des annonces.

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

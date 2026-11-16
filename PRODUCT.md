# PokéTrack — contexte produit

Les faits marqués *(inféré)* viennent de la demande initiale, pas d'une réponse explicite.

## Utilisateurs

Collectionneurs et investisseurs de cartes Pokémon en France. Ils consultent sur téléphone, classeur ouvert à côté, ou sur ordinateur pour faire le point sur leur collection *(inféré)*. Ils connaissent le vocabulaire : extension, rareté, reverse, gradation, PSA, PCA.

## Ce que le produit rend possible

- Savoir ce que vaut une carte française aujourd'hui, non gradée ou gradée, et à quel point ce prix est fiable et facile à obtenir (liquidité).
- Ranger sa collection et suivre sa valeur dans le temps.
- Décider si faire grader une carte vaut le coût.

Ce qui le distingue : un prix recoupé entre plusieurs places de marché avec ses indices, une méthode publiée, un code ouvert, aucun compte.

## Contraintes durables

- Gratuit et open source dans un premier temps. Pas de compte pour l'instant : la collection reste dans le navigateur.
- Marché français d'abord : interface en français, cartes françaises.
- L'historique des prix commence le jour de la mise en ligne et s'enrichit d'un relevé par jour.
- Honnêteté des chiffres : un prix estimé par modèle est toujours présenté comme tel ; rien n'est inventé.
- Projet de fans : aucun lien avec les ayants droit, et cela doit être dit.

## Vocabulaire

Famille (série), extension (set), carte, finition (normale / reverse), non gradée / gradée, société de gradation, note, prix juste, liquidité, confiance, volatilité, classeur.

## Plateforme

`web`, lisible du téléphone au grand écran.

## Stack

Délégué à l'assistant : Next.js (App Router), TypeScript, Tailwind, déploiement Vercel, relevés par GitHub Actions.

## Direction (fondateur, 16 novembre 2026)

- Modèle visé : celui de Supabase. Cœur open source, communauté, offre hébergée en freemium.
- Extension à d'autres jeux de cartes à collectionner après Pokémon.
- Le nom PokéTrack est provisoire : le projet sera renommé.
- Le projet doit être piloté par des agents, le fondateur fixant la ligne.
- Le prix affiché doit être celui de la carte française, pas celui de la version américaine.

Le détail, les défauts connus et les questions ouvertes sont dans [ROADMAP.md](ROADMAP.md).

## Décisions ouvertes

- Ce que vend l'offre hébergée.
- Le nouveau nom.
- Comptes et synchronisation de la collection entre appareils.
- Source de prix propre aux cartes françaises, et source de ventes gradées réalisées.
- Un monde visuel par jeu de cartes (idée du fondateur, non tranchée).

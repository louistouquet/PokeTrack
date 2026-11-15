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

- Gratuit et open source dans un premier temps. Pas de compte : la collection reste dans le navigateur.
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

## Décisions ouvertes

- Comptes et synchronisation de la collection entre appareils.
- Source de ventes gradées réalisées (aujourd'hui : modèle, plus annonces eBay si configurées).
- Autres langues et autres marchés.

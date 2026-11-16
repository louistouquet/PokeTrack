# Travailler sur ce dépôt

Lire d'abord `ROADMAP.md` (état, défauts connus, direction), puis `PRODUCT.md` et `DESIGN.md`.

## Commandes

- `npm test` : tests du moteur de prix et du classement eBay (Node 22.18+, sans dépendance).
- `npx tsc --noEmit` et `npx eslint .` : doivent rester sans erreur.
- `npm run ingest` : relevé complet dans `.data/` (3 minutes, 20 000 requêtes vers TCGdex). Pour un essai : `node scripts/ingest.ts --sets sv03.5,base1`.
- `npm run dev` lit `.data/` (voir `.env.development`). En production le site lit la branche `data`.

## Vérifier avant d'annoncer

- Une modification d'interface se vérifie dans un navigateur, sur le build de production (`POKETRACK_DATA_DIR=.data npx next build` puis `next start`), en 1440 px et 390 px, console sans erreur.
- Avant de relancer `next start`, tuer `next-server` : sinon l'ancien serveur reste sur le port et sert un build périmé.
- Un chiffre estimé par modèle est toujours présenté comme tel dans l'interface. Ne rien inventer : ni prix, ni avis, ni statistique.

## Pièges déjà rencontrés

- Tailwind 4 : une règle `@starting-style` imbriquée dans un sélecteur casse silencieusement la compilation de tout ce qui suit. L'écrire au niveau supérieur.
- Les classes de composants vont dans `@layer components` de `globals.css`, sinon elles écrasent les utilitaires.
- La police d'affichage doit avoir des chiffres sans ambiguïté (Pixelify Sans a été écartée : son 5 se lit S).
- Les fichiers importés par `scripts/` s'exécutent tels quels dans Node : imports relatifs avec extension `.ts`, pas d'alias `@/`, syntaxe TypeScript effaçable uniquement.
- GitHub Actions peut sauter un déclenchement planifié. Vérifier la branche `data` plutôt que supposer.

## Façon de faire

- Design : skills `impeccable`, `emil-design-eng` et `design-taste-frontend` (dans `.claude/skills/`). Code : skill `ponytail`, la plus petite modification qui règle tout le problème, pas de dépendance pour quelques lignes.
- Le fondateur délègue les décisions techniques. Lui demander seulement ce que lui seul peut faire ou trancher : accès, comptes, argent, engagements, orientation.
- Interface et documentation en français.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

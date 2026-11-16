# Travailler sur ce dépôt

Lire d'abord `ROADMAP.md` (état, défauts connus, direction), puis `PRODUCT.md` et `DESIGN.md`. `CADRAGE.md` est la proposition de cadrage du projet : tant que le fondateur ne l'a pas validée, ne rien construire de l'architecture d'agents qu'elle décrit.

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
- TCGdex renvoie des erreurs passagères sous charge : un relevé complet peut perdre des dizaines de cartes si l'on ne réessaie pas. `scripts/ingest.ts` réessaie et refuse de publier un relevé anormal ; garder ce comportement.
- Le prix américain (TCGplayer) ne doit jamais entrer dans un prix affiché. Il ne sert que d'alarme (`usGap` dans `src/lib/snapshot.ts`).
- eBay : ne pas activer `scripts/ebay.ts` tel quel, la licence de l'API l'interdit (voir `ROADMAP.md`). Décision du fondateur : n'afficher que les annonces en cours avec un lien vers eBay.
- Prix gradés : uniquement observés (`src/lib/pricing/graded.ts`). Ne jamais réintroduire de multiplicateur du prix non gradé, le fondateur le refuse.
- CardTrader : le jeton est injecté par le réseau de la session, pas par une variable. Pour lancer le relevé avec les annonces françaises : `CARDTRADER_TOKEN=proxy-injected NODE_USE_ENV_PROXY=1 node scripts/ingest.ts`. Sans `NODE_USE_ENV_PROXY=1`, Node contourne le proxy et reçoit un 401. En production, le jeton est le secret GitHub `CARDTRADER_TOKEN`.
- Budget du projet : zéro euro. Ne proposer aucun service payant.
- Avant de comparer des chiffres à la production, relancer `git fetch origin main data` : la copie locale date du démarrage de la session.

## Outils qui marchent depuis une session cloud

- Marques : TMview ne répond qu'à un vrai navigateur (Playwright), pas à `curl`.
- Domaines : `https://rdap.org/domain/<nom>` (404 = pas d'enregistrement) recoupé par une requête DNS. Cela ne dit ni le prix ni si le domaine est « premium ».
- Comptes GitHub d'autrui : `curl` est refusé par le proxy, passer par l'outil de lecture de pages web.
- Vercel : le connecteur est sur le bon compte mais doit être autorisé pour l'espace « clip-studio » (lien à usage unique, valable 10 minutes, à demander à l'assistant).

## Façon de faire

- Design : skills `impeccable`, `emil-design-eng` et `design-taste-frontend` (dans `.claude/skills/`). Code : skill `ponytail`, la plus petite modification qui règle tout le problème, pas de dépendance pour quelques lignes.
- Le fondateur délègue les décisions techniques. Lui demander seulement ce que lui seul peut faire ou trancher : accès, comptes, argent, engagements, orientation.
- Interface et documentation en français.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

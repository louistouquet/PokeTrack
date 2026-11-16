# PokéTrack

La cote des cartes Pokémon françaises : un prix juste pour chaque carte, non gradée ou gradée, avec sa liquidité, et un classeur pour suivre la valeur de sa collection. Gratuit, sans compte, code ouvert.

> Projet de fans, sans lien avec Nintendo, Game Freak, Creatures ou The Pokémon Company. Les prix sont des estimations, pas un conseil en investissement.

## Ce que fait le site

- **Catalogue français complet** : les familles (Méga-Évolution, Écarlate et Violet, Épée et Bouclier… jusqu'au Set de Base), leurs extensions, et pour chaque carte son illustration, sa rareté, son numéro. Environ 20 000 cartes.
- **Prix juste non gradé** : calculé sur les ventes de Cardmarket (Europe, toutes langues) et, quand il y en a, sur les annonces de cartes françaises de CardTrader, avec une fourchette, une tendance, et trois indices : liquidité, confiance, volatilité.
- **Prix gradés** : par société (PSA, PCA, CGC, BGS, Collect Aura) et par note, uniquement à partir d'annonces observées. Aucune source n'est encore branchée : ils sont vides pour l'instant.
- **Collection** : chaque carte s'ajoute non gradée ou gradée (société + note), en vue classeur, par séries ou en liste. Valeur totale, plus-value si le prix d'achat est renseigné, graphique de la valeur.
- **Faut-il la faire grader ?** : compare les sociétés à partir des prix gradés observés pour la carte. Sans source branchée, la page n'affiche que les frais et les délais.
- **Historique** : un relevé par jour à partir de la mise en ligne. Les courbes se construisent avec le temps.

La méthode de calcul complète, avec ses limites, est sur la page [/methode](src/app/methode/page.tsx) du site.

## Lancer le projet

Node 22.18 ou plus récent.

```bash
npm install
```

```bash
npm run ingest
```

```bash
npm run dev
```

`npm run ingest` relève les prix de tout le catalogue dans `.data/` (environ 3 minutes). Sans ce relevé le site fonctionne quand même : il calcule les prix en direct, mais l'accueil n'a pas de classements et il n'y a pas d'historique. Pour un essai rapide : `node scripts/ingest.ts --sets sv03.5,base1`.

```bash
npm test
```

## Comment c'est construit

| Partie | Où | Rôle |
| --- | --- | --- |
| Moteur de prix | `src/lib/pricing/` | Prix juste (`raw.ts`), prix gradés (`graded.ts`), rentabilité de la gradation (`grading-roi.ts`). Fonctions pures, testées. |
| Catalogue | `src/lib/tcgdex.ts` | Client de l'API [TCGdex](https://tcgdex.dev) (cartes françaises + prix Cardmarket). |
| Relevé quotidien | `scripts/ingest.ts` | Parcourt le catalogue, écrit l'état du jour et ajoute un point à l'historique. |
| CardTrader | `scripts/cardtrader.ts` | Annonces de cartes françaises (optionnel : secret `CARDTRADER_TOKEN`). |
| eBay | `scripts/ebay.ts` | Annonces eBay France (optionnel, voir plus bas). |
| Site | `src/app/`, `src/components/` | Next.js 16 (App Router), React 19, Tailwind 4. Aucune autre dépendance. |
| Collection | `src/lib/collection.ts` | Stockée dans le navigateur (localStorage), exportable en JSON. |

### D'où viennent les données

Le relevé quotidien tourne dans GitHub Actions (`.github/workflows/prices.yml`) et publie ses fichiers sur la branche `data` du dépôt :

```
latest/<extension>.json      prix du jour de chaque carte
history/<extension>.json     un prix par jour et par carte
market.json                  classements et valeur par famille
market-history.json          valeur totale par jour
```

Un relevé anormal (trop de cartes illisibles, chute du nombre de cartes cotées) n'est pas publié, et un ticket prévient le propriétaire du dépôt. Une veille (`.github/workflows/veille.yml`) relance le relevé s'il manque.

Le site lit ces fichiers depuis `raw.githubusercontent.com` (le dépôt doit donc être public). Pas de base de données, pas de serveur à maintenir, et l'historique des prix est lui-même une donnée ouverte.

En développement, `.env.development` fait lire le dossier local `.data/` à la place.

| Variable | Rôle |
| --- | --- |
| `POKETRACK_DATA_DIR` | Dossier local des relevés (développement). |
| `POKETRACK_DATA_URL` | Adresse des relevés en production, si le dépôt change de nom. |

## Mettre en ligne

1. Fusionner dans `main`. Le premier relevé part tout seul et crée la branche `data` ; il se relance ensuite chaque nuit.
2. Importer le dépôt dans [Vercel](https://vercel.com/new) (réglages par défaut, aucune variable à définir).

### Activer eBay (facultatif)

> **À ne pas activer en l'état.** La licence de l'API eBay interdit d'utiliser ses données pour modéliser des prix et de les conserver comme le fait l'adaptateur actuel. Voir `ROADMAP.md`.

Les annonces eBay apportent la quantité en vente et des prix gradés observés. Il faut un compte développeur eBay (gratuit) :

1. Créer une application sur [developer.ebay.com](https://developer.ebay.com) et récupérer ses identifiants de production.
2. Dans le dépôt GitHub : Settings → Secrets and variables → Actions, ajouter `EBAY_CLIENT_ID` et `EBAY_CLIENT_SECRET`.

Le relevé interroge alors eBay France pour les cartes les plus chères (4 000 par jour, sous le quota gratuit de 5 000 appels). **Cet adaptateur n'a pas encore été essayé avec de vraies clés** : seul le classement des titres d'annonces est testé.

## Limites connues

La liste complète des défauts connus et la direction du projet sont dans [ROADMAP.md](ROADMAP.md).

- Le prix n'est pas encore propre à la carte française : Cardmarket mélange les langues. Le marché américain (TCGplayer) n'entre plus dans le calcul.
- Environ 2 900 cartes n'ont pas d'illustration dans la source.
- Les prix gradés ne sont affichés que s'ils sont observés ; faute de source branchée, il n'y en a aucun aujourd'hui.
- Le prix n'est propre à la carte française que pour les cartes qui ont au moins trois annonces françaises sur CardTrader (environ 5 % du catalogue).
- Cardmarket publie un prix par carte, toutes langues confondues.
- La quantité en vente n'est connue que via eBay.
- Les tarifs de gradation sont indicatifs (novembre 2026) et modifiables dans le calculateur.
- La branche `data` grossit chaque jour (de l'ordre du mégaoctet) : à surveiller au bout de quelques mois.

## Design et skills

L'interface suit un monde visuel, « Dot Matrix », décrit dans [DESIGN.md](DESIGN.md) ; le contexte produit est dans [PRODUCT.md](PRODUCT.md).

Le dépôt embarque les skills Claude Code utilisés pour le construire (`.claude/skills/`, versions figées dans `skills-lock.json`) : [impeccable](https://github.com/pbakaus/impeccable), [emil-design-eng](https://github.com/emilkowalski/skill) et [taste](https://github.com/Leonxlnx/taste-skill) pour le design, [ponytail](https://github.com/DietrichGebert/ponytail) pour le code.

## Licence

Apache 2.0. Les données de cartes et les illustrations viennent de TCGdex ; les marques et les illustrations appartiennent à leurs propriétaires.

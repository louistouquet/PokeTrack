# DESIGN — « Dot Matrix »

Le monde visuel de PokéTrack est la matière d'une Game Boy de 1989 : coque gris chaud, lettrage indigo, boutons framboise, écran LCD olive. Le Pokémon « rétro » n'est pas évoqué par le rouge, le blanc et le jaune habituels, mais par la console sur laquelle on y jouait. La couleur vive vient des coques Game Boy Color, une par famille de cartes, et des cartes elles-mêmes.

Tout est défini dans `src/app/globals.css`.

## Principes

1. **L'écran LCD est réservé aux prix.** Prix juste, valeur de la collection, graphiques : ce qui est une mesure de marché s'affiche sur l'écran vert, en lettres pixel. Rien d'autre n'y va.
2. **Le monde prête sa matière, pas son interface.** Navigation, formulaires, tableaux et filtres restent des contrôles web ordinaires. Pas de fausse console.
3. **La couleur fait un travail.** Une couleur par famille (bandeau d'en-tête, cartouche), vert et rouge pour hausse et baisse, jauges vert / jaune / rouge. Jamais décorative.
4. **Les cartes sont l'image.** Aucune illustration ajoutée : les cartes portent la page.
5. **Un chiffre estimé le dit.** Les prix issus du modèle sont étiquetés, les prix douteux signalés.

## Couleurs

| Rôle | Jeton | Valeur |
| --- | --- | --- |
| Fond (coque) | `--shell` | `#e3e0d6` |
| Fond en creux | `--shell-lo` | `#d4d0c4` |
| Surface en relief | `--shell-hi` | `#f3f1ea` |
| Filets | `--line` | `#bfbaac` |
| Texte (lettrage) | `--ink` | `#23215a` |
| Texte secondaire | `--ink-soft` | `#57557f` |
| Action principale | `--berry` / `--berry-deep` | `#9a1f5a` / `#7a1646` |
| Bandeau, classeur | `--bezel` / `--bezel-ink` | `#474a66` / `#edebf6` |
| Écran LCD | `--lcd` / `--lcd-mid` / `--lcd-dim` / `--lcd-ink` | `#c5d06c` / `#9bae42` / `#3f5a26` / `#1b3418` |
| Hausse / baisse | `--up` / `--down` | `#1c7442` / `#c22d26` |
| Niveau moyen des jauges | `--gold` | `#e9b213` |

Couleurs de famille (`familyStyle` dans `src/lib/ui.ts`) : Méga-Évolution `#0d9b76`, Écarlate et Violet `#d6363a`, Épée et Bouclier `#1594b8`, Soleil et Lune `#ef8a1d`, XY `#2b62c4`, Noir & Blanc `#2a2a36`, HeartGold `#d9a41e`, Platine `#8b91ab`, Diamant & Perle `#3c86d6`, EX `#b7243f`, e-cards `#5d4aa8`, Neo `#129a93`, Base `#f2bb0f`.

Le texte secondaire est teinté d'indigo, jamais gris neutre. Un seul thème, clair.

## Typographie

- **Jersey 20** (`--font-pixel`) : titres et chiffres sur LCD. Choisie parce que ses chiffres restent sans ambiguïté (le 5 ne se lit pas S), ce qui est non négociable pour des prix.
- **Cabin** (`--font-sans`) : tout le reste. Descendante du Gill Sans, la lettre des cartes de 1999 et du logo Game Boy. Chiffres tabulaires partout.

## Composants

- **`.lcd`** : écran vert à trame de points, cerclé du gris-bleu de la façade.
- **`.hp` / `Meter`** : jauge façon barre de PV pour liquidité, confiance, volatilité, complétion d'une extension.
- **`.cartridge`** : une famille = une cartouche à coin coupé, à la couleur de sa génération.
- **`.card-art` / `CardTile`** : carte au ratio 63 × 88.
- **`.holo` / `HoloCard`** : inclinaison et reflet holographique qui suivent le pointeur (cartes rares, fiche carte et accueil).
- **`.slab` / `Slab`** : boîtier de gradation qui se referme sur la carte quand une note est choisie. Les étiquettes utilisent la palette du site, pas les couleurs des sociétés.
- **`.binder`** : classeur à pochettes de 9 cartes, anneaux, pages qui tournent.
- **`.panel`, `.btn`, `.field`, `.segmented`, `.chip`, `.grade-cell`, `.condition`** : surfaces et contrôles.

Élévation : une ombre douce décalée (`--lift`), jamais bordure et ombre ensemble. Rayons : 14 px pour les panneaux, 8 px pour les champs, pilule pour les boutons.

## Mouvement

- Courbe `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` ; interface sous 300 ms, tiroir et pages du classeur jusqu'à 380 ms.
- Tout ce qui se presse répond (`scale(0.96–0.98)`) ; les survols sont réservés aux pointeurs fins.
- Moments écrits : vignette qui devient la carte de la fiche (transition de vue), boîtier qui se referme, page de classeur qui tourne, jauges qui se remplissent une fois.
- Les actions au clavier ne sont pas animées (pages du classeur aux flèches). Trier ou filtrer ne rejoue pas d'entrée.
- `prefers-reduced-motion` : plus de déplacements, les changements d'état restent.

## Graphiques

Une seule série par graphique, sur LCD : trait de 2 px, aire à 10 %, grille en filets pleins, un point lisible au survol ou aux flèches, tableau des valeurs dépliable.

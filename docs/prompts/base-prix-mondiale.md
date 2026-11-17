# Prompt : base de prix mondiale et modèle de prix

À coller tel quel dans une nouvelle session Claude Code ouverte sur le dépôt `louistouquet/PokeTrack`. Rédigé le 17 novembre 2026.

---

Tu reprends PokéTrack (dépôt `louistouquet/PokeTrack`, en ligne sur `https://poke-track-tau.vercel.app`). Tu mènes ce chantier seul, de bout en bout. Le fondateur n'intervient que pour ce que lui seul peut faire : donner un compte ou une clé, soumettre un formulaire réservé à un compte connecté, accepter une dépense ou un engagement, trancher une orientation. Pour tout le reste, tu décides et tu notes ta décision dans le dépôt.

## 1. À lire avant d'agir

Dans cet ordre, en entier :

1. `AGENTS.md` : règles du dépôt, commandes, pièges déjà rencontrés.
2. `ROADMAP.md` : état du projet.
3. `CADRAGE.md`, section « Décisions du fondateur » : elle prime sur le reste du document.
4. `docs/chantier-prix-fiables.md` : le chantier dont celui-ci est la suite.
5. `docs/sources/inventaire.md`, puis les fichiers de famille de `docs/sources/` dont tu as besoin : l'inventaire de 170 sources fait les 16 et 17 novembre, avec leurs conditions citées et leur verdict.
6. `docs/demandes-sources.md` et `docs/accords/` : demandes envoyées et accords reçus.
7. `docs/cartes-temoins.md` : 190 cartes tirées pour contrôler les prix, sans prix de référence encore.

Ne refais pas l'inventaire. Complète-le seulement si une source manque ou si un accord change un verdict.

## 2. Le but

Deux choses, dans cet ordre :

1. **La plus grande base de prix de cartes Pokémon accessible légalement, mondiale.** Pour chaque carte : tous les prix observés que l'on a le droit de collecter, dans toutes les langues et tous les pays, non gradés et gradés. Chaque observation porte sa source, sa date, son pays, la langue de la carte, l'état, la société de gradation et la note s'il y en a, et sa nature (prix demandé ou vente réalisée).
2. **Un modèle de prix entraîné sur cette base.** On lui donne une carte, un pays, une langue, un état, et éventuellement une société de gradation et une note. Il rend un prix fiable, avec son intervalle, et dit sur quoi il s'appuie. Il continue d'apprendre : il est réétalonné à chaque relevé sur les observations nouvelles.

Le site affiche ce prix sous forme de **fourchette** : ce que la carte se vend, et ce qu'elle coûte à l'achat aujourd'hui.

## 3. Décisions du fondateur, à appliquer

| Sujet | Décision |
| --- | --- |
| Pays | La collecte et l'apprentissage sont mondiaux. Le prix n'est validé et affiché que pour **la France** au départ. Le modèle est conçu pour accueillir d'autres pays ; on les ajoute quand leurs données sont mesurées et validées. |
| Prix américain (TCGplayer) | Donnée d'entrée du modèle, **jamais affiché comme prix français**. Quand une estimation s'appuie sur un autre marché, le site le dit. |
| Prix gradés | Modèle appris sur des ventes ou annonces gradées **réellement observées**, affiché comme estimation, « très solide », réétalonné en continu. **Aucun multiplicateur fixe du prix non gradé**, jamais : le fondateur le refuse. |
| Prix affiché | Une fourchette (vendu, à l'achat), pas un seul chiffre. |
| Budget | **Zéro euro.** Aucun abonnement, aucune API payante, aucun service payant proposé. Firecrawl : seulement les crédits compris dans le compte de base ; outils gratuits d'abord, chaque appel payant compté, jamais `firecrawl_agent`. |
| eBay | Sans accord écrit d'eBay, les annonces en cours sont affichées **à part**, comme des annonces : titre, prix, état, lien vers eBay, moins de six heures. Quelques annonces plutôt qu'un seul chiffre, et jamais présentées comme le prix de la carte. Elles n'entrent ni dans la base, ni dans l'historique, ni dans le modèle (la licence de l'API interdit d'utiliser le contenu eBay pour « suggest or model prices »). |
| Illustrations | Hors de ce chantier : un autre prompt s'en charge. |
| Site | Public et libre. |

## 4. Règles, non négociables

1. **Légalité de chaque source.** Une source n'entre dans la base que si son usage est permis : API ou fichier officiel dont la licence l'autorise (A), lecture de pages permise par les conditions et le `robots.txt` (B), ou **accord écrit archivé** (C). Vérifie que l'usage prévu entre dans ce qui est permis : collecte, conservation, entraînement d'un modèle, affichage public. Une licence qui interdit de « modéliser des prix » (celle de l'API eBay, par exemple) exclut la source du modèle même si l'affichage est permis.
2. **Accords écrits.** Un accord n'est tenu pour acquis que si son texte est archivé dans `docs/accords/<source>.md` : date, expéditeur, citation exacte de ce qui est autorisé, limites. Le fondateur dit avoir obtenu le 16 novembre les accords des sites de la liste de `docs/sources/inventaire.md` (Collect Aura, CCC Grading, PSA, Aguttes et les autres). **Le 17 novembre, ils n'étaient pas dans la boîte Gmail connectée à la session, ni dans le dépôt.** Avant d'utiliser une de ces sources, retrouve l'accord (Gmail, ou demande au fondateur de le transférer), archive-le, et lis ce qu'il autorise vraiment. Sans texte, la source reste fermée.
3. **Jamais de contournement.** Aucune protection anti-robots, aucun captcha, aucune connexion obligatoire, aucune limite de débit n'est contournée, même si un outil le permet. Un outil de collecte ne rend pas une collecte permise.
4. **Rien d'inventé.** Un prix est observé ou estimé, et le site dit lequel. Une estimation porte son intervalle. Aucun coefficient n'est repris d'un article sans être mesuré sur nos données.
5. **Pas de données personnelles.** Ni pseudonymes de vendeurs, ni annonces nominatives conservées.
6. **Robustesse.** Aucune source n'est indispensable : le modèle se dégrade proprement si l'une tombe. Le relevé refuse de publier un résultat anormal (comportement existant de `scripts/ingest.ts`, à garder).
7. **Vérifier avant d'annoncer.** Ce que dit `AGENTS.md` : tests, `tsc`, `eslint`, navigateur en 1440 et 390 px pour toute modification d'interface. Les seize erreurs de `tsc` sur `PageProps`, `RouteContext` et `LayoutProps` existaient au 17 novembre : ne pas en ajouter, les corriger si c'est simple.

## 5. Ce qui est déjà établi

Ne pas le refaire, mais le revérifier si une décision en dépend.

- **Branché** : TCGdex (catalogue français, prix Cardmarket et TCGplayer relayés, identifiants Cardmarket, TCGplayer et CardTrader par variante dans `variants_detailed[].thirdParty`) ; CardTrader (annonces par langue, état, quantité, mention gradée ; jeton du fondateur injecté par le réseau, voir `AGENTS.md`).
- **Fichier de prix Cardmarket** : `https://downloads.s3.cardmarket.com/productCatalog/priceGuide/price_guide_6.json`, quotidien, sans champ de langue ; TCGdex en relaie déjà tous les champs. Aucun historique gratuit n'existe : notre propre archive quotidienne (branche `data`, depuis le 15 novembre) est le seul.
- **Le prix français** n'existe que dans les offres par langue de Cardmarket (API fermée aux nouvelles demandes, demande envoyée le 16 novembre) et chez CardTrader.
- **Couverture française observée** : 970 cartes sur 20 226 ont trois annonces françaises ou plus chez CardTrader, presque toutes récentes. Sur les 190 cartes témoins, 16 ont au moins une annonce française et 7 en ont trois ou plus.
- **Écart français / anglais** : une seule étude chiffrée publiée (folio.fyi, 20 octobre 2026, 288 cartes récentes non gradées, médiane 1,40), qui compare un marché européen à un marché américain. Rien par époque. À mesurer nous-mêmes.
- **Pièges de données** : les annonces françaises contiennent plus de cartes en mauvais état que les anglaises (un fil de forum, une carte) ; un premier prix seul n'est pas fiable (même carte à 1 199 € et 3 000 € le même jour sur deux sites) ; Base Set 2, Gym Heroes, Gym Challenge, Legendary Collection et Skyridge ne sont jamais parues en France, leurs offres « françaises » sont des erreurs d'étiquetage.
- **Populations gradées** : CCC Grading et Collect Aura exposent la langue en champ distinct ; CGC et l'API de PSA aussi en partie. Toutes sous accord écrit.

## 6. Déroulé

Chaque étape est livrable seule, testée, poussée, et fusionnée dans `main` par une demande de fusion quand elle touche le site (le fondateur a autorisé la fusion le 16 novembre ; contrôles et vérification navigateur faits avant).

### Étape 0 : les accords

Retrouver et archiver chaque accord (règle 2). Mettre à jour `docs/demandes-sources.md` et les verdicts de `docs/sources/inventaire.md`. Établir la liste des sources réellement ouvertes, avec pour chacune ce qu'elle autorise. Tout le reste en dépend.

### Étape 1 : le format des observations et leur stockage

- Un format d'observation unique, normalisé : carte (identifiant TCGdex), source, date, pays, devise, langue de la carte, état ramené à une échelle commune, société de gradation et note, nature du prix, quantité. Les correspondances entre les états de chaque site sont écrites et testées.
- Un stockage gratuit, qui tienne des années de relevés quotidiens. Mesure la taille réelle avant de choisir. La branche `data` de GitHub a des limites (taille des fichiers et du dépôt) ; un projet Supabase gratuit est connecté à la session, mais il se met en pause après une semaine d'inactivité. Choisis, justifie dans `docs/modele-prix.md`, et garde une copie exportable.
- Conversion des devises : une source officielle gratuite (par exemple les taux de référence de la BCE), datée.

### Étape 2 : les collecteurs

Un collecteur par source ouverte, dans `scripts/`, testé, branché sur le relevé quotidien de GitHub Actions. Chacun respecte le débit permis, réessaie les erreurs passagères, et ne fait jamais échouer tout le relevé à lui seul. Commencer par ce qui apporte le plus de prix français et gradés observés.

### Étape 3 : les prix de référence des cartes témoins

Établir pour les cartes témoins un prix français de référence, daté et sourcé, à partir de plusieurs sources ouvertes. Si les sources ouvertes ne suffisent pas pour une carte, l'écrire plutôt que de deviner. Ce jeu sert à noter chaque source, puis le modèle.

### Étape 4 : le modèle

À concevoir sur ce que la base contient réellement. Cadre de départ, à améliorer :

1. **Estimation par carte** quand il y a des observations du pays, de la langue, de l'état et de la gradation demandés : combinaison pondérée par la fiabilité de chaque source (mesurée sur les cartes témoins), la fraîcheur et le nombre.
2. **Cartes sans observation directe** : apprendre les écarts entre marchés, langues, états, sociétés et notes à partir des cartes où l'on a les deux côtés, par extension, rareté, époque et tranche de prix, en partageant l'information entre groupes voisins quand un groupe est trop petit. Pour le gradé, la population par note est une variable candidate.
3. **Un intervalle**, pas seulement un point.
4. **Validation** : mettre de côté une partie des cartes dont le prix est connu, prédire, mesurer l'erreur médiane en pourcentage et la part des vraies valeurs dans l'intervalle annoncé. Proposer au fondateur des seuils d'acceptation chiffrés ; en dessous, la carte est affichée comme « estimation large » ou sans prix. Le gradé a ses propres mesures, par société et par note.
5. **Apprentissage continu** : réentraînement à chaque relevé, dans GitHub Actions, sur processeur (pas de carte graphique, budget zéro). Les résultats de validation sont archivés à chaque fois ; une régression empêche la publication du nouveau modèle.

Écrire la méthode, les résultats de validation et les limites dans `docs/modele-prix.md`.

### Étape 5 : le site

Afficher la fourchette, l'intervalle, la nature (observé ou estimé), les sources et le marché d'appui pour chaque carte, non gradée et gradée. Mettre à jour la page « Méthode » dans la même étape. Design : skills `impeccable`, `emil-design-eng` et `design-taste-frontend` du dépôt.

## 7. Façon de travailler

- **Skills `superpowers`** : `writing-plans` pour le plan de chaque étape, `executing-plans` ou `subagent-driven-development` pour l'exécuter, `test-driven-development` pour le code, `verification-before-completion` avant toute annonce. Code : skill `ponytail`.
- **Sous-agents** : autorisés par le fondateur pour ce chantier. Lance-les sur les modèles Sonnet ou Opus (paramètre `model`), jamais sur le modèle de la session principale s'il s'agit de Fable : le fondateur veut économiser son usage. Un sous-agent par source ou par famille de tâches indépendantes. Donne-leur des consignes écrites dans un fichier du dépôt et fais-leur écrire leur résultat au fur et à mesure.
- **Relire ce que rendent les sous-agents** : recouper à la source un échantillon de citations et de chiffres avant de t'en servir. Les 16 et 17 novembre, deux chiffres mal recopiés et trois verdicts trop favorables ont été trouvés de cette façon.
- **Limites d'usage** : le fondateur a une limite toutes les cinq heures, et le chantier la dépassera. Après chaque étape ou sous-étape, mets à jour `ROADMAP.md` (fait, mesuré, reste, attend le fondateur), commit et push. Une session qui s'arrête doit pouvoir être reprise par une autre en lisant le dépôt seul.
- **Branche** : celle que la session t'indique. Une demande de fusion par lot cohérent.
- **Langue** : interface et documentation en français.

## 8. Ce que tu demandes au fondateur, et seulement cela

Regroupe tes demandes en un seul message quand c'est possible. Il a peu de temps.

- Le transfert ou le texte des accords reçus, s'ils ne sont pas dans la boîte connectée.
- Les clés et comptes : clés développeur eBay (en cours), compte gratuit PSA pour leur API, et tout autre compte gratuit qu'un accord rend nécessaire.
- La soumission des formulaires réservés à un compte connecté.
- La validation des seuils d'acceptation du modèle.
- Tout ce qui coûte, se signe ou engage.

Les demandes d'accord nouvelles partent par lot : tu prépares la liste des destinataires (adresses publiées par eux, relues à la source) et le texte, le fondateur valide une fois, tu envoies depuis sa boîte Gmail et tu suis les réponses dans `docs/demandes-sources.md`. Ne lis dans la boîte que les fils liés à ces demandes.

## 9. Quand t'arrêter

- Quand le modèle est en ligne pour la France, validé selon les seuils acceptés, réétalonné chaque jour, et que la page « Méthode » le décrit : le chantier est fini. Écris l'état final dans `ROADMAP.md`.
- Avant cela, arrête-toi et écris au fondateur seulement si tout ce qui reste dépend de lui (section 8) ou si une règle de la section 4 empêche d'avancer. Dis exactement ce qui bloque et ce que tu as fait en attendant.

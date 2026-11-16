# Consignes de l'inventaire des sources

Document de travail du chantier « prix fiables » (`docs/chantier-prix-fiables.md`). Chaque famille de sources a son fichier dans ce dossier, rédigé selon ces consignes.

## Contexte

PokéTrack est une cote libre et gratuite des cartes Pokémon **en version française** (`https://poke-track-tau.vercel.app`). Le but du chantier : un prix fiable pour toutes les cartes françaises, non gradées puis gradées. Aujourd'hui le prix vient de Cardmarket (toutes langues mélangées) et, pour une minorité de cartes, des annonces françaises de CardTrader. Aucun prix gradé.

L'inventaire répond à une question par source : **peut-on en tirer, de façon permise et gratuite, un prix propre à la carte française, non gradée ou gradée ?**

## Règles, non négociables

1. **Zéro euro.** Aucune inscription payante, aucune API payante. Une source payante se note comme telle (verdict D, raison « payant »), avec son tarif si publié.
2. **Outils gratuits d'abord** : recherche web, lecture de page, `curl` (pour les `robots.txt`), navigateur Playwright préinstallé. Firecrawl consomme les crédits du fondateur : **dernier recours seulement, dix crédits au plus pour toute ta mission**, et tu comptes chaque appel payant. La consultation du catalogue Alexandria (`alexandria_library_search`, `firecrawl_find_tools`) est gratuite ; l'exécution d'un fournisseur (`alexandria_library_read`) est payante : ne pas l'exécuter, seulement noter qu'il existe et son prix.
3. **Respect des règles de chaque site.** Pour chaque source : lire les conditions d'utilisation et le `robots.txt`, et **citer la phrase exacte** qui autorise ou interdit la collecte ou la réutilisation, avec son adresse. Ne jamais passer outre une interdiction, une protection technique (Cloudflare, captcha, connexion obligatoire) ou une limite de débit. Si une page refuse la lecture, c'est une information : l'écrire, ne pas insister.
4. **Tu caractérises, tu ne collectes pas.** Quelques pages par site suffisent pour remplir la fiche. Aucune extraction en masse de prix.
5. **Rien d'inventé.** Ce que tu n'as pas pu lire toi-même s'écrit « non vérifié ». Un chiffre de couverture est « mesuré » (dire comment) ou « estimé » (le dire). Pas de citation reconstituée de mémoire.
6. **Pas de données personnelles** : aucun pseudonyme de vendeur, aucune annonce nominative recopiée.
7. Ne crée aucun compte, n'envoie aucun message, ne remplis aucun formulaire, ne touche pas à Gmail. Ne lance pas de sous-agent.
8. Ne modifie que **ton** fichier. Pas de `git commit`, pas de `git push`.

## Verdicts

- **A** : API ou fichier officiel, usage permis.
- **B** : lecture de pages permise par les conditions et le `robots.txt`.
- **C** : possible seulement avec un accord écrit (à demander).
- **D** : interdit, payant ou inaccessible.

Dans le doute entre B et C, choisir C.

## Cartes d'essai

Quand le verdict est A ou B, essayer la source sur ces trois cartes françaises et noter ce qu'elle renvoie réellement (prix, date de lecture, nature du prix) :

1. Dracaufeu, Set de Base, 4/102, édition française (vintage, holographique).
2. Mew ex, Écarlate et Violet 151, 205/165, version française (moderne, chère).
3. Noctali VMAX, Évolution Céleste, 215/203, version française (illustration alternative).

Si le site vend aussi des cartes gradées, chercher la carte 1 gradée (PSA, PCA, CGC, BGS, Collect Aura).

## Format du fichier

En français. D'abord un tableau récapitulatif (une ligne par source : nom, adresse, type, langue distinguée, gradé, nature du prix, verdict). Puis une fiche par source :

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | |
| Langue de la carte distinguée ? | Oui, non, par déduction du titre |
| Non gradé, gradé | Sociétés et notes présentes |
| Nature du prix | Demandé, ou vente réalisée |
| Profondeur | Nombre de cartes françaises couvertes, mesuré ou estimé (le dire) |
| Historique | Depuis quand |
| Accès | API, fichier, flux, pages |
| Conditions | Citation exacte et lien, plus le `robots.txt` |
| Contact | Adresse publiée par le site (page où elle figure), ou formulaire |
| Verdict | A, B, C ou D, avec la raison |
| Essai | Résultat réel sur les cartes d'essai, si le verdict le permet |

Terminer le fichier par : les sources croisées hors de ta famille (une ligne chacune), ce qui concerne les marchés anglais, américain ou japonais (à noter sans approfondir), et le décompte des crédits Firecrawl dépensés.

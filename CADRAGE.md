# Cadrage — brouillon à valider

Version 0, 16 novembre 2026. Rédigé par l'assistant à la demande du fondateur.

**Statut : rien de ce document n'est décidé.** C'est une proposition, avec les faits vérifiés qui la fondent et les questions qui restent. Aucune partie de l'architecture d'agents ne sera construite avant validation. Les corrections du site (chantier 1 de `ROADMAP.md`) avancent en parallèle : elles ne dépendent pas de ce cadrage.

Convention : ce qui a été **vérifié aujourd'hui** renvoie à sa source. Ce qui est une **estimation**, un **avis** ou un souvenir **non vérifié** est marqué comme tel.

## 1. Ce que dit ce document en une page

1. **Le modèle Supabase se transpose en partie seulement.** La méthode de lancement (positionnement, dates fixes, tout en public) se transpose bien. Le moteur économique ne se transpose pas : Supabase vend des ressources d'infrastructure, nous n'en avons pas à vendre.
2. **L'offre payante ne peut pas être l'accès aux cartes ni aux prix.** Trois textes lus aujourd'hui s'y opposent ou le rendent risqué (éditeurs, eBay, Cardmarket). Elle doit porter sur un service rendu à l'utilisateur sur ses propres données : compte, synchronisation, alertes, outils.
3. **L'adaptateur eBay tel qu'il est écrit contredit la licence de l'API eBay** (modélisation de prix, conservation des données). Il ne doit pas être activé en l'état. Un usage conforme existe : afficher les annonces en cours avec un lien vers eBay.
4. **Une vraie source de prix par langue existe : CardTrader.** Son API filtre les annonces par langue, et TCGdex fournit déjà l'identifiant CardTrader des cartes. Il faut un compte et un accord écrit pour l'usage « données de marché ».
5. **Des agents peuvent porter l'exécution, pas la responsabilité.** Tout ce qui engage (contrats, argent, identité de l'éditeur, réponses aux ayants droit) reste au fondateur. La liste est en section 5.
6. **Nom recommandé : Rectofolio**, sous réserve d'une recherche de marques complète. Cotoscope et Cardcote sont les deux autres candidats sans conflit trouvé.
7. **Ordre proposé :** fiabiliser, sécuriser les sources par écrit, choisir le nom et la structure, puis seulement comptes, offre payante et autres jeux.

## 2. Supabase : ce qu'ils ont fait

Sources lues le 16 novembre 2026 : le dépôt `supabase/supabase`, leur site (tarifs, page open source, auto-hébergement, programme SupaSquad), leur billet « How we launch at Supabase », le fil Hacker News du lancement, et trois entretiens du fondateur Paul Copplestone (First Round Review, Felicis, Cloudflare TV).

### Les faits

- **Le décollage tient à une phrase.** Début 2020 le site disait « real-time Postgres » et ne prenait pas. Le slogan devient « the open source Firebase alternative ». Le lendemain un utilisateur le poste sur Hacker News : 1 120 points, 366 commentaires (27 mai 2020). Le nombre de bases hébergées est multiplié par dix dans la nuit, d'après leur billet. Copplestone en tire que l'adéquation produit-marché est souvent une adéquation de positionnement.
- **Les commentaires ont dicté la suite.** La demande la plus fréquente du fil était l'authentification. Ils l'ont construite en trois mois et relancée.
- **Des dates fixes, un périmètre souple.** Après Y Combinator ils se fixent une échéance arbitraire tous les trois ou quatre mois, puis une « Launch Week » : une annonce par jour pendant une semaine. Ils disent observer un bond de trafic à chaque fois (environ 20 à 30 % selon les entretiens). Ils livrent en continu et ne retiennent rien pour l'occasion : la semaine sert à raconter ce qui est déjà sorti.
- **Celui qui construit écrit l'annonce.** Les billets sont techniques et choisissent leur canal selon le sujet.
- **Tout est ouvert sauf la plateforme.** Licences Apache 2.0, MIT ou PostgreSQL. Seul le code de la plateforme hébergée (facturation, gestion multi-projets) est fermé. `docker compose up` donne le produit complet, sans télémétrie. Le dépôt principal affiche 115 000 étoiles.
- **Ils assemblent de l'existant.** Postgres, PostgREST, GoTrue, Realtime : des projets ouverts mûrs qu'ils intègrent, financent (plus de 250 000 $ de parrainages annoncés) et dont ils embauchent les mainteneurs.
- **La communauté a des rôles et des contreparties.** SupaSquad : contributeur, créateur de contenu, hôte de rencontres, conférencier. Badges, accès anticipé, et un chemin du bénévolat vers la rémunération.
- **Ce qu'ils vendent.** Gratuit : 2 projets, 500 Mo de base, 50 000 utilisateurs actifs, mise en pause après une semaine d'inactivité. Pro à partir de 25 $ par mois : plus de ressources, sauvegardes, pas de mise en pause, puis facturation à l'usage. Team à 599 $ : conformité, rôles, support. Chaque limite du gratuit correspond à un coût réel d'infrastructure.

### Ce qui se transpose

| Leçon | Chez nous |
| --- | --- |
| Se définir contre une référence connue de la cible | Trouver notre phrase. Piste : « la cote ouverte des cartes à collectionner », face aux cotes dont la méthode est invisible. À tester, pas à décréter. |
| Laisser les premiers utilisateurs dicter la suite | Un canal public unique pour les demandes (Discussions GitHub ou Discord), et la feuille de route tenue à partir de là. |
| Dates fixes, périmètre souple | Un rendez-vous par trimestre, annoncé à l'avance. Compatible avec un fondateur peu disponible : la date ne dépend pas de lui. |
| Tout livrer en continu, raconter par lots | Notes de version mensuelles, publiques. |
| Ouvrir vraiment | Code, méthode de calcul et historique des prix publics. C'est déjà le cas. |
| Donner des rôles à la communauté | Ici la contribution utile n'est pas le code mais la donnée : signaler un prix faux, fournir une illustration manquante, corriger une correspondance de carte, vérifier des cartes témoins. |

### Ce qui ne se transpose pas

1. **L'économie.** Supabase vend du calcul et du stockage. Notre coût par utilisateur est proche de zéro et nos données sont publiques. Une limite gratuite fondée sur des ressources serait artificielle.
2. **Le public.** Leurs utilisateurs sont des développeurs, qui vivent sur GitHub et Hacker News et pour qui « open source » est un argument d'achat. Les collectionneurs sont sur YouTube, TikTok, Discord, les groupes Facebook, les boutiques et les salons. Pour eux l'ouverture est une preuve de confiance, pas un canal d'acquisition. Les étoiles GitHub ne nous amèneront pas d'utilisateurs.
3. **Le socle.** Postgres appartient à tout le monde. Nos briques (catalogue TCGdex, prix des places de marché, illustrations des éditeurs) appartiennent à d'autres, qui peuvent changer leurs conditions ou couper l'accès.
4. **Les moyens.** Y Combinator, des levées de fonds, douze personnes à plein temps dès la première année. Nous aurons des agents et quelques heures par semaine.
5. **L'auto-hébergement.** Chez eux il rassure les entreprises. Chez nous presque personne n'hébergera sa propre cote. Il garde une valeur de garantie (« le projet peut me survivre »), pas de valeur commerciale.

**Avis.** La comparaison la plus juste n'est pas « le Supabase des cartes » mais un service ouvert dont le public n'est pas technique : le code ouvert sert de garantie, et le revenu vient d'un service hébergé pratique. Je propose de garder de Supabase la méthode de lancement et la discipline d'ouverture, pas la grille tarifaire.

## 3. Ce que l'offre payante peut vendre

### Les contraintes vérifiées

- **Wizards of the Coast (Magic)** publie une politique pour les contenus de fans. Elle autorise publicité, parrainage et dons, et interdit de conditionner l'accès à un paiement, un abonnement ou une inscription : « You can't require payments, surveys, downloads, subscriptions, or email registration to access your Fan Content ». Dès que Magic entre dans le projet, le catalogue et ses images doivent rester en accès libre.
- **The Pokémon Company** ne donne aucune autorisation : « we ask that you not use it in or associate it with your project in any way » (page d'assistance officielle). Ses règles pour la presse interdisent de faire payer l'accès à ses contenus. Les sites de cartes existent par tolérance.
- **eBay** interdit d'utiliser ses données pour « suggest or model prices » et de les revendre (détail en section 4).
- **Cardmarket** : ses conditions prévoient un accord écrit pour présenter cartes et prix via l'API (détail en section 4).

Conséquence : **faire payer l'accès aux cartes, aux images ou aux prix est la formule la plus exposée.** Ce qui se vend sans toucher à cela, c'est notre propre service.

### Proposition

| Niveau | Contenu | Remarque |
| --- | --- | --- |
| **Libre, sans compte** | Catalogue, prix juste, méthode, historique, collection dans le navigateur, export | Reste gratuit pour toujours. C'est le produit d'appel et la condition de la tolérance des éditeurs. |
| **Compte gratuit** | Sauvegarde et synchronisation de la collection entre appareils | Fait entrer les comptes, donc le RGPD (section 4). |
| **Abonnement particulier** | Alertes de prix, suivi de portefeuille (plus-value, évolution), attestation de valeur en PDF pour l'assurance, plusieurs collections, classeur public partageable, liste de souhaits avec seuils | Tout porte sur les données de l'utilisateur. |
| **Reconnaissance par photo** | Ajouter une carte en la photographiant | A un coût réel par usage : se prête naturellement à une limite gratuite. |
| **Offre boutiques et vendeurs** | Estimation de lots, import et export en masse, étiquettes de prix | Public plus petit, panier plus élevé. Suppose des sources de prix autorisées pour un usage professionnel. |
| **Revenus sans abonnement** | Liens d'affiliation vers les places de marché, parrainage, dons | Compatible avec les politiques lues. L'affiliation eBay est l'usage que leur programme encourage. |

### Ce que je ne sais pas

- **Combien de personnes paieraient, et combien.** Je n'ai aucun chiffre. Tout prix avancé aujourd'hui serait une hypothèse à tester.
- **La concurrence est réelle.** Vu aujourd'hui : TCG Sense, un éditeur français, annonce six jeux, des valeurs relevées chaque jour par langue et par finition, un catalogue gratuit et des fonctions avancées payantes, avec reconnaissance par caméra. C'est notre promesse, déjà en ligne. D'autres applications internationales occupent le terrain (non vérifié aujourd'hui). Notre différence doit être nette : méthode publiée, données ouvertes, code ouvert, exactitude sur la carte française.
- **Vercel.** Le compte est en formule Hobby. De mémoire, cette formule est réservée à un usage non commercial ; je n'ai pas pu relire la clause aujourd'hui. À vérifier avant le premier euro encaissé.

## 4. Risques juridiques

Je ne suis pas avocat et ceci n'est pas un avis juridique. Ce sont des lectures de textes publics, à faire confirmer par un conseil avant toute offre payante.

| Risque | Ce que dit la source | Niveau (avis) | Parade |
| --- | --- | --- | --- |
| **Nom et marques des éditeurs** | TPCi interdit ses marques dans un nom de produit, d'application ou de domaine. En 2014 elle a poursuivi Pokellector : logo imitant le sien, et images de cartes marquées du logo du site. | Élevé avec le nom actuel | Nouveau nom sans « Poké ». Aucun logo ni typographie imitant un éditeur. Mention « non officiel » partout. Jamais de produit dérivé. |
| **Illustrations des cartes** | Protégées par le droit d'auteur. Aucune autorisation de TPCi. Le procès PokéBeach s'est conclu par une interdiction visant aussi les scans de cartes. | Moyen, plus élevé si l'accès devient payant | Images en accès libre uniquement. Aucun filigrane. Procédure de retrait publiée et traitée vite. Registre des politiques par éditeur avant chaque nouveau jeu. |
| **eBay** | Licence de l'API, section 9 : interdit d'utiliser le contenu eBay pour « suggest or model prices », pour concurrencer eBay, pour le stocker ou le commercialiser hors des usages permis, pour entraîner des algorithmes. Les annonces affichées ne doivent pas avoir plus de 6 heures. Dériver un prix moyen de vente par catégorie exige un accord écrit. | Élevé pour l'adaptateur actuel | Ne pas activer l'adaptateur tel quel. Usage conforme : annonces en cours avec lien vers eBay, rafraîchies à la demande, hors du prix juste et hors de l'historique. Ou demander un accord écrit. |
| **Cardmarket** | Conditions du 20 février 2026, article 9 : « The presentation of the trading cards and their respective prices require our prior written agreement », dans la clause sur l'API. L'API est fermée aux nouveaux inscrits. En sens inverse, leur billet de 2024 sur les fichiers de prix téléchargeables invite à s'en servir « for your own website or app ». Nous passons par TCGdex, qui relaie ces fichiers. | Moyen : textes contradictoires, usage courant | Écrire à Cardmarket pour obtenir une confirmation, surtout avant toute offre payante. Citer la source sur le site. |
| **CardTrader** | Conditions générales : interdiction d'aspirer le site ; l'API est encouragée ; « We can provide market APIs upon request… You need to write to us ». Le point d'accès aux annonces par langue figure dans la documentation publique. | Faible si on demande | Leur écrire avant de publier des prix issus de leur API. |
| **TCGdex** | Projet ouvert qui fournit catalogue, images et prix relayés. Licence et conditions non relues aujourd'hui. | À vérifier | Lire leurs conditions, les citer, contribuer en retour (images manquantes, corrections). |
| **Données personnelles** | Aucune aujourd'hui : la collection reste dans le navigateur. Dès qu'il y a des comptes, le RGPD s'applique. Le public compte des mineurs. | Nul aujourd'hui, réel avec les comptes | Données minimales, hébergement dans l'Union, politique de confidentialité, suppression sur demande, règle claire pour les moins de 15 ans. |
| **Mentions légales** | Un site français doit identifier son éditeur, ou son hébergeur pour un particulier non professionnel. | Faible, mais à faire | Dépend de la structure choisie (section 5). |
| **Conseil en investissement** | Le site parle d'« investisseurs », de plus-value, de rentabilité de la gradation. | Faible | Garder l'avertissement, ne jamais recommander d'acheter ou de vendre, présenter les estimations comme telles. |
| **Licence des données publiées** | Notre historique est dérivé de données tierces. Le publier sous licence ouverte suppose d'en avoir le droit. | À trancher | Attendre les réponses écrites des sources avant d'apposer une licence sur les données. |

Le monde visuel actuel évoque la Game Boy sans en reprendre le nom ni le logo dans l'interface. `DESIGN.md` la nomme. C'est un risque faible, à garder en tête pour le choix des mondes visuels des autres jeux.

## 5. Ce qui passe toujours par le fondateur

Un agent exécute. Il n'a ni identité juridique, ni compte bancaire, ni signature. L'éditeur du site, au sens de la loi, c'est le fondateur ou sa société : les erreurs d'un agent sont les siennes.

**Toujours le fondateur, sans exception :**

- **Structure juridique.** Créer une entité ou loger le projet dans la société existante. Tant que ce n'est pas tranché, aucun revenu.
- **Tout ce qui se signe.** Conditions d'un programme développeur (eBay, CardTrader), contrat avec un prestataire de paiement et sa vérification d'identité, dépôt de marque, achat de domaine.
- **Tout ce qui coûte ou rapporte.** Dépenses, tarifs, remboursements, TVA et déclarations.
- **Les secrets.** Création des clés et des jetons. Les agents les utilisent sans jamais les voir.
- **Les ayants droit et les autorités.** Toute réponse à un éditeur, une place de marché, un avocat, la CNIL. L'agent prépare, le fondateur envoie.
- **Les demandes écrites aux sources de prix.** Rédigées par l'agent, envoyées en son nom par le fondateur.
- **L'orientation.** Nom, positionnement, nouveaux jeux, ce qui devient payant.
- **Les incidents graves.** Fuite de données, site compromis, erreur de prix massive : l'agent coupe et alerte, le fondateur décide de la communication.
- **L'irréversible.** Suppression de données d'utilisateurs, réécriture de l'historique des prix, changement de licence.

**Délégable sous règles, à valider (question 4 de la section 11) :**

- Fusionner dans `main` quand les contrôles passent et que la vérification en navigateur est faite.
- Répondre aux tickets et discussions de la communauté, avec une mention « réponse assistée par IA ».
- Publier les notes de version sur le site et le dépôt.
- Publier sur un réseau social : d'abord validation de chaque message, puis éventuellement accord permanent par canal.

**Ce qu'aucune organisation ne remplace.** Une communauté se construit avec des personnes. Des agents peuvent trier, répondre et rédiger ; ils ne vont ni sur un salon, ni dans une boutique, ni devant une caméra. Si personne n'incarne le projet, la partie « communauté » du modèle Supabase restera modeste. C'est le point faible le plus sérieux du plan.

## 6. Architecture d'agents proposée

Rien n'est construit. À valider, amender ou refuser.

### Principes

1. **Le code avant l'agent.** Ce qui se répète à l'identique est un script, pas un agent. Le relevé des prix est un script et le reste. Un agent intervient quand il faut juger.
2. **Peu de rôles, chacun propriétaire d'un résultat.** Huit rôles qui se marchent dessus valent moins que quatre qui rendent des comptes.
3. **La mémoire est dans le dépôt.** Fichiers versionnés et tickets. Aucune mémoire cachée : ce qu'un agent sait, le fondateur peut le lire.
4. **Le moins de pouvoir possible.** Chaque routine a sa liste d'outils. Lecture seule par défaut.
5. **Le modèle le moins cher qui fait le travail**, et on mesure avant d'élargir.
6. **Tout contenu extérieur est suspect.** Un ticket, un commentaire ou une page web peut contenir des instructions piégées. Un agent ne les suit jamais ; il les rapporte.

### Les rôles

| Rôle | Résultat dont il répond | Cadence | Droits | Modèle proposé |
| --- | --- | --- | --- | --- |
| **Veilleur** | Le relevé a tourné, le site répond, aucun chiffre aberrant | Quotidien, planifié | Lecture, relance du relevé, ouverture d'un ticket, notification | `claude-haiku-5-5` |
| **Mainteneur** | Le premier chantier de la feuille de route avance, testé et vérifié en navigateur | Une à deux routines par semaine | Branches `claude/*`, demandes de fusion | `claude-sonnet-5-5`, `claude-opus-5-5` pour les chantiers difficiles |
| **Gardien des données** | Les prix sont justes : cartes témoins, correspondances, illustrations | Hebdomadaire | Lecture des relevés, corrections par demande de fusion | `claude-sonnet-5-5` |
| **Relecteur** | Aucun changement n'entre sans relecture indépendante, sécurité comprise | À chaque demande de fusion | Lecture, commentaires | `claude-opus-5-5`, contexte neuf |
| **Communauté** | Chaque ticket et chaque discussion a une réponse ou une étiquette | Deux fois par semaine | Étiquettes, réponses signées comme assistées | `claude-haiku-5-5` pour trier, `claude-sonnet-5-5` pour répondre |
| **Rédacteur** | Notes de version mensuelles, annonces des rendez-vous | Mensuel | Brouillons seulement | `claude-sonnet-5-5` |
| **Veille des sources** | Toute modification des conditions d'une source ou d'un éditeur est signalée | Mensuel | Lecture web, ticket | `claude-haiku-5-5` |
| **Chef d'orchestre** | Une revue hebdomadaire d'une page pour le fondateur : fait, bloqué, à décider | Hebdomadaire | Lecture partout, écriture de la feuille de route | `claude-fable-5-2` ou `claude-opus-5-5` |

La veille des sources ne donne pas d'avis juridique. Elle compare des textes et alerte.

Tarifs publics de l'API au 3 novembre 2026, par million de jetons en entrée et en sortie : Haiku 5.5 0,10 $ et 0,50 $ ; Sonnet 5.5 2 $ et 10 $ ; Opus 5.5 4 $ et 20 $ ; Fable 5.2 8 $ et 40 $. Entre le veilleur et le chef d'orchestre l'écart est de 1 à 80. Les routines lancées depuis Claude Code consomment l'abonnement et non ces tarifs : ils servent ici d'échelle relative. **Je ne sais pas chiffrer le coût mensuel réel avant d'avoir mesuré deux semaines de fonctionnement.**

### Mémoire

| Quoi | Où |
| --- | --- |
| La ligne, les règles, ce qui est interdit | `CADRAGE.md`, une fois validé |
| L'état, les défauts connus, l'ordre des chantiers | `ROADMAP.md` |
| Les décisions prises et leur raison | `DECISIONS.md`, à créer : une entrée datée par décision |
| Le mode d'emploi de chaque rôle | `docs/agents/<rôle>.md`, à créer |
| Le travail à faire | Tickets GitHub, avec étiquettes par rôle |
| Les faits | Branche `data`, tests, journaux des relevés |

### Skills

- **Existants, conservés :** `impeccable`, `emil-design-eng`, `design-taste-frontend` pour le design ; `ponytail` pour le code.
- **À écrire, propres au projet :** contrôle du relevé, vérification en navigateur (build de production, 1440 px et 390 px, console sans erreur), liste de contrôle de publication, comparaison des conditions des sources.

### Connecteurs

| Connecteur | État | Usage |
| --- | --- | --- |
| GitHub | En place | Code, tickets, relevés |
| Vercel | Connecté au bon compte, sans accès à l'espace « clip-studio » | Déploiements, journaux, erreurs en production |
| Exa | En place | Recherche et veille |
| Pappers | En place | Vérifications d'entreprises françaises |
| Supabase | En place, inutilisé | Seulement si l'on crée des comptes : base hébergée dans l'Union |
| Paiement | À ne pas brancher pour l'instant | Lecture seule le jour venu |
| Messagerie | Absent | Les notifications passent par GitHub et les notifications de Claude |

### Garde-fous

- **Branche `main` protégée** : pas de poussée directe, contrôles obligatoires (tests, types, lint, build).
- **Les agents ne touchent jamais** aux secrets, à la facturation, aux noms de domaine, aux pages légales, aux réglages de sécurité du dépôt.
- **Fusion automatique limitée** à des catégories définies à l'avance : documentation, corrections de données, correctifs de dépendances.
- **Publication extérieure** : toujours un brouillon d'abord.
- **Un plafond** de routines par semaine, et un interrupteur général : désactiver les tâches planifiées arrête tout.
- **Une trace** : chaque action d'agent laisse une demande de fusion, un ticket ou une ligne dans `DECISIONS.md`.
- **Le relevé refuse de publier** un jour manifestement faux.

### Le rythme côté fondateur

Trois rendez-vous, une quinzaine de minutes chacun (estimation) :

1. **Lundi : la revue.** Lire la page du chef d'orchestre, trancher ce qui est marqué « à décider ».
2. **En semaine : le chantier.** Lancer la routine du mainteneur ; relire et fusionner, ou laisser fusionner si la règle le permet.
3. **Une fois par mois : le bilan.** Notes de version à approuver, coûts, décisions de direction.

Le veilleur tourne seul chaque jour et ne dérange qu'en cas de problème.

### Ce qui peut mal tourner

- **Les agents produisent plus que le fondateur ne peut relire.** Parade : plafond de routines, petites demandes de fusion, revue hebdomadaire courte.
- **Une erreur de prix passe inaperçue.** Parade : cartes témoins vérifiées à la main, seuils d'alerte, refus de publier un relevé aberrant.
- **Le projet dérive de la ligne.** Parade : ce document, et un journal des décisions que les agents ne peuvent pas contourner.
- **Le coût grimpe sans bruit.** Parade : mesure dès la première semaine, modèles modestes par défaut.

## 7. Autres jeux de cartes

**Ce qui change techniquement.** TCGdex ne couvre que Pokémon. Il faut une couche « jeu » : un adaptateur par jeu qui fournit catalogue, illustrations et identifiants de prix. CardTrader couvre de nombreux jeux avec une seule API (liste vue dans ses conditions : Magic, Pokémon, Yu-Gi-Oh!, One Piece, Lorcana, Dragon Ball Super, Digimon, Flesh and Blood, Star Wars Unlimited, Riftbound…), et Cardmarket publie un fichier de prix par jeu. La brique prix est donc réutilisable.

**Ordre suggéré, à confirmer par une étude des sources de chaque jeu :** Magic d'abord (politique écrite pour les fans, données réputées abondantes), puis One Piece et Lorcana (marchés récents et dynamiques), Yu-Gi-Oh! ensuite. Les politiques de Konami, Bandai et Ravensburger n'ont pas été lues aujourd'hui.

**Un monde visuel par jeu : avis.** À prendre, en la bornant.

- **Pour.** C'est une vraie différence face à des concurrents qui ont tous la même interface neutre. « Dot Matrix » montre que cela marche.
- **Contre.** Chaque monde se conçoit et s'entretient. Mal borné, on obtient autant de sites que de jeux. Et un monde ne doit jamais imiter l'identité visuelle d'un éditeur.
- **Proposition.** Une marque et une structure communes (mise en page, composants, comportements, hiérarchie), et par jeu une **matière** : palette, police d'affichage, texture, deux ou trois moments animés. Techniquement un monde est un fichier de jetons de style et quelques ressources, jamais de nouveaux composants. Le monde s'inspire de la culture du jeu (l'époque, l'objet, le rituel), pas de la charte de l'éditeur.
- **Quand.** Le deuxième monde se conçoit quand le deuxième jeu sort, pas avant.

**Fonctions à proposer, par ordre d'intérêt (avis) :**

1. Alertes de prix et liste de souhaits.
2. Comparateur d'échange : deux lots de cartes, l'échange est-il équitable ?
3. Classeur public partageable par lien.
4. Estimation d'un lot avant achat ou vente.
5. Produits scellés (boosters, coffrets), suivis comme les cartes.
6. Attestation de valeur pour l'assurance.
7. Ajout par photo.
8. Page publique de qualité des données : cartes témoins, écarts mesurés, jours manquants.

## 8. Le nom

Vérifications faites le 16 novembre 2026 : enregistrement des domaines (RDAP et DNS), comptes GitHub, marques de l'Union européenne et de France dans TMview (recherche « contient »).

| Nom | Sens | Domaines | GitHub | Marques UE et France |
| --- | --- | --- | --- | --- |
| **Rectofolio** | Le recto d'une carte, le folio d'un classeur ou d'un portefeuille | `.com` `.fr` `.app` `.cards` `.gg` : aucun enregistrement trouvé | Libre | Aucun résultat |
| **Cotoscope** | La cote, et l'instrument qui l'observe | `.com` `.fr` `.app` `.cards` `.gg` `.io` : aucun enregistrement trouvé | Libre | Aucun résultat |
| **Cardcote** | Card et cote | `.com` `.app` `.cards` `.gg` : aucun enregistrement trouvé | Libre | Aucun résultat |
| Cotefolio | La cote et le classeur | `.com` `.fr` `.app` `.cards` `.gg` : aucun enregistrement trouvé | Non vérifié | Aucun résultat |
| Neufpoches | La page de classeur à neuf pochettes | `.com` `.fr` : aucun enregistrement trouvé | Non vérifié | Aucun résultat |

Écartés après vérification :

- **Pioche** : marque de l'Union « PIOCHE » enregistrée en classes 9, 28, 35 et 41.
- **Tirage** : `.com` pris, compte GitHub pris, et le mot renvoie au tarot en ligne (tirage.net).
- **Aloi, Étalon** : nombreuses marques existantes.
- **Belcarte** : marque française « MA BELCARTE » en classes 9, 16 et 35.
- **Foilio, Ninepocket, Mercuriale, Classeur, Cartophile** : domaines déjà pris, plusieurs depuis quelques semaines.

**Recommandation : Rectofolio.** Il se prononce pareil en français et en anglais, ne nomme aucun jeu, ne contient la marque de personne, décrit l'objet (la carte, le classeur) et se raccourcit bien (« Recto »). Cotoscope est le plus libre de tous mais sonne comme un instrument médical. Cardcote est clair pour un Français et opaque ailleurs.

**Limites de la vérification.** Aucun domaine n'est réservé ; je n'ai pas pu lire les prix ni savoir si un domaine est classé « premium ». Les marques hors Union européenne et France (États-Unis, Royaume-Uni, Japon) ne sont pas vérifiées. La recherche porte sur le nom exact, pas sur les noms ressemblants. Un dépôt de marque demande une recherche d'antériorité par l'INPI ou un conseil.

## 9. Règles proposées

### Design

- `DESIGN.md` fait foi. Un nouveau monde visuel y ajoute sa section avant d'être codé.
- Skills `impeccable`, `emil-design-eng` et `design-taste-frontend` pour tout travail d'interface.
- Toute modification d'interface se vérifie dans un navigateur, sur le build de production, à 1440 px et 390 px, console sans erreur.
- Contraste lisible, navigation au clavier, `prefers-reduced-motion` respecté.
- Un chiffre estimé est toujours présenté comme tel. Un prix douteux est signalé, jamais masqué.

### Développement

- Skill `ponytail` : la plus petite modification qui règle tout le problème. Pas de dépendance pour quelques lignes.
- Le moteur de prix reste en fonctions pures et testées. Tout changement de méthode met à jour la page « Méthode » dans la même demande de fusion.
- `npm test`, `npx tsc --noEmit` et `npx eslint .` sans erreur avant toute fusion.
- Jamais de poussée directe sur `main`. Demandes de fusion petites, une intention chacune.
- Un adaptateur de source n'est activé qu'après un premier passage contrôlé avec de vraies clés et la lecture de ses conditions d'utilisation.
- Interface et documentation en français.

### Sécurité

- Secrets uniquement dans les coffres de GitHub et de Vercel. Jamais dans le code, les journaux ou une conversation.
- Permissions minimales pour chaque flux GitHub Actions et chaque jeton.
- Dépendances surveillées, peu nombreuses, à versions figées.
- Aucune donnée personnelle tant que le cadre RGPD n'est pas posé. Ensuite : le minimum, dans l'Union, supprimable.
- Un fichier `SECURITY.md` et une adresse de contact pour signaler une faille.
- Les routes d'API valident leurs entrées et sont limitées en débit.
- Revue de sécurité à chaque demande de fusion qui touche une route, un flux ou une dépendance.

## 10. Ordre proposé

| Étape | Contenu | Dépend du fondateur |
| --- | --- | --- |
| **0. Fiabiliser** (en cours) | Prix sans le marché américain, relevé contrôlé et surveillé, illustrations, cartes témoins | Jeton CardTrader, accès Vercel |
| **1. Poser le cadre** | Valider ce document, choisir le nom, écrire aux sources de prix, trancher la structure | Oui, entièrement |
| **2. Monter l'organisation** | Protection de `main`, rôles, routines, journal des décisions, deux semaines de mesure | Validation |
| **3. Renommer et ouvrir** | Nouveau nom, domaine, dépôt, canal de communauté, premier rendez-vous public | Achat du domaine, dépôt de marque |
| **4. Comptes** | Compte gratuit et synchronisation, cadre RGPD | Structure juridique |
| **5. Deuxième jeu** | Couche « jeu », premier adaptateur, deuxième monde visuel | Choix du jeu |
| **6. Offre payante** | Après les réponses écrites des sources et l'avis d'un conseil | Paiements, tarifs |

L'offre payante vient en dernier à dessein : c'est elle qui transforme une tolérance en risque.

## 11. Questions au fondateur

Regroupées. La recommandation de l'assistant est donnée pour chacune.

**Structure et argent**

1. Le projet est-il logé dans votre société actuelle, dans une nouvelle entité, ou reste-t-il personnel et sans revenu pour l'instant ? *Recommandation : sans revenu pour l'instant, décision à l'étape 4.*
2. Quel budget mensuel acceptez-vous (domaine, hébergement, dépôt de marque, usage des agents) ? *Sans ce plafond je ne peux pas dimensionner les routines.*
3. Quel est l'objectif : un projet qui se finance, un revenu d'appoint, ou une entreprise à part entière ? *La réponse change l'ordre des étapes 4 à 6.*

**Délégation**

4. M'autorisez-vous à fusionner dans `main` sans vous quand les contrôles passent et que la vérification en navigateur est faite ? *Recommandation : oui pour les corrections et la documentation, non pour tout ce qui change la méthode de calcul, les pages légales ou les flux.*
5. Qui parle au nom du projet en public, et acceptez-vous que les réponses à la communauté soient signées comme assistées par IA ? *Recommandation : oui, et le dire clairement.*
6. Acceptez-vous une tâche planifiée quotidienne qui surveille le relevé et vous notifie ? *Elle consomme un peu de votre abonnement chaque jour.*

**Sources et droit**

7. Acceptez-vous d'écrire, sur mes brouillons, à CardTrader et à Cardmarket pour obtenir un accord écrit ? *Recommandation : oui, CardTrader d'abord.*
8. eBay : on se limite aux annonces en cours avec lien, on demande un accord écrit, ou on abandonne ? *Recommandation : annonces en cours avec lien, rien dans le prix juste.*
9. Avez-vous un avocat ou un conseil en propriété intellectuelle pour valider le nom et l'offre payante le moment venu ?

**Produit**

10. Le nom : Rectofolio, un autre de la liste, ou je continue à chercher ?
11. Quel deuxième jeu, et jouez-vous ou collectionnez-vous vous-même l'un d'eux ? *Recommandation : Magic, sous réserve de l'étude des sources.*
12. Un monde visuel par jeu, borné comme en section 7 : d'accord ?
13. Le projet reste-t-il centré sur la France et le français, ou vise-t-il l'Europe dès le renommage ?

## Sources

Toutes consultées le 16 novembre 2026.

- Supabase : [dépôt](https://github.com/supabase/supabase), [tarifs](https://supabase.com/pricing), [open source](https://supabase.com/open-source), [auto-hébergement](https://supabase.com/docs/guides/self-hosting), [How we launch at Supabase](https://supabase.com/blog/supabase-how-we-launch), [SupaSquad](https://supabase.com/open-source/contributing/supasquad), [fil Hacker News du 27 mai 2020](https://news.ycombinator.com/item?id=23319901), [First Round Review](https://review.firstround.com/how-supabase-became-the-essential-infrastructure-for-the-ai-era-paul-copplestone-co-founder-ceo/), [Felicis](https://www.felicis.com/blog/paul-copplestone-supabase), [Cloudflare TV](https://cloudflare.tv/shows/founder-spotlight/founder-spotlight-paul-copplestone/2aX69Dgb)
- eBay : [API License Agreement](https://developer.ebay.com/join/api-license-agreement)
- Cardmarket : [conditions générales](https://www.cardmarket.com/en/Policies/GeneralTermsAndConditions), [page d'aide sur l'API](https://help.cardmarket.com/en/cardmarket-api), [The State of Cardmarket 2024](https://insight.cardmarket.com/en/Articles/the-state-of-cardmarket-2024)
- CardTrader : [documentation de l'API](https://www.cardtrader.com/docs/api/full/reference), [conditions générales](https://static.cardtrader.com/en/pages/terms-of-service)
- TCGdex : [prix de marché](https://tcgdex.dev/markets-prices)
- Éditeurs : [Wizards of the Coast, Fan Content Policy](https://company.wizards.com/en/legal/fancontentpolicy), [Pokémon, « Can I use Pokémon images or materials? »](https://support.pokemon.com/hc/en-us/articles/360000634094-Can-I-use-Pok%C3%A9mon-images-or-materials), [Pokémon, Media Usage Guidelines](https://pokemon.gamespress.com/Media-Usage-Guidelines), [Pokémon, conditions d'utilisation](https://www.pokemon.com/us/legal/terms-of-use), [affaire Pokellector](https://www.cardboardconnection.com/law-cards-pokemon-versus-pokellector), [jugement PokéBeach](https://storage.courtlistener.com/recap/gov.uscourts.wawd.215815/gov.uscourts.wawd.215815.16.0.pdf)
- Concurrence : [TCG Sense](https://tcgsense.com/en/about)
- Marques : [TMview](https://www.tmdn.org/tmview/)

# Inventaire des sources, famille 07 : les communautés francophones

Lu et rédigé le 16 novembre 2026, selon `docs/sources/_consignes.md`. Aucun compte créé, aucun message envoyé, aucun pseudonyme ni message recopié nominativement. Crédits Firecrawl dépensés : 0.

Constat d'ensemble, à lire avant le détail : **aucune de ces communautés n'est une source de relevé permise.** Aucune n'a de verdict A. Elles servent à comprendre le marché, et deux ou trois publications chiffrées éclairent l'écart français/anglais (partie 2). Les cartes d'essai n'ont été tentées nulle part : aucun verdict A ou B ne porte sur un prix.

## Partie 1 : les communautés

### Tableau récapitulatif

| Source | Adresse | Type | Langue distinguée | Gradé | Nature du prix | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| Pokécardex (site, forum, ventes entre membres) | pokecardex.com | Base de cartes, forum, application | Oui (le site distingue les cartes françaises) | Non vérifié | Cote calculée (origine non vérifiée) ; annonces des membres | D |
| Pokébip (forums) | pokebip.com | Forum, actualités | Sans objet | Non | Aucun prix structuré | D (forum exclu par robots.txt) |
| Pokémon Trash (actualités, « Club » avec section cartes) | pokemontrash.com | Média, forum | Par déduction du titre d'une annonce | Non | Annonces (prix demandés) | C |
| Poképédia | pokepedia.fr | Wiki | Sans objet | Non | Aucun prix | B (contenu CC, hors prix) |
| Pokékalos | pokekalos.fr | Média de fans, forum | Sans objet | Non | Aucun prix de carte | C |
| Pokémon Millennium | pokemon-millennium.net | Média | Inconnu | Inconnu | Inconnu | D (injoignable) |
| Margxt | introuvable | - | - | - | - | Non vérifié (aucune trace trouvée) |
| Reddit (r/pokemonfrance, r/PokemonTCG, r/pkmntcgcollections, r/pokemoncardcollectors) | reddit.com | Forum, API | Par déduction | Oui, discuté | Prix cités par les membres | C |
| Discord (serveurs francophones) | discord.com | Messagerie | Par déduction | Oui, discuté | Prix cités | D |
| Facebook (groupes d'achat-vente) | facebook.com | Réseau social | Par déduction | Oui | Annonces | D |
| Dealabs (groupes et discussions Pokémon) | dealabs.com | Forum de bons plans | Non | Non | Prix de produits scellés en magasin | D (page protégée) |
| jeuxvideo.com (forums) | jeuxvideo.com | Forum | Par déduction | Non | Opinions | D (page protégée) |
| YouTube (chaînes françaises) | youtube.com | Vidéo | Par déduction | Oui | Prix cités à l'oral | D |
| Twitch (chaînes françaises) | twitch.tv | Direct | Par déduction | Oui | Prix cités à l'oral | D |
| Journal du Geek (articles de cote) | journaldugeek.com | Média | Oui, c'est le sujet | Oui, mentionné | Ventes eBay conclues, rapportées | C |
| Cards N Packs (blog) | cardsnpacks.com | Blog d'un revendeur | Oui | Oui (PSA) | Ventes eBay du vendeur | C |
| Poke-Geek (blog) | poke-geek.fr | Blog d'un revendeur | Non | Oui | Aucun prix français | C |
| Pokévendre Pro (blog) | pokevendrepro.com | Blog et quiz | Oui | Oui | Fourchettes non sourcées | C |
| folio.fyi (blog d'une application de prix) | folio.fyi | Blog d'un concurrent | Oui | Non gradé (étude) | Ventes conclues, 90 jours | C |
| Elite Fourum | elitefourum.com | Forum anglophone | Oui, c'est le sujet | Non | Annonces Cardmarket | C |

Décompte : 19 sources examinées (hors Margxt, introuvable). Verdicts : A 0, B 1, C 9, D 9. Seuls Pokécardex, Pokébip, Dealabs et jeuxvideo.com ont été vraiment lus côté technique ; Discord, Facebook, YouTube et Twitch ont leurs conditions lues mais n'offrent de toute façon aucune donnée publique exploitable.

### Fiches

#### Pokécardex (site, forum, application)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.pokecardex.com, France. Base de cartes, forum, ventes et échanges entre membres, application (éditeur indiqué : Numelek, contact@numelek.fr, page `/terms`). |
| Langue de la carte distinguée ? | Oui pour les cartes ; pour les prix, non vérifié (le blog de folio.fyi écrit : « Il n'est pas précisé s'ils tiennent compte de la langue de la carte », à propos de la cote Pokécardex, source concurrente). |
| Non gradé, gradé | Non vérifié. |
| Nature du prix | Non vérifiée pour la cote. Le Journal du Geek (3 octobre 2026) cite des moyennes de ventes eBay « Pokécardex » pour les cartes françaises, sans détailler la collecte. Sur le forum, les prix sont des annonces et des anecdotes. |
| Profondeur | Non mesurée. |
| Historique | Le forum compte des fils de 2016 (ci-dessous) ; fondation du site non vérifiée. |
| Accès | Pages web ; application ; pas d'API publique trouvée. |
| Conditions | `https://www.pokecardex.com/legal` : « Notre base de données est protégée par le Code de la propriété intellectuelle (articles L. 341-1 et suivants). L'extraction et la réutilisation de tout ou partie de son contenu, y compris par scraping ou tout autre procédé automatisé, sont interdites (articles L. 342-1 et L. 342-2). » Même page : opposition expresse à la fouille de textes et de données (article 4 de la directive 2019/790). `robots.txt` : `User-agent: *` avec `Content-Signal: search=yes,ai-train=no,use=reference` et `Allow: /` ; ClaudeBot, GPTBot, anthropic-ai, CCBot et d'autres sont interdits (`Disallow: /`). Le contenu de `/legal` et `/terms` ne se charge que dans un navigateur (page vide pour une simple lecture). |
| Contact | contact@pokecardex.com (`/legal`, point de contact DSA) ; appli@pokecardex.com (`/terms`). |
| Verdict | **D.** Extraction et réutilisation interdites par écrit, y compris par scraping. Aucune voie d'autorisation n'est prévue dans le texte ; on pourrait écrire au contact, mais rien n'indique que ce soit possible. |
| Essai | Non fait (verdict D). |

Fils de forum lus pour la partie 2 (lecture seule, forum permis par `robots.txt`) : « La langue d'une carte influence le prix ? » (ouvert le 31 août 2016, actif jusqu'au 6 septembre 2016) et un fil du 20 août 2016, verrouillé le 17 octobre 2018. Contenu : opinions et anecdotes, aucune donnée datée.

#### Pokébip

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.pokebip.com, France. Média, forum, échanges (WiFiTrade). |
| Langue de la carte distinguée ? | Sans objet. |
| Non gradé, gradé | Sans objet. |
| Nature du prix | Aucun prix de carte structuré trouvé. |
| Profondeur, historique | Non vérifiés. |
| Accès | Pages web. |
| Conditions | `https://www.pokebip.com/robots.txt` : `Disallow: /fora` et `Disallow: /fora/*` (le forum), `Disallow: /messages/*`, `Disallow: /mon-compte` ; `User-agent: ClaudeBot` : `Disallow: /`. La charte (`/page/charte`) ne traite pas de la réutilisation des contenus ; elle interdit seulement le vol de créations (« ne sera en aucun cas toléré ») et les dons et enchères d'objets sur WiFiTrade. Pas de mentions légales trouvées (404 sur les adresses essayées). |
| Contact | Formulaire : https://www.pokebip.com/contact (page répondant 200). |
| Verdict | **D** pour le forum : exclu par `robots.txt`. Pas de prix ailleurs. |
| Essai | Non fait. |

#### Pokémon Trash

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.pokemontrash.com, France. Média de fans ; « Club » avec section cartes (`/club/cartes`) où des membres publient des annonces. |
| Langue de la carte distinguée ? | Par déduction du texte libre de l'annonce, non structurée. |
| Non gradé, gradé | Non vérifié. |
| Nature du prix | Prix demandés dans des annonces de membres (lots, ventes). |
| Profondeur | Non mesurée ; une section d'annonces libre, sans structure. |
| Historique | Pied de page : « Copyright (c) 2006-2026 Pokémon Trash ». |
| Accès | Pages web. |
| Conditions | `https://www.pokemontrash.com/robots.txt`, bloc `User-Agent: *` : `Allow: /` et `Disallow: /api/`. Bloc ClaudeBot : `Allow: /`, `Disallow: /api/`, `Crawl-delay: 5`. Aucune page de conditions d'utilisation ou de mentions légales trouvée (toutes les adresses essayées répondent 404). Le pied de page dit : « Ce contenu est réalisé par des fans pour des fans. » |
| Contact | contact@pokemontrash.com (pied de page de la page d'accueil, qui précise « privilégiez les réseaux sociaux »). |
| Verdict | **C.** `robots.txt` permissif mais aucune condition lue ; les annonces sont des données de membres. Utile seulement pour comprendre. |
| Essai | Non fait. |

#### Poképédia

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.pokepedia.fr, France. Wiki. |
| Langue de la carte distinguée ? | Sans objet. |
| Non gradé, gradé, prix | Aucun prix. |
| Accès | Pages MediaWiki. |
| Conditions | `https://www.pokepedia.fr/Poképédia:Copyrights` : licence « Paternité-Pas d'Utilisation Commerciale-Partage des Conditions Initiales à l'Identique 3.0 » ; conditions de réutilisation : « Mentionner la source (Poképédia), » « Pas d'utilisation commerciale, » « Utilisation de la même licence que celle de Poképédia pour les travaux dérivés. » `robots.txt` : interdit `Special:Search`, `Special:UserLogin`, les paramètres `oldid` et `diff`, etc. ; le reste des pages n'est pas interdit. |
| Contact | Non trouvé. |
| Verdict | **B** pour la lecture des pages encyclopédiques, mais **sans prix** : sans utilité pour le relevé. Utile pour les noms, numéros et dates de sortie françaises. |
| Essai | Sans objet (aucun prix). |

#### Pokékalos

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.pokekalos.fr, France. « Site fait par un fan pour des fans », actif de 2016 à 2026 selon son pied de page. Actualités JCC, forum, boutique. |
| Nature du prix | Aucune cote ni prix de carte trouvés dans la page d'accueil. |
| Conditions | `https://www.pokekalos.fr/web/mention.html`, section 5 : « Pokekalos est propriétaire des droits de propriété intellectuelle » ; « Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site » est soumise à autorisation écrite préalable. `robots.txt` : `Allow: /`, `Disallow: /contributions`. |
| Contact | contact@pokekalos.fr (pied de page et mentions légales). |
| Verdict | **C** (autorisation écrite pour toute reproduction). Sans prix : sans intérêt pour le relevé. |
| Essai | Sans objet. |

#### Pokémon Millennium et Margxt

- Pokémon Millennium : `pokemon-millennium.net` et `pokemon-millennium.fr` ne répondent pas (le proxy indique « connect_unreachable »). **D, injoignable** ; non vérifié.
- Margxt : aucune trace trouvée par recherche web. Non vérifié, non compté.

#### Reddit (r/pokemonfrance, r/PokemonTCG, r/pkmntcgcollections, r/pokemoncardcollectors)

| Champ | Contenu |
| --- | --- |
| Adresse, pays, type | https://www.reddit.com, États-Unis. Forum et API. |
| Accès constaté | `robots.txt` et `/r/pokemonfrance/` renvoient « Your request has been blocked due to a network policy » (HTTP 403 avec curl) et « You've been blocked by network security » avec Playwright. Je n'ai donc lu aucun fil et ne peux dire ni le contenu, ni le nombre de ventes citées. Une recherche web n'a rien retrouvé sur r/pokemonfrance. Les trois autres subreddits : non lus. |
| Conditions | Data API Terms (https://redditinc.com/policies/data-api-terms, « Effective June 19, 2023. Last Revised July 20, 2026 », lisible avec Playwright) : « If you are interested in using the Data APIs for commercial purposes, research in excess of rate limits, or for any use that is not expressly permitted under the Data API Terms, then you will need to enter into a separate agreement with Reddit. » Aussi : « use or retain any User Content, Materials, or data accessed through the Data APIs beyond your approved use case, and you must immediately delete any data not required for it ». À la fin d'un accès : suppression de « any data or models that were derived from User Content ». Le contenu appartient aux utilisateurs : « The Content created with or submitted to our Services by Users (“User Content”) is owned by Users and not by Reddit. » Limites de débit gratuites et obligation d'approbation en 2026 : non vérifiées (seulement des blogs tiers, non repris). |
| Contact | Formulaire d'aide cité par la page de blocage (`support.reddithelp.com`), non utilisé. |
| Verdict | **C.** L'usage dérivé (un prix publié) n'est pas clairement couvert, la suppression à la fin d'accès est incompatible avec une cote durable, et rien n'est lisible depuis ici. |
| Essai | Non fait. |

#### Discord (serveurs francophones)

Pas de contenu public : les salons sont derrière un compte (`discord.com/robots.txt` : `Disallow: /channels`, `Disallow: /api`). Conditions (https://discord.com/terms) : interdit « scraping our services without our written consent, including by using any robot, spider, crawler, scraper, or other automatic device, process, or software ». Aucun serveur n'a été rejoint. **D.**

#### Facebook (groupes d'achat-vente)

`https://www.facebook.com/robots.txt` : « Notice: Collection of data on Facebook through automated means is prohibited unless you have express written permission from Facebook ». Groupes derrière une connexion, non lus. **D.**

#### Dealabs

`robots.txt` : `User-agent: *` / `Allow: /` avec une liste d'exclusions (api, filtres, pages de connexion). Mais les pages de conditions renvoient une vérification anti-robot (HTTP 403, « Vérification que vous n'êtes pas un robot ») : conditions non lues, protection non contournée. Ce que l'on y trouve (prix de boosters et coffrets en magasin, fils de réassort) est du scellé neuf, pas de la carte à l'unité. **D** (inaccessible).

#### jeuxvideo.com

`robots.txt` : le bloc `*` exclut notamment `/forums/recherche.php` et `/forums/message/*` (les pages de forum ne sont pas globalement exclues). Les conditions ne se chargent pas (HTTP 403, « Performing security verification »). **D** (inaccessible, protection non contournée). Opinions, pas de données de prix.

#### YouTube et Twitch

- YouTube, conditions (https://www.youtube.com/static?template=terms, section « Your Use of the Service ») : interdit « access the Service using any automated means (such as robots, botnets or scrapers) », sauf moteurs de recherche publics selon `robots.txt` ou autorisation écrite. Les prix cités à l'oral ne sont pas structurés. L'API YouTube Data (conditions propres) : non vérifiée. Je n'ai pas identifié de chaîne française qui publie des cotes chiffrées de cartes françaises : une recherche n'a ramené que de la couverture médiatique de youtubeurs. **D.**
- Twitch (https://www.twitch.tv/p/fr-fr/legal/terms-of-service/) : interdit « l'utilisation de toute méthode d'extraction de données, robots ou méthodes similaires de collecte ou d'extraction de données » et l'accès « au moyen d'un robot, “spider”, “scraper”, “crawler” ou autre moyen automatisé ». **D.**

#### Médias et blogs lus pour la partie 2

| Source | Nature | Conditions lues ? | Verdict |
| --- | --- | --- | --- |
| Journal du Geek, article du 3 octobre 2026 (journaldugeek.com) | Article de presse, compare des ventes eBay conclues | `robots.txt` : `Disallow: /?s=`, `/search/` ; pas d'interdiction des articles. Conditions d'utilisation non lues. | C (lecture et citation pour comprendre) |
| Cards N Packs, blog (cardsnpacks.com) | Revendeur de cartes françaises, publie sa méthode et ses ventes | `robots.txt` : `Allow: /`, exclut `/panier/`, `/compte/`, `/api/`, etc. Conditions non lues. | C |
| Poke-Geek, blog du 17 mars 2026 | Revendeur, aucun chiffre sur le français | `Allow: /`. Conditions non lues. | C |
| Pokévendre Pro, article du 13 juillet 2026 | Blog et quiz | `Allow: /`. Conditions non lues. | C |
| folio.fyi, article du 20 octobre 2026 | Blog d'une application concurrente | `Disallow: /api/`, `/portfolio`… ; pages de blog non exclues. Conditions non lues. | C |
| Elite Fourum, fil du 13 novembre 2024 | Forum anglophone | `robots.txt` : exclusions de robots SEO nommés, rien sur `*` dans les lignes lues. Conditions non lues. | C |

Ces pages se lisent et se citent pour comprendre. Aucune n'est un relevé de prix de cartes françaises permis ; les chiffres qui y figurent sont les leurs, non réutilisables comme prix affichés.

Sources vues par les résultats de recherche seulement, **non examinées** : LorenZone (cotes de l'extension 30 ans), Margeo, ValoTCG, PkmCards, Cardpeer. Voir « sources croisées » en bas.

## Partie 2 : ce que le marché dit de l'écart français / anglais

Principe de lecture. **Chiffré et sourcé** : une méthode, un échantillon et une période sont publiés, et j'ai relu la page. **Opinion répandue** : affirmation sans méthode ou sans source. Je n'établis aucun coefficient.

### Ce qui est chiffré et sourcé

| # | Source et date | Périmètre | Résultat publié | Limites |
| --- | --- | --- | --- | --- |
| 1 | folio.fyi, blog, 20 octobre 2026 | Cartes **non gradées**, ventes conclues du 14 juillet au 12 octobre 2026 ; ne retient que les ventes françaises ou allemandes dont l'annonce montre la langue ; au moins 10 ventes par carte (5 dans une seconde vue) et 10 ventes de la copie anglaise ; 288 cartes. | « la copie française se vend en médiane 1,40 fois la copie anglaise, avec un prix plus élevé sur 84 % des 288 cartes ». L'écart baisse avec le prix : 1,65 fois sous 5 €, 1,1 fois à partir de 100 €. Copie allemande : 1,03 fois. Contrôle : deux moitiés des ventes d'une même carte dans une même langue ne s'écartent de plus de 1,25 fois que sur 11 % des cartes. | Éditeur d'une application concurrente ; données propres, non publiées ; la répartition par extension ou époque n'est pas donnée ; les ventes où la langue n'est pas écrite dans l'annonce sont exclues, ce qui peut biaiser (non vérifié) ; l'étude concerne probablement des cartes récentes (non précisé). |
| 2 | Journal du Geek, 3 octobre 2026 | Quatre cartes d'une extension récente, non gradées, ventes eBay conclues, anglais (PriceCharting) contre français (ValoTCG ou Pokécardex) | Mew ex 152/128 : anglais entre 129 et 175 $ (cote 159,31 $), français 200,86 € de moyenne sur 30 ventes en un mois, soit « la VF se vend 20 à 35 % plus cher ». Ectoplasma ex 154/128 : anglais 90 à 156 $, français 158,01 € à 175,56 €, soit 50 à 75 %. Lugia 149/147 : environ 40 à 50 %. Mew ex 158/128 : 10 à 20 %. Résumé de l'article : « Sur les ventes réellement conclues, on reste entre +10 et +75 %. » | Quatre cartes seulement, toutes chères ; taux de change non précisé, périodes non alignées d'une carte à l'autre ; l'article avertit lui-même que la dernière carte « chute très vite » (de 405 € à 90 €), ce qui rend l'écart sensible à quelques jours de décalage ; état non précisé. |
| 3 | Cards N Packs, 27 septembre 2026, mis à jour le 6 octobre 2026 | 244 ventes eBay du vendeur de cartes **françaises notées PSA**, du 14 mars au 25 septembre 2026 ; prix payé hors port ; médianes publiées à partir de 10 ventes | Médianes Wizard : PSA 8 460 € (26 ventes), PSA 9 161 € (44), PSA 10 300 € (48). Moderne : PSA 9 100 € (51), PSA 10 315 € (69). Médiane générale 190 €. | **Aucun prix anglais, aucun ratio** : « une carte française n'a pas le même marché qu'une carte anglaise ». Un seul vendeur, six mois ; le PSA 8 vaut plus que le PSA 10 parce que ce ne sont pas les mêmes cartes (23 des 26 PSA 8 sont holographiques contre 2 des 48 PSA 10). Source précieuse pour des prix français gradés observés, pas pour l'écart. |
| 4 | Cards N Packs, même article de mars 2026 (mis à jour le 6 octobre 2026) | Dracaufeu Set de Base Édition 1 : populations PSA | « 31 PSA 10 français (octobre 2026) contre environ 125 anglais (Heritage, décembre 2025) » ; environ 1 030 exemplaires français notés, tous grades, contre « plusieurs milliers » en anglais, sans chiffre. | C'est une rareté, pas un prix. Le ratio 4 est un calcul de l'article. Il ne publie aucun prix français : « nous ne publions de fourchette qu'une fois établie sur les ventes réussies d'ebay.fr ». « Aucun chiffre de tirage n'est public. » |
| 5 | Elite Fourum, fil du 13 novembre 2024 (anglophone) | Une carte, 300 annonces Cardmarket par langue | Part des états Poor/Played : environ 31 % en français contre environ 14 % en anglais ; part Near Mint/Mint : environ 14 % contre environ 41 %. | Une seule carte, annonces et non ventes ; ne donne pas de prix. Montre que la composition par état diffère selon la langue sur Cardmarket, ce qui fausse toute comparaison de « prix le plus bas » entre langues. |

Contradiction à signaler : un blog de conseil (Pokévendre Pro, 13 juillet 2026) publie le contraire sur le moderne non gradé : écarts de « -20 à -40 % » pour le français, fondés, dit-il, sur des « ventes réelles Cardmarket et eBay sur les 90 derniers jours », sans échantillon, sans date de relevé, et avec des incohérences internes (une ligne « Charizard VMAX Rainbow (ES) » dans un comparatif français/anglais, une affirmation « systématiquement plus cher » en anglais suivie d'exemples inverses). À écarter comme preuve ; à garder comme signal que le sens de l'écart n'est pas unanime.

### Ce qui est opinion répandue (non chiffré ou non sourcé)

- « Vintage gradé : le français vaut 20 à 40 % de l'anglais à grade égal. » Journal du Geek (3 octobre 2026) l'attribue à « certaines analyses » **non nommées**. Je n'ai pas retrouvé ce chiffre dans la page de Cards N Packs que j'ai lue (comparatif de mars 2026) : cette page ne publie aucun prix français et dit « les cartes françaises sont significativement moins chères » sans chiffre. Une réponse de moteur de recherche l'avait attribué à Cards N Packs ; la page elle-même ne le confirme pas. Statut : non vérifié, circule en s'auto-référençant.
- « La prime française concerne surtout les cartes modernes non gradées. » Journal du Geek, déduite de ses quatre cartes. L'étude de folio.fyi va dans le même sens (prime forte sous 5 €, faible au-dessus de 100 €) mais ne sépare pas le gradé.
- Explications : « demande » (« La France est un marché Pokémon énorme », Journal du Geek) ; tirages français plus faibles pour les extensions de 1999-2003 (Cards N Packs : « aucun chiffre de tirage n'est public »). Aucune n'est chiffrée.
- Vintage non gradé Édition 1 : une prime française de 15 à 30 % (Pokévendre Pro), sans source ni prix.
- Fils Pokécardex de 2016 : le français serait « le plus cher en France » devant l'anglais, classement variable selon les participants ; aucune donnée, de l'aveu des fils (opinions, anecdotes).
- Un blog de revendeur (Poke-Geek, 17 mars 2026) avance qu'une carte parfaitement centrée est plus rare ; aucun chiffre, aucune méthode.

### Couverture par époque : ce qui manque

| Époque demandée | Chiffré et sourcé sur l'écart français/anglais | Ce qu'il y a d'autre |
| --- | --- | --- |
| Wizards 1999-2003, Édition 1 et illimitée | **Rien.** Seulement des populations PSA (Dracaufeu Édition 1) et des prix français gradés observés chez un vendeur (médianes par note, sans anglais). | Opinions contradictoires (15 à 30 % de prime sans source ; 20 à 40 % du prix anglais sans source). |
| EX, Diamant et Perle, Noir et Blanc, XY, Soleil et Lune, Épée et Bouclier | **Rien trouvé par époque.** Le comparatif de folio.fyi mélange les cartes sans publier de découpage. | Aucun fil ni article chiffré rencontré. |
| Écarlate et Violet | Quatre cartes d'une extension récente (Journal du Geek) ; l'étude folio.fyi couvre sans doute des cartes récentes (non précisé). | Écart observé de +10 à +75 % sur quatre cartes chères. |
| Par rareté | Seule la gradation selon le prix de la carte (folio.fyi : 1,65 sous 5 €, 1,1 à partir de 100 €) ; les cartes de l'article du Journal du Geek sont toutes des raretés chères. | Rien d'autre. |
| Non gradé / gradé | Non gradé moderne : folio.fyi et Journal du Geek. Gradé : prix français seuls (Cards N Packs), jamais en regard de l'anglais. | « Les cartes gradées sont sur un autre marché que les non gradées » (opinion). |

Conclusion honnête pour le modèle : un seul jeu de données chiffré par langue est publié (folio.fyi, non gradé, 90 jours), par une application concurrente et sans découpage par époque. L'écart FR/EN pour le vintage et pour le gradé n'est établi par aucune source lue. Il faudra le mesurer soi-même sur les cartes où un prix français observé existe (annonces CardTrader françaises) plutôt que de le tirer de la presse.

## Partie 3 : la communauté comme source, précédents

Précédents lus, du plus instructif au plus faible. Les phrases entre guillemets sont celles des pages.

### 1. Open Prices (Open Food Facts), prix déclarés avec preuve

- Source : https://blog.openfoodfacts.org/en/news/open-prices-200000-prices-and-beyond (19 février 2026) ; https://github.com/openfoodfacts/open-prices ; https://openfoodfacts.github.io/open-prices/topics/outlier-detection/. Page wiki `Project:Open-Prices` non lisible (écran « Access Denied » d'un anti-robot).
- Validation d'une déclaration : « Contributors upload photos as proof » ; un modèle d'extraction lit l'étiquette ou le ticket et le contributeur confirme les données sur une page de validation ; la détection de doublons « automatically rejects duplicate proofs ». Le rôle de la preuve (photo d'étiquette ou de ticket) n'est confirmé que par un résumé de recherche web, pas par une page lue.
- Résistance à la manipulation : tout utilisateur peut signaler un prix ou une preuve erronée ; les signalements vont à une page réservée aux modérateurs, qui peuvent modifier ou supprimer ; historique des versions pour récupérer une erreur de modérateur. Règle statistique : dans un groupe d'au moins 3 prix, un prix est aberrant s'il dépasse 3 fois la médiane ou tombe sous la médiane divisée par 3 ; fenêtre de 5 ans.
- Coût et difficultés : plus de 200 000 prix, croissance rapide depuis octobre 2025 ; doublons dus à des bogues ou des erreurs, « frequent rate-limiting on Google Cloud with the Gemini API ». Le billet **ne chiffre ni le coût, ni la charge de modération, et ne mentionne pas d'abus**. Le dépôt GitHub indique des conditions d'ajout (compte Open Food Facts) ; la licence des données n'y est pas nommée (le résumé de recherche indiquait ODbL, non confirmé par une page lue).
- À retenir pour PokéTrack : la preuve (capture d'une annonce, d'un reçu de vente) est ce qui permet de modérer sans croire sur parole ; elle a un coût d'extraction et de modération.

### 2. Numbeo, prix déclarés sans preuve

- Source : https://www.numbeo.com/common/motivation_and_methodology.jsp (lu le 16 novembre 2026).
- Collecte : surtout des contributions d'utilisateurs, plus des relevés manuels deux fois par an, pondérés « three times higher than user-generated input ».
- Validation : « more than 30 filters » (automatiques et semi-automatiques) retirent les données « statistically improbable or incorrect » ; algorithmes non publiés (« propriétaire ») ; adresses IP spammeuses bloquées, y compris proxys publics et nœuds Tor ; des filtres croisent le comportement de l'utilisateur avec l'historique de la ville.
- Fraîcheur : données de plus de 12 mois retirées par défaut (3 mois dans les grandes villes) ; jusqu'à 24 mois affichés si la participation est faible, car mieux vaut montrer des données anciennes que rien.
- Limites : pas de preuve exigée ; aucun détail sur les faux contributeurs ni sur un système de réputation ; un résumé tiers note que les données ne sont pas relues par des pairs. Pour PokéTrack, c'est le cas où l'on ne peut pas vérifier : le résultat dépend d'une volumétrie importante et de filtres opaques.

### 3. PriceCharting, ventes constatées sur des plateformes, avec signalement

- Source : https://www.pricecharting.com/page/methodology et https://www.pricecharting.com/faq (lus le 16 novembre 2026).
- Important : ce n'est **pas** une cote alimentée par déclarations. « We collect sold listing data from eBay and our own video game Marketplace » ; la FAQ ne décrit aucun moyen d'ajouter une vente ou un prix.
- Résistance : « We rely on users flagging those listings by clicking the "Report" link next to them. » ; l'administration décide de « removed, reclassified, or left as is » ; « We manually review hundreds of listings every day » ; « Tools are setup to automatically flag listings with abnormally high or low prices » ; l'algorithme « takes outliers into account and the date when sales occurred » ; le signalement n'est possible que 90 jours après la fin de l'annonce. Aucune mention de la manipulation.
- Coût : revue manuelle quotidienne de centaines d'annonces (page elle-même).
- À retenir : le signalement par la communauté fait le tri d'une source automatique, plutôt que de fournir la donnée.

### 4. Discogs, ventes réalisées sur la plateforme (documentation non lue directement)

- La page d'aide « Where Can I Access Sales History? » (https://support.discogs.com/hc/articles/360007425553) m'est restée inaccessible (HTTP 403 à la lecture, protection anti-robot sur `robots.txt`). Un résumé de moteur de recherche rapporte : un aperçu des « last 30 prices of sold items », avec valeur la plus basse, médiane et la plus haute calculées sur ces 30 ventes. Un billet de blog de mars 2020 parle des dix dernières ventes sans séparer l'état ; une wiki de forum parle aussi de dix. **Le nombre exact, la définition d'une « vente » et le traitement des abus sont donc non vérifiés.**
- Intérêt : une cote fondée sur des transactions passées par la plateforme elle-même, et non sur des déclarations. Critique documentée par le billet : la médiane mélange les états, donc une seule vente atypique la déplace.

### Cas non documentable ici

- BoardGameGeek Marketplace : un résumé de recherche indique que le vendeur marque l'annonce « SOLD » et que le prix est enregistré dans l'historique des prix, avec une commission de 3 %. Les pages BGG sont inaccessibles (HTTP 403, anti-robot) : **non vérifié**, non retenu comme précédent.
- Argus participatifs automobiles : non cherchés.
- TCGplayer (calcul du « Market Price ») : page d'aide en HTTP 403 ; non vérifié.
- Cardmarket : page d'aide non trouvée ; l'ancienne documentation d'API (`api.cardmarket.com/ws/documentation/API_2.0:PriceGuide`) renvoie HTTP 410 Gone.

### Enseignements pour la déclaration d'achats et de ventes par les utilisateurs

Ce qui ressort des trois précédents lus, sans extrapolation chiffrée :

- Les deux qui exigent le moins (Numbeo, déclaratif sans preuve) dépendent de filtres statistiques opaques et d'un gros volume ; celui qui demande une preuve (Open Prices) doit payer l'extraction et la modération. PriceCharting évite le problème en partant de ventes déjà constatées ailleurs.
- Une règle de valeur aberrante simple et publique existe (médiane multipliée ou divisée par 3, avec au moins 3 prix, Open Prices). Elle a besoin de plusieurs déclarations par carte et par langue : pour une cote par carte, la masse critique est le vrai risque, non évalué ici.
- Aucun de ces précédents ne documente de vague de manipulation ou de faux comptes : la pièce manque, ce n'est pas la preuve que le risque est nul.

## Sources croisées hors de ma famille

- Cardmarket (prix par langue, tendance toutes langues) : famille places de marché.
- eBay ventes conclues (base du Journal du Geek, de Cards N Packs et de folio.fyi) : famille marchés ; la licence de l'API est déjà tranchée (`ROADMAP.md`).
- Cards N Packs (ventes françaises gradées PSA, avec méthode) : famille revendeurs et gradé.
- ValoTCG, Cardzia, PkmCards (https://www.pkmcards.fr, `robots.txt` permissif sauf comptes), Cardpeer, LorenZone : outils de cote français, cités par les résultats ; non examinés ici. folio.fyi décrit Cardzia comme s'appuyant sur « les dernières ventes réalisées sur le marché français » sans méthode.
- PriceCharting : famille marchés américains (prix anglais, ventes eBay).
- Idealo (analyse sur les cartes de mars 2025 à mars 2026 d'après des données PriceCharting, citée par la presse) : non lue.

## Marchés anglais, américain, japonais (à noter sans approfondir)

- Américain : TCGplayer et PriceCharting ne servent que d'alarme (`usGap`), jamais de prix affiché (`AGENTS.md`).
- Anglais : le Journal du Geek mesure l'anglais par PriceCharting (ventes eBay en dollars) ; le taux de change utilisé n'est pas indiqué.
- Japonais : des blogs publient une prime de l'anglais sur le japonais (par exemple TCGTalk, 176 % sur 16 cartes, données PriceCharting de mars 2026) ; non lu en détail, hors sujet.

## Crédits Firecrawl dépensés

0. Aucun appel Firecrawl (ni scrape, ni search, ni exécution Alexandria) : la recherche web, la lecture de pages, `curl` et Playwright ont suffi.

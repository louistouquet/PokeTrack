# Cartes témoins

190 cartes tirées dans le relevé du 2026-11-16. Elles servent à noter chaque source de prix, puis le modèle : pour chacune, un prix français de référence sera établi à la main à partir de plusieurs sources, daté et sourcé.

**État : les cartes sont tirées, aucun prix de référence n'est encore établi.** Le champ `reference` de `docs/cartes-temoins.json` est vide pour toutes.

## Comment elles ont été choisies

Personne ne les a choisies à la main : `node scripts/temoins.ts <dossier du relevé>` refait exactement le même tirage sur le même relevé.

- Les cartes cotées sont rangées par époque et par tranche de prix (le prix affiché par le site ce jour-là).
- Dans chaque case, 3 cartes au plus, en variant d'abord la rareté, puis l'extension. Une case qui contient moins de 3 cartes les donne toutes.
- S'y ajoutent 10 cartes signalées pour un écart de plus de dix fois avec le marché américain et 10 cartes dont le produit est partagé avec une autre : ce sont les cas où notre prix est le plus suspect.
- Les cartes sans aucun prix ne sont pas tirées : il n'y a pas de tranche où les ranger.

Limite : le tirage range les cartes selon notre prix actuel, qui est précisément ce qu'on veut contrôler. Une carte mal cotée est donc peut-être dans la mauvaise tranche. Cela ne fausse pas le contrôle, mais la répartition réelle par tranche pourra différer une fois les prix de référence établis.

## Répartition

| Époque | moins de 1 € | 1 à 5 € | 5 à 20 € | 20 à 100 € | 100 à 500 € | 500 € et plus |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Wizards (1999-2003) | 3 | 3 | 3 | 3 | 3 | 3 |
| EX et POP (2003-2007) | 3 | 3 | 3 | 3 | 3 | 3 |
| Diamant & Perle, Platine, HGSS (2007-2011) | 3 | 3 | 3 | 3 | 3 | 1 |
| Noir & Blanc (2011-2013) | 3 | 3 | 3 | 3 | 3 | 3 |
| XY (2014-2016) | 3 | 3 | 3 | 3 | 3 | 0 |
| Soleil et Lune (2017-2019) | 3 | 3 | 3 | 3 | 3 | 3 |
| Épée et Bouclier (2020-2022) | 3 | 3 | 3 | 3 | 3 | 3 |
| Écarlate et Violet (2023-2025) | 3 | 3 | 3 | 3 | 3 | 3 |
| Méga-Évolution (2025-2026) | 3 | 3 | 3 | 3 | 3 | 3 |
| McDonald's et kits du dresseur | 3 | 3 | 3 | 3 | 1 | 0 |

Prix douteux ajoutés : 20. Cartes dont le prix repose déjà sur trois annonces françaises ou plus : 2.

## Les cartes

| Carte | Extension | N° | Rareté | Prix du site au tirage | Annonces françaises | Raison |
| --- | --- | --- | --- | ---: | ---: | --- |
| Mimitoss | Neo Destiny | 90 | Commune | 0,60 € | 0 | tirage |
| Coconfort | Neo Discovery | 41 | Peu Commune | 0,92 € | 1 | tirage |
| Potion | Expedition | 156 | Commune | 0,17 € | 0 | tirage |
| Queulorior | Aquapolis | 109 | Commune | 2,87 € | 0 | tirage |
| Lainergie | Neo Revelation | 28 | Peu Commune | 1,16 € | 0 | tirage |
| Énergie recyclable | Neo Genesis | 105 | Rare | 3,55 € | 0 | tirage |
| Spectrum obscur | Neo Destiny | 36 | Peu Commune | 14,84 € | 0 | tirage |
| Flagadoss obscur | Team Rocket | 29 | Rare | 10,57 € | 0 | tirage |
| Tadmorv | Aquapolis | 79 | Commune | 6,99 € | 0 | tirage |
| Empiflor | Aquapolis | 42 | Rare | 55,71 € | 0 | tirage |
| Pikachu | Wizards Black Star Promos | 26 | Commune | 60,85 € | 0 | tirage |
| Voltali lumineux | Neo Destiny | 48 | Peu Commune | 27,37 € | 0 | tirage |
| Tortank | Set de Base | 2 | Rare | 115,89 € | 0 | tirage |
| Psykokwak | Wizards Black Star Promos | 20 | Commune | 112,71 € | 0 | tirage |
| Mewtwo | Expedition | 20 | Holo Rare | 499,00 € | 0 | tirage |
| Dracaufeu brillant | Neo Destiny | 107 | Rare | 1220,30 € | 0 | tirage |
| Léviator Brillant | Neo Revelation | 65 | Rare | 885,25 € | 0 | tirage |
| Noctali | Aquapolis | 41 | Rare | 976,72 € | 0 | tirage |
| Anorith | EX Gardiens du Pouvoir | 26 | Peu Commune | 0,42 € | 0 | tirage |
| Kaiminus | EX Légendes Oubliées | 79 | Commune | 0,73 € | 0 | tirage |
| Colhomard | EX Dragon | 13 | Rare | 0,73 € | 0 | tirage |
| Ruines Holon | EX Espèces Delta | 96 | Peu Commune | 1,33 € | 0 | tirage |
| Rapasdepic | EX Rouge Feu & Vert Feuille | 24 | Rare | 1,51 € | 0 | tirage |
| Flobio | POP Série 3 | 15 | Commune | 2,12 € | 0 | tirage |
| Kyogre | EX Émeraude | 15 | Rare | 7,12 € | 0 | tirage |
| Wailord | EX Rubis & Saphir | 14 | Holo Rare | 12,50 € | 0 | tirage |
| Noadkoko δ | EX Fantômes Holon | 41 | Peu Commune | 6,61 € | 0 | tirage |
| Colhomard ex | EX Fantômes Holon | 99 | Rare | 40,30 € | 0 | tirage |
| Pikachu | POP Série 9 | 15 | Commune | 26,02 € | 0 | tirage |
| Cacnea de Team Aqua | EX Team Magma vs Team Aqua | 24 | Peu Commune | 22,10 € | 0 | tirage |
| Charmina ex | EX Émeraude | 95 | Rare | 110,52 € | 0 | tirage |
| Kaimorse de Team Aqua | EX Team Magma vs Team Aqua | 6 | Holo Rare | 104,84 € | 0 | tirage |
| Fan Club Pokémon | POP Série 4 | 9 | Peu Commune | 153,56 € | 0 | tirage |
| Mentali ex | EX Forces Cachées | 102 | Rare | 575,41 € | 0 | tirage |
| Rayquaza ex | EX Dragon | 97 | Rare | 513,91 € | 0 | tirage |
| Dracaufeu ex | EX Rouge Feu & Vert Feuille | 105 | Rare | 1923,53 € | 0 | tirage |
| Nidorina | Triomphant | 45 | Peu Commune | 0,38 € | 0 | tirage |
| Cheniti Cape Déchet | Merveilles Secrètes | 80 | Commune | 0,22 € | 0 | tirage |
| Roserade | Déchaînement | 23 | Rare | 0,53 € | 0 | tirage |
| Mélo | L'appel des Légendes | 24 | Rare | 4,24 € | 0 | tirage |
| Archéodong | Trésors Mystérieux | 6 | Rare Holo | 3,16 € | 0 | tirage |
| Azurill | Diamant & Perle | 69 | Commune | 2,77 € | 0 | tirage |
| Shaymin | Déchaînement | 8 | Holo Rare | 6,78 € | 0 | tirage |
| Mentali 4 Niv. 55 | Rivaux Émergeants | 18 | Rare | 5,78 € | 0 | tirage |
| Raichu | Tempête | 8 | Rare Holo | 10,10 € | 0 | tirage |
| Élekable | Trésors Mystérieux | 121 | Rare Holo LV.X | 39,04 € | 0 | tirage |
| Aligatueur | Promo HGSS | HGSS07 | Promo | 21,14 € | 0 | tirage |
| Steelix | Déchaînement | 87 | Rare Prime | 26,33 € | 0 | tirage |
| Phyllali | Aube Majestueuse | 99 | Rare Holo LV.X | 253,08 € | 0 | tirage |
| Raikou | L'appel des Légendes | SL9 | Holo Rare | 107,38 € | 0 | tirage |
| Mentali | Indomptable | 81 | Rare Prime | 156,93 € | 0 | tirage |
| Rayquaza | L'appel des Légendes | 20 | Holo Rare | 1019,64 € | 0 | tirage |
| Furaiglon | Pouvoirs Émergents | 86 | Commune | 0,15 € | 0 | tirage |
| Cochignon | Tempète Plasma | 27 | Peu Commune | 0,35 € | 1 | tirage |
| Farfaduvet | Frontières Franchies | 15 | Rare | 0,52 € | 0 | tirage |
| Ptéra | Explorateurs Obscurs | 53 | Rare | 3,44 € | 0 | tirage |
| Scalpion | Nobles Victoires | 81 | Commune | 1,17 € | 0 | tirage |
| Énergie Prisme | Destinées Futures | 93 | Peu Commune | 1,28 € | 0 | tirage |
| Tranchodon | Coffre des Dragons | 16 | Rare | 13,16 € | 0 | tirage |
| Viridium | Explosion Plasma | 103 | Magnifique rare | 18,20 € | 0 | tirage |
| Psykokwak | Frontières Franchies | 32 | Commune | 14,28 € | 0 | tirage |
| Victini | Nobles Victoires | 43 | Rare | 21,80 € | 0 | tirage |
| Lugulabre | Destinées Futures | 101 | Magnifique rare | 42,26 € | 0 | tirage |
| Tcheren | Frontières Franchies | 148 | Ultra Rare | 36,90 € | 0 | tirage |
| Miasmax | Glaciation Plasma | 119 | Magnifique rare | 112,25 € | 0 | tirage |
| Giratina-EX | Dragons Éxaltés | 124 | Ultra Rare | 240,64 € | 0 | tirage |
| Darkrai-EX | Explorateurs Obscurs | 107 | Ultra Rare | 221,37 € | 0 | tirage |
| Mew-EX | Dragons Éxaltés | 120 | Ultra Rare | 635,11 € | 0 | tirage |
| Dracaufeu | Tempète Plasma | 136 | Magnifique rare | 829,48 € | 0 | tirage |
| Tortank | Tempète Plasma | 137 | Magnifique rare | 576,73 € | 0 | tirage |
| Rhinocorne | Générations | 49 | Commune | 0,12 € | 0 | tirage |
| Géolithe | Vigueur Spectrale | 49 | Peu Commune | 0,22 € | 0 | tirage |
| Tarinorme | Offensive Vapeur | 55 | Rare | 0,14 € | 0 | tirage |
| Altaria EX | Impact des Destins | 83 | Ultra Rare | 3,85 € | 0 | tirage |
| Némélios | Vigueur Spectrale | 12 | Rare | 1,66 € | 0 | tirage |
| Grahyèna de la Team Magma | Double Danger | 19 | Commune | 4,02 € | 0 | tirage |
| Tortank EX | Promo XY | XY122 | Promo | 9,17 € | 0 | tirage |
| Écrémeuh | Bienvenue à Kalos | 27 | Sans Rareté | 10,35 € | 0 | tirage |
| Voltali | Origines Antiques | 26 | Rare | 8,48 € | 0 | tirage |
| Échange | Primo-Choc | 163 | Magnifique rare | 42,62 € | 0 | tirage |
| Kyogre EX | Promo XY | XY41 | Promo | 22,90 € | 0 | tirage |
| Gardevoir-EX | Générations | RC30 | Ultra Rare | 54,08 € | 0 | tirage |
| Léviator EX | Rupture Turbo | 114 | Ultra Rare | 110,50 € | 0 | tirage |
| Shaymin-EX | Promo XY | XY148 | Promo | 138,60 € | 0 | tirage |
| Primo-Groudon EX | Origines Antiques | 97 | Magnifique rare | 303,19 € | 0 | tirage |
| Farfuret | Ombres Ardentes | 85 | Commune | 0,08 € | 0 | tirage |
| PokéNav | Tempête Céleste | 140 | Peu Commune | 0,19 € | 0 | tirage |
| Lanturn | Soleil et Lune | 50 | Rare | 0,11 € | 0 | tirage |
| Attrape-Suprême | Éclipse Cosmique | 264 | Magnifique rare | 3,95 € | 0 | tirage |
| Grotadmorv d’Alola GX | Ombres Ardentes | 138 | Ultra Rare | 3,89 € | 0 | tirage |
| Mew | Destinées Occultes | 32 | Rare | 3,53 € | 1 | tirage |
| Xerneas ◇ | Tonnerre Perdu | 144 | Rare | 9,53 € | 0 | tirage |
| Grolem d’Alola GX | Invasion Carmin | 113 | Magnifique rare | 9,53 € | 0 | tirage |
| Lokhlass GX | Soleil et Lune | 139 | Ultra Rare | 11,86 € | 0 | tirage |
| Togepi, Mélo et Toudoudou GX | Éclipse Cosmique | 143 | Ultra Rare | 38,00 € | 0 | tirage |
| Nymphali GX | Gardiens Ascendants | 158 | Magnifique rare | 58,73 € | 0 | tirage |
| Pikachu de Sacha | Promo SM | SM109 | Promo | 89,26 € | 0 | tirage |
| Lugia GX | Tonnerre Perdu | 207 | Ultra Rare | 199,81 € | 0 | tirage |
| Carchacrok et Giratina GX | Promo SM | SM193 | Promo | 162,77 € | 0 | tirage |
| Mewtwo et Mew GX | Harmonie des Esprits | 242 | Magnifique rare | 242,93 € | 0 | tirage |
| Latias et Latios GX | Duo de Choc | 170 | Ultra Rare | 1880,03 € | 0 | tirage |
| Ectoplasma et Mimiqui GX | Duo de Choc | 165 | Ultra Rare | 1569,18 € | 0 | tirage |
| Magicarpe et Wailord GX | Duo de Choc | 161 | Ultra Rare | 587,25 € | 0 | tirage |
| Ursaking V | Tempête Argentée | 102 | Holo Rare V | 0,66 € | 0 | tirage |
| Vaututrice | Clash des Rebelles | 120 | Rare | 0,21 € | 0 | tirage |
| Migalos | Pokémon GO | 007 | Peu Commune | 0,06 € | 0 | tirage |
| Rongrigou V | Poing de Fusion | 256 | Ultra Rare | 2,11 € | 0 | tirage |
| Smogo | Destinées Radieuses Coffre Étincelant | SV076 | Shiny rare | 4,93 € | 0 | tirage |
| Lanssorien | Promo SWSH | SWSH132 | Promo | 2,36 € | 0 | tirage |
| Nacchara | Zénith Suprême Galerie Galaroise | GG63 | Ultra Rare | 7,47 € | 0 | tirage |
| Ponyta de Galar | Destinées Radieuses Coffre Étincelant | SV047 | Shiny rare | 19,38 € | 0 | tirage |
| Pyroli | Stars Étincelantes Galerie de Dresseurs | TG01 | Rare | 19,20 € | 0 | tirage |
| Mew V | Poing de Fusion | 250 | Ultra Rare | 37,04 € | 0 | tirage |
| Ronflex | Promo SWSH | SWSH032 | Promo | 25,39 € | 0 | tirage |
| Dracaufeu VMAX | Ténèbres Embrasées | 20 | Holo Rare VMAX | 43,49 € | 0 | tirage |
| Lugia V | Tempête Argentée | 186 | Ultra Rare | 492,74 € | 0 | tirage |
| Phyllali VMAX | Évolution Céleste | 205 | Magnifique rare | 297,78 € | 0 | tirage |
| Dracaufeu | Célébrations Collection Classique | CC002 | Collection Classique | 190,06 € | 0 | tirage |
| Ectoplasma VMAX | Poing de Fusion | 271 | Magnifique rare | 688,02 € | 0 | tirage |
| Giratina V | Origine Perdue | 186 | Ultra Rare | 919,32 € | 0 | tirage |
| Rayquaza VMAX | Évolution Céleste | 218 | Magnifique rare | 1063,88 € | 0 | tirage |
| Négapi | Faille Paradoxe | 061 | Commune | 0,04 € | 0 | tirage |
| Saguaro | Évolutions à Paldea | 187 | Peu Commune | 0,12 € | 4 | tirage |
| Arboliva | Écarlate et Violet | 023 | Rare | 0,20 € | 3 | tirage |
| Superdofin | Flammes Obsidiennes | 200 | Illustration rare | 2,74 € | 0 | tirage |
| Tutankafer-ex | Faille Paradoxe | 224 | Ultra Rare | 2,16 € | 1 | tirage |
| Ire-Foudre-ex | Forces Temporelles | 123 | Double rare | 1,25 € | 1 | tirage |
| Flamenroule | Évolutions à Paldea | 227 | Illustration rare | 6,29 € | 0 | tirage |
| Terapagos-ex | Couronne Stellaire | 173 | Hyper rare | 12,80 € | 1 | tirage |
| Évoli | SVP Black Star Promos | 173 | Promo | 16,27 € | 0 | tirage |
| Gromago-ex | Évolutions Prismatiques | 164 | Illustration spéciale rare | 30,71 € | 0 | tirage |
| Magirêve | Évolutions à Paldea | 212 | Illustration rare | 20,78 € | 0 | tirage |
| Carchacrok-ex de Cynthia | Rivalités Destinées | 241 | Hyper rare | 21,28 € | 0 | tirage |
| Victini | Foudre Noire | 171 | Rare Noir Blanc | 397,05 € | 0 | tirage |
| Carchacrok-ex de Cynthia | Rivalités Destinées | 232 | Illustration spéciale rare | 206,18 € | 0 | tirage |
| Hôtel " Au paradis des Pokémon " | SVP Black Star Promos | 045 | Promo | 130,97 € | 0 | tirage |
| Noctali-ex | Évolutions Prismatiques | 161 | Illustration spéciale rare | 1486,26 € | 0 | tirage |
| Mew-ex | Destinées de Paldea | 232 | Illustration spéciale rare | 576,62 € | 1 | tirage |
| Mewtwo-ex de la Team Rocket | Rivalités Destinées | 231 | Illustration spéciale rare | 1135,67 € | 1 | tirage |
| Théffroyable | Nuit Noire | 006 | Peu Commune | 0,06 € | 1 | tirage |
| Togedemaru-ex | Héros Transcendants | 149 | Double rare | 0,63 € | 0 | tirage |
| Énergie Fire Nitro | Chaos Ascendant | 086 | Rare | 0,08 € | 1 | tirage |
| Attrape-Pokémon | Règne Delta | 129 | Ultra Rare | 1,70 € | 0 | tirage |
| Libégon | Flammes Fantasmagoriques | 101 | Illustration rare | 3,14 € | 1 | tirage |
| Pyrobut-ex | Héros Transcendants | 038 | Double rare | 1,16 € | 2 | tirage |
| Tiplouf | MEP Black Star Promos | 042 | Promo | 6,74 € | 0 | tirage |
| Rondoudou d'Erika | Collection Classique 30ᵉ Anniversaire | 015 | Sans Rareté | 9,75 € | 0 | tirage |
| Méga-Momartik-ex | Héros Transcendants | 265 | Mega Attack Rare | 6,58 € | 0 | tirage |
| Méga-Lugulabre-ex | Nuit Noire | 115 | Illustration spéciale rare | 24,36 € | 1 | tirage |
| Malvalame | MEP Black Star Promos | 014 | Promo | 22,82 € | 0 | tirage |
| Psykokwak | Héros Transcendants | 226 | Illustration rare | 57,04 € | 0 | tirage |
| Méga-Amphinobi-ex | Chaos Ascendant | 116 | Illustration spéciale rare | 111,22 € | 0 | tirage |
| Hôtel « Au paradis des Pokémon » | MEP Black Star Promos | 092 | Promo | 140,11 € | 0 | tirage |
| Méga-Dracolosse-ex | Héros Transcendants | 295 | Méga Hyper Rare | 153,62 € | 0 | tirage |
| Méga-Dracaufeu X-ex | Flammes Fantasmagoriques | 125 | Illustration spéciale rare | 586,34 € | 0 | tirage |
| Mew | 30ᵉ Anniversaire | R | RGB Rare | 2855,12 € | 0 | tirage |
| Pikachu-ex | Héros Transcendants | 276 | Illustration spéciale rare | 798,83 € | 0 | tirage |
| Rocabot | Collection McDonald's 2018 | 25 | Sans Rareté | 0,67 € | 0 | tirage |
| Bazoucan | SM Kit du dresseur (Lougarox) | 22 | Rare | 0,39 € | 0 | tirage |
| Super Ball | SM Kit du dresseur (Raichu d'Alola) | 25 | Peu Commune | 0,15 € | 0 | tirage |
| Recherche d'énergie | DP Kit dresseur (Lucario) | 8 | Sans Rareté | 1,00 € | 0 | tirage |
| Minidraco | Collection McDonald's 2018 | 32 | Sans Rareté | 1,82 € | 0 | tirage |
| Goupix d'Alola | Collection McDonald's 2019 | 13 | Sans Rareté | 1,33 € | 0 | tirage |
| Mentali | Collection McDonald's 2013 | 7 | Sans Rareté | 7,99 € | 0 | tirage |
| Goupix | Collection McDonald's 2016 | 1 | Sans Rareté | 6,56 € | 0 | tirage |
| Marill | Collection McDonald's 2015 | 10 | Sans Rareté | 9,01 € | 0 | tirage |
| Baggiguane | Collection McDonald's 2012 | 10 | Sans Rareté | 31,82 € | 0 | tirage |
| Crabicoque | Collection McDonald's 2012 | 3 | Sans Rareté | 26,74 € | 0 | tirage |
| Coupenotte | Collection McDonald's 2012 | 12 | Sans Rareté | 21,50 € | 0 | tirage |
| Pikachu | Collection McDonald's 2016 | 6 | Sans Rareté | 195,01 € | 0 | tirage |
| Iris | Explosion Plasma | 101 | Ultra Rare | 0,43 € | 0 | prix douteux : écart avec le marché américain |
| Dracaufeu EX | Étincelles | 100 | Ultra Rare | 11,51 € | 0 | prix douteux : écart avec le marché américain |
| Méga-Rayquaza‑ex | Règne Delta | 138 | Illustration spéciale rare | 3,90 € | 0 | prix douteux : écart avec le marché américain |
| Aligatueur ex | EX Forces Cachées | 103 | Rare | 14,25 € | 0 | prix douteux : écart avec le marché américain |
| Pikachu ☆ | EX Fantômes Holon | 104 | Rare | 5,15 € | 0 | prix douteux : écart avec le marché américain |
| Noctali | Aquapolis | H29 | Holo Rare | 112,78 € | 0 | prix douteux : écart avec le marché américain |
| Osselait | Éveil des Légendes | 90 | Commune | 0,25 € | 0 | prix douteux : écart avec le marché américain |
| Alizée | Ciel Rugissant | 108 | Ultra Rare | 0,49 € | 0 | prix douteux : écart avec le marché américain |
| Ghetis | Glaciation Plasma | 115 | Ultra Rare | 5,88 € | 0 | prix douteux : écart avec le marché américain |
| Électrode | Destinées Occultes | 22 | Rare | 16,54 € | 0 | prix douteux : écart avec le marché américain |
| Camérupt EX | Primo-Choc | 146 | Ultra Rare | 3,12 € | 0 | prix douteux : produit partagé |
| Scorvol | Éveil des Légendes | 55 | Peu Commune | 1,71 € | 0 | prix douteux : produit partagé |
| Passerouge | Collection McDonald's 2018 | 39 | Sans Rareté | 0,98 € | 0 | prix douteux : produit partagé |
| Professeur Platane | Rupture Turbo | 107a | Peu Commune | 0,18 € | 0 | prix douteux : produit partagé |
| Maganon | Règne Delta | 021 | Rare | 0,06 € | 1 | prix douteux : produit partagé |
| Minidraco δ | EX Espèces Delta | 66 | Commune | 1,62 € | 0 | prix douteux : produit partagé |
| Magnéti | Impulsion Turbo | 51 | Commune | 0,13 € | 0 | prix douteux : produit partagé |
| Hoopa | Promo XY | XY147 | Promo | 85,89 € | 0 | prix douteux : produit partagé |
| Griknot | Ultra-Prisme | 97 | Commune | 0,09 € | 0 | prix douteux : produit partagé |
| Minidraco δ | EX Espèces Delta | 65 | Commune | 1,62 € | 0 | prix douteux : produit partagé |

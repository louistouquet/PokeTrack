import assert from "node:assert/strict";
import { test } from "node:test";
import { classifyListing } from "./ebay.ts";

test("annonces eBay : classement par titre", () => {
  const cases: [string, string | null][] = [
    ["Dracaufeu ex 199/165 151 FR NM", "raw"],
    ["Carte Pokémon Dracaufeu-ex 199/165 PSA 10 Gem Mint", "psa:10"],
    ["Dracaufeu ex 199/165 PCA 9,5", "pca:9.5"],
    ["Pikachu 58/102 Set de Base Beckett 9.5", "bgs:9.5"],
    ["Mew ex 151 Collect Aura 10", "ca:10"],
    ["Noctali VMAX 215/203 CGC 8.5", "cgc:8.5"],
    ["Dracaufeu 4/102 PSA 6", null], // note non suivie
    ["Lot 10 cartes Pokémon 151", null],
    ["Dracaufeu ex 199/165 japonais", null],
    ["Dracaufeu ex 199/165 carte gradée", null], // gradée, société inconnue
    ["Dracaufeu ex 199/165 PSA", null], // société sans note
    ["Dracaufeu 10/102 PSA 9", "psa:9"], // le 10 de « 10/102 » n'est pas une note
  ];
  for (const [title, expected] of cases) assert.equal(classifyListing(title), expected, title);
});

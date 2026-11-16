import assert from "node:assert/strict";
import { test } from "node:test";
import { computeQuote } from "../src/lib/pricing/raw.ts";
import { frenchAsks, matchExpansion, type Listing } from "./cardtrader.ts";

const listing = (over: Partial<Listing>): Listing => ({ price: 10, number: "199", name: "Charizard ex", quantity: 1, condition: "Near Mint", reverse: false, firstEdition: false, graded: false, ...over });

test("CardTrader : extension retrouvée par code, sinon par nom anglais", () => {
  const expansions = [
    { id: 1, code: "mew", name: "151" },
    { id: 2, code: "tr", name: "Team Rocket" },
    { id: 3, code: "hgs", name: "HeartGold & SoulSilver" },
  ];
  assert.equal(matchExpansion({ code: "MEW", enName: "151" }, expansions)?.id, 1);
  assert.equal(matchExpansion({ code: "RO", enName: "Team Rocket" }, expansions)?.id, 2);
  assert.equal(matchExpansion({ code: "HS", enName: "HeartGold SoulSilver" }, expansions), null, "un nom approchant ne suffit pas");
  assert.equal(matchExpansion({}, expansions), null);
});

test("CardTrader : annonces françaises rangées par carte, les douteuses écartées", () => {
  const cards = [
    { id: "sv03.5-199", localId: "199", enName: "Charizard ex" },
    { id: "sv03.5-001", localId: "001", enName: "Bulbasaur" },
  ];
  const { asks, rejected } = frenchAsks(
    [
      listing({ price: 360 }),
      listing({ price: 350, quantity: 2 }),
      listing({ price: 200, condition: "Played" }), // abîmée
      listing({ price: 900, graded: true }), // gradée
      listing({ price: 500, firstEdition: true }),
      listing({ price: 0.4, number: "1", name: "Bulbasaur", reverse: true }),
      listing({ price: 3, number: "1", name: "Exeggcute" }), // même numéro, autre carte
      listing({ price: 5, number: "999" }), // numéro inconnu
    ],
    cards,
  );
  assert.deepEqual(asks.get("sv03.5-199"), { std: { n: 3, p: [350, 360] } });
  assert.deepEqual(asks.get("sv03.5-001"), { rev: { n: 1, p: [0.4] } });
  assert.equal(rejected, 1);
});

test("prix français : le poids des annonces françaises monte avec leur nombre", () => {
  const updated = "2026-11-14T22:00:00Z";
  const now = Date.parse("2026-11-15T00:00:00Z");
  const pricing = { cardmarket: { updated, trend: 100, avg1: 100, avg7: 100, avg30: 100 } };
  const quote = (prices: number[]) => computeQuote(pricing, { now, french: { prices, total: prices.length } });
  const none = computeQuote(pricing, { now });
  assert.equal(none.french, 0);
  assert.equal(none.price, 100);
  // Une seule annonce, très éloignée : presque ignorée.
  assert.ok(Math.abs(quote([400]).price! - 100) < 20, `prix ${quote([400]).price}`);
  // Cinq annonces à 130 : le prix français pèse les trois quarts.
  const five = quote([128, 129, 130, 131, 132]);
  assert.equal(five.french, 5);
  assert.ok(five.price! > 120 && five.price! < 126, `prix ${five.price}`);
  assert.equal(five.sources.find((s) => s.source === "cardtrader")!.low, 128);
  // Des annonces françaises qui confirment le prix européen augmentent la confiance.
  assert.ok(quote([99, 100, 101, 102, 103]).confidence > none.confidence);
  // Sans Cardmarket, les annonces françaises suffisent à coter la carte.
  assert.equal(computeQuote(null, { now, french: { prices: [8, 9, 10], total: 3 } }).price, 9);
});

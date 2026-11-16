import assert from "node:assert/strict";
import { test } from "node:test";
import { computeQuote, trimmedMedian } from "./raw.ts";
import { runProblems, summarizeSet } from "../snapshot.ts";
import type { Card } from "../tcgdex.ts";
import { gradedPrice, gradedTable } from "./graded.ts";
import { gradingVerdict, SERVICES } from "./grading-roi.ts";

const now = Date.parse("2026-11-15T00:00:00Z");
const updated = "2026-11-14T22:00:00Z";
const opts = { now };

test("prix juste : Cardmarket seul, le marché américain est ignoré", () => {
  const cardmarket = { updated, low: 180, trend: 343.78, avg1: 308.7, avg7: 321.77, avg30: 325.94 };
  const q = computeQuote({ cardmarket }, opts);
  assert.ok(q.price! > 300 && q.price! < 345, `prix ${q.price}`);
  assert.deepEqual(q.sources.map((s) => s.source), ["cardmarket"]);
  assert.ok(q.range![0] < q.price! && q.range![1] > q.price!);
  // Un prix TCGplayer, même très différent, ne change rien.
  const withUs = computeQuote({ cardmarket, tcgplayer: { updated, holofoil: { marketPrice: 1100 } } }, opts);
  assert.deepEqual(withUs, q);
  // Une carte cotée seulement aux États-Unis n'a pas de prix.
  assert.equal(computeQuote({ tcgplayer: { updated, holofoil: { marketPrice: 50 } } }, opts).price, null);
});

test("un indicateur aberrant ne déplace pas le prix", () => {
  const sane = computeQuote({ cardmarket: { updated, trend: 100, avg1: 100, avg7: 100, avg30: 100 } }, opts);
  const spiked = computeQuote({ cardmarket: { updated, trend: 100, avg1: 900, avg7: 100, avg30: 100 } }, opts);
  assert.ok(Math.abs(spiked.price! - sane.price!) < 10, `${spiked.price} vs ${sane.price}`);
  assert.ok(spiked.confidence < sane.confidence);
  assert.ok(spiked.volatility > sane.volatility);
});

test("finition reverse : lit les champs -holo", () => {
  const q = computeQuote(
    {
      cardmarket: { updated, trend: 1, avg7: 1, "trend-holo": 4.4, "avg7-holo": 4.6, "avg30-holo": 4.5 },
    },
    { ...opts, finish: "reverse" },
  );
  assert.ok(q.price! > 4 && q.price! < 5, `prix ${q.price}`);
});

test("aucune donnée : pas de prix, confiance nulle", () => {
  for (const p of [null, {}, { cardmarket: { trend: 0, avg7: null } }]) {
    const q = computeQuote(p, opts);
    assert.equal(q.price, null);
    assert.equal(q.confidence, 0);
  }
});

test("eBay : les annonces comptent dans le prix et la quantité en vente", () => {
  const cm = { cardmarket: { updated, trend: 100, avg7: 100, avg30: 100 } };
  const q = computeQuote(cm, { ...opts, ebay: { prices: [95, 105, 110, 115, 120, 125, 130, 2000], total: 42 } });
  assert.equal(q.listings, 42);
  assert.ok(q.price! > 100 && q.price! < 112, `prix ${q.price}`);
  assert.ok(q.liquidity > computeQuote(cm, opts).liquidity);
});

test("médiane tronquée : ignore les annonces fantaisistes", () => {
  assert.equal(trimmedMedian([10, 11, 12, 13, 14, 999]), 12);
});

test("gradé : un prix n'existe que s'il est observé, jamais calculé", () => {
  assert.equal(gradedPrice(), null);
  assert.equal(gradedPrice([400, 410]), null, "deux annonces ne font pas un prix");
  assert.equal(gradedPrice([400, 410, 420]), 410);
  assert.equal(gradedPrice([400, 405, 410, 415, 420, 9000]), 410, "l'annonce fantaisiste est écartée");
  const table = gradedTable({ "psa:10": [400, 410, 420], "pca:9.5": [80] });
  assert.equal(table.length, 20);
  assert.deepEqual(table.find((g) => g.company === "psa" && g.grade === "10"), { company: "psa", grade: "10", price: 410, listings: 3 });
  assert.equal(table.find((g) => g.company === "pca" && g.grade === "9.5")!.price, null);
  assert.equal(table.filter((g) => g.price !== null).length, 1);
});

test("rentabilité : calculée sur des prix observés, sinon pas rendue", () => {
  const pca = SERVICES.find((s) => s.company === "pca")!;
  assert.equal(gradingVerdict(300, "classic", "mint", pca), null, "sans annonces gradées, pas de verdict");
  const three = (p: number) => [p - 10, p, p + 10];
  const observations = { "pca:10": three(900), "pca:9.5": three(520), "pca:9": three(430), "pca:8": three(310) };
  const good = gradingVerdict(300, "classic", "mint", pca, observations)!;
  assert.equal(good.verdict, "rentable");
  assert.equal(good.outcomes[0].value, 900);
  assert.equal(good.outcomes.at(-1)!.grade, "inférieure");
  assert.ok(good.outcomes.at(-1)!.net < 0, "une note trop basse fait perdre les frais");
  assert.ok(Math.abs(good.outcomes.reduce((s, o) => s + o.probability, 0) - 1) < 1e-9);
  // Une note manquante mais atteignable empêche le calcul.
  assert.equal(gradingVerdict(300, "classic", "mint", pca, { ...observations, "pca:9": [430] }), null);
  assert.equal(good.cost, 20);
});

test("prix douteux : sans commune mesure avec le marché américain, signalé sans changer le prix", () => {
  const cm = { updated, trend: 5, avg7: 5.2, avg30: 5.1 };
  const card = (id: string, usd: number | null) =>
    ({ id, localId: id, name: id, pricing: { cardmarket: { ...cm, idProduct: id }, tcgplayer: usd ? { holofoil: { marketPrice: usd } } : null } }) as unknown as Card;
  const [far, near, alone] = summarizeSet([card("a", 450), card("b", 30), card("c", null)]);
  assert.equal(far.far, true);
  assert.equal(far.std!.c, 25);
  assert.equal(far.std!.p, near.std!.p, "le prix reste celui de Cardmarket");
  assert.equal(near.far, undefined);
  assert.equal(alone.far, undefined);
  assert.ok(near.std!.c > 25);
  // Carte à quelques centimes : l'écart entre prix planchers n'est pas une alarme.
  const cheap = { id: "d", localId: "d", name: "d", pricing: { cardmarket: { updated, trend: 0.03, avg7: 0.03, idProduct: "d" }, tcgplayer: { normal: { marketPrice: 0.25 } } } } as unknown as Card;
  assert.equal(summarizeSet([cheap])[0].far, undefined);
});

test("relevé refusé : trop d'échecs ou chute depuis la veille", () => {
  const prev = { cards: 20000, priced: 19000 };
  assert.deepEqual(runProblems(prev, { cards: 20000, priced: 18900, failed: 40 }), []);
  assert.deepEqual(runProblems(null, { cards: 20000, priced: 19000, failed: 0 }), []);
  assert.equal(runProblems(prev, { cards: 20000, priced: 19000, failed: 150 }).length, 1);
  assert.equal(runProblems(prev, { cards: 19000, priced: 18000, failed: 0 }).length, 2);
});

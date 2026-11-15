import assert from "node:assert/strict";
import { test } from "node:test";
import { computeQuote, trimmedMedian } from "./raw.ts";
import { gradedPrice, gradedTable } from "./graded.ts";
import { gradingVerdict, SERVICES } from "./grading-roi.ts";

const now = Date.parse("2026-11-15T00:00:00Z");
const updated = "2026-11-14T22:00:00Z";
const opts = { usdToEur: 0.9, now };

test("prix juste : proche de Cardmarket, recoupé par TCGplayer", () => {
  const q = computeQuote(
    {
      cardmarket: { updated, low: 180, trend: 343.78, avg1: 308.7, avg7: 321.77, avg30: 325.94 },
      tcgplayer: { updated, holofoil: { marketPrice: 292.22, lowPrice: 247.72 } },
    },
    opts,
  );
  assert.ok(q.price! > 300 && q.price! < 345, `prix ${q.price}`);
  assert.equal(q.sources.length, 2);
  assert.ok(q.sources[0].weight > 0.7, "Cardmarket domine");
  assert.ok(q.confidence > 75);
  assert.ok(q.range![0] < q.price! && q.range![1] > q.price!);
});

test("un indicateur aberrant ne déplace pas le prix", () => {
  const sane = computeQuote({ cardmarket: { updated, trend: 100, avg1: 100, avg7: 100, avg30: 100 } }, opts);
  const spiked = computeQuote({ cardmarket: { updated, trend: 100, avg1: 900, avg7: 100, avg30: 100 } }, opts);
  assert.ok(Math.abs(spiked.price! - sane.price!) < 10, `${spiked.price} vs ${sane.price}`);
  assert.ok(spiked.confidence < sane.confidence);
  assert.ok(spiked.volatility > sane.volatility);
});

test("TCGplayer très éloigné du marché européen est dévalué", () => {
  const q = computeQuote(
    { cardmarket: { updated, trend: 400, avg7: 420, avg30: 410 }, tcgplayer: { updated, holofoil: { marketPrice: 1100 } } },
    opts,
  );
  assert.ok(q.price! < 460, `prix ${q.price}`);
});

test("finition reverse : lit les champs -holo et la clé reverse-holofoil", () => {
  const q = computeQuote(
    {
      cardmarket: { updated, trend: 1, avg7: 1, "trend-holo": 4.4, "avg7-holo": 4.6, "avg30-holo": 4.5 },
      tcgplayer: { updated, normal: { marketPrice: 1 }, "reverse-holofoil": { marketPrice: 5 } },
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

test("gradé : PSA 10 > PSA 9 > non gradé récent, plancher pour les petites cartes", () => {
  const p10 = gradedPrice(100, "recent", "psa", "10")!;
  const p9 = gradedPrice(100, "recent", "psa", "9")!;
  assert.ok(p10.price > p9.price && p9.price >= 100);
  assert.ok(gradedPrice(300, "recent", "psa", "8")!.price < 300, "une note basse vaut moins que la carte nue");
  assert.equal(p10.method, "modèle");
  assert.equal(gradedPrice(1, "recent", "psa", "10")!.price, 19.74);
  assert.equal(gradedPrice(0, "recent", "psa", "10"), null);
  assert.equal(gradedTable(100, "vintage").length, 20);
});

test("gradé : les annonces observées remplacent progressivement le modèle", () => {
  const model = gradedPrice(100, "recent", "psa", "10")!.price;
  const few = gradedPrice(100, "recent", "psa", "10", [400, 410])!;
  const many = gradedPrice(100, "recent", "psa", "10", Array(20).fill(400))!;
  assert.equal(few.method, "mixte");
  assert.equal(many.method, "observé");
  assert.ok(model < few.price && few.price < many.price && many.price < 400 * 0.92 + 1);
});

test("rentabilité : une carte chère en bon état vaut le coup, une commune non", () => {
  const good = gradingVerdict(300, "classic", "mint", SERVICES.find((s) => s.company === "pca")!)!;
  assert.equal(good.verdict, "rentable");
  assert.equal(good.breakevenGrade, "9");
  assert.equal(good.outcomes.at(-1)!.grade, "inférieure");
  assert.ok(good.outcomes.at(-1)!.net < 0, "une note trop basse fait perdre les frais");
  assert.ok(Math.abs(good.outcomes.reduce((s, o) => s + o.probability, 0) - 1) < 1e-9);
  const bad = gradingVerdict(2, "recent", "excellent", SERVICES.find((s) => s.company === "psa")!)!;
  assert.equal(bad.verdict, "à éviter");
  assert.equal(bad.breakevenGrade, null);
  assert.equal(bad.cost, 76.8);
});

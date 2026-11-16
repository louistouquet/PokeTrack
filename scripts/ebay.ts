// Adaptateur eBay (optionnel). Actif seulement si EBAY_CLIENT_ID et EBAY_CLIENT_SECRET
// sont définis. Une recherche par carte sur eBay France : les titres des annonces sont
// classés en « non gradée » ou « société:note », ce qui alimente à la fois le prix brut,
// la quantité en vente et les prix gradés observés.
//
// NON VÉRIFIÉ EN CONDITIONS RÉELLES : écrit d'après la documentation de l'API Browse,
// sans clés pour l'essayer. La classification des titres, elle, est testée.

import { COMPANIES } from "../src/lib/pricing/graded.ts";
import type { EbayData } from "../src/lib/snapshot.ts";

const COMPANY_ALIASES: [RegExp, string][] = [
  [/\bpsa\b/i, "psa"],
  [/\bpca\b/i, "pca"],
  [/\bcgc\b/i, "cgc"],
  [/\b(bgs|beckett)\b/i, "bgs"],
  [/\bcollect\s?aura\b/i, "ca"],
];
// Annonces qui ne décrivent pas une carte française à l'unité.
const REJECT = /\b(lot|lots|proxy|custom|orica|fake|replica|réplique|jumbo|japonais\w*|japanese|jap|jpn|anglais\w*|english|korean|coréen\w*|chinois\w*|chinese)\b/i;

/** "raw", "psa:10", "pca:9.5"… ou null si l'annonce est à ignorer. */
export function classifyListing(title: string): string | null {
  if (REJECT.test(title)) return null;
  const company = COMPANY_ALIASES.find(([re]) => re.test(title))?.[1];
  if (!company) return /\b(grad[ée]e?|graded|slab)\b/i.test(title) ? null : "raw";
  const grade = title.match(/\b(10|9[.,]5|9|8[.,]5|8|7)\b(?!\s*\/)/)?.[1].replace(",", ".");
  const known = COMPANIES.find((c) => c.id === company)!.grades.includes(grade ?? "");
  return known ? `${company}:${grade}` : null;
}

export async function ebayClient() {
  const id = process.env.EBAY_CLIENT_ID;
  const secret = process.env.EBAY_CLIENT_SECRET;
  if (!id || !secret) return null;

  const auth = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
    method: "POST",
    headers: {
      authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope",
  });
  if (!auth.ok) throw new Error(`eBay : authentification refusée (${auth.status})`);
  const token = (await auth.json()).access_token as string;

  return async function observe(name: string, localId: string, official: number): Promise<EbayData | null> {
    const q = `${name} ${localId}/${official} pokemon`;
    // 183454 = cartes à l'unité de jeux de cartes à collectionner.
    const url = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(q)}&category_ids=183454&limit=200&filter=${encodeURIComponent("buyingOptions:{FIXED_PRICE},priceCurrency:EUR")}`;
    const res = await fetch(url, { headers: { authorization: `Bearer ${token}`, "X-EBAY-C-MARKETPLACE-ID": "EBAY_FR" } });
    if (!res.ok) return null;
    const items: { title: string; price?: { value: string; currency: string } }[] = (await res.json()).itemSummaries ?? [];
    const data: EbayData = { n: 0, raw: [], graded: {} };
    for (const item of items) {
      const price = Number(item.price?.value);
      const kind = item.price?.currency === "EUR" && price > 0 ? classifyListing(item.title) : null;
      if (!kind) continue;
      if (kind === "raw") {
        data.n++;
        if (data.raw.length < 40) data.raw.push(price);
      } else if ((data.graded[kind] ??= []).length < 25) data.graded[kind].push(price);
    }
    return data;
  };
}

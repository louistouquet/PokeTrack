"use client";
// La collection vit dans le navigateur (localStorage) : pas de compte, rien n'est envoyé.
// Elle s'exporte et s'importe en JSON pour changer d'appareil ou la sauvegarder.

import { useEffect, useState, useSyncExternalStore } from "react";
import { gradedPrice, type CompanyId } from "./pricing/graded";
import type { Finish } from "./pricing/raw";
import type { CardSummary, SetHistory, SetSnapshot } from "./snapshot";

export interface Item {
  key: string; // carte + finition + état : deux exemplaires identiques partagent la clé
  cardId: string;
  setId: string;
  setName: string;
  serieId: string;
  localId: string;
  name: string;
  image?: string;
  rarity?: string;
  finish: Finish;
  grade: { company: CompanyId; grade: string } | null; // null = non gradée
  qty: number;
  paid?: number; // prix d'achat unitaire, EUR
  added: string;
}
export type NewItem = Omit<Item, "key" | "added">;

const KEY = "poketrack.collection.v1";
const VALUES_KEY = "poketrack.values.v1";
const EMPTY: Item[] = [];
const listeners = new Set<() => void>();
let cache: Item[] | null = null;

export const itemKey = (i: Pick<Item, "cardId" | "finish" | "grade">) => `${i.cardId}|${i.finish}|${i.grade ? `${i.grade.company}:${i.grade.grade}` : "raw"}`;

function read(): Item[] {
  if (cache) return cache;
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    cache = Array.isArray(parsed) ? parsed : [];
  } catch {
    cache = [];
  }
  return cache!;
}
function write(items: Item[]) {
  cache = items;
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // Stockage plein ou navigation privée : la collection reste en mémoire pour la session.
  }
  listeners.forEach((l) => l());
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  // Un autre onglet a modifié la collection.
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      listener();
    }
  };
  addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    removeEventListener("storage", onStorage);
  };
}

export const useCollection = () => useSyncExternalStore(subscribe, read, () => EMPTY);

export function addItem(item: NewItem) {
  const key = itemKey(item);
  const items = read();
  const existing = items.find((i) => i.key === key);
  write(
    existing
      ? items.map((i) => (i.key === key ? { ...i, qty: i.qty + item.qty, paid: item.paid ?? i.paid } : i))
      : [...items, { ...item, key, added: new Date().toISOString() }],
  );
}
export function updateItem(key: string, patch: Partial<Pick<Item, "qty" | "paid" | "grade" | "finish">>) {
  const items = read();
  const current = items.find((i) => i.key === key);
  if (!current) return;
  const next = { ...current, ...patch };
  next.key = itemKey(next);
  // Changer l'état peut faire rejoindre un exemplaire déjà présent : on fusionne.
  const twin = next.key !== key ? items.find((i) => i.key === next.key) : undefined;
  write(items.flatMap((i) => (i.key === key ? (twin ? [] : [next]) : i === twin ? [{ ...i, qty: i.qty + next.qty }] : [i])));
}
export const removeItem = (key: string) => write(read().filter((i) => i.key !== key));

export const exportCollection = () => JSON.stringify({ app: "poketrack", version: 1, items: read() }, null, 2);
export function importCollection(json: string): number {
  const data = JSON.parse(json);
  const items: unknown = data?.items;
  if (data?.app !== "poketrack" || !Array.isArray(items)) throw new Error("Ce fichier n'est pas une sauvegarde PokéTrack.");
  const valid = items.filter((i): i is Item => typeof i?.cardId === "string" && typeof i?.setId === "string" && typeof i?.qty === "number" && i.qty > 0);
  write(valid.map((i) => ({ ...i, key: itemKey(i) })));
  return valid.length;
}

// ---------- Prix ----------

const snapshots = new Map<string, Promise<SetSnapshot | null>>();
const fetchJson = <T,>(url: string) =>
  fetch(url).then((r) => (r.ok ? (r.json() as Promise<T>) : null)).catch(() => null);
const loadSnapshot = (setId: string) => {
  if (!snapshots.has(setId)) snapshots.set(setId, fetchJson<SetSnapshot>(`/api/sets/${encodeURIComponent(setId)}`));
  return snapshots.get(setId)!;
};
export const loadHistory = (setId: string) => fetchJson<SetHistory>(`/api/history/${encodeURIComponent(setId)}`);

export type SetInfo = SetSnapshot["set"];

/** Cartes et extensions du jour pour ce que contient la collection. */
export function usePrices(items: Item[]): { cards: Map<string, CardSummary>; sets: Map<string, SetInfo>; loading: boolean } {
  const setIds = [...new Set(items.map((i) => i.setId))].sort().join(",");
  const [state, setState] = useState({ for: "", cards: new Map<string, CardSummary>(), sets: new Map<string, SetInfo>() });
  useEffect(() => {
    let alive = true;
    Promise.all(setIds ? setIds.split(",").map(loadSnapshot) : []).then((all) => {
      if (!alive) return;
      const cards = new Map<string, CardSummary>();
      const sets = new Map<string, SetInfo>();
      for (const s of all) {
        if (!s) continue;
        sets.set(s.set.id, s.set);
        for (const c of s.cards) cards.set(c.id, c);
      }
      setState({ for: setIds, cards, sets });
    });
    return () => {
      alive = false;
    };
  }, [setIds]);
  return { cards: state.cards, sets: state.sets, loading: state.for !== setIds };
}

/** Faux tant que la page n'est pas hydratée : évite d'afficher « collection vide » à tort. */
export const useHydrated = () => useSyncExternalStore(() => () => {}, () => true, () => false);

/** Prix non gradé de la finition possédée. */
export const rawValue = (item: Pick<Item, "finish">, card: CardSummary | undefined) => (item.finish === "reverse" ? card?.rev?.p : card?.std?.p) ?? null;

/** Valeur unitaire d'un exemplaire, dans son état. Gradé : prix observé, ou null s'il n'y en a pas. */
export function unitValue(item: Item, card: CardSummary | undefined): number | null {
  if (!item.grade) return rawValue(item, card);
  const { company, grade } = item.grade;
  return gradedPrice(card?.ebay?.graded[`${company}:${grade}`]);
}

// ---------- Historique de la valeur totale ----------

const today = () => new Date().toISOString().slice(0, 10);
function readValues(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(VALUES_KEY) ?? "{}");
  } catch {
    return {};
  }
}

/** Valeur de la collection jour après jour (une valeur par jour de visite), aujourd'hui compris. */
export function valueSeries(total: number): { day: string; value: number }[] {
  return Object.entries({ ...readValues(), [today()]: Math.round(total * 100) / 100 })
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, value]) => ({ day, value }));
}

/** Note la valeur du jour. */
export function saveValue(total: number) {
  try {
    localStorage.setItem(VALUES_KEY, JSON.stringify({ ...readValues(), [today()]: Math.round(total * 100) / 100 }));
  } catch {}
}

"use client";
import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  qty: number;
  img?: string;
  pos?: string;
  ph?: string;
  spec: string[];
};

type Ctx = {
  items: CartItem[];
  ready: boolean;
  add: (item: Omit<CartItem, "id" | "qty"> & { qty?: number }) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const KEY = "sovereign-bag";
const EMPTY: CartItem[] = [];

// A tiny external store backed by localStorage, read through useSyncExternalStore
// so the server renders an empty bag and the client picks up the saved one on hydration.
let items: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) items = JSON.parse(raw);
  } catch {}
}
function write(next: CartItem[]) {
  items = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  } catch {}
  listeners.forEach((l) => l());
}
function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}
function getSnapshot() {
  load();
  return items;
}
function getServerSnapshot() {
  return EMPTY;
}

const CartContext = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const list = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useSyncExternalStore(subscribe, () => true, () => false);

  const value = useMemo<Ctx>(
    () => ({
      items: list,
      ready,
      add: (item) => {
        const sig = item.slug + "|" + item.spec.join("|");
        const existing = items.find((i) => i.slug + "|" + i.spec.join("|") === sig);
        if (existing) {
          write(items.map((i) => (i.id === existing.id ? { ...i, qty: i.qty + (item.qty ?? 1) } : i)));
        } else {
          const id = Math.random().toString(36).slice(2, 9);
          write([...items, { ...item, id, qty: item.qty ?? 1 }]);
        }
      },
      remove: (id) => write(items.filter((i) => i.id !== id)),
      setQty: (id, qty) => write(items.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))),
      clear: () => write([]),
      count: list.reduce((a, i) => a + i.qty, 0),
      subtotal: list.reduce((a, i) => a + i.price * i.qty, 0),
    }),
    [list, ready],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart outside CartProvider");
  return ctx;
}

"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import Img from "./Img";
import { CATEGORIES, COLOURS, FABRIC_FILTERS, PRODUCTS, type Category } from "@/lib/data";

const WORDS = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
type FilterKey = "Colour" | "Fabric";
const SORTS = ["Featured", "Price, low to high", "Price, high to low", "New in"];

export default function CollectionView() {
  const router = useRouter();
  const params = useSearchParams();
  const category = (params.get("category") as Category | null) ?? null;
  const [open, setOpen] = useState<FilterKey | "Sort" | null>(null);
  const [picked, setPicked] = useState<Record<FilterKey, string[]>>({ Colour: [], Fabric: [] });
  const [sort, setSort] = useState(0);
  const [mobileFilters, setMobileFilters] = useState(false);

  const options: Record<FilterKey, { label: string; hex?: string }[]> = {
    Colour: COLOURS.map((c) => ({ label: c.name, hex: c.hex })),
    Fabric: FABRIC_FILTERS.map((f) => ({ label: f })),
  };

  const products = useMemo(() => {
    let list = PRODUCTS;
    if (category) list = list.filter((p) => (category === "Camisoles" ? p.category === "Camisoles" || p.category === "Shirts" : p.category === category));
    if (picked.Colour.length) list = list.filter((p) => picked.Colour.includes(COLOURS[p.colour].name));
    if (picked.Fabric.length) list = list.filter((p) => picked.Fabric.includes(p.fabric));
    if (sort === 1) list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 2) list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 3) list = [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    return list;
  }, [category, picked, sort]);

  const toggle = (k: FilterKey, label: string) =>
    setPicked((p) => ({ ...p, [k]: p[k].includes(label) ? p[k].filter((x) => x !== label) : [...p[k], label] }));
  const setCategory = (c: Category | null) => router.push(c ? `/collection?category=${c}` : "/collection", { scroll: false });

  const anyPicked = Object.values(picked).some((a) => a.length);
  const title = category === "Camisoles" ? "Camisoles & shirts" : category ?? "The collection";
  const subnav: [string, Category | null][] = [["All", null], ...CATEGORIES.filter((c) => c !== "Shirts").map((c) => [c === "Camisoles" ? "Camisoles & shirts" : c, c] as [string, Category])];

  const filterPanel = (k: FilterKey) => (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-[12px]">
      {options[k].map((o) => {
        const on = picked[k].includes(o.label);
        return (
          <button key={o.label} type="button" onClick={() => toggle(k, o.label)} className="flex items-center gap-3">
            <span className="check">{on ? "✕" : ""}</span>
            {o.hex ? <span className="inline-block h-3.5 w-3.5" style={{ background: o.hex }} /> : null}
            {o.label}
          </button>
        );
      })}
    </div>
  );

  // Editorial tile dropped into the grid, the way Max Mara and Toteme break up a long list.
  const grid: (typeof products[number] | "editorial")[] = [...products];
  if (!category && products.length > 4) grid.splice(4, 0, "editorial");

  return (
    <div className="pt-14 md:pt-16">
      <div className="px-5 pt-10 md:px-12 md:pt-14">
        <nav className="caption flex gap-2 tracking-[.14em]">
          <Link href="/" className="transition-colors hover:text-copper">Sovereign</Link>
          <span>/</span>
          <Link href="/collection" className="transition-colors hover:text-copper">Collection</Link>
          {category ? (<><span>/</span><span className="text-ink">{title}</span></>) : null}
        </nav>
        <div className="mt-6 flex flex-col gap-3 md:mt-8 md:flex-row md:items-end md:justify-between">
          <h1 className="display text-[30px] md:text-[38px]">{title}</h1>
          <span className="label">{WORDS[products.length] ?? products.length} {products.length === 1 ? "style" : "styles"} · Autumn 2026</span>
        </div>
        {/* Category subnav */}
        <div className="mt-8 flex gap-6 overflow-x-auto text-[11px] uppercase tracking-[.16em] [scrollbar-width:none] md:mt-10 md:gap-9 [&::-webkit-scrollbar]:hidden">
          {subnav.map(([l, c]) => (
            <button key={l} type="button" onClick={() => setCategory(c)} className={`whitespace-nowrap border-b pb-2 transition-colors duration-500 ${category === c ? "border-copper text-ink" : "border-transparent text-muted hover:text-ink"}`}>{l}</button>
          ))}
        </div>
      </div>

      {/* Desktop filter bar */}
      <div className="mx-5 mt-6 hidden items-center justify-between border-y border-stone py-4 text-[11px] uppercase tracking-[.16em] md:mx-12 md:flex">
        <div className="flex gap-10">
          {(Object.keys(options) as FilterKey[]).map((k) => (
            <button key={k} type="button" onClick={() => setOpen(open === k ? null : k)} className={`flex items-center gap-2.5 transition-colors duration-500 ${open === k ? "text-copper" : ""}`}>
              <span>{picked[k].length ? `${k} · ${picked[k].length}` : k}</span>
              <span className="text-[9px]">▾</span>
            </button>
          ))}
          {anyPicked ? <button type="button" onClick={() => setPicked({ Colour: [], Fabric: [] })} className="text-muted transition-colors hover:text-copper">Clear</button> : null}
        </div>
        <button type="button" onClick={() => setOpen(open === "Sort" ? null : "Sort")} className="flex gap-2.5 text-muted">
          Sort <span className="text-ink">{SORTS[sort]}</span>
        </button>
      </div>
      {open && open !== "Sort" ? (
        <div className="mx-12 hidden items-center gap-14 border-b border-stone py-6 md:flex">
          <span className="label w-16">{open}</span>
          {filterPanel(open)}
          <button type="button" onClick={() => setOpen(null)} className="label ml-auto transition-colors hover:text-copper">Close</button>
        </div>
      ) : null}
      {open === "Sort" ? (
        <div className="mx-12 hidden items-center justify-end gap-10 border-b border-stone py-6 text-[12px] md:flex">
          {SORTS.map((s, i) => (
            <button key={s} type="button" onClick={() => { setSort(i); setOpen(null); }} className={`border-b pb-0.5 ${sort === i ? "border-copper text-ink" : "border-transparent text-muted"}`}>{s}</button>
          ))}
        </div>
      ) : null}

      {/* Mobile filter bar */}
      <div className="mx-5 mt-6 flex items-center justify-between border-y border-stone py-3.5 text-[10px] uppercase tracking-[.18em] md:hidden">
        <button type="button" onClick={() => setMobileFilters((m) => !m)}>{mobileFilters ? "Close" : anyPicked ? "Filter · on" : "Filter"}</button>
        <button type="button" onClick={() => setSort((sort + 1) % SORTS.length)} className="text-muted">
          Sort <span className="text-ink">{SORTS[sort]}</span>
        </button>
      </div>
      {mobileFilters ? (
        <div className="mx-5 flex flex-col gap-6 border-b border-stone py-6 md:hidden">
          {(Object.keys(options) as FilterKey[]).map((k) => (
            <div key={k} className="flex flex-col gap-3"><span className="label">{k}</span>{filterPanel(k)}</div>
          ))}
        </div>
      ) : null}

      {/* Grid */}
      {products.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 px-5 pt-8 md:grid-cols-4 md:gap-x-6 md:gap-y-14 md:px-12 md:pt-12">
          {grid.map((p) =>
            p === "editorial" ? (
              <Link key="editorial" href="/suits" className="group relative col-span-2 block overflow-hidden">
                <div className="relative aspect-[3/2] md:aspect-auto md:h-full md:min-h-[520px]">
                  <Img src="/assets/w-coat.jpg" alt="Made to measure" pos="center 30%" sizes="(min-width: 768px) 50vw, 100vw" className="transition-transform duration-[1600ms] ease-[var(--ease-quiet)] group-hover:scale-[1.02]" />
                </div>
                <div className="absolute bottom-6 left-6 flex flex-col gap-3 text-ivory md:bottom-8 md:left-8">
                  <span className="text-[10px] uppercase tracking-[.22em]">Made to measure</span>
                  <span className="serif text-[22px] md:text-[26px]">Every piece, cut to you.</span>
                  <span className="link-line self-start">Book an appointment</span>
                </div>
              </Link>
            ) : (
              <ProductCard key={p.slug} p={p} />
            ),
          )}
        </div>
      ) : (
        <div className="px-5 pt-20 text-center md:px-12">
          <p className="serif text-[22px]">Nothing in this combination yet.</p>
          <button type="button" onClick={() => setPicked({ Colour: [], Fabric: [] })} className="link-line mt-6">Clear filters</button>
        </div>
      )}

      <div className="pb-24 md:pb-32" />
    </div>
  );
}

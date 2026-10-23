"use client";
import Link from "next/link";
import { useState } from "react";
import Img from "./Img";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import { Segmented, Swatches } from "./Controls";
import { BUTTONS, CLOTHS, COLOURS, EDITORIAL, FITS, LININGS, MONOGRAM_PRICE, MTM_PRICE, PRODUCTS, SIZES, formatMonogram, type Product } from "@/lib/data";
import { inr } from "@/lib/format";
import { useCart } from "@/lib/cart";

function Section({ label, value, children }: { label: string; value?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between"><span className="label">{label}</span>{value ? <span className="label text-ink">{value}</span> : null}</div>
      {children}
    </div>
  );
}

export default function ProductView({ p, look }: { p: Product; look: Product[] }) {
  const [colour, setColour] = useState(p.colour);
  const [cloth, setCloth] = useState(0);
  const [fit, setFit] = useState(1);
  const [lapel, setLapel] = useState(0);
  const [lining, setLining] = useState(0);
  const [buttons, setButtons] = useState(0);
  const [mono, setMono] = useState("");
  const [std, setStd] = useState(true);
  const [size, setSize] = useState<number | null>(null);
  const [added, setAdded] = useState(false);
  const [sizeNudge, setSizeNudge] = useState(false);
  const { add } = useCart();

  const c = COLOURS[colour];
  const monogram = formatMonogram(mono);
  const clothDelta = p.tailored ? CLOTHS[cloth].delta : 0;
  const total = p.price + clothDelta + (std ? 0 : MTM_PRICE) + (monogram ? MONOGRAM_PRICE : 0);
  const lapelName = p.lapel ? p.lapel.options[lapel] + (p.lapel.label === "Lapel" ? " lapel" : "") : "";
  const hasJacketOptions = p.category === "Blazers" || p.category === "Waistcoats" || p.category === "Three-piece";

  const addToBag = () => {
    if (std && size === null) {
      setSizeNudge(true);
      return;
    }
    const spec = [c.name];
    if (p.tailored) spec.push(CLOTHS[cloth].name);
    spec.push(FITS[fit]);
    if (p.lapel) spec.push(lapelName);
    if (hasJacketOptions) spec.push(`${LININGS[lining]} lining · ${BUTTONS[buttons]} buttons`);
    if (monogram) spec.push("Monogram " + monogram);
    spec.push(std ? "UK " + SIZES[size as number] : "Made to measure");
    add({ slug: p.slug, name: `${p.name}, ${c.name}`, price: total, img: p.img, pos: p.pos, spec });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const gallery = [p.img2, ...EDITORIAL].filter((g) => g !== p.img).filter((g, i, a) => a.indexOf(g) === i).slice(0, 3);
  const alsoLike = PRODUCTS.filter((x) => x.slug !== p.slug && !p.look.includes(x.slug)).slice(0, 4);

  const preview = (
    <div className="relative aspect-[4/5] overflow-hidden bg-stone-deep">
      <Img src={p.img} alt={p.name} pos={p.pos} priority sizes="(min-width: 768px) 32vw, 88vw" />
      <div className="pointer-events-none absolute inset-0 transition-all duration-[600ms]" style={{ background: c.tint, mixBlendMode: "multiply", opacity: c.tintO }} />
      <div className="caption absolute bottom-4 left-4 flex gap-3 text-ivory md:bottom-5 md:left-5">
        <span>{c.name}</span>
        <span>{FITS[fit]}</span>
        {p.lapel ? <span>{lapelName}</span> : null}
      </div>
      <div className="serif absolute bottom-3.5 right-4 min-h-[24px] text-[16px] tracking-[.24em] text-copper md:right-5 md:text-[18px]">{monogram}</div>
    </div>
  );

  return (
    <div className="pt-14 md:pt-16">
      <nav className="caption flex gap-2 px-5 pt-6 tracking-[.14em] md:px-12 md:pt-8">
        <Link href="/" className="transition-colors hover:text-copper">Sovereign</Link>
        <span>/</span>
        <Link href="/collection" className="transition-colors hover:text-copper">Collection</Link>
        <span>/</span>
        <Link href={`/collection?category=${p.category}`} className="transition-colors hover:text-copper">{p.category}</Link>
        <span className="hidden md:inline">/</span>
        <span className="hidden text-ink md:inline">{p.name}, {COLOURS[p.colour].name}</span>
      </nav>

      <div className="mt-6 md:mt-8 md:grid md:grid-cols-12 md:gap-6 md:px-12">
        {/* Gallery: two-up on desktop, swipe on mobile */}
        <div className="hidden grid-cols-2 gap-4 self-start md:col-span-8 md:grid">
          {preview}
          {gallery.map((g) => (
            <div key={g} className="relative aspect-[4/5] overflow-hidden bg-stone-deep">
              <Img src={g} alt="" pos="center 30%" sizes="32vw" />
            </div>
          ))}
        </div>
        <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="w-[84vw] flex-none snap-start">{preview}</div>
          {gallery.map((g) => (
            <div key={g} className="relative aspect-[4/5] w-[84vw] flex-none snap-start overflow-hidden bg-stone-deep">
              <Img src={g} alt="" pos="center 30%" sizes="84vw" />
            </div>
          ))}
        </div>

        {/* Purchase panel */}
        <div className="px-5 pt-8 md:sticky md:top-20 md:col-span-4 md:self-start md:px-0 md:pl-6 md:pt-0">
          <div className="flex flex-col gap-7 md:border md:border-stone md:p-8">
            <div className="flex flex-col gap-2">
              <span className="label">{p.category} · Autumn 2026</span>
              <div className="flex items-baseline justify-between gap-4">
                <h1 className="serif text-[24px] leading-[1.2] md:text-[26px]">{p.name}, {c.name}</h1>
              </div>
              <div className="flex items-center justify-between">
                <span className="caption">{p.fabric} · {p.origin}</span>
                <span className="text-[14px]">{inr(total)}</span>
              </div>
            </div>

            <p className="text-[13px] leading-[1.85] text-ink/90">{p.description}</p>

            <div className="flex flex-col gap-6 border-t border-stone pt-6">
              <Section label="Colour" value={c.name}>
                <Swatches value={colour} onChange={setColour} size={24} />
              </Section>

              {p.tailored ? (
                <Section label="Cloth" value={CLOTHS[cloth].name}>
                  <div className="grid grid-cols-2 gap-2">
                    {CLOTHS.map((k, i) => (
                      <button key={k.name} type="button" onClick={() => setCloth(i)} className={`flex items-center gap-3 border p-2 text-left transition-colors duration-400 ${cloth === i ? "border-copper" : "border-stone hover:border-grey"}`}>
                        <span className="h-8 w-8 flex-none" style={{ background: k.swatch }} />
                        <span className="flex flex-col leading-[1.4]">
                          <span className="text-[11px] tracking-[.02em]">{k.name}</span>
                          <span className="text-[10px] text-muted">{k.origin} · {k.delta ? "+ " + inr(k.delta) : "included"}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </Section>
              ) : null}

              <Section label="Fit"><Segmented options={FITS} value={fit} onChange={setFit} /></Section>

              {p.lapel ? <Section label={p.lapel.label}><Segmented options={p.lapel.options} value={lapel} onChange={setLapel} /></Section> : null}

              {hasJacketOptions ? (
                <div className="grid grid-cols-2 gap-4">
                  <Section label="Lining">
                    <select value={lining} onChange={(e) => setLining(Number(e.target.value))} className="input-line filled !text-[12px]">
                      {LININGS.map((l, i) => <option key={l} value={i}>{l}</option>)}
                    </select>
                  </Section>
                  <Section label="Buttons">
                    <select value={buttons} onChange={(e) => setButtons(Number(e.target.value))} className="input-line filled !text-[12px]">
                      {BUTTONS.map((b, i) => <option key={b} value={i}>{b}</option>)}
                    </select>
                  </Section>
                </div>
              ) : null}

              <div className="grid grid-cols-[1fr_auto] items-end gap-4">
                <Section label="Monogram · optional">
                  <input value={mono} onChange={(e) => setMono(e.target.value)} maxLength={3} placeholder="Initials" className="input-line serif !text-[18px] tracking-[.2em] !text-copper" style={{ borderBottomColor: "#2B2A28" }} />
                </Section>
                <span className="pb-2 text-[10px] text-muted">Hand-embroidered, {inr(MONOGRAM_PRICE)}</span>
              </div>

              <Section label="Size" value={std ? (size !== null ? "UK " + SIZES[size] : sizeNudge ? "Choose a size" : "") : "Made to measure"}>
                <div className={`grid grid-cols-6 border-l border-t ${sizeNudge && size === null && std ? "border-copper" : "border-stone"}`}>
                  {SIZES.map((s, i) => (
                    <button key={s} type="button" onClick={() => { setSize(i); setStd(true); setSizeNudge(false); }} className={`border-b border-r py-2.5 text-[11px] tracking-[.1em] transition-colors duration-300 ${std && size === i ? "border-copper bg-ink text-ivory" : "border-stone hover:bg-stone-deep"}`}>{s}</button>
                  ))}
                </div>
                <button type="button" onClick={() => { setStd(!std); setSizeNudge(false); }} className="flex items-center justify-between text-left text-[12px]">
                  <span className="flex items-center gap-3"><span className={`radio ${!std ? "on" : ""}`}><span /></span>Made to measure</span>
                  <span className="caption">+ {inr(MTM_PRICE)} · 6 weeks</span>
                </button>
                <Link href="/suits" className="caption self-start border-b border-stone pb-0.5 transition-colors hover:text-copper">About made to measure</Link>
              </Section>
            </div>

            <div className="flex flex-col gap-3 pt-1">
              <button type="button" onClick={addToBag} className="btn btn-primary !justify-between px-6">
                <span>{added ? "Added to cart" : "Add to cart"}</span>
                <span>{inr(total)}</span>
              </button>
            </div>

            <ul className="flex flex-col gap-2 border-t border-stone pt-5 text-[11px] leading-[1.7] text-muted">
              <li>Delivered in four to six weeks</li>
              <li>Complimentary delivery and returns across India</li>
              <li>Complimentary alterations for the life of the garment</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Details and care */}
      <section className="mt-20 grid gap-10 border-t border-stone px-5 pt-12 md:mt-28 md:grid-cols-12 md:gap-6 md:px-12 md:pt-16">
        <div className="md:col-span-5">
          <span className="label">Details</span>
          <ul className="mt-5 flex flex-col gap-1.5 text-[13px] leading-[1.8]">
            {p.details.map((d) => <li key={d} className="flex gap-3"><span className="text-copper">·</span>{d}</li>)}
          </ul>
        </div>
        <div className="md:col-span-5 md:col-start-7">
          <span className="label">Composition &amp; care</span>
          <p className="mt-5 text-[13px] leading-[1.8]">{p.composition}</p>
          <p className="mt-3 text-[13px] leading-[1.8]">{p.care}</p>
          <p className="caption mt-6 tracking-[.14em]">Made in our atelier · Cloth from {p.origin}</p>
        </div>
      </section>

      {/* Complete the look */}
      {look.length ? (
        <section className="px-5 pt-20 md:px-12 md:pt-28">
          <div className="mb-6 flex items-baseline justify-between md:mb-8">
            <h2 className="serif text-[22px] md:text-[26px]">Complete the look</h2>
            <Link href="/collection" className="link-line hidden md:inline-block">View all</Link>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
            {look.map((l, i) => <Reveal key={l.slug} delay={i * 80}><ProductCard p={l} /></Reveal>)}
          </div>
        </section>
      ) : null}

      {/* You may also like */}
      {alsoLike.length ? (
        <section className="px-5 pb-24 pt-20 md:px-12 md:pb-32 md:pt-28">
          <h2 className="serif mb-6 text-[22px] md:mb-8 md:text-[26px]">You may also like</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
            {alsoLike.map((l, i) => <Reveal key={l.slug} delay={i * 80}><ProductCard p={l} /></Reveal>)}
          </div>
        </section>
      ) : null}
    </div>
  );
}

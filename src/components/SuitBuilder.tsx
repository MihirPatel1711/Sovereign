"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Img from "./Img";
import { CLOTHS, COLOURS, MONOGRAM_PRICE, MTM_PRICE, SIZES, SUIT_PIECES, formatMonogram } from "@/lib/data";
import { inr } from "@/lib/format";
import { useCart } from "@/lib/cart";

/* ---------- option definitions ---------- */
type Opt = { key: string; label: string; icon?: string; swatch?: string };
type Group = { key: string; label: string; options: Opt[] };

const FIT: Group = { key: "fit", label: "Fit", options: [{ key: "relaxed", label: "Relaxed" }, { key: "tailored", label: "Tailored" }, { key: "slim", label: "Slim" }] };
const LINING: Group = { key: "lining", label: "Lining", options: [{ key: "tonal", label: "Tonal", swatch: "#C9BFAE" }, { key: "copper", label: "Copper silk", swatch: "#8F6240" }, { key: "midnight", label: "Midnight silk", swatch: "#2A2F3A" }] };
const BUTTON_MAT: Group = { key: "buttonMat", label: "Button material", options: [{ key: "horn", label: "Horn", swatch: "#4A3A2E" }, { key: "mop", label: "Mother-of-pearl", swatch: "#E8E3DA" }, { key: "covered", label: "Covered in cloth", swatch: "repeating-linear-gradient(45deg,#C9BFAE 0 2px,#BFB5A4 2px 4px)" }] };

const BLAZER: Group[] = [
  FIT,
  { key: "lapel", label: "Lapel", options: [{ key: "notch", label: "Notch", icon: "lapel-notch" }, { key: "peak", label: "Peak", icon: "lapel-peak" }, { key: "shawl", label: "Shawl", icon: "lapel-shawl" }] },
  { key: "buttons", label: "Buttons", options: [{ key: "one", label: "One", icon: "btn-1" }, { key: "two", label: "Two", icon: "btn-2" }, { key: "three", label: "Three", icon: "btn-3" }] },
  { key: "pockets", label: "Pockets", options: [{ key: "flap", label: "Flap", icon: "pocket-flap" }, { key: "jetted", label: "Jetted", icon: "pocket-jetted" }, { key: "patch", label: "Patch", icon: "pocket-patch" }] },
  { key: "vents", label: "Vents", options: [{ key: "side", label: "Side", icon: "vent-side" }, { key: "centre", label: "Centre", icon: "vent-centre" }, { key: "none", label: "None", icon: "vent-none" }] },
  LINING,
  BUTTON_MAT,
];
const WAISTCOAT: Group[] = [
  FIT,
  { key: "front", label: "Front", options: [{ key: "plain", label: "No lapel", icon: "wc-plain" }, { key: "shawl", label: "Shawl", icon: "wc-shawl" }, { key: "notch", label: "Notch", icon: "wc-notch" }] },
  { key: "buttons", label: "Buttons", options: [{ key: "five", label: "Five", icon: "btn-5" }, { key: "six", label: "Six", icon: "btn-6" }] },
  { key: "back", label: "Back", options: [{ key: "silk", label: "Silk, with adjuster" }, { key: "self", label: "Self cloth" }] },
  LINING,
  BUTTON_MAT,
];
const TROUSER: Group[] = [
  FIT,
  { key: "pleats", label: "Pleats", options: [{ key: "flat", label: "Flat front", icon: "pleat-0" }, { key: "single", label: "Single pleat", icon: "pleat-1" }, { key: "double", label: "Double pleat", icon: "pleat-2" }] },
  { key: "hem", label: "Hem", options: [{ key: "plain", label: "Plain", icon: "hem-plain" }, { key: "cuff", label: "Cuff", icon: "hem-cuff" }] },
  { key: "waist", label: "Waistband", options: [{ key: "adjusters", label: "Side adjusters" }, { key: "loops", label: "Belt loops" }] },
];
const GROUPS: Group[][] = [BLAZER, WAISTCOAT, TROUSER];
const DEFAULTS: Record<string, string>[] = [
  { fit: "tailored", lapel: "notch", buttons: "two", pockets: "flap", vents: "side", lining: "tonal", buttonMat: "horn" },
  { fit: "tailored", front: "plain", buttons: "five", back: "silk", lining: "tonal", buttonMat: "horn" },
  { fit: "tailored", pleats: "single", hem: "plain", waist: "adjusters" },
];
const STEPS = ["Cloth", ...SUIT_PIECES.map((p) => p.name), "Finish"];

/* ---------- line icons, 48 x 48 ---------- */
function Icon({ name }: { name: string }) {
  const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.1, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  const jacket = <path {...s} d="M10 44V14l9-6 5 10 5-10 9 6v30z" />;
  const dots = (n: number) => Array.from({ length: n }, (_, i) => <circle key={i} cx="24" cy={28 + i * 5 - (n - 1) * 2.5} r="1.1" fill="currentColor" />);
  const back = <path {...s} d="M11 44V12l13-4 13 4v32z" />;
  const trouser = <path {...s} d="M12 6h24v6l2 32h-9l-5-22-5 22h-9l2-32z" />;
  const wc = <path {...s} d="M12 44V12l7-4 5 10 5-10 7 4v32z" />;
  switch (name) {
    case "lapel-notch": return <svg viewBox="0 0 48 48" className="h-14 w-14">{jacket}<path {...s} d="M19 8l5 16 5-16M16 16l3-8M32 16l-3-8M17 15l-1 5M31 15l1 5" /></svg>;
    case "lapel-peak": return <svg viewBox="0 0 48 48" className="h-14 w-14">{jacket}<path {...s} d="M19 8l5 16 5-16M14 20l5-12 1 7M34 20l-5-12-1 7" /></svg>;
    case "lapel-shawl": return <svg viewBox="0 0 48 48" className="h-14 w-14">{jacket}<path {...s} d="M19 8c-3 6-3 12 5 18 8-6 8-12 5-18" /></svg>;
    case "btn-1": return <svg viewBox="0 0 48 48" className="h-14 w-14">{jacket}<path {...s} d="M19 8l5 16 5-16" />{dots(1)}</svg>;
    case "btn-2": return <svg viewBox="0 0 48 48" className="h-14 w-14">{jacket}<path {...s} d="M19 8l5 16 5-16" />{dots(2)}</svg>;
    case "btn-3": return <svg viewBox="0 0 48 48" className="h-14 w-14">{jacket}<path {...s} d="M19 8l5 14 5-14" />{dots(3)}</svg>;
    case "pocket-flap": return <svg viewBox="0 0 48 48" className="h-14 w-14">{jacket}<path {...s} d="M13 30h9v3h-9zM26 30h9v3h-9z" /></svg>;
    case "pocket-jetted": return <svg viewBox="0 0 48 48" className="h-14 w-14">{jacket}<path {...s} d="M13 31h9M26 31h9M13 32.5h9M26 32.5h9" /></svg>;
    case "pocket-patch": return <svg viewBox="0 0 48 48" className="h-14 w-14">{jacket}<path {...s} d="M13 30h9v9h-9zM26 30h9v9h-9z" /></svg>;
    case "vent-side": return <svg viewBox="0 0 48 48" className="h-14 w-14">{back}<path {...s} d="M15 44V34M33 44V34" /></svg>;
    case "vent-centre": return <svg viewBox="0 0 48 48" className="h-14 w-14">{back}<path {...s} d="M24 44V32" /></svg>;
    case "vent-none": return <svg viewBox="0 0 48 48" className="h-14 w-14">{back}</svg>;
    case "wc-plain": return <svg viewBox="0 0 48 48" className="h-14 w-14">{wc}{dots(5)}</svg>;
    case "wc-shawl": return <svg viewBox="0 0 48 48" className="h-14 w-14">{wc}<path {...s} d="M19 8c-2 6-2 12 5 18 7-6 7-12 5-18" />{dots(4)}</svg>;
    case "wc-notch": return <svg viewBox="0 0 48 48" className="h-14 w-14">{wc}<path {...s} d="M17 16l2-8M31 16l-2-8M18 15l-1 4M30 15l1 4" />{dots(4)}</svg>;
    case "btn-5": return <svg viewBox="0 0 48 48" className="h-14 w-14">{wc}{dots(5)}</svg>;
    case "btn-6": return <svg viewBox="0 0 48 48" className="h-14 w-14">{wc}{dots(6)}</svg>;
    case "pleat-0": return <svg viewBox="0 0 48 48" className="h-14 w-14">{trouser}</svg>;
    case "pleat-1": return <svg viewBox="0 0 48 48" className="h-14 w-14">{trouser}<path {...s} d="M19 12v10M29 12v10" /></svg>;
    case "pleat-2": return <svg viewBox="0 0 48 48" className="h-14 w-14">{trouser}<path {...s} d="M17 12v10M21 12v8M27 12v8M31 12v10" /></svg>;
    case "hem-plain": return <svg viewBox="0 0 48 48" className="h-14 w-14"><path {...s} d="M16 6v38h16V6" /></svg>;
    case "hem-cuff": return <svg viewBox="0 0 48 48" className="h-14 w-14"><path {...s} d="M16 6v38h16V6M16 38h16" /></svg>;
    default: return null;
  }
}

/* ---------- component ---------- */
export default function SuitBuilder() {
  const router = useRouter();
  const { add } = useCart();
  const [step, setStep] = useState(0);
  const [cloth, setCloth] = useState(0);
  const [colour, setColour] = useState(1);
  const [choices, setChoices] = useState<Record<string, string>[]>(DEFAULTS);
  const [open, setOpen] = useState<string | null>(null);
  const [mono, setMono] = useState("");
  const [std, setStd] = useState(true);
  const [size, setSize] = useState<number | null>(null);
  const [nudge, setNudge] = useState(false);

  const pieceIndex = step - 1;
  const onPiece = step >= 1 && step <= 3;
  const finish = step === 4;
  const piece = onPiece ? SUIT_PIECES[pieceIndex] : null;
  const monogram = formatMonogram(mono);
  const total = SUIT_PIECES.reduce((a, x) => a + x.price, 0) + CLOTHS[cloth].delta * 3 + (monogram ? MONOGRAM_PRICE : 0) + (std ? 0 : MTM_PRICE);

  const pick = (g: string, v: string) => {
    setChoices((prev) => prev.map((c, i) => (i === pieceIndex ? { ...c, [g]: v } : c)));
    setOpen(null);
  };
  const labelOf = (i: number, g: Group) => g.options.find((o) => o.key === choices[i][g.key])?.label ?? "";
  const summary = (i: number) => GROUPS[i].map((g) => labelOf(i, g)).join(" · ");

  const addSuit = () => {
    if (std && size === null) {
      setNudge(true);
      return;
    }
    const lines = [`${CLOTHS[cloth].name}, ${COLOURS[colour].name}`, ...SUIT_PIECES.map((x, i) => `${x.name}: ${summary(i)}`)];
    if (monogram) lines.push("Monogram " + monogram);
    lines.push(std ? "UK " + SIZES[size as number] : "Made to measure");
    add({ slug: "three-piece-custom", name: "The Three-piece, " + COLOURS[colour].name, price: total, img: "/assets/hero-three-piece.jpg", pos: "70% 30%", spec: lines });
    router.push("/bag");
  };
  const goto = (k: number) => {
    setStep(k);
    setOpen(null);
  };
  const next = () => (finish ? addSuit() : goto(step + 1));
  const nextLabel = finish ? "Add suit to cart" : "Next · " + STEPS[step + 1];

  /* ---- panel pieces ---- */
  const tabs = (
    <div className="grid grid-cols-5 border-b border-stone">
      {STEPS.map((n, k) => (
        <button key={n} type="button" onClick={() => goto(k)} className={`-mb-px border-b py-2.5 text-[10px] uppercase tracking-[.14em] transition-colors duration-500 ${k === step ? "border-copper text-ink" : "border-transparent text-muted hover:text-ink"}`}>
          {n}
        </button>
      ))}
    </div>
  );

  const clothStep = (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between"><span className="label">Cloth</span><span className="label text-ink">{CLOTHS[cloth].name}</span></div>
        <div className="grid grid-cols-2 gap-2">
          {CLOTHS.map((k, i) => (
            <button key={k.name} type="button" onClick={() => setCloth(i)} className={`flex items-center gap-3 border p-2.5 text-left transition-colors ${cloth === i ? "border-ink" : "border-stone hover:border-grey"}`}>
              <span className="h-10 w-10 flex-none" style={{ background: k.swatch }} />
              <span className="flex flex-col gap-0.5 leading-[1.3]">
                <span className="text-[12px]">{k.name}</span>
                <span className="text-[10px] text-muted">{k.delta ? "+ " + inr(k.delta) + " per piece" : "Included"}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between"><span className="label">Colour</span><span className="label text-ink">{COLOURS[colour].name}</span></div>
        <div className="grid grid-cols-5 gap-2">
          {COLOURS.map((c, i) => (
            <button key={c.name} type="button" onClick={() => setColour(i)} className={`flex flex-col items-center gap-2 border p-1.5 transition-colors ${colour === i ? "border-ink" : "border-stone hover:border-grey"}`}>
              <span className="h-8 w-full" style={{ background: c.hex }} />
              <span className="text-[10px]">{c.name}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="text-[11px] leading-[1.7] text-muted">One length of cloth for all three pieces, so the colour ages together.</p>
    </div>
  );

  const groupList = piece ? (
    <div className="flex flex-col border-t border-stone">
      {GROUPS[pieceIndex].map((g) => (
        <button key={g.key} type="button" onClick={() => setOpen(g.key)} className="group flex items-center justify-between border-b border-stone py-3 text-left">
          <span className="label">{g.label}</span>
          <span className="flex items-center gap-3">
            <span className="serif text-[15px]">{labelOf(pieceIndex, g)}</span>
            <span className="text-[10px] text-muted transition-colors group-hover:text-copper">&rarr;</span>
          </span>
        </button>
      ))}
    </div>
  ) : null;

  const detailGroup = piece && open ? GROUPS[pieceIndex].find((x) => x.key === open) : undefined;
  const groupDetail = piece && detailGroup ? (
    <div className="flex flex-col gap-4">
      <button type="button" onClick={() => setOpen(null)} className="caption self-start border-b border-stone pb-0.5 transition-colors hover:text-copper">&larr; The {piece.name}</button>
      <div className="flex justify-between"><span className="label">{detailGroup.label}</span><span className="label text-ink">{labelOf(pieceIndex, detailGroup)}</span></div>
      <div className={`grid gap-2 ${detailGroup.options.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
        {detailGroup.options.map((o) => {
          const on = choices[pieceIndex][detailGroup.key] === o.key;
          return (
            <button key={o.key} type="button" onClick={() => pick(detailGroup.key, o.key)} className={`flex flex-col items-center gap-3 border px-2 py-5 text-center transition-colors ${on ? "border-ink" : "border-stone hover:border-grey"}`}>
              {o.icon ? <span className={on ? "text-ink" : "text-muted"}><Icon name={o.icon} /></span> : null}
              {o.swatch ? <span className="h-12 w-12" style={{ background: o.swatch }} /> : null}
              <span className="text-[11px] leading-[1.3]">{o.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  ) : null;

  const finishStep = (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col border-t border-stone">
        <div className="flex items-baseline justify-between border-b border-stone py-2.5">
          <span className="flex flex-col"><span className="serif text-[14px]">Cloth</span><span className="caption normal-case tracking-[.06em]">{CLOTHS[cloth].name}, {COLOURS[colour].name}</span></span>
          <button type="button" onClick={() => goto(0)} className="caption border-b border-stone pb-0.5 transition-colors hover:text-copper">Edit</button>
        </div>
        {SUIT_PIECES.map((x, i) => (
          <div key={x.key} className="flex items-baseline justify-between gap-4 border-b border-stone py-2.5">
            <span className="flex min-w-0 flex-col"><span className="serif text-[14px]">The {x.name} · {inr(x.price + CLOTHS[cloth].delta)}</span><span className="caption truncate normal-case tracking-[.06em]">{summary(i)}</span></span>
            <button type="button" onClick={() => goto(i + 1)} className="caption flex-none border-b border-stone pb-0.5 transition-colors hover:text-copper">Edit</button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_auto] items-end gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="label">Monogram · optional</span>
          <input value={mono} onChange={(e) => setMono(e.target.value)} maxLength={3} placeholder="Initials" className="input-line serif !py-1 !text-[17px] tracking-[.2em] !text-copper" style={{ borderBottomColor: "#2B2A28" }} />
        </div>
        <span className="pb-2 text-[10px] text-muted">{inr(MONOGRAM_PRICE)}</span>
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between"><span className="label">Size</span><span className="label text-ink">{std ? (size !== null ? "UK " + SIZES[size] : nudge ? "Choose a size" : "") : "Made to measure"}</span></div>
        <div className={`grid grid-cols-6 border-l border-t ${nudge && std && size === null ? "border-copper" : "border-stone"}`}>
          {SIZES.map((s, k) => (
            <button key={s} type="button" onClick={() => { setSize(k); setStd(true); setNudge(false); }} className={`border-b border-r py-2 text-[11px] tracking-[.1em] transition-colors ${std && size === k ? "border-copper bg-ink text-ivory" : "border-stone hover:bg-stone-deep"}`}>{s}</button>
          ))}
        </div>
        <button type="button" onClick={() => { setStd(!std); setNudge(false); }} className="flex items-center justify-between text-left text-[12px]">
          <span className="flex items-center gap-3"><span className={`radio ${!std ? "on" : ""}`}><span /></span>Made to measure, by appointment</span>
          <span className="caption">+ {inr(MTM_PRICE)}</span>
        </button>
      </div>
    </div>
  );

  const body = step === 0 ? clothStep : finish ? finishStep : open ? groupDetail : groupList;
  const title = step === 0 ? "Cloth and colour" : finish ? "Your suit" : "The " + (piece as (typeof SUIT_PIECES)[number]).name;

  const panel = (
    <div className="flex h-full flex-col">
      <div className="flex items-baseline justify-between pb-4">
        <div className="flex flex-col gap-1">
          <span className="label">Compose a three-piece</span>
          <h1 className="serif text-[24px]">{title}</h1>
        </div>
        <Link href="/suits" className="caption border-b border-stone pb-0.5 transition-colors hover:text-copper">Made to measure</Link>
      </div>
      {tabs}
      <div className="flex-1 overflow-hidden py-5">{body}</div>
      <div className="flex flex-col gap-3 border-t border-stone pt-4">
        <div className="flex items-baseline justify-between">
          <span className="label">Complete suit</span>
          <span className="serif text-[22px]">{inr(total)}</span>
        </div>
        <div className="grid grid-cols-[auto_1fr] items-center gap-5">
          <button type="button" onClick={() => goto(Math.max(0, step - 1))} disabled={step === 0} className={`text-[11px] uppercase tracking-[.2em] ${step === 0 ? "text-grey" : "text-ink"}`}>Back</button>
          <button type="button" onClick={next} className="btn btn-primary !h-12">{nextLabel}</button>
        </div>
      </div>
    </div>
  );

  const backdrop = (
    <>
      <Img src="/assets/hero-three-piece.jpg" alt="Your three-piece" pos="72% 40%" priority />
      <div className="pointer-events-none absolute inset-0 transition-all duration-[600ms]" style={{ background: COLOURS[colour].tint, mixBlendMode: "multiply", opacity: COLOURS[colour].tintO * 0.6 }} />
    </>
  );

  return (
    <div className="pt-14 md:pt-16">
      {/* Desktop: the photograph fills the window, the panel floats over its calm side */}
      <div className="relative hidden h-[calc(100vh-64px)] min-h-[680px] overflow-hidden md:block">
        {backdrop}
        <div className="absolute bottom-8 left-[520px] right-10 flex items-end justify-between text-ivory">
          <div className="caption flex gap-3 text-ivory/90">
            <span>{CLOTHS[cloth].name}</span><span>·</span><span>{COLOURS[colour].name}</span>
            {piece ? <><span>·</span><span>The {piece.name}</span></> : null}
          </div>
          {monogram ? <span className="serif text-[22px] tracking-[.24em] text-copper">{monogram}</span> : null}
        </div>
        <div className="absolute bottom-8 left-12 top-8 w-[440px] border border-stone/70 bg-ivory/90 px-8 py-7 backdrop-blur-sm">{panel}</div>
      </div>

      {/* Mobile: photograph, then the panel */}
      <div className="flex flex-col md:hidden">
        <div className="relative h-[46vh] min-h-[320px] overflow-hidden">{backdrop}</div>
        <div className="px-5 py-6">{panel}</div>
      </div>
    </div>
  );
}

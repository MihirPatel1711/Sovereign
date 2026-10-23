export type Colour = { name: string; hex: string; tint: string; tintO: number };

export const COLOURS: Colour[] = [
  { name: "Ivory", hex: "#E9E2D4", tint: "#FFFFFF", tintO: 0 },
  { name: "Stone", hex: "#C9BFAE", tint: "#D9CDB8", tintO: 0.25 },
  { name: "Camel", hex: "#A98C6A", tint: "#B08A5C", tintO: 0.45 },
  { name: "Charcoal", hex: "#3A3836", tint: "#55514C", tintO: 0.75 },
  { name: "Midnight", hex: "#2A2F3A", tint: "#3A4258", tintO: 0.8 },
];

export type Cloth = { name: string; origin: string; weight: string; delta: number; swatch: string };
export const CLOTHS: Cloth[] = [
  { name: "Super 130s wool", origin: "Biella", weight: "260 g", delta: 0, swatch: "repeating-linear-gradient(45deg,#C9BFAE 0 2px,#BFB5A4 2px 4px)" },
  { name: "Wool flannel", origin: "Biella", weight: "320 g", delta: 2500, swatch: "#B8B2A8" },
  { name: "Irish linen", origin: "Donegal", weight: "240 g", delta: 1500, swatch: "repeating-linear-gradient(90deg,#D9D3CA 0 1px,#CFC8BD 1px 3px)" },
  { name: "Wool and cashmere", origin: "Biella", weight: "300 g", delta: 12000, swatch: "#CBB7A3" },
];

export const FITS = ["Relaxed", "Tailored", "Slim"];
export const LAPELS = ["Notch", "Peak", "Shawl"];
export const WAISTCOAT_FRONTS = ["No lapel", "Shawl", "Notch"];
export const LININGS = ["Tonal", "Copper silk", "Midnight silk"];
export const BUTTONS = ["Horn", "Mother-of-pearl", "Covered"];
export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
export const FABRIC_FILTERS = ["Super 130s wool", "Wool flannel", "Sandwashed silk"];
export const MONOGRAM_PRICE = 1500;
export const MTM_PRICE = 6000;

export type Category = "Blazers" | "Trousers" | "Waistcoats" | "Camisoles" | "Shirts" | "Three-piece";
export const CATEGORIES: Category[] = ["Blazers", "Trousers", "Waistcoats", "Camisoles", "Shirts", "Three-piece"];

export type Product = {
  slug: string;
  name: string;
  category: Category;
  fabric: string;
  origin: string;
  price: number;
  colour: number;
  img: string;
  img2: string;
  pos: string;
  description: string;
  details: string[];
  composition: string;
  care: string;
  tailored: boolean; // cloth, lining and button options apply
  lapel?: { label: string; options: string[] };
  look: string[];
  isNew?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    slug: "the-blazer-stone", name: "The Blazer", category: "Blazers",
    fabric: "Super 130s wool", origin: "Biella", price: 48000, colour: 1,
    img: "/assets/c-top.jpg", img2: "/assets/c-low.jpg", pos: "center 30%",
    description: "A single-breasted blazer with a softly roped shoulder and a slightly longer line. Half-canvassed, with working cuffs and your initials inside the breast pocket.",
    details: ["Single-breasted, two buttons", "Softly roped shoulder", "Half-canvassed chest", "Working cuffs, four buttons", "Double-welt pockets, one breast pocket", "Side vents", "Monogram inside the breast pocket, on request"],
    composition: "100% virgin wool, Super 130s. Lining: cupro.",
    care: "Dry clean sparingly. Brush after wear and rest a day between outings. Store on the shaped hanger provided.",
    tailored: true, lapel: { label: "Lapel", options: LAPELS },
    look: ["the-trouser-stone", "the-silk-shirt-bone", "the-waistcoat-charcoal", "the-camisole-bone"], isNew: true,
  },
  {
    slug: "the-double-breasted-midnight", name: "The Double-breasted", category: "Blazers",
    fabric: "Super 130s wool", origin: "Biella", price: 54000, colour: 4,
    img: "/assets/w-navy.jpg", img2: "/assets/c-top.jpg", pos: "center 25%",
    description: "A six-on-two double-breasted blazer with a broad peak lapel and a slightly longer line. Worn open over the silk shirt, or fastened for the boardroom.",
    details: ["Double-breasted, six-on-two", "Broad peak lapel", "Half-canvassed chest", "Working cuffs, four buttons", "Flap pockets, one breast pocket", "Double vents"],
    composition: "100% virgin wool, Super 130s. Lining: cupro.",
    care: "Dry clean sparingly. Brush after wear and rest a day between outings. Store on the shaped hanger provided.",
    tailored: true, lapel: { label: "Lapel", options: ["Peak", "Notch", "Shawl"] },
    look: ["the-trouser-stone", "the-silk-shirt-bone", "the-camisole-bone", "the-blazer-stone"], isNew: true,
  },
  {
    slug: "the-trouser-stone", name: "The Trouser", category: "Trousers",
    fabric: "Wool flannel", origin: "Biella", price: 22000, colour: 1,
    img: "/assets/c-low.jpg", img2: "/assets/w-knit.jpg", pos: "center",
    description: "A high-rise trouser with a single forward pleat and a full, straight leg that breaks once on the shoe. Side adjusters, no belt loops.",
    details: ["High rise", "Single forward pleat", "Full, straight leg", "Side adjusters", "Plain hem, cuff on request", "Curtained waistband"],
    composition: "100% virgin wool flannel. Pocketing: cotton.",
    care: "Dry clean sparingly. Press under a cloth. Hang by the hem.",
    tailored: true,
    look: ["the-blazer-stone", "the-silk-shirt-bone", "the-waistcoat-charcoal", "the-double-breasted-midnight"],
  },
  {
    slug: "the-trouser-ivory", name: "The Trouser", category: "Trousers",
    fabric: "Super 130s wool", origin: "Biella", price: 24000, colour: 0,
    img: "/assets/w-knit.jpg", img2: "/assets/w-linen.jpg", pos: "center 55%",
    description: "The same high-rise block as our flannel trouser, cut in Super 130s wool for a cleaner drape and a lighter hand through summer.",
    details: ["High rise", "Double pleat", "Wide, straight leg", "Side adjusters", "Plain hem", "Curtained waistband"],
    composition: "100% virgin wool, Super 130s. Pocketing: cotton.",
    care: "Dry clean sparingly. Press under a cloth. Hang by the hem.",
    tailored: true,
    look: ["the-blazer-stone", "the-camisole-bone", "the-silk-shirt-bone"], isNew: true,
  },
  {
    slug: "the-three-piece-ivory", name: "The Three-piece", category: "Three-piece",
    fabric: "Super 130s wool", origin: "Biella", price: 84000, colour: 0,
    img: "/assets/b-clean.jpg", img2: "/assets/c-low.jpg", pos: "center 20%",
    description: "Blazer, waistcoat and trouser cut from one length of cloth. Ordered here as one, or made to your measurements by appointment.",
    details: ["Single-breasted blazer, notch lapel", "Five-button waistcoat", "High-rise trouser, single pleat", "Half-canvassed, hand-pressed", "One cloth, one dye lot", "Monogram inside the blazer, on request"],
    composition: "100% virgin wool, Super 130s. Lining: cupro. Waistcoat back: silk.",
    care: "Dry clean sparingly, all three pieces together so the colour ages evenly.",
    tailored: true, lapel: { label: "Lapel", options: LAPELS },
    look: ["the-silk-shirt-bone", "the-camisole-bone"],
  },
  {
    slug: "the-waistcoat-charcoal", name: "The Waistcoat", category: "Waistcoats",
    fabric: "Super 130s wool", origin: "Biella", price: 18000, colour: 3,
    img: "/assets/w-olive.jpg", img2: "/assets/c-low.jpg", pos: "center 45%",
    description: "A five-button waistcoat with a clean, lapel-free front and an adjustable back in silk. Worn alone over the camisole, or beneath the blazer.",
    details: ["Five buttons", "Lapel-free front", "Two welt pockets", "Silk back with adjuster", "Fully lined"],
    composition: "Front: 100% virgin wool, Super 130s. Back: silk. Lining: cupro.",
    care: "Dry clean only.",
    tailored: true, lapel: { label: "Front", options: WAISTCOAT_FRONTS },
    look: ["the-blazer-stone", "the-trouser-stone", "the-camisole-bone"],
  },
  {
    slug: "the-camisole-bone", name: "The Camisole", category: "Camisoles",
    fabric: "Sandwashed silk", origin: "Como", price: 9500, colour: 0,
    img: "/assets/w-linen.jpg", img2: "/assets/a-top.jpg", pos: "center 30%",
    description: "A bias-cut camisole in sandwashed silk with fine straps and a straight neckline that sits quietly under a blazer or waistcoat.",
    details: ["Bias cut", "Fine, adjustable straps", "Straight neckline", "French seams", "Hand-rolled hem"],
    composition: "100% silk, sandwashed.",
    care: "Hand wash cold or dry clean. Dry flat. Cool iron on the reverse.",
    tailored: false,
    look: ["the-blazer-stone", "the-trouser-ivory", "the-waistcoat-charcoal"],
  },
  {
    slug: "the-silk-shirt-bone", name: "The Silk Shirt", category: "Shirts",
    fabric: "Sandwashed silk", origin: "Como", price: 34500, colour: 0,
    img: "/assets/a-top.jpg", img2: "/assets/w-linen.jpg", pos: "45% center",
    description: "A relaxed shirt in heavy sandwashed silk, with a soft collar, mother-of-pearl buttons and a slightly dropped shoulder.",
    details: ["Soft, unfused collar", "Slightly dropped shoulder", "Mother-of-pearl buttons", "One-piece back yoke", "French seams", "Curved hem"],
    composition: "100% silk, sandwashed, 19 momme.",
    care: "Hand wash cold or dry clean. Dry flat. Cool iron on the reverse.",
    tailored: false,
    look: ["the-blazer-stone", "the-trouser-stone", "the-double-breasted-midnight"],
  },
];

export function productBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productTitle(p: Product) {
  return `${p.name}, ${COLOURS[p.colour].name}`;
}

export type SuitPiece = {
  key: string;
  name: string;
  price: number;
  img: string;
  pos: string;
  lapel: { label: string; options: string[] } | null;
};

export const SUIT_PIECES: SuitPiece[] = [
  { key: "blazer", name: "Blazer", price: 48000, img: "/assets/c-top.jpg", pos: "center 30%", lapel: { label: "Lapel", options: LAPELS } },
  { key: "waistcoat", name: "Waistcoat", price: 18000, img: "/assets/b-clean.jpg", pos: "center 20%", lapel: { label: "Front", options: WAISTCOAT_FRONTS } },
  { key: "trousers", name: "Trouser", price: 22000, img: "/assets/w-knit.jpg", pos: "center 60%", lapel: null },
];

export const EDITORIAL = ["/assets/w-knit.jpg", "/assets/c-low.jpg", "/assets/w-olive.jpg", "/assets/b-clean.jpg", "/assets/w-linen.jpg", "/assets/w-navy.jpg", "/assets/a-top.jpg", "/assets/w-coat.jpg", "/assets/c-top.jpg"];

export function formatMonogram(raw: string) {
  const letters = raw.replace(/[^a-z]/gi, "").toUpperCase().slice(0, 3);
  return letters ? letters.split("").join(".") + "." : "";
}

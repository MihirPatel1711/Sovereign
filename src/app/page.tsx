import Link from "next/link";
import Img from "@/components/Img";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/data";
import { inr } from "@/lib/format";

const LOOK = [
  { name: "The Double-breasted, Midnight", fabric: "Super 130s wool", price: 54000, href: "/product/the-double-breasted-midnight" },
  { name: "The Trouser, Midnight", fabric: "Super 130s wool", price: 22000, href: "/product/the-trouser-stone" },
  { name: "The Silk Shirt, Bone", fabric: "Sandwashed silk", price: 34500, href: "/product/the-silk-shirt-bone" },
];
const LOOK_TOTAL = LOOK.reduce((a, l) => a + l.price, 0);

const TILES = [
  { name: "Blazers", href: "/collection?category=Blazers", img: "/assets/w-navy.jpg", pos: "center 20%" },
  { name: "Trousers", href: "/collection?category=Trousers", img: "/assets/w-knit.jpg", pos: "center 60%" },
  { name: "The three-piece", href: "/collection?category=Three-piece", img: "/assets/b-clean.jpg", pos: "center 20%" },
];

export default function Home() {
  const newIn = PRODUCTS.filter((p) => p.isNew).concat(PRODUCTS.filter((p) => !p.isNew)).slice(0, 4);
  return (
    <>
      {/* Hero: one campaign photograph, slow settle, three quiet lines */}
      <section className="relative mt-14 h-[82vh] max-h-[780px] min-h-[540px] overflow-hidden md:mt-16">
        <div className="hero-settle absolute inset-0">
          <Img src="/assets/hero-three-piece.jpg" alt="The Three-piece, Midnight" pos="center 40%" priority />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/35 to-transparent" />
        <div className="hero-rise absolute inset-x-5 bottom-10 flex flex-col gap-3 text-ivory md:left-12 md:bottom-14 md:gap-4">
          <span className="text-[10px] uppercase tracking-[.22em] text-ivory/85">The first collection · Autumn 2026</span>
          <p className="serif max-w-[360px] text-[24px] leading-[1.25] md:text-[30px]">The suit of your life, cut to you.</p>
          <Link href="/collection" className="link-line self-start">Discover the collection</Link>
        </div>
      </section>

      {/* New in */}
      <section className="px-5 pt-20 md:px-12 md:pt-28">
        <div className="mb-6 flex items-baseline justify-between md:mb-10">
          <div className="flex flex-col gap-2">
            <span className="label">New in</span>
            <h2 className="serif text-[22px] md:text-[26px]">The first pieces</h2>
          </div>
          <Link href="/collection" className="link-line">View all</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
          {newIn.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}><ProductCard p={p} /></Reveal>
          ))}
        </div>
      </section>

      {/* Shop by category */}
      <section className="px-5 pt-20 md:px-12 md:pt-28">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {TILES.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <Link href={t.href} className="group relative block aspect-[4/5] overflow-hidden">
                <Img src={t.img} alt={t.name} pos={t.pos} sizes="(min-width: 768px) 33vw, 100vw" className="transition-transform duration-[1600ms] ease-[var(--ease-quiet)] group-hover:scale-[1.02]" />
                <span className="link-line absolute bottom-5 left-5 text-ivory md:bottom-7 md:left-7">{t.name}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Three-piece editorial */}
      <section className="px-5 pt-20 md:px-12 md:pt-28">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Img src="/assets/b-clean.jpg" alt="The three-piece" pos="center 25%" sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
          </Reveal>
          <Reveal delay={150} className="flex flex-col gap-5 md:col-span-5 md:col-start-8 md:gap-7">
            <span className="label">Made to measure</span>
            <h2 className="serif text-[24px] leading-[1.25] md:text-[30px]">Cut to you, and to no one else.</h2>
            <p className="max-w-[420px] text-[14px] leading-[1.9]">Every style can be made to your own measurements. An hour with a cutter, a toile within three weeks, and a suit that fits the way nothing off a rail can.</p>
            <Link href="/suits" className="link-line self-start">Discover made to measure</Link>
          </Reveal>
        </div>
      </section>

      {/* Craft band */}
      <section className="mt-20 bg-stone md:mt-28">
        <div className="grid md:grid-cols-12">
          <div className="relative h-[280px] overflow-hidden md:order-2 md:col-span-7 md:h-[620px]">
            <Img src="/assets/img-d.jpg" alt="The Sovereign box" sizes="(min-width: 768px) 58vw, 100vw" />
          </div>
          <Reveal className="flex flex-col justify-center gap-7 px-5 py-12 md:order-1 md:col-span-5 md:gap-9 md:px-20 md:py-24">
            <span className="label">Craft &amp; cloth</span>
            <div className="serif flex flex-col text-[19px] leading-[1.3] md:text-[22px]">
              <span className="border-t border-copper py-4">Super 130s wool from Biella.</span>
              <span className="border-t border-copper py-4">Half-canvassed, pressed by hand.</span>
              <span className="border-y border-copper py-4">Finished in four to six weeks.</span>
            </div>
            <Link href="/craft" className="link-line self-start">The craft</Link>
          </Reveal>
        </div>
      </section>

      {/* Shop the look */}
      <section className="px-5 pt-20 md:px-12 md:pt-28">
        <div className="grid gap-8 md:grid-cols-12 md:gap-6">
          <Reveal className="flex flex-col gap-6 md:col-span-4 md:pr-8">
            <span className="label">Shop the look</span>
            <h2 className="serif text-[24px] leading-[1.25] md:text-[28px]">The Midnight suit</h2>
            <div className="relative aspect-[4/5] overflow-hidden md:hidden">
              <Img src="/assets/c-low.jpg" alt="The Midnight suit" pos="center" />
            </div>
            <div className="flex flex-col text-[13px]">
              {LOOK.map((l) => (
                <Link key={l.name} href={l.href} className="grid grid-cols-[1fr_auto] gap-6 border-t border-stone py-4 transition-colors duration-500 hover:text-copper">
                  <div>
                    <div className="serif text-[16px]">{l.name}</div>
                    <div className="caption mt-1">{l.fabric}</div>
                  </div>
                  <span className="text-[12px]">{inr(l.price)}</span>
                </Link>
              ))}
              <div className="flex justify-between border-t border-ink py-4 text-[12px] tracking-[.04em]">
                <span>Complete look</span>
                <span>{inr(LOOK_TOTAL)}</span>
              </div>
            </div>
            <Link href="/product/the-double-breasted-midnight" className="link-line self-start">Shop the look</Link>
          </Reveal>
          <Reveal delay={150} className="hidden md:col-span-6 md:col-start-7 md:block">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Img src="/assets/w-olive.jpg" alt="The Midnight suit" pos="center 30%" sizes="50vw" />
            </div>
          </Reveal>
        </div>
      </section>

    </>
  );
}

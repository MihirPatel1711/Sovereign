import type { Metadata } from "next";
import Link from "next/link";
import Img from "@/components/Img";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Craft & cloth" };

const CLOTHS = [
  { name: "Super 130s wool", origin: "Biella, Italy", img: "/assets/w-navy.jpg", pos: "center 60%", note: "Merino of 17.5 microns. Dry hand, quiet drape, recovers overnight. Our blazers and three-piece suits." },
  { name: "Wool flannel", origin: "Biella, Italy", img: "/assets/w-coat.jpg", pos: "center 55%", note: "Brushed on both faces for a soft, matte surface. Warmer, and forgiving of a long day. Trousers and the autumn pieces." },
  { name: "Sandwashed silk", origin: "Como, Italy", img: "/assets/w-linen.jpg", pos: "center 40%", note: "Heavy silk washed to a soft, almost suede-like hand. Shirts and camisoles that sit quietly beneath a jacket." },
  { name: "Irish linen", origin: "Donegal, Ireland", img: "/assets/w-knit.jpg", pos: "center 60%", note: "Long-staple flax, woven slowly and washed once. Creases with intent. For summer tailoring." },
];

const STEPS = [
  { n: "01", name: "The conversation", text: "Standard size or made to measure, every piece begins with a choice of cloth, colour, fit and lapel, and your initials if you want them." },
  { n: "02", name: "The cut", text: "Cloth is rested for a week before cutting. For made to measure, a toile is made first and sent to you for a second look." },
  { n: "03", name: "The canvas", text: "A floating horsehair chest piece is basted in by hand, so the front of the jacket moulds to you rather than to a glue." },
  { n: "04", name: "The finish", text: "Buttonholes, working cuffs and the inside pocket monogram are sewn by hand in our atelier. Four to six weeks from order to box." },
];

export default function CraftPage() {
  return (
    <>
      {/* Hero: same split as the home page */}
      <section className="pt-14 md:pt-16">
        <div className="grid md:grid-cols-12">
          <div className="order-2 flex flex-col justify-end gap-5 px-5 py-10 md:order-1 md:col-span-5 md:gap-7 md:px-12 md:py-20">
            <span className="label">Craft &amp; cloth</span>
            <h1 className="display max-w-[440px] text-[32px] md:text-[42px]">Cut in Biella wool, finished by hand.</h1>
            <p className="max-w-[380px] text-[14px] leading-[1.9]">Four cloths, one way of making. Half-canvassed, pressed by hand, four to six weeks from order to box.</p>
          </div>
          <div className="relative order-1 h-[64vh] min-h-[420px] overflow-hidden md:order-2 md:col-span-7 md:h-[680px]">
            <Img src="/assets/img-d.jpg" alt="The Sovereign box" pos="center" priority sizes="(min-width: 768px) 58vw, 100vw" />
          </div>
        </div>
      </section>


      <section className="px-5 pt-20 md:grid md:grid-cols-12 md:gap-6 md:px-12 md:pt-28">
        <span className="label md:col-span-3">The cloth</span>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:col-span-9 md:mt-0 md:grid-cols-4 md:gap-x-6">
          {CLOTHS.map((c, i) => (
            <Reveal key={c.name} delay={i * 80} className="flex flex-col gap-2 text-[12px] leading-[1.8]">
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-deep"><Img src={c.img} alt={c.name} pos={c.pos} sizes="(min-width: 768px) 18vw, 50vw" /></div>
              <div className="serif mt-2 text-[17px]">{c.name}</div>
              <div className="caption">{c.origin}</div>
              <p>{c.note}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="made-to-measure" className="mt-20 bg-stone md:mt-28">
        <div className="grid md:grid-cols-12">
          <div className="relative h-[320px] overflow-hidden md:col-span-5 md:h-auto md:min-h-[640px]">
            <Img src="/assets/w-olive.jpg" alt="The atelier" pos="center 30%" sizes="(min-width: 768px) 42vw, 100vw" />
          </div>
          <div className="flex flex-col gap-8 px-5 py-14 md:col-span-7 md:gap-10 md:px-20 md:py-24">
            <span className="label">How a piece is made</span>
            <div className="flex flex-col">
              {STEPS.map((s) => (
                <Reveal key={s.n} className="grid grid-cols-[40px_1fr] gap-4 border-t border-grey py-5 md:py-6">
                  <span className="pt-1 text-[10px] tracking-[.18em] text-copper">{s.n}</span>
                  <div className="flex flex-col gap-1.5">
                    <span className="serif text-[20px]">{s.name}</span>
                    <p className="max-w-[460px] text-[13px] leading-[1.8]">{s.text}</p>
                  </div>
                </Reveal>
              ))}
              <div className="border-t border-grey" />
            </div>
            <Link href="/appointment" className="link-line self-start">Book a fitting</Link>
          </div>
        </div>
      </section>

      <section id="care" className="px-5 pt-20 md:grid md:grid-cols-12 md:gap-6 md:px-12 md:pt-28">
        <span className="label md:col-span-3">Care &amp; delivery</span>
        <div className="mt-8 grid gap-8 text-[13px] leading-[1.8] md:col-span-9 md:mt-0 md:grid-cols-3 md:gap-10">
          <div><div className="serif mb-2 text-[20px]">Care</div>Dry clean sparingly, brush after wear and let the garment rest a day between outings. Store on a shaped hanger, in the bag we send.</div>
          <div id="shipping"><div className="serif mb-2 text-[20px]">Delivery &amp; returns</div>Complimentary across India, insured and signed for. Four to six weeks for standard sizes, six for made to measure. Returns within fourteen days on standard sizes.</div>
          <div><div className="serif mb-2 text-[20px]">Alterations</div>Complimentary for the life of the garment, in the atelier or by courier. Bodies change. The suit should keep up.</div>
        </div>
      </section>

      <section className="flex flex-col items-center gap-6 px-5 py-20 text-center md:py-28">
        <p className="serif max-w-[460px] text-[21px] leading-[1.4]">See the cloth in person. An hour in the atelier, no charge.</p>
        <Link href="/appointment" className="link-line">Book a fitting</Link>
      </section>
    </>
  );
}

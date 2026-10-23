import type { Metadata } from "next";
import Link from "next/link";
import Img from "@/components/Img";
import Reveal from "@/components/Reveal";
import AppointmentForm from "@/components/AppointmentForm";
import { CLOTHS } from "@/lib/data";

export const metadata: Metadata = { title: "Made to measure" };

const STEPS = [
  { n: "01", name: "The consultation", time: "One hour", text: "In the atelier or at your office. We talk through the occasion, the cloth, the cut and the details, and take thirty measurements." },
  { n: "02", name: "The toile", time: "Within three weeks", text: "A cotton toile is cut to your measurements and fitted on you, so every line is settled before the cloth is touched." },
  { n: "03", name: "The fitting", time: "Week five", text: "The garment in its cloth, basted and canvassed, fitted a final time. Sleeve, shoulder, hem and button stance are set by hand." },
  { n: "04", name: "The delivery", time: "Week six", text: "Finished, pressed and delivered in the stone box. Alterations remain complimentary for the life of the garment." },
];

const DETAILS = [
  { name: "Lapel", options: "Notch, peak or shawl, in the width that suits your shoulder." },
  { name: "Fit", options: "Relaxed, tailored or slim, adjusted at the fitting rather than chosen from a chart." },
  { name: "Lining", options: "Tonal, copper silk or midnight silk." },
  { name: "Buttons", options: "Horn, mother-of-pearl or covered in the cloth." },
  { name: "Monogram", options: "Hand-embroidered initials inside the breast pocket." },
  { name: "Trouser", options: "Single or double pleat, side adjusters, plain hem or cuff." },
];

export default function MadeToMeasurePage() {
  return (
    <>
      {/* Opening */}
      <section className="pt-14 md:pt-16">
        <div className="grid md:grid-cols-12">
          <div className="order-2 flex flex-col justify-end gap-5 px-5 py-10 md:order-1 md:col-span-5 md:gap-7 md:px-12 md:py-20">
            <span className="label">Made to measure</span>
            <h1 className="display max-w-[440px] text-[32px] md:text-[42px]">Cut to you, and to no one else.</h1>
            <p className="max-w-[380px] text-[14px] leading-[1.9]">Every Sovereign style can be made to your own measurements. It begins with an hour in the atelier, and ends six weeks later with a suit that fits the way nothing off a rail can.</p>
            <div className="flex items-center gap-8">
              <a href="#book" className="btn btn-primary">Book an appointment</a>
            </div>
          </div>
          <div className="relative order-1 h-[64vh] min-h-[420px] overflow-hidden md:order-2 md:col-span-7 md:h-[680px]">
            <Img src="/assets/b-clean.jpg" alt="Made to measure" pos="center 20%" priority sizes="(min-width: 768px) 58vw, 100vw" />
          </div>
        </div>
      </section>

      {/* The service */}
      <section className="px-5 pt-20 md:grid md:grid-cols-12 md:gap-6 md:px-12 md:pt-28">
        <span className="label md:col-span-3">The service</span>
        <Reveal className="mt-6 flex flex-col gap-6 md:col-span-6 md:mt-0">
          <p className="serif text-[22px] leading-[1.45] md:text-[26px]">Made to measure is not a longer order form. It is a conversation with a cutter, a toile, two fittings, and a garment built around the way you stand.</p>
          <p className="max-w-[520px] text-[14px] leading-[1.9]">Blazers, trousers, waistcoats and the three-piece are all made this way. The cost of made to measure is the same whichever cloth you choose: six thousand rupees above the standard price, and six weeks.</p>
        </Reveal>
      </section>

      {/* Two ways to begin */}
      <section className="px-5 pt-20 md:grid md:grid-cols-12 md:gap-6 md:px-12 md:pt-28">
        <span className="label md:col-span-3">Two ways to begin</span>
        <div className="mt-6 grid gap-4 md:col-span-9 md:mt-0 md:grid-cols-2 md:gap-6">
          <Reveal className="flex flex-col gap-5 border border-ink p-7 md:p-9">
            <span className="caption text-copper">By appointment</span>
            <h3 className="serif text-[22px] leading-[1.3] md:text-[24px]">Made to measure</h3>
            <p className="text-[13px] leading-[1.8]">An hour with a cutter, thirty measurements, a toile and two fittings. The garment is built around the way you stand. Six weeks.</p>
            <ul className="flex flex-col gap-1.5 text-[12px] leading-[1.7] text-muted">
              <li>In the atelier, or at your office or home</li>
              <li>The full book of cloths, brought to you</li>
              <li>Every detail decided in person</li>
            </ul>
            <a href="#book" className="btn btn-primary mt-auto self-start">Book an appointment</a>
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-5 border border-stone p-7 md:p-9">
            <span className="caption">Online</span>
            <h3 className="serif text-[22px] leading-[1.3] md:text-[24px]">Made to order</h3>
            <p className="text-[13px] leading-[1.8]">Choose the cloth, colour, fit, lapel, lining, buttons and monogram on any style, in a standard size, and have it made for you. Four to six weeks.</p>
            <ul className="flex flex-col gap-1.5 text-[12px] leading-[1.7] text-muted">
              <li>Compose a three-piece, or customise a single piece</li>
              <li>Complimentary alterations once it arrives</li>
              <li>Switch to made to measure at any time</li>
            </ul>
            <div className="mt-auto flex gap-6">
              <Link href="/suits/build" className="btn btn-secondary">Compose a three-piece</Link>
              <Link href="/collection" className="link-line self-center">Customise a piece</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The process */}
      <section className="px-5 pt-20 md:grid md:grid-cols-12 md:gap-6 md:px-12 md:pt-28">
        <span className="label md:col-span-3">The process</span>
        <div className="mt-6 grid gap-x-6 gap-y-10 md:col-span-9 md:mt-0 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 80} className="flex flex-col gap-3 border-t border-copper pt-5">
              <span className="text-[10px] tracking-[.18em] text-copper">{s.n}</span>
              <span className="serif text-[20px]">{s.name}</span>
              <span className="caption">{s.time}</span>
              <p className="text-[13px] leading-[1.8]">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The cloth */}
      <section className="mt-20 bg-stone md:mt-28">
        <div className="grid md:grid-cols-12">
          <div className="relative h-[320px] overflow-hidden md:col-span-5 md:h-auto md:min-h-[640px]">
            <Img src="/assets/w-navy.jpg" alt="The cloth" pos="center 55%" sizes="(min-width: 768px) 42vw, 100vw" />
          </div>
          <div className="flex flex-col gap-8 px-5 py-14 md:col-span-7 md:gap-10 md:px-20 md:py-24">
            <div className="flex flex-col gap-3">
              <span className="label">The cloth</span>
              <h2 className="serif text-[24px] leading-[1.3] md:text-[28px]">Four cloths, from two mills we have worked with for years.</h2>
            </div>
            <div className="flex flex-col">
              {CLOTHS.map((c) => (
                <Reveal key={c.name} className="grid grid-cols-[32px_1fr_auto] items-center gap-5 border-t border-grey py-4">
                  <span className="h-8 w-8" style={{ background: c.swatch }} />
                  <span className="flex flex-col gap-0.5">
                    <span className="serif text-[17px]">{c.name}</span>
                    <span className="caption">{c.origin} · {c.weight}</span>
                  </span>
                  <span className="text-[11px] text-muted">{c.delta ? "+ ₹" + c.delta.toLocaleString("en-IN") + " per piece" : "Included"}</span>
                </Reveal>
              ))}
              <div className="border-t border-grey" />
            </div>
            <p className="max-w-[460px] text-[13px] leading-[1.8]">The full book of cloths, including seasonal lengths that never reach the collection, is kept in the atelier and brought to the consultation.</p>
          </div>
        </div>
      </section>

      {/* The details */}
      <section className="px-5 pt-20 md:grid md:grid-cols-12 md:gap-6 md:px-12 md:pt-28">
        <span className="label md:col-span-3">The details</span>
        <div className="mt-6 grid gap-x-6 gap-y-8 md:col-span-9 md:mt-0 md:grid-cols-3">
          {DETAILS.map((d, i) => (
            <Reveal key={d.name} delay={i * 60} className="flex flex-col gap-2 border-t border-stone pt-4">
              <span className="serif text-[18px]">{d.name}</span>
              <p className="text-[13px] leading-[1.8]">{d.options}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Where */}
      <section className="px-5 pt-20 md:grid md:grid-cols-12 md:items-end md:gap-6 md:px-12 md:pt-28">
        <Reveal className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Img src="/assets/w-coat.jpg" alt="The atelier" pos="center 25%" sizes="(min-width: 768px) 42vw, 100vw" />
          </div>
        </Reveal>
        <Reveal delay={150} className="flex flex-col gap-4 pt-8 text-[14px] leading-[1.9] md:col-span-5 md:col-start-7 md:gap-5 md:pb-10 md:pt-0">
          <span className="label">Where</span>
          <h2 className="serif text-[22px] leading-[1.3] md:text-[26px]">In the atelier, or wherever you are.</h2>
          <p className="max-w-[420px]">Consultations and fittings take place in the atelier, Monday to Saturday. For clients in Delhi, Mumbai, Bengaluru and Hyderabad, the cutter travels to your office or home. There is no charge for the fitting.</p>
        </Reveal>
      </section>

      {/* Book */}
      <section id="book" className="mt-20 border-t border-stone px-5 pt-14 md:mt-28 md:grid md:grid-cols-12 md:gap-6 md:px-12 md:pt-20">
        <div className="flex flex-col gap-3 md:col-span-4">
          <span className="label">Book an appointment</span>
          <h2 className="display text-[28px] md:text-[34px]">An hour with a cutter.</h2>
          <p className="max-w-[320px] text-[14px] leading-[1.9]">We reply within one working day to confirm a time.</p>
        </div>
        <div className="mt-10 max-w-[640px] md:col-span-7 md:col-start-6 md:mt-0">
          <AppointmentForm />
        </div>
      </section>

    </>
  );
}

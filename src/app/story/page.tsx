import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Img from "@/components/Img";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Our story" };

export default function StoryPage() {
  return (
    <>
      {/* Hero: same split as the home page */}
      <section className="pt-14 md:pt-16">
        <div className="grid md:grid-cols-12">
          <div className="order-2 flex flex-col justify-end gap-5 px-5 py-10 md:order-1 md:col-span-5 md:gap-7 md:px-12 md:py-20">
            <span className="label">Our story</span>
            <h1 className="display max-w-[440px] text-[32px] md:text-[42px]">Dressed for the day that changes things.</h1>
            <p className="max-w-[380px] text-[14px] leading-[1.9]">A house built around one garment: the suit you reach for on the morning that matters.</p>
          </div>
          <div className="relative order-1 h-[64vh] min-h-[420px] overflow-hidden md:order-2 md:col-span-7 md:h-[680px]">
            <Img src="/assets/w-olive.jpg" alt="Sovereign" pos="center 30%" priority sizes="(min-width: 768px) 58vw, 100vw" />
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-5 pt-20 md:grid md:grid-cols-12 md:gap-6 md:px-12 md:pt-28">
        <Reveal className="flex flex-col gap-6 text-[15px] leading-[1.9] md:col-span-6 md:col-start-4 md:gap-7 md:leading-[2]">
          <p className="serif text-[22px] leading-[1.45] md:text-[26px]">Sovereign began with a question we kept hearing from friends: where do you go for the suit of your life?</p>
          <p>Not a suit for every day, though it will serve every day. The one for the first morning in chambers. The posting abroad. The board seat. The win that took years. The pieces people reached for were either borrowed from heritage houses built for someone else, or cut quickly from cloth that would not last the year.</p>
          <p>So we built a house around that single garment. A small number of styles each season, nothing more. Each one made in cloth we would wear ourselves, in a colour you choose, a fit you choose, finished with your initials, and cut either to a standard size or to you alone.</p>
        </Reveal>
      </section>

      {/* The atelier */}
      <section className="px-5 pt-20 md:grid md:grid-cols-12 md:items-end md:gap-6 md:px-12 md:pt-28">
        <Reveal className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Img src="/assets/w-coat.jpg" alt="The atelier" pos="center 25%" sizes="(min-width: 768px) 42vw, 100vw" />
          </div>
        </Reveal>
        <Reveal delay={150} className="flex flex-col gap-4 pt-8 text-[14px] leading-[1.9] md:col-span-5 md:col-start-7 md:gap-5 md:pb-10 md:pt-0">
          <span className="label">The atelier</span>
          <h2 className="serif text-[22px] leading-[1.3] md:text-[26px]">A quiet room of cutting tables and concrete light.</h2>
          <p className="max-w-[420px]">Clear lines, nothing added for effect, built to be used for a long time. Every piece is cut, canvassed and finished here, by the same hands from first fitting to final press.</p>
        </Reveal>
      </section>

      {/* The box */}
      <section className="px-5 pt-20 md:grid md:grid-cols-12 md:items-start md:gap-6 md:px-12 md:pt-28">
        <Reveal className="md:col-span-7">
          <div className="relative aspect-[3/2] overflow-hidden">
            <Img src="/assets/img-d.jpg" alt="The Sovereign box" sizes="(min-width: 768px) 58vw, 100vw" />
          </div>
        </Reveal>
        <Reveal delay={150} className="flex flex-col gap-4 pt-8 text-[14px] leading-[1.9] md:col-span-4 md:col-start-9 md:gap-5 md:pt-10">
          <span className="label">The box</span>
          <h2 className="serif text-[22px] leading-[1.3] md:text-[26px]">Stone, copper, and meant to be kept.</h2>
          <p>Every piece arrives in a stone box with a copper ribbon. Keep it for the suit, or for whatever comes next.</p>
        </Reveal>
      </section>

      {/* Mark */}
      <section className="flex flex-col items-center gap-6 px-5 py-20 text-center md:gap-8 md:px-12 md:py-32">
        <Reveal className="flex flex-col items-center gap-6 md:gap-8">
          <Image src="/assets/panther.png" alt="" width={56} height={64} className="w-11 mix-blend-multiply md:w-14" />
          <p className="display max-w-[520px] text-[22px] leading-[1.4] md:text-[26px]">The panther is patient, and certain. We ask the same of everything we make.</p>
          <Link href="/appointment" className="link-line">Book a fitting</Link>
        </Reveal>
      </section>
    </>
  );
}

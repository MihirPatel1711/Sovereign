import type { Metadata } from "next";
import Img from "@/components/Img";
import AppointmentForm from "@/components/AppointmentForm";

export const metadata: Metadata = { title: "Book a fitting" };

export default function AppointmentPage() {
  return (
    <div className="pt-14 md:pt-16">
      <div className="md:grid md:min-h-[760px] md:grid-cols-[5fr_7fr]">
        <div className="relative h-[360px] overflow-hidden md:h-auto">
          <Img src="/assets/w-navy.jpg" alt="Made to measure" pos="center 25%" priority sizes="(min-width: 768px) 42vw, 100vw" />
        </div>
        <div className="flex max-w-[640px] flex-col gap-10 px-5 py-14 md:gap-14 md:px-24 md:py-20">
          <div className="flex flex-col gap-3 md:gap-4">
            <span className="label">Made to measure</span>
            <h1 className="display text-[30px] md:text-[38px]">Book a fitting</h1>
            <p className="mt-2 text-[14px] leading-[1.9]">An hour with a cutter, in the atelier or at your office. We take thirty measurements, talk through cloth and finish, and send a toile within three weeks.</p>
          </div>
          <AppointmentForm />
        </div>
      </div>
    </div>
  );
}

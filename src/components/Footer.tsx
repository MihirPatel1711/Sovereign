"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Newsletter from "./Newsletter";

const COLS: { title: string; links: [string, string][] }[] = [
  {
    title: "Collection",
    links: [["Blazers", "/collection?category=Blazers"], ["Trousers", "/collection?category=Trousers"], ["Waistcoats", "/collection?category=Waistcoats"], ["Camisoles & shirts", "/collection?category=Camisoles"], ["Three-piece", "/collection?category=Three-piece"]],
  },
  {
    title: "Client services",
    links: [["Book a fitting", "/appointment"], ["Made to measure", "/suits"], ["Delivery & returns", "/craft#shipping"], ["Care & alterations", "/craft#care"]],
  },
  {
    title: "The house",
    links: [["Our story", "/story"], ["Craft & cloth", "/craft"]],
  },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/suits/build") return null;
  return (
    <footer className="border-t border-stone px-5 pb-8 pt-14 md:px-12 md:pb-10 md:pt-20">
      <div className="grid gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
        <div className="max-w-[360px]">
          <div className="serif mb-5 text-[20px] leading-[1.35]">Occasional letters on new cloth and quiet openings.</div>
          <Newsletter />
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 md:gap-x-14 md:justify-self-end">
          {COLS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <span className="label">{col.title}</span>
              <div className="flex flex-col text-[12px] leading-[2.1] tracking-[.02em]">
                {col.links.map(([l, h]) => (
                  <Link key={l} href={h} className="transition-colors duration-500 hover:text-copper">{l}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-14 flex flex-col gap-4 border-t border-stone pt-6 text-[10px] uppercase tracking-[.16em] text-muted md:mt-20 md:flex-row md:items-center md:justify-between">
        <div className="wordmark text-[16px] text-ink md:text-[18px]">Sovereign</div>
        <div className="flex gap-6">
          <span>India · INR</span>
          <span>© 2026 Sovereign</span>
        </div>
      </div>
    </footer>
  );
}

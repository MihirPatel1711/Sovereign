"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

// No page overlays the header on an image any more; every page opens on an ivory panel.
const HERO_ROUTES: string[] = [];
const NAV = [
  ["Collection", "/collection"],
  ["Made to measure", "/suits"],
  ["Craft", "/craft"],
  ["Story", "/story"],
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, ready } = useCart();

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const over = HERO_ROUTES.includes(pathname) && !scrolled && !open;

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        <header
          className={[
            "grid h-14 grid-cols-[auto_1fr_auto] items-center px-5 md:h-16 md:px-12",
            "text-[11px] font-normal uppercase tracking-[.18em] transition-[background-color,color,border-color] duration-500 ease-[var(--ease-quiet)]",
            over ? "border-b border-ivory/30 bg-transparent text-ivory" : "border-b border-stone bg-ivory text-ink",
          ].join(" ")}
        >
          <Link href="/" className="flex items-center gap-3 md:gap-4" aria-label="Sovereign home">
            <Image
              src="/assets/panther.png"
              alt=""
              width={28}
              height={32}
              className={`h-7 w-auto transition-[filter,opacity] duration-500 md:h-8 ${over ? "invert opacity-95" : "mix-blend-multiply"}`}
            />
            <span className="wordmark text-[15px] md:text-[17px]">Sovereign</span>
          </Link>

          <nav className="hidden items-center gap-9 pl-14 md:flex">
            {NAV.map(([l, h]) => (
              <Link key={h} href={h} className={`transition-colors duration-500 hover:text-copper ${pathname.startsWith(h) && h !== "/" ? "text-copper" : ""}`}>
                {l}
              </Link>
            ))}
          </nav>
          <span className="md:hidden" />

          <nav className="flex items-center gap-7 justify-self-end">
            <Link href="/bag" className="transition-colors duration-500 hover:text-copper">
              Cart{ready && count > 0 ? <span className="ml-1.5 text-copper">({count})</span> : null}
            </Link>
            <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
              {open ? "Close" : "Menu"}
            </button>
          </nav>
        </header>
      </div>

      <div
        className={[
          "fixed inset-x-0 bottom-0 top-14 z-40 bg-ivory px-5 pt-10 transition-opacity duration-500 ease-[var(--ease-quiet)] md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        aria-hidden={!open}
      >
        <nav className="flex flex-col">
          {[...NAV, ["Cart", "/bag"]].map(([l, h]) => (
            <Link key={h} href={h} className="serif hairline py-5 text-[26px]">
              {l}
            </Link>
          ))}
          <div className="hairline" />
        </nav>
      </div>
    </>
  );
}

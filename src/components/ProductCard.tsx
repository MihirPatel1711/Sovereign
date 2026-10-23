import Link from "next/link";
import Img from "./Img";
import { productTitle, type Product } from "@/lib/data";
import { inr } from "@/lib/format";

export default function ProductCard({ p, sizes = "(min-width: 768px) 25vw, 50vw" }: { p: Product; sizes?: string }) {
  const title = productTitle(p);
  return (
    <Link href={`/product/${p.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-deep">
        <Img src={p.img} alt={title} pos={p.pos} sizes={sizes} className="transition-transform duration-[1600ms] ease-[var(--ease-quiet)] group-hover:scale-[1.02]" />
        <Img src={p.img2} alt="" sizes={sizes} className="opacity-0 transition-opacity duration-700 ease-[var(--ease-quiet)] group-hover:opacity-100" />
        {p.isNew ? <span className="caption absolute left-3 top-3 text-ivory md:left-4 md:top-4">New</span> : null}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3 md:mt-4">
        <span className="serif text-[15px] leading-[1.3] md:text-[16px]">{title}</span>
        <span className="text-[11px] tracking-[.02em] md:text-[12px]">{inr(p.price)}</span>
      </div>
      <div className="caption mt-1 tracking-[.14em]">{p.fabric}</div>
    </Link>
  );
}

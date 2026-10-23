"use client";
import Link from "next/link";
import Img from "./Img";
import { useCart } from "@/lib/cart";
import { inr } from "@/lib/format";

export default function BagView() {
  const { items, ready, remove, setQty, subtotal, count } = useCart();

  return (
    <div className="px-5 pb-24 pt-20 md:px-12 md:pb-40 md:pt-28">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-3 md:gap-4">
          <span className="label">Shopping cart</span>
          <h1 className="display text-[30px] md:text-[38px]">{count ? `${count} ${count === 1 ? "piece" : "pieces"}` : "Empty, for now"}</h1>
        </div>
        <Link href="/collection" className="link-line hidden md:inline-block">Continue shopping</Link>
      </div>

      {!ready ? null : items.length === 0 ? (
        <div className="mt-14 flex flex-col gap-6 border-t border-stone pt-14 md:mt-20 md:pt-20">
          <p className="serif max-w-[480px] text-[22px] leading-[1.4]">Nothing here yet. The collection is a step away, and every piece can be cut to you.</p>
          <div className="flex gap-8">
            <Link href="/collection" className="link-line">The collection</Link>
            
            <Link href="/suits" className="link-line">Made to measure</Link>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-[7fr_5fr] md:gap-6">
          <div className="flex flex-col">
            {items.map((it) => (
              <div key={it.id} className="grid grid-cols-[88px_1fr] gap-5 border-t border-stone py-6 md:grid-cols-[120px_1fr_auto] md:gap-8 md:py-8">
                <div className="relative aspect-[3/4] overflow-hidden bg-stone">
                  <Img src={it.img ?? "/assets/b-clean.jpg"} alt="" pos={it.pos} sizes="120px" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between gap-4">
                    <Link href={it.slug.startsWith("three-piece") ? "/suits/build" : `/product/${it.slug}`} className="serif text-[18px] md:text-[20px]">{it.name}</Link>
                    <span className="text-[13px] md:hidden">{inr(it.price * it.qty)}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {it.spec.map((s, i) => <span key={i} className="caption normal-case tracking-[.08em]">{s}</span>)}
                  </div>
                  <div className="mt-3 flex items-center gap-6 text-[11px] uppercase tracking-[.16em]">
                    <span className="flex items-center gap-4">
                      <button type="button" onClick={() => setQty(it.id, it.qty - 1)} className="text-muted transition-colors hover:text-copper" aria-label="Less">−</button>
                      <span>{it.qty}</span>
                      <button type="button" onClick={() => setQty(it.id, it.qty + 1)} className="text-muted transition-colors hover:text-copper" aria-label="More">+</button>
                    </span>
                    <button type="button" onClick={() => remove(it.id)} className="text-muted transition-colors hover:text-copper">Remove</button>
                  </div>
                </div>
                <span className="hidden text-[13px] md:block">{inr(it.price * it.qty)}</span>
              </div>
            ))}
            <div className="border-t border-stone" />
          </div>

          <aside className="flex flex-col gap-8 bg-stone px-6 py-8 md:ml-6 md:px-12 md:py-12">
            <span className="label">Summary</span>
            <div className="flex flex-col text-[13px]">
              <div className="flex justify-between border-t border-grey py-4"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
              <div className="flex justify-between border-t border-grey py-4"><span>Delivery</span><span>Complimentary</span></div>
              <div className="flex items-baseline justify-between border-t border-ink py-5 text-[12px] tracking-[.04em]"><span>Total</span><span className="serif text-[20px]">{inr(subtotal)}</span></div>
            </div>
            <p className="text-[11px] leading-[1.8] text-muted">Taxes included. Delivered in four to six weeks.</p>
            <Link href="/checkout" className="btn btn-primary">Proceed to checkout</Link>
          </aside>
        </div>
      )}
    </div>
  );
}

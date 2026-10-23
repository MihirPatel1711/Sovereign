"use client";
import Link from "next/link";
import { useState } from "react";
import { Field, Radio } from "./Controls";
import { useCart } from "@/lib/cart";
import { inr } from "@/lib/format";

const DELIVERY = [
  { name: "Standard", note: "Four to six weeks · Complimentary", price: 0 },
  { name: "Priority", note: "Three to four weeks · ₹4,000", price: 4000 },
];
const PAYMENT = [
  { name: "Card", note: "You will be taken to a secure payment page" },
  { name: "UPI", note: "A request is sent to your UPI app" },
  { name: "Bank transfer", note: "Details are sent by email, order held for five days" },
];

export default function CheckoutView() {
  const { items, ready, subtotal, clear } = useCart();
  const [f, setF] = useState({ email: "", name: "", phone: "", address: "", city: "", pin: "", note: "" });
  const [delivery, setDelivery] = useState(0);
  const [payment, setPayment] = useState(0);
  const [order, setOrder] = useState<{ no: string; total: number; count: number } | null>(null);

  const up = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });
  const cls = (v: string) => `input-line ${v ? "filled" : ""}`;
  const total = subtotal + DELIVERY[delivery].price;

  if (order) {
    return (
      <div className="px-5 pb-24 pt-20 md:px-12 md:pb-40 md:pt-28">
        <div className="mx-auto flex max-w-[640px] flex-col gap-8 md:gap-10">
          <span className="label">Order {order.no}</span>
          <h1 className="display text-[30px] md:text-[38px]">Thank you, {f.name.split(" ")[0]}.</h1>
          <p className="text-[15px] leading-[1.9]">
            Your order of {order.count} {order.count === 1 ? "piece" : "pieces"} is with the atelier. A confirmation has gone to {f.email}, and the cutter will write when the cloth is cut. {PAYMENT[payment].name === "Card" ? "In the finished site, the secure payment page would have opened before this step." : PAYMENT[payment].name === "UPI" ? "In the finished site, a UPI request would have been sent before this step." : "Bank details follow by email, and the order is held for five days."}
          </p>
          <div className="flex flex-col text-[13px]">
            <div className="flex justify-between border-t border-stone py-4"><span>Delivery</span><span>{DELIVERY[delivery].name}, to {f.city}</span></div>
            <div className="flex justify-between border-t border-stone py-4"><span>Payment</span><span>{PAYMENT[payment].name}</span></div>
            <div className="flex items-baseline justify-between border-y border-ink py-5"><span>Total</span><span className="serif text-[20px]">{inr(order.total)}</span></div>
          </div>
          <Link href="/" className="link-line self-start">Back to Sovereign</Link>
        </div>
      </div>
    );
  }

  if (ready && items.length === 0) {
    return (
      <div className="px-5 pb-24 pt-20 md:px-12 md:pb-40 md:pt-28">
        <span className="label">Checkout</span>
        <h1 className="display mt-4 text-[30px] md:text-[38px]">Your cart is empty.</h1>
        <Link href="/collection" className="link-line mt-8">Discover the collection</Link>
      </div>
    );
  }

  return (
    <form
      className="px-5 pb-24 pt-20 md:px-12 md:pb-40 md:pt-28"
      onSubmit={(e) => {
        e.preventDefault();
        const no = "SOV-" + Math.floor(10000 + Math.random() * 90000);
        setOrder({ no, total, count: items.reduce((a, i) => a + i.qty, 0) });
        clear();
        window.scrollTo({ top: 0 });
      }}
    >
      <div className="flex flex-col gap-3 md:gap-4">
        <span className="label">Checkout</span>
        <h1 className="display text-[30px] md:text-[38px]">Almost there</h1>
      </div>

      <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-[7fr_5fr] md:gap-6">
        <div className="flex flex-col gap-14 md:max-w-[640px] md:gap-20">
          <section className="flex flex-col gap-8">
            <span className="label border-t border-stone pt-6">01 · Contact</span>
            <div className="grid gap-8 md:grid-cols-2 md:gap-10">
              <Field label="Email" className="md:col-span-2"><input required type="email" value={f.email} onChange={up("email")} className={cls(f.email)} autoComplete="email" /></Field>
              <Field label="Full name"><input required value={f.name} onChange={up("name")} className={cls(f.name)} autoComplete="name" /></Field>
              <Field label="Telephone"><input required type="tel" value={f.phone} onChange={up("phone")} className={cls(f.phone)} autoComplete="tel" /></Field>
            </div>
          </section>

          <section className="flex flex-col gap-8">
            <span className="label border-t border-stone pt-6">02 · Delivery</span>
            <div className="grid gap-8 md:grid-cols-2 md:gap-10">
              <Field label="Address" className="md:col-span-2"><input required value={f.address} onChange={up("address")} className={cls(f.address)} autoComplete="street-address" /></Field>
              <Field label="City"><input required value={f.city} onChange={up("city")} className={cls(f.city)} autoComplete="address-level2" /></Field>
              <Field label="PIN code"><input required value={f.pin} onChange={up("pin")} className={cls(f.pin)} autoComplete="postal-code" inputMode="numeric" /></Field>
            </div>
            <div className="flex flex-col gap-3">
              {DELIVERY.map((d, i) => (
                <Radio key={d.name} on={delivery === i} onClick={() => setDelivery(i)} right={d.note}>{d.name}</Radio>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-8">
            <span className="label border-t border-stone pt-6">03 · Payment</span>
            <div className="flex flex-col gap-3">
              {PAYMENT.map((p, i) => (
                <Radio key={p.name} on={payment === i} onClick={() => setPayment(i)} right={p.note}>{p.name}</Radio>
              ))}
            </div>
            <p className="text-[11px] leading-[1.8] text-muted">No card details are taken on this page. Payment is completed on the provider’s secure page after you place the order.</p>
          </section>

          <section className="flex flex-col gap-8">
            <span className="label border-t border-stone pt-6">04 · A note for the cutter · optional</span>
            <Field label="Anything we should know"><input value={f.note} onChange={up("note")} placeholder="A date it is needed by, or a preference we should keep in mind" className={cls(f.note)} /></Field>
          </section>
        </div>

        <aside className="flex flex-col gap-8 self-start bg-stone px-6 py-8 md:sticky md:top-24 md:ml-6 md:px-12 md:py-12">
          <span className="label">Your order</span>
          <div className="flex flex-col text-[13px]">
            {items.map((it) => (
              <div key={it.id} className="flex justify-between gap-6 border-t border-grey py-4">
                <div className="flex flex-col gap-1">
                  <span className="serif text-[17px]">{it.name}{it.qty > 1 ? ` × ${it.qty}` : ""}</span>
                  <span className="caption normal-case tracking-[.08em]">{it.spec.slice(0, 3).join(" · ")}</span>
                </div>
                <span>{inr(it.price * it.qty)}</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-grey py-4"><span>Delivery</span><span>{DELIVERY[delivery].price ? inr(DELIVERY[delivery].price) : "Complimentary"}</span></div>
            <div className="flex items-baseline justify-between border-t border-ink py-5 text-[12px] tracking-[.04em]"><span>Total</span><span className="serif text-[20px]">{inr(total)}</span></div>
          </div>
          <button type="submit" className="btn btn-primary">Place order</button>
          <Link href="/bag" className="link-line self-start">Back to cart</Link>
        </aside>
      </div>
    </form>
  );
}

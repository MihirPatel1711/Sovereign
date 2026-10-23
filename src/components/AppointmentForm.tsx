"use client";
import { useState } from "react";
import { Field, Radio } from "./Controls";

const WEEKS = ["27 Oct", "3 Nov", "10 Nov", "17 Nov"];
const CITIES = ["Delhi", "Mumbai", "Bengaluru", "Hyderabad"];

export default function AppointmentForm() {
  const [where, setWhere] = useState(0);
  const [week, setWeek] = useState(1);
  const [city, setCity] = useState(CITIES[0]);
  const [f, setF] = useState({ name: "", email: "", phone: "", occasion: "" });
  const [done, setDone] = useState(false);

  const up = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });
  const cls = (v: string) => `input-line ${v ? "filled" : ""}`;

  if (done) {
    return (
      <div className="flex flex-col gap-6 border-t border-stone pt-10">
        <span className="label">Request received</span>
        <p className="serif text-[26px] leading-[1.3]">Thank you, {f.name.split(" ")[0] || "and welcome"}.</p>
        <p className="text-[14px] leading-[1.9]">
          We will write to {f.email} within one working day to confirm the week of {WEEKS[week]}, {where === 0 ? "at the atelier in " + city : "at your office or home in " + city}. There is no charge for the fitting.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-10 md:gap-14"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        <Field label="Full name"><input required value={f.name} onChange={up("name")} className={cls(f.name)} autoComplete="name" /></Field>
        <Field label="Email"><input required type="email" value={f.email} onChange={up("email")} className={cls(f.email)} autoComplete="email" /></Field>
        <Field label="Telephone"><input required type="tel" value={f.phone} onChange={up("phone")} className={cls(f.phone)} autoComplete="tel" /></Field>
        <Field label="City">
          <span className="relative">
            <select value={city} onChange={(e) => setCity(e.target.value)} className="input-line filled">
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <span className="pointer-events-none absolute right-0 top-2 text-[10px] text-muted">▾</span>
          </span>
        </Field>
        <div className="flex flex-col gap-3.5 md:col-span-2">
          <span className="label">Where</span>
          <div className="flex flex-col gap-3 md:flex-row md:gap-8">
            <Radio on={where === 0} onClick={() => setWhere(0)}>At the atelier</Radio>
            <Radio on={where === 1} onClick={() => setWhere(1)}>At my office or home</Radio>
          </div>
        </div>
        <div className="flex flex-col gap-3.5 md:col-span-2">
          <span className="label">Preferred week</span>
          <div className="seg">
            {WEEKS.map((w, i) => (
              <button key={w} type="button" onClick={() => setWeek(i)} className={`!tracking-[.1em] !normal-case ${week === i ? "on" : ""}`}>{w}</button>
            ))}
          </div>
        </div>
        <Field label="The occasion · optional" className="md:col-span-2">
          <input value={f.occasion} onChange={up("occasion")} placeholder="A new chambers, a wedding, a posting abroad" className={cls(f.occasion)} />
        </Field>
      </div>
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
        <button type="submit" className="btn btn-primary px-10">Request an appointment</button>
        <span className="text-[11px] leading-[1.7] text-muted">We reply within one working day.<br />No charge for the fitting.</span>
      </div>
    </form>
  );
}

"use client";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  if (done) return <p className="text-[12px] tracking-[.04em] text-muted">Thank you. The first letter will find you soon.</p>;
  return (
    <form
      className="flex items-end gap-4 border-b border-ink pb-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (email.includes("@")) setDone(true);
      }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        aria-label="Email address"
        className="flex-1 border-0 bg-transparent text-[12px] tracking-[.04em] text-ink outline-none placeholder:text-muted"
      />
      <button type="submit" className="text-[10px] uppercase tracking-[.2em] text-copper transition-colors hover:text-copper-deep">
        Subscribe
      </button>
    </form>
  );
}

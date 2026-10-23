"use client";
import { COLOURS } from "@/lib/data";

export function Swatches({ value, onChange, size = 28 }: { value: number; onChange: (i: number) => void; size?: number }) {
  return (
    <div className="flex gap-3.5">
      {COLOURS.map((c, i) => (
        <button
          key={c.name}
          type="button"
          aria-label={c.name}
          title={c.name}
          className={`swatch ${value === i ? "on" : ""}`}
          style={{ background: c.hex, width: size, height: size }}
          onClick={() => onChange(i)}
        />
      ))}
    </div>
  );
}

export function Segmented({ options, value, onChange }: { options: string[]; value: number; onChange: (i: number) => void }) {
  return (
    <div className="seg">
      {options.map((o, i) => (
        <button key={o} type="button" className={value === i ? "on" : ""} onClick={() => onChange(i)}>
          {o}
        </button>
      ))}
    </div>
  );
}

export function Radio({
  on,
  children,
  onClick,
  right,
}: {
  on: boolean;
  children: React.ReactNode;
  onClick: () => void;
  right?: React.ReactNode;
}) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center justify-between text-left text-[13px]">
      <span className="flex items-center gap-3 whitespace-nowrap">
        <span className={`radio ${on ? "on" : ""}`}>
          <span />
        </span>
        {children}
      </span>
      {right ? <span className="caption">{right}</span> : null}
    </button>
  );
}

export function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-2.5 ${className}`}>
      <span className="label">{label}</span>
      {children}
    </label>
  );
}

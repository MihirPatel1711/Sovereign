import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-5 pt-20 text-center">
      <span className="label">Not found</span>
      <p className="display max-w-[480px] text-[28px] md:text-[34px]">This page has moved on, or never was.</p>
      <Link href="/" className="link-line">Back to Sovereign</Link>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductView from "@/components/ProductView";
import { PRODUCTS, productBySlug, productTitle } from "@/lib/data";

// Every product is prerendered from generateStaticParams; opt out of the instant-shell
// check since the page reads params directly.
export const instant = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  return { title: p ? productTitle(p) : "Product" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) notFound();
  const look = p.look.map((s) => productBySlug(s)).filter((x): x is NonNullable<typeof x> => !!x);
  return <ProductView p={p} look={look} />;
}

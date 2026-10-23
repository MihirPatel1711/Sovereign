import type { Metadata } from "next";
import BagView from "@/components/BagView";

export const metadata: Metadata = { title: "Shopping cart" };

export default function BagPage() {
  return <BagView />;
}

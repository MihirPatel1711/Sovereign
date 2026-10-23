import type { Metadata } from "next";
import SuitBuilder from "@/components/SuitBuilder";

export const metadata: Metadata = { title: "Compose a three-piece" };

export default function SuitBuildPage() {
  return <SuitBuilder />;
}

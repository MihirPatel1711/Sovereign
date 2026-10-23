import type { Metadata } from "next";
import { Suspense } from "react";
import CollectionView from "@/components/CollectionView";

export const metadata: Metadata = { title: "The collection" };

export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-16" />}>
      <CollectionView />
    </Suspense>
  );
}

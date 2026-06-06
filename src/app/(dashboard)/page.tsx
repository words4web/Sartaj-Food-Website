"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { TrustSignals } from "@/components/home/TrustSignals";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { ProductSection } from "@/components/home/ProductSection";
import { PRODUCT_BADGES } from "@/constants/product.constants";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-card">
      <HeroSection />
      <TrustSignals />
      <CategoriesGrid />
      <ProductSection title="Featured Products" badge={PRODUCT_BADGES.FEATURED} />
      <ProductSection title="Hot Products" badge={PRODUCT_BADGES.HOT} />
      <ProductSection title="New Arrivals" badge={PRODUCT_BADGES.NEW_ARRIVAL} />
    </main>
  );
}

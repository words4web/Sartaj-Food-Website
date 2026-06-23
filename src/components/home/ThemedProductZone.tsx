"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { TrustSignals } from "@/components/home/TrustSignals";
import { ManufacturersGrid } from "@/components/home/ManufacturersGrid";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { PromoBanner } from "@/components/home/PromoBanner";
import { ProductSection } from "@/components/home/ProductSection";
import { PRODUCT_BADGES } from "@/constants/product.constants";
import { Testimonials } from "@/components/home/Testimonials";

export function ThemedProductZone() {
  const currentTheme = useSelector((state: RootState) => state.locale.theme);

  // Theme-specific ambient gradient tint over this zone
  const themeGradient: Record<string, string> = {
    sakura:
      "radial-gradient(ellipse at 20% 50%, oklch(0.95 0.06 355 / 0.35) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, oklch(0.92 0.08 340 / 0.25) 0%, transparent 55%)",
    snowfall:
      "radial-gradient(ellipse at 30% 30%, oklch(0.93 0.04 220 / 0.4) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, oklch(0.95 0.05 215 / 0.3) 0%, transparent 55%)",
    diwali:
      "radial-gradient(ellipse at 50% 0%, oklch(0.92 0.1 55 / 0.4) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, oklch(0.95 0.07 60 / 0.25) 0%, transparent 55%)",
    default: "none",
  };

  const gradient = themeGradient[currentTheme] ?? "none";

  return (
    <div className="relative">
      {/* Ambient gradient tint */}
      {gradient !== "none" && (
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{ background: gradient }}
          aria-hidden="true"
        />
      )}

      <div className="relative">
        <TrustSignals />
        <CategoriesGrid />
        <PromoBanner />
        <ProductSection title="Featured Products" badge={PRODUCT_BADGES.FEATURED} />
        <ProductSection title="Hot Products" badge={PRODUCT_BADGES.HOT} />
        <ProductSection title="New Arrivals" badge={PRODUCT_BADGES.NEW_ARRIVAL} />
        <ManufacturersGrid />
        <Testimonials />
      </div>
    </div>
  );
}

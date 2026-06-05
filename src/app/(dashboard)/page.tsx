import { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustSignals } from "@/components/home/TrustSignals";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { ProductSection } from "@/components/home/ProductSection";

export const metadata: Metadata = {
  title: "Home - Sartaj Foods",
  description:
    "Discover authentic South Asian products and premium flavors. Premium basmati rice, aromatic spices, and traditional sweets.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-card">
      <HeroSection />
      <TrustSignals />
      <CategoriesGrid />
      <ProductSection title="Popular Products" />
      <ProductSection title="Featured Products" showTabs={true} />
    </main>
  );
}

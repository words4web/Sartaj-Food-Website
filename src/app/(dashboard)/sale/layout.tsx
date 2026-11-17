import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Indian Grocery Offers & Discounts | Sartaj Foods Japan",
  description:
    "Save big on your favorite spices, rice, snacks, frozen foods! Discover daily discounts, bulk offer bundles, and special deals delivered straight at your doorstep.",
};

export default function SaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

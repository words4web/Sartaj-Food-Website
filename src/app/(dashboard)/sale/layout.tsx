import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Special Offers and Discounts on Indian Groceries, spices and Essentials | Sartaj Foods Japan",
  description:
    "Save big on your favorite spices, rice, snacks, frozen foods! Discover daily discounts, bulk offer bundles, and special deals delivered straight at your doorstep.",
};

export default function SaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Special Deals & Discounts on Indian Groceries in Japan | Sartaj Foods",
  description:
    "Save big on your favorite South Asian & Indian groceries! Discover daily discounts, bulk offer bundles, and special deals delivered straight to your door.",
};

export default function SaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

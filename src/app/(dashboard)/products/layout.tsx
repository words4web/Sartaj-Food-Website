import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Indian Spices, Rice, snacks and Household Essentials",
  description:
    "Shop full range products from basmati rice, atta, ghee, spices, snacks, frozen foods & more. Authentic Indian & home essentials delivered fresh across Japan.",
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

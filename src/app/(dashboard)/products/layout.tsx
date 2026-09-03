import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy Indian & South Asian Groceries Online in Japan | Sartaj Foods",
  description:
    "Explore Japan's finest selection of authentic Indian spices, premium basmati rice, lentils, frozen foods, and daily staples. Fast delivery across Japan.",
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

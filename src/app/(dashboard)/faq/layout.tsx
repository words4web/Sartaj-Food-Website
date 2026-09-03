import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Shipping & Delivery | Sartaj Foods",
  description:
    "Find answers to common questions about online ordering, delivery slots across Japan, free shipping thresholds, payment methods, and product returns.",
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

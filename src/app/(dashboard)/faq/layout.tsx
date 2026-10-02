import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Shipping, Payment & Returns | Sartaj Foods",
  description:
    "Answers to common questions on ordering, shipping across Japan, free delivery thresholds, payment methods, and returns at Sartaj Foods.",
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

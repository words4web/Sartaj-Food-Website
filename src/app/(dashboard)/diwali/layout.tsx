import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diwali Festive Specials & Haldiram's Sweets | Sartaj Foods Japan",
  description:
    "Celebrate Diwali in Japan with authentic Haldiram's sweets, namkeen, snacks, and festive essentials. Enjoy special festive discounts with fast delivery across Japan.",
  openGraph: {
    title: "Diwali Festive Specials & Haldiram's Sweets | Sartaj Foods Japan",
    description:
      "Celebrate Diwali in Japan with authentic Haldiram's sweets, namkeen, snacks, and festive essentials.",
    images: ["/favicons_sartaj/android-chrome-512x512.png"],
  },
};

export default function DiwaliLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

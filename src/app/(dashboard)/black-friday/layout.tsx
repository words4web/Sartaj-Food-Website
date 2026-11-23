import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Black Friday Mega Sale | Sartaj Foods Japan",
  description:
    "Massive Black Friday savings on authentic spices, basmati rice, lentils, Haldiram's snacks, and gourmet Indian groceries in Japan. Limited-time festive discounts!",
  openGraph: {
    title: "Black Friday Mega Sale | Sartaj Foods Japan",
    description:
      "Exclusive Black Friday deals on authentic groceries and snacks with fast delivery across Japan.",
    images: ["/favicons_sartaj/android-chrome-512x512.png"],
  },
};

export default function BlackFridayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

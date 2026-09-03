import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Sartaj Foods | Bringing Authentic South Asian Flavors to Japan",
  description:
    "Learn how Sartaj Foods became Japan’s leading direct importer of genuine Indian groceries, premium spices, and authentic pantry staples.",
};

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

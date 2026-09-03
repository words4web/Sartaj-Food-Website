import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentic Recipes & South Asian Food Guides | Sartaj Foods Blog",
  description:
    "Discover traditional Indian recipes, spice pairing guides, cooking tips, and stories behind authentic South Asian flavors in Japan.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

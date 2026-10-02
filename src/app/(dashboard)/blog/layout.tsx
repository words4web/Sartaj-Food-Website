import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentic Indian Food, Recipes and Lifestyle Blogs | Sartaj Foods Japan",
  description:
    "Discover traditional Indian recipes, spice guides and cooking tips, wellness tips from the Sartaj Foods blog made for life in Japan.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

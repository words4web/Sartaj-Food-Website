import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Sartaj Foods | Indian Grocery in Japan",
  description:
    "Meet team behind Sartaj Foods started with one goal: real Indian groceries, spices, everyday essentials delivered across Japan.",
};

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

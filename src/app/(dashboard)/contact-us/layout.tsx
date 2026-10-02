import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Sartaj Foods Japan",
  description:
    "Need help with an order or want to visit a store? Get in touch with Sartaj Foods customer support and locations across Japan.",
};

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

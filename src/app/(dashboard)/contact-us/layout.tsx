import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Sartaj Foods | Customer Support & Store Locations in Japan",
  description:
    "Have questions about your order or our products? Get in touch with the Sartaj Foods support team or visit our physical store locations across Japan.",
};

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

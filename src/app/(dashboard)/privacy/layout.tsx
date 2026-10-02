import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Data Protection | Sartaj Foods Japan",
  description:
    "Sartaj Foods' Japan privacy policy how we collect, use, and protect your personal information during online orders and transactions.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

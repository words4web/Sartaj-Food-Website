import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service & Store Policies | Sartaj Foods Japan",
  description:
    "Read Sartaj Foods Japan's terms and conditions, purchasing guidelines, store policies, and service agreements.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

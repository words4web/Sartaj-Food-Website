import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service & Policies | Sartaj Foods Japan",
  description:
    "Sartaj Foods Japan official terms of service purchasing guidelines, store policies, and customer agreements for shopping in Japan.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

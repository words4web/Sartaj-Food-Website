import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Sartaj Foods Japan",
  description:
    "Learn how Sartaj Foods Japan protects your personal information, processes secure online transactions, and respects your privacy.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

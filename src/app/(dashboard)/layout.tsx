"use client";

import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";
import { AuthLoadingOverlay } from "@/components/common/AuthLoadingOverlay";

const isPublicPath = (path: string): boolean => {
  if (
    path === "/" ||
    path === "/privacy" ||
    path === "/terms" ||
    path === "/about-us" ||
    path === "/contact-us" ||
    path === "/faq"
  ) {
    return true;
  }
  if (path.startsWith("/products")) return true;
  return false;
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();

  const isPublic = isPublicPath(pathname);

  useEffect(() => {
    if (!isPublic && !isLoading && !isAuthenticated) {
      router.push(ROUTES.LOGIN);
    }
  }, [isAuthenticated, isLoading, router, isPublic]);

  if (!isPublic && (isLoading || !isAuthenticated)) {
    return <AuthLoadingOverlay />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-card">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

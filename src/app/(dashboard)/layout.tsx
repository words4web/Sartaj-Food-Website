"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";
import { AuthLoadingOverlay } from "@/components/common/AuthLoadingOverlay";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(ROUTES.LOGIN);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
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

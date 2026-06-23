"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Home, ShoppingBag, MapPinOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";

export default function NotFound() {
  const t = useTranslations();

  return (
    <div className="flex flex-col min-h-screen bg-card">
      <Header />

      <main className="flex-grow flex items-center justify-center relative overflow-hidden px-6 py-16">
        {/* Ambient background glows that adapt to the active theme color variables */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-primary/5 blur-[80px] sm:blur-[120px] pointer-events-none" />

        {/* Main Card Container with page alignment and branding styles */}
        <div className="relative z-10 text-center max-w-md w-full flex flex-col items-center">
          {/* Floating/Visual Icon Container */}
          <div className="relative mb-6 p-5 rounded-2xl bg-muted/40 border border-border/60 shadow-sm animate-bounce duration-1000 ease-in-out">
            <MapPinOff className="h-12 w-12 text-primary stroke-[1.5]" />
          </div>

          {/* 404 Header text styled with theme gradient */}
          <h1 className="text-7xl sm:text-8xl font-extrabold tracking-tighter bg-gradient-to-b from-primary to-primary/70 bg-clip-text text-transparent drop-shadow-sm select-none">
            404
          </h1>

          {/* Localized Title */}
          <h2 className="mt-4 text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            {t("notFound.title")}
          </h2>

          {/* Localized Description */}
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {t("notFound.description")}
          </p>

          {/* Action Buttons following site's UI structure */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full justify-center">
            <Link href={ROUTES.HOME} passHref className="w-full sm:w-auto">
              <Button
                className="w-full sm:w-auto h-11 px-5 rounded-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all duration-200 text-sm font-semibold shadow-sm"
                variant="default"
              >
                <Home className="h-4 w-4" />
                {t("notFound.backHome")}
              </Button>
            </Link>
            <Link href={ROUTES.PRODUCTS()} passHref className="w-full sm:w-auto">
              <Button
                className="w-full sm:w-auto h-11 px-5 rounded-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all duration-200 text-sm font-semibold"
                variant="outline"
              >
                <ShoppingBag className="h-4 w-4" />
                {t("notFound.shopProducts")}
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

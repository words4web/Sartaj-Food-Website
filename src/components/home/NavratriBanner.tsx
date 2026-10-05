"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ROUTES } from "@/constants/routes";
import { Sparkles, ArrowRight } from "lucide-react";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false },
);

export function NavratriBanner({ onNavratriPage = false }: { onNavratriPage?: boolean }) {
  const t = useTranslations("navratri");

  if (onNavratriPage) return null;

  return (
    <div className="relative overflow-hidden w-full rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/20 via-background/60 to-orange-500/20 py-8 lg:py-6 px-6 sm:px-10 lg:px-12 shadow-xl backdrop-blur-md transition-all duration-500 my-8">
      <div className="absolute -left-10 -top-10 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div
        className="absolute -right-10 -bottom-10 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"
        style={{ animationDuration: "4s" }}
      />

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 relative z-10">
        <div className="space-y-4 sm:space-y-5 text-center lg:text-left w-full lg:flex-1 max-w-2xl mx-auto lg:mx-0">
          <div className="inline-flex items-center justify-center lg:justify-start gap-2.5 bg-amber-500/15 border border-amber-500/30 px-4 py-1.5 rounded-full shadow-sm">
            <Sparkles
              className="h-4 w-4 text-amber-600 dark:text-amber-400 animate-spin"
              style={{ animationDuration: "6s" }}
            />
            <span className="text-xs uppercase tracking-widest font-black text-amber-700 dark:text-amber-400">
              {t("badge")}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 dark:from-amber-400 dark:via-orange-400 dark:to-rose-400 bg-clip-text text-transparent animate-text-shimmer">
            <style
              dangerouslySetInnerHTML={{
                __html: `
              @keyframes textShimmer {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              .animate-text-shimmer {
                background-size: 200% auto;
                animation: textShimmer 4s ease infinite;
              }
            `,
              }}
            />
            {t("heroTitle")}
          </h3>

          <p className="text-sm sm:text-base text-muted-foreground font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
            {t("heroSubtitle")}
          </p>

          <div className="pt-2 flex justify-center lg:justify-start">
            <Link
              href={ROUTES.NAVRATRI}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
            >
              <span>{t("shopNow")}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center shrink-0">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 flex items-center justify-center bg-amber-500/10 dark:bg-amber-500/15 rounded-full border border-amber-500/25 p-2 shadow-inner shadow-amber-500/20 hover:scale-105 transition-transform duration-500">
            <DotLottieReact
              src="/animations/Dandia navratri.json"
              loop
              autoplay
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

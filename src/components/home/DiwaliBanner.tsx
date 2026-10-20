"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ROUTES } from "@/constants/routes";
import { Sparkles, ArrowRight, Flame } from "lucide-react";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false },
);

export function DiwaliBanner({ onDiwaliPage = false }: { onDiwaliPage?: boolean }) {
  const t = useTranslations("diwali");

  if (onDiwaliPage) return null;

  return (
    <div className="relative overflow-hidden w-full rounded-3xl border border-amber-500/40 bg-gradient-to-br from-amber-500/25 via-background/70 to-orange-600/25 py-8 lg:py-6 px-6 sm:px-10 lg:px-12 shadow-2xl backdrop-blur-md transition-all duration-500 my-8">
      <div className="absolute -left-10 -top-10 w-56 h-56 bg-amber-400/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div
        className="absolute -right-10 -bottom-10 w-56 h-56 bg-orange-500/25 rounded-full blur-3xl pointer-events-none animate-pulse"
        style={{ animationDuration: "3.5s" }}
      />
      <div
        className="absolute left-1/2 -top-16 -translate-x-1/2 w-64 h-32 bg-yellow-400/20 rounded-full blur-2xl pointer-events-none animate-pulse"
        style={{ animationDuration: "5s" }}
      />

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 relative z-10">
        <div className="space-y-4 sm:space-y-5 text-center lg:text-left w-full lg:flex-1 max-w-2xl mx-auto lg:mx-0">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 px-3.5 py-1.5 rounded-full shadow-sm">
              <Flame className="h-4 w-4 text-amber-500 animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-black text-amber-700 dark:text-amber-400">
                {t("badge")}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-amber-600 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
              <Sparkles className="h-3 w-3" />
              <span>{t("discountBadge")}</span>
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 dark:from-amber-300 dark:via-orange-300 dark:to-yellow-200 bg-clip-text text-transparent animate-text-shimmer">
            {t("heroTitle")}
          </h3>

          <p className="text-sm sm:text-base text-muted-foreground font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
            {t("heroSubtitle")}
          </p>

          <div className="pt-2 flex justify-center lg:justify-start">
            <Link
              href={ROUTES.DIWALI}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:via-orange-600 hover:to-yellow-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
            >
              <span>{t("shopNow")}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center shrink-0">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 flex items-center justify-center bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-yellow-500/20 rounded-full border border-amber-500/30 p-2 shadow-inner shadow-amber-500/30 hover:scale-105 transition-transform duration-500">
            <DotLottieReact
              src="/animations/Happy Diwali.json"
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

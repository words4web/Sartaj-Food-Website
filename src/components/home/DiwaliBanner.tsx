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
    <div className="relative overflow-hidden w-full rounded-2xl sm:rounded-3xl border border-amber-500/40 bg-gradient-to-br from-amber-500/25 via-background/70 to-orange-600/25 py-5 px-4 sm:py-8 sm:px-8 lg:py-6 lg:px-12 shadow-xl sm:shadow-2xl backdrop-blur-md transition-all duration-500 my-4 sm:my-8">
      <div className="absolute -left-10 -top-10 w-36 sm:w-56 h-36 sm:h-56 bg-amber-400/25 rounded-full blur-2xl sm:blur-3xl pointer-events-none animate-pulse" />
      <div
        className="absolute -right-10 -bottom-10 w-36 sm:w-56 h-36 sm:h-56 bg-orange-500/25 rounded-full blur-2xl sm:blur-3xl pointer-events-none animate-pulse"
        style={{ animationDuration: "3.5s" }}
      />
      <div
        className="absolute left-1/2 -top-16 -translate-x-1/2 w-40 sm:w-64 h-20 sm:h-32 bg-yellow-400/20 rounded-full blur-xl sm:blur-2xl pointer-events-none animate-pulse"
        style={{ animationDuration: "5s" }}
      />

      <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 lg:gap-8 relative z-10">
        <div className="space-y-3 sm:space-y-4 text-center lg:text-left w-full lg:flex-1 max-w-2xl mx-auto lg:mx-0">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2">
            <div className="inline-flex items-center gap-1 sm:gap-1.5 bg-amber-500/15 border border-amber-500/30 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full shadow-sm">
              <Flame className="h-3 sm:h-4 w-3 sm:w-4 text-amber-500 animate-pulse shrink-0" />
              <span className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-black text-amber-700 dark:text-amber-400">
                {t("badge")}
              </span>
            </div>
            <div className="inline-flex items-center gap-1 bg-gradient-to-r from-red-600 to-amber-600 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md">
              <Sparkles className="h-2.5 sm:h-3 w-2.5 sm:w-3 shrink-0" />
              <span>{t("discountBadge")}</span>
            </div>
          </div>

          <h3 className="text-xl min-[420px]:text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 dark:from-amber-300 dark:via-orange-300 dark:to-yellow-200 bg-clip-text text-transparent animate-text-shimmer">
            {t("heroTitle")}
          </h3>

          <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
            {t("heroSubtitle")}
          </p>

          <div className="pt-1 sm:pt-2 flex justify-center lg:justify-start">
            <Link
              href={ROUTES.DIWALI}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:via-orange-600 hover:to-yellow-600 text-white font-extrabold text-xs sm:text-base shadow-md sm:shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group w-full min-[480px]:w-auto"
            >
              <span>{t("shopNow")}</span>
              <ArrowRight className="h-3.5 sm:h-4 w-3.5 sm:w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center shrink-0">
          <div className="relative w-32 h-32 min-[400px]:w-40 min-[400px]:h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 flex items-center justify-center bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-yellow-500/20 rounded-full border border-amber-500/30 p-2 shadow-inner shadow-amber-500/30 hover:scale-105 transition-transform duration-500">
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

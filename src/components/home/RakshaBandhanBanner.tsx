"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ROUTES } from "@/constants/routes";
import { Sparkles } from "lucide-react";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false },
);

export function RakshaBandhanBanner() {
  const t = useTranslations("rakhiBanner");

  return (
    <div className="relative overflow-hidden w-full rounded-3xl border border-amber-500/25 bg-gradient-to-br from-amber-500/15 via-background/50 to-orange-500/15 py-8 lg:py-0 px-6 sm:px-10 lg:px-12 shadow-2xl backdrop-blur-md transition-all duration-500">
      <div className="absolute -left-10 -top-10 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div
        className="absolute -right-10 -bottom-10 w-48 h-48 bg-rose-500/15 rounded-full blur-3xl pointer-events-none animate-pulse"
        style={{ animationDuration: "4s" }}
      />

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 relative z-10">
        <div className="space-y-4 sm:space-y-6 text-center lg:text-left w-full lg:flex-1 max-w-2xl mx-auto lg:mx-0">
          <div className="inline-flex items-center justify-center lg:justify-start gap-2.5 bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full">
            <Sparkles
              className="h-4 w-4 text-amber-600 dark:text-amber-400 animate-spin"
              style={{ animationDuration: "6s" }}
            />
            <span className="text-xs uppercase tracking-widest font-extrabold text-amber-700 dark:text-amber-400">
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
            {t("title")}
          </h3>

          <p className="text-sm sm:text-base text-muted-foreground font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
            {t("description")}
          </p>

          <div className="pt-2 flex justify-center lg:justify-start">
            <Link
              href={ROUTES.PRODUCTS_WITH_QUERY("search=rakhi")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-extrabold text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <span>{t("btnText")}</span>
            </Link>
          </div>
        </div>

        <div className="flex-shrink-0 w-full lg:w-1/2 flex items-center justify-center relative min-h-[260px] sm:min-h-[320px] md:min-h-[360px]">
          <div className="absolute w-64 h-64 sm:w-80 sm:h-80 opacity-50 z-0">
            <DotLottieReact
              src="/animations/Rakhi - Happy Raksha Bandhan.json"
              loop
              autoplay
              className="w-full h-full"
            />
          </div>
          <div className="w-64 h-64 sm:w-80 sm:h-80 relative z-10">
            <DotLottieReact
              src="/animations/Raksha Bandhan.json"
              loop
              autoplay
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

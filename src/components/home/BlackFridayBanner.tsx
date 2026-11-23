"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { ArrowRight, Flame, Percent, Zap } from "lucide-react";

export function BlackFridayBanner({ onSalePage = false }: { onSalePage?: boolean }) {
  const t = useTranslations("blackfriday");

  if (onSalePage) return null;

  return (
    <div className="relative overflow-hidden w-full rounded-2xl sm:rounded-3xl border border-[#ff6a00]/40 bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#1f242d] py-5 px-4 sm:py-8 sm:px-8 lg:py-7 lg:px-12 shadow-2xl backdrop-blur-md transition-all duration-500 my-4 sm:my-8 text-white">
      {/* Background glow effects matching theme */}
      <div className="absolute -left-10 -top-10 w-44 sm:w-64 h-44 sm:h-64 bg-[#ff6a00]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div
        className="absolute -right-10 -bottom-10 w-48 sm:w-72 h-48 sm:h-72 bg-[#ff8c33]/15 rounded-full blur-3xl pointer-events-none animate-pulse"
        style={{ animationDuration: "4s" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(#ff6a00_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-8 relative z-10">
        <div className="space-y-3 sm:space-y-4 text-center lg:text-left w-full lg:flex-1 max-w-2xl mx-auto lg:mx-0">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <div className="inline-flex items-center gap-1.5 bg-[#ff6a00]/15 border border-[#ff6a00]/40 px-3 py-1 rounded-full shadow-sm">
              <Flame className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-[#ff6a00] animate-pulse shrink-0" />
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-black text-[#ff8c33]">
                {t("badge")}
              </span>
            </div>
            <div className="inline-flex items-center gap-1 bg-[#ff6a00] text-black text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md animate-pulse">
              <Percent className="h-3 sm:h-3.5 w-3 sm:w-3.5 shrink-0 stroke-[2.5]" />
              <span>{t("discountBadge")}</span>
            </div>
          </div>

          <h3 className="text-2xl min-[420px]:text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
            <span className="text-[#ff6a00] drop-shadow-[0_2px_12px_rgba(255,106,0,0.4)]">BLACK FRIDAY</span>{" "}
            MEGA SALE
          </h3>

          <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
            {t("heroSubtitle")}
          </p>

          <div className="pt-2 flex justify-center lg:justify-start">
            <Link
              href={ROUTES.BLACK_FRIDAY}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#ff6a00] to-[#ff8c33] hover:from-[#ff7b1a] hover:to-[#ffa04d] text-white font-black text-xs sm:text-base shadow-lg shadow-[#ff6a00]/30 hover:shadow-[#ff6a00]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group w-full min-[480px]:w-auto"
            >
              <span>{t("shopNow")}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Visual Badge / Tag */}
        <div className="flex justify-center items-center shrink-0">
          <div className="relative group">
            {/* Outer Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#ff6a00] to-amber-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
            
            {/* Visual ticket / badge inspired by Black Friday style */}
            <div className="relative w-44 min-[420px]:w-52 sm:w-60 h-44 min-[420px]:h-52 sm:h-60 rounded-3xl bg-[#161b22] border-2 border-[#ff6a00]/60 p-4 flex flex-col items-center justify-center text-center shadow-2xl overflow-hidden">
              <div className="absolute -right-12 -top-12 w-28 h-28 bg-[#ff6a00]/20 rounded-full blur-xl pointer-events-none" />
              <div className="absolute -left-12 -bottom-12 w-28 h-28 bg-[#ff8c33]/20 rounded-full blur-xl pointer-events-none" />
              
              <div className="bg-[#ff6a00] text-black text-[11px] sm:text-xs font-black px-3 py-0.5 rounded-full uppercase tracking-widest mb-2 shadow">
                LIMITED TIME
              </div>

              <div className="flex items-center justify-center gap-1 text-[#ff6a00] my-1">
                <Zap className="h-5 w-5 fill-[#ff6a00]" />
                <span className="text-xl sm:text-2xl font-black tracking-tighter">EXCLUSIVE</span>
              </div>

              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none drop-shadow-[0_2px_8px_rgba(255,106,0,0.5)]">
                MEGA <span className="text-[#ff6a00]">DEALS</span>
              </div>

              <div className="mt-3 text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider border-t border-white/10 pt-2 w-full text-center">
                BIGGEST SALE OF THE YEAR
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

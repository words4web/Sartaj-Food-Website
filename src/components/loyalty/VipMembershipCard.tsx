"use client";

import { useState } from "react";
import { Crown, Sparkles, Wifi, Truck, Zap, RotateCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { formatDate } from "@/utils/format/format.utils";
import { ILoyaltyStatus } from "@/types/loyalty/loyalty.types";

export function VipMembershipCard({ loyalty }: { loyalty: ILoyaltyStatus }) {
  const t = useTranslations("loyalty");
  const [isFlipped, setIsFlipped] = useState(false);
  const { qualifiedAt, freeDeliveriesRemaining, isDoublePointsWeekendActive } = loyalty;

  const formattedDate = qualifiedAt ? formatDate(qualifiedAt) : t("activeMemberFallback");

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="mt-6 w-full max-w-xl mx-auto perspective-1000 group cursor-pointer select-none px-1.5 xs:px-2 sm:px-0"
    >
      <div
        className={`relative w-full rounded-2xl sm:rounded-3xl p-3.5 xs:p-5 sm:p-7 min-h-[210px] xs:min-h-[220px] sm:min-h-[240px] flex flex-col justify-between text-left shadow-2xl transition-all duration-700 [transform-style:preserve-3d] bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#c5a028] border border-[#fbf4b7]/80 group-hover:border-white group-hover:shadow-[0_20px_50px_rgba(212,175,55,0.45)] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* FRONT FACE */}
        <div className="[backface-visibility:hidden] flex flex-col justify-between h-full space-y-3 xs:space-y-4 sm:space-y-6">
          <div className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl transition-opacity duration-500 opacity-40 group-hover:opacity-80 bg-[radial-gradient(ellipse_at_top,#ffffff_0%,rgba(243,229,171,0.3)_45%,transparent_80%)]" />
          <div className="absolute -inset-[100%] pointer-events-none bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 animate-shimmer" />

          {/* HEADER ROW */}
          <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="h-8 w-8 xs:h-9 xs:w-9 sm:h-11 sm:w-11 rounded-xl bg-gradient-to-br from-[#fbf4b7] via-[#d4af37] to-[#8c6d17] p-0.5 shadow-md shadow-[#4a3605]/20 shrink-0 flex items-center justify-center">
                <div className="w-full h-full bg-[#3d2b03] rounded-[9px] sm:rounded-[10px] flex items-center justify-center">
                  <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-[#f3e5ab] drop-shadow-[0_2px_8px_rgba(212,175,55,0.7)]" />
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-black tracking-wider sm:tracking-widest text-[#5c440a] uppercase truncate">
                    {t("vipClub")}
                  </span>
                  <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#5c440a] animate-pulse shrink-0" />
                </div>
                <h2 className="text-xs xs:text-sm sm:text-xl font-extrabold text-[#3d2b03] tracking-tight leading-none truncate drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
                  {t("familyMember")}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <Wifi className="h-4 w-4 sm:h-5 sm:w-5 text-[#5c440a]/80 rotate-90 hidden sm:block" />
              <span className="px-2 xs:px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#3d2b03] text-[#f3e5ab] text-[8.5px] xs:text-[9.5px] sm:text-xs font-black uppercase tracking-wider shadow-md shadow-[#3d2b03]/30 whitespace-nowrap">
                {t("activeVip")}
              </span>
            </div>
          </div>

          <div className="relative z-10 my-auto py-1 sm:py-2">
            <div className="flex flex-wrap items-center gap-1 xs:gap-1.5 sm:gap-2">
              <span className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 xs:px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-white/40 border border-[#8c6d17]/30 text-[8.5px] xs:text-[9.5px] sm:text-[11px] font-bold text-[#3d2b03] backdrop-blur-xs shadow-xs">
                <Truck className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#5c440a] shrink-0" />
                <span>{t("fourFreeShippingPill")}</span>
              </span>
              <span className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 xs:px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-white/40 border border-[#8c6d17]/30 text-[8.5px] xs:text-[9.5px] sm:text-[11px] font-bold text-[#3d2b03] backdrop-blur-xs shadow-xs">
                <Zap className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#5c440a] shrink-0" />
                <span>{t("doubleWalletRewardsPill")}</span>
              </span>
              <span className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 xs:px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-white/40 border border-[#8c6d17]/30 text-[8.5px] xs:text-[9.5px] sm:text-[11px] font-bold text-[#3d2b03] backdrop-blur-xs shadow-xs">
                <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#5c440a] shrink-0" />
                <span>{t("exclusiveFestivePerksPill")}</span>
              </span>
            </div>
          </div>

          {/* FOOTER ROW */}
          <div className="relative z-10 pt-2.5 sm:pt-4 border-t border-[#8c6d17]/30 flex items-end justify-between gap-2 sm:gap-4">
            <div className="min-w-0">
              <p className="text-[7.5px] xs:text-[8.5px] sm:text-[9px] uppercase tracking-widest text-[#6e530c] font-bold truncate">
                {t("memberStatus")}
              </p>
              <p className="text-[10px] xs:text-[11px] sm:text-sm font-extrabold text-[#3d2b03] tracking-wide truncate">
                {t("vipBadge")}
              </p>
            </div>

            <div className="text-right flex items-center gap-1.5 xs:gap-2 sm:gap-3 shrink-0">
              <div>
                <p className="text-[7.5px] xs:text-[8.5px] sm:text-[9px] uppercase tracking-widest text-[#6e530c] font-bold">
                  {t("qualifiedDate")}
                </p>
                <p className="text-[10px] xs:text-[11px] sm:text-sm font-mono font-black text-[#3d2b03]">
                  {formattedDate}
                </p>
              </div>
              <div className="flex items-center gap-1 text-[8.5px] xs:text-[9px] sm:text-[10px] text-[#3d2b03] font-bold bg-white/40 border border-[#8c6d17]/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg">
                <RotateCw
                  className="h-2.5 w-2.5 sm:h-3 sm:w-3 animate-spin shrink-0"
                  style={{ animationDuration: "8s" }}
                />
                <span className="hidden xs:inline">{t("tapCard")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* BACK FACE (FLIPPED PERKS VIEW) */}
        <div className="absolute inset-0 p-3.5 xs:p-5 sm:p-7 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between text-[#3d2b03]">
          <div className="flex items-center justify-between border-b border-[#8c6d17]/30 pb-1.5 sm:pb-2">
            <div className="flex items-center gap-1 sm:gap-2 min-w-0">
              <Crown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#5c440a] shrink-0" />
              <span className="text-[10px] xs:text-[11px] sm:text-sm font-black text-[#3d2b03] tracking-wider uppercase truncate">
                {t("activeVipPerksStatus")}
              </span>
            </div>
            <span className="text-[8.5px] sm:text-[10px] text-[#6e530c] font-mono font-extrabold shrink-0">
              {t("tapToFlip")}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 sm:gap-3 my-auto">
            <div className="bg-white/40 border border-[#8c6d17]/30 rounded-lg sm:rounded-xl p-2 sm:p-3 flex flex-col justify-between backdrop-blur-xs shadow-xs">
              <div className="flex items-center justify-between text-[#5c440a]">
                <Truck className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                <span className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] font-black uppercase tracking-wider text-[#3d2b03] truncate">
                  {t("annualVouchers")}
                </span>
              </div>
              <div className="mt-1 sm:mt-2">
                <div className="text-sm xs:text-base sm:text-2xl font-black text-[#3d2b03]">
                  {freeDeliveriesRemaining}{" "}
                  <span className="text-[9px] sm:text-xs font-bold text-[#6e530c]">
                    {t("vouchersLeft")}
                  </span>
                </div>
                <p className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] text-[#6e530c] font-bold leading-tight">
                  {t("freeDeliveryVouchersTitle")}
                </p>
              </div>
            </div>

            <div className="bg-white/40 border border-[#8c6d17]/30 rounded-lg sm:rounded-xl p-2 sm:p-3 flex flex-col justify-between backdrop-blur-xs shadow-xs">
              <div className="flex items-center justify-between text-[#5c440a]">
                <Zap
                  className={`h-3 w-3 sm:h-4 sm:w-4 shrink-0 ${isDoublePointsWeekendActive ? "text-[#5c440a] fill-[#5c440a] animate-bounce" : ""}`}
                />
                <span className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] font-black uppercase tracking-wider text-[#3d2b03] truncate">
                  {t("weekendBonus")}
                </span>
              </div>
              <div className="mt-1 sm:mt-2">
                <div className="text-xs sm:text-base font-extrabold text-[#3d2b03] flex items-center gap-1">
                  {isDoublePointsWeekendActive ? (
                    <span className="text-[#3d2b03] flex items-center gap-1 font-black text-[10px] sm:text-base">
                      {t("doublePointsActive")}
                    </span>
                  ) : (
                    <span className="text-[#6e530c] font-bold text-[9px] sm:text-sm">
                      {t("standardBonus")}
                    </span>
                  )}
                </div>
                <p className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] text-[#6e530c] font-bold leading-tight">
                  {t("doubleCoinsWeekend")}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-1.5 sm:pt-2 border-t border-[#8c6d17]/30 flex items-center justify-between text-[7.5px] xs:text-[8.5px] sm:text-[10px] text-[#6e530c] font-bold">
            <span className="truncate">{t("familyMembershipFooter")}</span>
            <span className="font-mono text-[#3d2b03] font-black shrink-0">
              {t("allPerksUnlocked")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

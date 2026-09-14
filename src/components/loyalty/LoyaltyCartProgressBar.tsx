"use client";

import Link from "next/link";
import { Crown, ChevronRight, Truck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCustomerLoyaltyStatus } from "@/services/loyalty/loyalty.hooks";
import { formatYen } from "@/utils/format/format.utils";
import { ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";

export function LoyaltyCartProgressBar({ className = "" }: { className?: string }) {
  const { isAuthenticated } = useAuth();
  const { data: loyalty } = useCustomerLoyaltyStatus(isAuthenticated);
  const t = useTranslations("loyaltyBubble");

  if (!isAuthenticated || !loyalty || loyalty?.isActive) {
    return null;
  }

  return (
    <div
      className={`bg-card border border-amber-500/20 rounded-2xl p-4 relative overflow-hidden shadow-sm ${className}`}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-500" />

      <div className="flex items-center justify-between gap-2 pr-1">
        <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5 truncate">
          <Crown className="h-4 w-4 text-amber-500 fill-amber-500/20 shrink-0" />
          <span>{t("vipTitle")}</span>
        </h4>
        <Link
          href={ROUTES.LOYALTY}
          className="inline-flex items-center gap-0.5 text-xs font-bold text-primary hover:underline shrink-0"
        >
          <span>{t("viewVipBenefits")}</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <p className="text-xs text-muted-foreground mt-1.5 font-medium">
        <strong className="text-primary font-bold">{formatYen(loyalty?.spendNeeded)}</strong>{" "}
        {t("spendNeeded", { amount: "" }).trim()}
      </p>

      <div className="mt-3 space-y-1">
        <div className="flex justify-between text-[11px] font-semibold text-muted-foreground">
          <span>
            {formatYen(loyalty?.cumulativeSpend)} / {formatYen(loyalty?.qualificationThreshold)}
          </span>
          <span className="text-primary font-bold">{loyalty?.progressPercentage}%</span>
        </div>
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(3, loyalty?.progressPercentage)}%` }}
          />
        </div>
      </div>

      <div className="mt-3 py-1.5 px-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-semibold flex items-center gap-2">
        <Truck className="h-3.5 w-3.5 text-amber-500 shrink-0" />
        <span>{t("freeDeliveriesPerYear")}</span>
      </div>
    </div>
  );
}

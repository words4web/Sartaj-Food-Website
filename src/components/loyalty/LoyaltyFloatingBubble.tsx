"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Crown, X, ChevronRight, Truck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCustomerLoyaltyStatus } from "@/services/loyalty/loyalty.hooks";
import { formatYen } from "@/utils/format/format.utils";
import { ROUTES } from "@/constants/routes";
import { STORAGE_KEYS } from "@/constants/storage";
import { useTranslations } from "next-intl";

export function LoyaltyFloatingBubble() {
  const { isAuthenticated } = useAuth();
  const { data: loyalty } = useCustomerLoyaltyStatus(isAuthenticated);
  const t = useTranslations("loyaltyBubble");

  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const dismissed = sessionStorage.getItem(STORAGE_KEYS.LOYALTY_BUBBLE_DISMISSED);
      if (!dismissed) {
        setIsDismissed(false);
      }
    }
  }, []);

  if (!isAuthenticated || isDismissed || !loyalty) {
    return null;
  }

  if (loyalty?.isActive) {
    return null;
  }

  const handleDismiss = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEYS.LOYALTY_BUBBLE_DISMISSED, "true");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end max-w-[calc(100vw-2rem)]">
      <div
        className={`w-[calc(100vw-2rem)] sm:w-72 bg-card border border-amber-500/20 rounded-2xl shadow-xl p-4 relative overflow-hidden transition-all duration-200 origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none absolute bottom-0 right-0"
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-500" />

        <div className="flex items-center justify-between gap-2 pr-6">
          <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
            <Crown className="h-4 w-4 text-amber-500 fill-amber-500/20" />
            {t("vipTitle")}
          </h4>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3.5 right-3.5 text-muted-foreground hover:text-foreground p-0.5 rounded-full hover:bg-muted transition-colors"
            title="Close"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <p className="text-xs text-muted-foreground mt-1.5 font-medium">
          {t("spendNeeded", { amount: formatYen(loyalty?.spendNeeded) })}
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

        <div className="mt-3.5">
          <Link
            href={ROUTES.LOYALTY}
            onClick={() => setIsOpen(false)}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow hover:bg-primary/90 transition-all group"
          >
            <span>{t("viewVipBenefits")}</span>
            <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      <div
        onClick={() => setIsOpen(true)}
        className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-card border border-amber-500/30 text-foreground font-semibold text-xs shadow-md hover:shadow-lg hover:border-amber-500/60 transition-all duration-200 cursor-pointer select-none ${
          isOpen
            ? "opacity-0 scale-90 pointer-events-none absolute bottom-0 right-0"
            : "opacity-100 scale-100 pointer-events-auto"
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
        </span>
        <Crown className="h-3.5 w-3.5 text-amber-500" />
        <span>{t("vipProgress", { percentage: loyalty?.progressPercentage })}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
          className="ml-0.5 p-0.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          title="Dismiss"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { Clock, CheckCircle2, XCircle } from "lucide-react";
import { OrderTab, OrderTabsProps } from "@/types/order.types";

export function OrderTabs({ activeTab, onTabChange }: OrderTabsProps) {
  const t = useTranslations();

  return (
    <div className="bg-card border border-border/60 p-1.5 rounded-3xl shadow-sm mb-8 flex gap-2">
      <button
        onClick={() => onTabChange(OrderTab.ACTIVE)}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-black transition-all duration-200 border ${
          activeTab === OrderTab.ACTIVE
            ? "bg-primary text-primary-foreground border-primary/20 shadow-md scale-[1.01]"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border-transparent"
        }`}
      >
        <Clock className="h-4 w-4 shrink-0" />
        {t("orders.active") || "Active"}
      </button>
      <button
        onClick={() => onTabChange(OrderTab.COMPLETED)}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-black transition-all duration-200 border ${
          activeTab === OrderTab.COMPLETED
            ? "bg-primary text-primary-foreground border-primary/20 shadow-md scale-[1.01]"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border-transparent"
        }`}
      >
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        {t("orders.completed") || "Completed"}
      </button>
      <button
        onClick={() => onTabChange(OrderTab.CANCELLED)}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-black transition-all duration-200 border ${
          activeTab === OrderTab.CANCELLED
            ? "bg-primary text-primary-foreground border-primary/20 shadow-md scale-[1.01]"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border-transparent"
        }`}
      >
        <XCircle className="h-4 w-4 shrink-0" />
        {t("orders.cancelled") || "Cancelled"}
      </button>
    </div>
  );
}

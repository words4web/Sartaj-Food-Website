"use client";

import { FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import type { OrderDetailSummaryProps } from "@/types/order.types";

export function OrderDetailSummary({
  subtotal = 0,
  priceBreakdown = [],
  totalAmount = 0,
  couponCode,
}: OrderDetailSummaryProps) {
  const t = useTranslations();

  return (
    <div className="bg-card border border-border/80 p-8 rounded-3xl shadow-sm">
      <h3 className="text-base font-black text-foreground mb-6 flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        {t("checkout.orderSummary") || "Order Summary"}
      </h3>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>{t("cart.subtotal") || "Subtotal"}</span>
          <span className="font-semibold text-foreground">¥{subtotal?.toLocaleString()}</span>
        </div>

        {couponCode && (
          <div className="flex justify-between items-center text-emerald-600 font-medium">
            <span className="flex items-center gap-1.5">
              {t("checkout.couponApplied") || "Coupon Applied"}
              <span className="text-[11px] font-mono bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded">
                {couponCode}
              </span>
            </span>
          </div>
        )}

        {priceBreakdown?.map((item) => {
          const isDeduction =
            item?.type === "DISCOUNT" ||
            item?.type === "WALLET" ||
            item?.isNegative ||
            item?.amount < 0;
          return (
            <div
              key={item?._id || item?.name}
              className={`flex justify-between items-start ${
                isDeduction ? "text-emerald-600 font-medium" : "text-muted-foreground"
              }`}
            >
              <div className="flex flex-col">
                <span>{item?.name}</span>
                {item?.message && (
                  <span className="text-[10px] text-muted-foreground/70 font-normal leading-tight mt-0.5">
                    {item?.message}
                  </span>
                )}
              </div>
              <span className={isDeduction ? "" : "font-semibold text-foreground"}>
                {isDeduction ? "-" : ""}¥{Math.abs(item?.amount)?.toLocaleString()}
              </span>
            </div>
          );
        })}

        <div className="border-t border-border/60 pt-4 flex justify-between items-baseline">
          <span className="text-base font-black text-foreground">{t("cart.total") || "Total"}</span>
          <span className="text-2xl font-black text-primary">¥{totalAmount?.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

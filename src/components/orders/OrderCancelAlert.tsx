"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import type { OrderCancelAlertProps } from "@/types/order.types";

export function OrderCancelAlert({ status, isWithin1Hour, onCancelClick }: OrderCancelAlertProps) {
  const t = useTranslations();

  if (status !== "placed" || !isWithin1Hour) {
    return null;
  }

  return (
    <div className="bg-destructive/5 border border-destructive/20 rounded-3xl p-5 mt-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <div className="space-y-1">
        <h4 className="font-extrabold text-foreground text-sm">
          {t("orders.cancelOrderPrompt") || "Need to cancel this order?"}
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {t("orders.cancelOrderPromptDesc") ||
            "You can cancel this order within 1 hour of placing it. The cancellation period will expire soon."}
        </p>
      </div>
      <Button
        variant="destructive"
        className="rounded-xl font-bold self-start sm:self-auto shadow-sm"
        onClick={onCancelClick}
      >
        {t("orders.cancelOrder") || "Cancel Order"}
      </Button>
    </div>
  );
}

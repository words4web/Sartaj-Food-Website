"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Crown, Truck } from "lucide-react";
import { CheckoutLoyaltyFreeDeliveryProps } from "@/types/checkout/checkout.types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export function CheckoutLoyaltyFreeDelivery({
  applyFreeDelivery,
  onToggleFreeDelivery,
  loyaltyStatus,
  isLoading = false,
  isAddressSelected,
  hasShippingExpense = true,
}: CheckoutLoyaltyFreeDeliveryProps) {
  const t = useTranslations("checkout");
  const tCommon = useTranslations("common");

  const [isOpen, setIsOpen] = useState(false);

  const isVip = loyaltyStatus?.isActive ?? false;
  const freeDeliveriesRemaining = loyaltyStatus?.freeDeliveriesRemaining ?? 0;
  const canUseVoucher = isAddressSelected && isVip && freeDeliveriesRemaining > 0;

  const handleToggle = (checked: boolean) => {
    if (!canUseVoucher) return;
    if (checked) {
      setIsOpen(true);
    } else {
      onToggleFreeDelivery(false);
    }
  };

  const handleConfirm = () => {
    onToggleFreeDelivery(true);
    setIsOpen(false);
  };

  if (!applyFreeDelivery && hasShippingExpense === false) {
    return null;
  }

  return (
    <>
      <div
        className={`bg-card rounded-2xl border border-amber-500/30 shadow-sm p-3.5 sm:p-4 space-y-2 sm:space-y-2.5 transition-all duration-300 ${!canUseVoucher ? "opacity-60" : ""}`}
      >
        <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-border/40">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <Crown className="h-4 sm:h-4.5 w-4 sm:w-4.5 text-amber-500 shrink-0" />
            <h2 className="text-xs sm:text-sm font-bold text-foreground truncate">
              {t("vipLoyaltyVoucher")}
            </h2>
          </div>
          {isVip && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-[9px] sm:text-[10px] font-extrabold uppercase shrink-0">
              {t("vipActiveBadge")}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div
              className={`h-8 sm:h-9 w-8 sm:w-9 rounded-full flex items-center justify-center shrink-0 select-none ${applyFreeDelivery ? "bg-amber-500/20 text-amber-600 dark:text-amber-400" : "bg-muted text-muted-foreground"}`}
            >
              <Truck className="h-4 sm:h-4.5 w-4 sm:w-4.5" />
            </div>
            <div className="min-w-0 text-left">
              <p className="font-bold text-foreground text-[11px] sm:text-xs leading-tight sm:leading-normal truncate">
                {applyFreeDelivery ? t("freeDeliveryApplied") : t("useFreeDeliveryVoucher")}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight font-medium line-clamp-2">
                {isLoading
                  ? tCommon("loading")
                  : !isAddressSelected
                    ? t("selectAddressFirstVoucher")
                    : !isVip
                      ? t("vipRequiredVoucher")
                      : freeDeliveriesRemaining <= 0
                        ? t("noVouchersLeft")
                        : applyFreeDelivery
                          ? t("voucherAppliedMsg")
                          : t("vouchersAvailable", { count: freeDeliveriesRemaining, total: 4 })}
              </p>
            </div>
          </div>

          <Switch
            checked={applyFreeDelivery}
            onCheckedChange={handleToggle}
            disabled={!canUseVoucher || isLoading}
            className="cursor-pointer shrink-0 scale-90 sm:scale-100"
          />
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          aria-describedby={undefined}
          className="w-[92vw] max-w-md flex flex-col p-4 sm:p-6 overflow-hidden rounded-2xl"
        >
          <DialogHeader className="pb-3 sm:pb-4 border-b border-border/40 shrink-0">
            <DialogTitle className="text-sm sm:text-base font-bold text-foreground">
              {t("confirmVoucherRedemption") || "Redeem Free Delivery Voucher"}
            </DialogTitle>
          </DialogHeader>

          <div className="py-4 sm:py-5 space-y-4 sm:space-y-5">
            <div className="flex flex-col items-center text-center space-y-1.5 sm:space-y-2">
              <div className="h-10 sm:h-12 w-10 sm:w-12 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-0.5">
                <Truck className="h-5 sm:h-6 w-5 sm:w-6" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-foreground">
                {t("redeemVoucherTitle")}
              </h4>
            </div>

            <div className="rounded-xl sm:rounded-2xl border border-amber-500/30 bg-amber-500/5 p-3 sm:p-4 flex items-center justify-between gap-2">
              <span className="text-[11px] sm:text-xs text-muted-foreground font-medium">
                {t("availableVouchers")}
              </span>
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <span className="font-extrabold text-[11px] sm:text-xs text-foreground">
                  {freeDeliveriesRemaining} / 4
                </span>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300 font-extrabold text-[9px] sm:text-[10px]">
                  {t("voucherUsedValue")}
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-2.5 sm:p-3">
              <p className="text-[10px] sm:text-[11px] leading-relaxed text-amber-800 dark:text-amber-300 font-medium">
                {t("voucherConfirmMsg")}
              </p>
            </div>
          </div>

          <div className="pt-3 sm:pt-4 border-t border-border/40 shrink-0 flex items-center justify-end gap-2.5 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1 sm:flex-none rounded-xl text-xs font-semibold px-4 sm:px-5 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {tCommon("cancel")}
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              className="flex-1 sm:flex-none rounded-xl text-xs font-semibold px-5 sm:px-6 bg-amber-500 hover:bg-amber-600 text-white hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {tCommon("confirm")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

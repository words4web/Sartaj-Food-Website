"use client";

import { useState } from "react";
import { Gift } from "lucide-react";
import { CheckoutBirthdayDiscountProps } from "@/types/checkout/checkout.types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export function CheckoutBirthdayDiscount({
  applyBirthdayDiscount,
  onToggleBirthdayDiscount,
  isEligible,
  isAddressSelected,
}: CheckoutBirthdayDiscountProps) {
  const [isOpen, setIsOpen] = useState(false);

  const canUseDiscount = isAddressSelected && isEligible;

  const handleToggle = (checked: boolean) => {
    if (!canUseDiscount) return;
    if (checked) {
      setIsOpen(true);
    } else {
      onToggleBirthdayDiscount(false);
    }
  };

  const handleConfirm = () => {
    onToggleBirthdayDiscount(true);
    setIsOpen(false);
  };

  if (!isEligible) {
    return null;
  }

  return (
    <>
      <div
        className={`relative overflow-hidden rounded-2xl border border-rose-500/25 bg-gradient-to-br from-rose-500/5 via-card to-pink-500/5 p-3 sm:p-4 shadow-sm transition-all duration-300 ${
          !canUseDiscount
            ? "opacity-60"
            : "hover:border-rose-500/40 hover:shadow-md hover:shadow-rose-500/5"
        }`}
      >
        <div className="absolute -top-10 -right-10 h-20 sm:h-24 w-20 sm:w-24 rounded-full bg-rose-500/10 blur-xl pointer-events-none" />

        <div className="flex items-center justify-between gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="flex h-9 sm:h-10 w-9 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/20">
              <Gift className="h-4 sm:h-5 w-4 sm:w-5" />
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-w-0">
              <span className="text-xs sm:text-sm font-bold text-foreground truncate">
                Birthday Month Special
              </span>
              <span className="inline-flex items-center rounded-md bg-rose-500/10 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-rose-600 dark:text-rose-400 ring-1 ring-inset ring-rose-500/20 shrink-0">
                10% OFF
              </span>
            </div>
          </div>

          <Switch
            checked={applyBirthdayDiscount}
            onCheckedChange={handleToggle}
            disabled={!canUseDiscount}
            aria-label="Toggle Birthday Month 10% Discount"
            className="data-[state=checked]:bg-rose-500 shrink-0 scale-90 sm:scale-100"
          />
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[92vw] max-w-md rounded-2xl p-4 sm:p-6">
          <DialogHeader className="space-y-2.5 text-center sm:text-left">
            <div className="mx-auto sm:mx-0 flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500 ring-1 ring-rose-500/20">
              <Gift className="h-5 sm:h-6 w-5 sm:w-6" />
            </div>
            <DialogTitle className="text-base sm:text-lg font-bold text-foreground">
              Apply Birthday Discount?
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 sm:space-y-4 py-1.5 sm:py-2 text-foreground">
            <p className="text-xs sm:text-sm text-foreground leading-relaxed">
              Apply your{" "}
              <strong className="font-bold text-foreground">10% Birthday Discount</strong> to this
              order (valid on orders between{" "}
              <span className="font-bold text-foreground">¥4,000 – ¥10,000</span>).
            </p>

            <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 sm:p-3.5 text-xs text-foreground flex items-start gap-2">
              <span className="text-sm sm:text-base leading-none shrink-0 mt-0.5">⚠️</span>
              <div className="space-y-1">
                <p className="font-bold text-foreground text-xs">Important Note</p>
                <p className="text-foreground text-[11px] sm:text-xs leading-normal">
                  This offer is valid{" "}
                  <strong className="font-bold underline">
                    once a year during your birthday month
                  </strong>
                  . If you cancel this order after placement, this discount will{" "}
                  <strong className="font-bold underline text-rose-600 dark:text-rose-400">
                    not be restored or refunded
                  </strong>
                  .
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2 sm:gap-3 pt-2">
            <Button
              variant="ghost"
              size="default"
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto rounded-xl font-medium h-9 sm:h-10 text-xs sm:text-sm"
            >
              Cancel
            </Button>
            <Button
              size="default"
              onClick={handleConfirm}
              className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold hover:from-rose-600 hover:to-pink-700 shadow-md shadow-rose-500/25 transition-all h-9 sm:h-10 text-xs sm:text-sm"
            >
              Apply 10% OFF
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

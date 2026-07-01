"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CreditCard, ChevronRight } from "lucide-react";
import { CheckoutPaymentMethodProps } from "@/types/checkout/checkout.types";
import { PAYMENT_METHODS } from "@/data/checkoutData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function CheckoutPaymentMethod({
  selectedPaymentMethod,
  onSelectPaymentMethod,
  hasError = false,
}: CheckoutPaymentMethodProps) {
  const t = useTranslations("checkout");
  const tCommon = useTranslations("common");
  const [isOpen, setIsOpen] = useState(false);

  const selectedMethod = PAYMENT_METHODS?.find((method) => method?.id === selectedPaymentMethod);

  const handleSelectMethod = (id: string) => {
    onSelectPaymentMethod(id);
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={`bg-card rounded-2xl border p-4 space-y-2.5 transition-all duration-300 ${
          hasError
            ? "border-rose-500 ring-2 ring-rose-500/20 shadow-md shadow-rose-100/50"
            : "border-border/60 shadow-sm"
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-border/40">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4.5 w-4.5 text-primary shrink-0" />
            <h2 className="text-sm font-bold text-foreground">
              {t("paymentMethod") || "Payment Method"}
            </h2>
          </div>
        </div>

        {selectedMethod ? (
          /* Collapsed Selected Card View */
          <div
            onClick={() => setIsOpen(true)}
            className="group border border-border/80 hover:border-primary/30 hover:bg-primary/[0.01] rounded-xl p-3 flex items-center justify-between gap-3 cursor-pointer transition-all duration-200"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-2xl leading-none shrink-0 select-none">
                {selectedMethod?.icon}
              </span>
              <div className="min-w-0">
                <p className="font-bold text-foreground text-xs truncate leading-normal">
                  {t(selectedMethod?.labelKey) || selectedMethod?.labelKey}
                </p>
                <p className="text-muted-foreground text-[10px] mt-0.5 truncate leading-normal font-medium">
                  {t(selectedMethod?.descKey) || selectedMethod?.descKey}
                </p>
              </div>
            </div>

            <span className="text-primary group-hover:text-primary/80 text-[10px] font-bold shrink-0 select-none whitespace-nowrap">
              {t("changePaymentMethod") || "Change"}
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-full text-left group border border-dashed border-border/80 hover:border-primary/40 hover:bg-primary/[0.01] rounded-xl p-3 flex items-center justify-between gap-3 cursor-pointer transition-all duration-200"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 select-none">
                <CreditCard className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-foreground text-xs leading-normal">
                  {t("selectPaymentMethod") || "Select Payment Method"}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-normal font-medium">
                  {t("selectPaymentRequired") || "Please select a payment method"}
                </p>
              </div>
            </div>

            <ChevronRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-primary transition-colors shrink-0" />
          </button>
        )}
      </div>

      {/* Popover / Dialog Popup Selector */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          aria-describedby={undefined}
          className="max-w-md flex flex-col p-6 overflow-hidden rounded-2xl"
        >
          <DialogHeader className="pb-4 border-b border-border/40 shrink-0">
            <DialogTitle className="text-base font-bold text-foreground">
              {t("selectPaymentMethod") || "Select Payment Method"}
            </DialogTitle>
          </DialogHeader>

          <div className="py-4 space-y-3">
            {PAYMENT_METHODS?.map((method) => {
              const isSelected = selectedPaymentMethod === method?.id;

              return (
                <div
                  key={method?.id}
                  onClick={() => handleSelectMethod(method?.id)}
                  className={`border rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all duration-200 select-none ${
                    isSelected
                      ? "border-primary bg-primary/[0.02] ring-1 ring-primary shadow-xs"
                      : "border-border/60 hover:border-muted-foreground/25 hover:shadow-xs bg-card"
                  }`}
                >
                  <input
                    type="radio"
                    name="popupPaymentMethod"
                    checked={isSelected}
                    readOnly
                    className="h-4 w-4 cursor-pointer accent-primary shrink-0"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl leading-none shrink-0">{method?.icon}</span>
                    <div className="flex flex-col">
                      <span className="font-semibold text-xs text-foreground leading-none">
                        {t(method?.labelKey) || method?.labelKey}
                      </span>
                      <span className="text-muted-foreground text-[10px] mt-1.5 leading-tight font-medium">
                        {t(method?.descKey) || method?.descKey}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-border/40 shrink-0 flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="rounded-xl text-xs font-semibold"
            >
              {tCommon("close") || "Close"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

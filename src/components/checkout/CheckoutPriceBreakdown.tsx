"use client";

import { useLocale, useTranslations } from "next-intl";
import { Loader2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckoutPriceBreakdownProps } from "@/types/checkout/checkout.types";

export function CheckoutPriceBreakdown({
  summary,
  summaryLoading,
  summaryFetching,
  appliedCoupon,
  isPlacingOrder,
  onPlaceOrder,
  isAddressSelected,
  cartSubtotal,
}: CheckoutPriceBreakdownProps) {
  const t = useTranslations("checkout");
  const tCart = useTranslations("cart");
  const locale = useLocale();

  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-5 space-y-6">
      <h3 className="text-lg font-bold text-foreground">{t("orderSummary") || "Order Summary"}</h3>

      {/* Price breakdown calculation lines */}
      <div className="space-y-3.5 border-b border-border/40 pb-5 text-sm">
        {/* Subtotal line (from cart if summary is not loaded yet) */}
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{tCart("subtotal") || "Subtotal"}</span>
          <span className="font-semibold text-foreground">
            ¥{(summary ? summary?.subTotal : cartSubtotal)?.toLocaleString()}
          </span>
        </div>

        {summaryLoading || summaryFetching ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-4 w-4 text-primary animate-spin mr-2" />
            <span className="text-xs text-muted-foreground animate-pulse">
              {t("calculatingCharges") || "Calculating charges..."}
            </span>
          </div>
        ) : summary ? (
          <>
            {/* Surcharges, taxes, discounts and other price breakdown items */}
            {summary?.priceBreakdown?.map((item, idx) => {
              const nameStr =
                typeof item?.name === "object" ? item?.name[locale] || item?.name?.en : item?.name;

              return (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs text-muted-foreground"
                >
                  <div className="flex items-center gap-1">
                    <span>{nameStr}</span>
                    {item?.message && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger
                            type="button"
                            className="text-muted-foreground/60 hover:text-muted-foreground"
                          >
                            <HelpCircle className="h-3.5 w-3.5" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-[200px] text-xs">
                            <p className="text-white">{item?.message}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <span
                    className={
                      item?.isNegative
                        ? "font-semibold text-green-600"
                        : "font-semibold text-foreground"
                    }
                  >
                    {item?.isNegative ? "-" : ""}¥{item?.amount?.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </>
        ) : (
          <>
            {/* Delivery Fee Line */}
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{t("deliveryFee") || "Delivery Fee"}</span>
              <span className="text-muted-foreground/60 italic font-medium">
                {t("pendingAddress") || "Pending Address"}
              </span>
            </div>

            {/* Tax Line */}
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{t("taxAmount") || "Tax"}</span>
              <span className="text-muted-foreground/60 italic font-medium">
                {t("pendingAddress") || "Pending Address"}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Grand Total */}
      <div className="flex justify-between items-center">
        <span className="text-base font-bold text-foreground">
          {t("finalTotal") || "Grand Total"}
        </span>
        <span className="text-xl font-black text-primary animate-in fade-in duration-300">
          ¥{(summary ? summary?.totalAmount : cartSubtotal)?.toLocaleString()}
        </span>
      </div>

      {/* Submit Button */}
      <Button
        onClick={onPlaceOrder}
        disabled={isPlacingOrder}
        size="lg"
        className="w-full rounded-xl font-bold cursor-pointer transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2"
      >
        {isPlacingOrder ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Creating Order...
          </>
        ) : (
          t("placeOrder") || "Place Order"
        )}
      </Button>
    </div>
  );
}

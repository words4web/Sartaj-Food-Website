"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Tag, ChevronRight, Check, Search, AlertCircle, X, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckoutCouponSelectionProps } from "@/types/checkout/checkout.types";
import { useValidateCoupon } from "@/services/coupon/coupon.hooks";
import { toast } from "sonner";
import { ITransformedCoupon } from "@/types/coupon.types";

export function CheckoutCouponSelection({
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  publicCoupons = [],
}: CheckoutCouponSelectionProps) {
  const t = useTranslations("checkout");
  const tCommon = useTranslations("common");
  const tCoupons = useTranslations("coupons");

  const [isOpen, setIsOpen] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [validatedPrivateCoupons, setValidatedPrivateCoupons] = useState<ITransformedCoupon[]>([]);

  const validateCouponMutation = useValidateCoupon();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponInput?.trim()?.toUpperCase();
    if (!cleanCode) return;

    // 1. Check if the coupon is already in publicCoupons list
    const inPublic = publicCoupons.some((c) => c.code.toUpperCase() === cleanCode);
    if (inPublic) {
      toast.info("This coupon is already in the available list below.");
      setCouponInput("");
      return;
    }

    // 2. Check if the coupon is already in our validated private coupons list
    const inPrivate = validatedPrivateCoupons.some((c) => c.code.toUpperCase() === cleanCode);
    if (inPrivate) {
      toast.info("This coupon is already in the list.");
      setCouponInput("");
      return;
    }

    // 3. Query the validation API to verify and add it to the list
    validateCouponMutation.mutate(cleanCode, {
      onSuccess: (data) => {
        if (data?.coupon?.code) {
          setValidatedPrivateCoupons((prev) => [...prev, data.coupon]);
          toast.success("Coupon code verified and added to the list.");
          setCouponInput("");
        } else {
          toast.error("Failed to retrieve validated coupon details.");
        }
      },
      onError: (err: any) => {
        const errors = err?.response?.data?.data?.errors;
        const errMsg =
          errors && errors?.length > 0
            ? errors?.join(", ")
            : err?.response?.data?.message || "Failed to validate coupon";
        toast.error(errMsg);
      },
    });
  };

  const handleSelectCoupon = (code: string) => {
    onApplyCoupon(code);
    setIsOpen(false);
  };

  // Combine public coupons with any successfully validated private ones
  const allCoupons = [...publicCoupons, ...validatedPrivateCoupons];

  const currentAppliedCouponDetails = allCoupons.find(
    (c) => c.code.toUpperCase() === appliedCoupon.toUpperCase(),
  );

  return (
    <>
      <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-4 space-y-2.5 transition-all duration-300">
        <div className="flex items-center justify-between pb-3 border-b border-border/40">
          <div className="flex items-center gap-2">
            <Tag className="h-4.5 w-4.5 text-primary shrink-0" />
            <h2 className="text-sm font-bold text-foreground">
              {tCoupons("coupons") || "Coupons"}
            </h2>
          </div>
        </div>

        {appliedCoupon ? (
          /* Applied Coupon View */
          <div
            onClick={() => setIsOpen(true)}
            className="group border border-primary/20 bg-primary/[0.01] hover:bg-primary/[0.02] rounded-xl p-3 flex items-center justify-between gap-3 cursor-pointer transition-all duration-200"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 select-none">
                <Check className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-foreground text-xs leading-normal flex items-center gap-1.5">
                  <span className="bg-primary/10 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                    {appliedCoupon}
                  </span>
                </p>
                <p className="text-muted-foreground text-[10px] mt-0.5 truncate leading-normal font-medium">
                  {currentAppliedCouponDetails
                    ? `${currentAppliedCouponDetails?.title} (Save ¥${currentAppliedCouponDetails?.appliedDiscount})`
                    : "Coupon code applied"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-primary group-hover:text-primary/80 text-[10px] font-bold shrink-0 select-none whitespace-nowrap">
                {tCommon("edit") || "Change"}
              </span>
            </div>
          </div>
        ) : (
          /* No Coupon Selected View */
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-full text-left group border border-dashed border-border/80 hover:border-primary/40 hover:bg-primary/[0.01] rounded-xl p-3 flex items-center justify-between gap-3 cursor-pointer transition-all duration-200"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 select-none">
                <Tag className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-foreground text-xs leading-normal">
                  {tCoupons("applyCoupon") || "Apply Coupon"}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-normal font-medium">
                  {allCoupons?.filter((c) => c?.isValid)?.length > 0
                    ? `${allCoupons?.filter((c) => c?.isValid)?.length} eligible coupons available`
                    : "Select or enter promo code"}
                </p>
              </div>
            </div>

            <ChevronRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-primary transition-colors shrink-0" />
          </button>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          aria-describedby={undefined}
          className="max-w-md max-h-[85vh] flex flex-col p-6 overflow-hidden rounded-2xl"
        >
          <DialogHeader className="pb-4 border-b border-border/40 shrink-0">
            <DialogTitle className="text-base font-bold text-foreground">
              {tCoupons("availableCoupons") || "Available Coupons"}
            </DialogTitle>
          </DialogHeader>

          {/* Search bar specifically for verifying and adding private coupons */}
          <form onSubmit={handleSearchSubmit} className="pt-4 pb-2 flex gap-2 shrink-0">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/60" />
              <input
                type="text"
                placeholder="Enter private coupon code..."
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="w-full pl-9 pr-8 py-2 border border-border rounded-xl text-xs bg-muted/10 focus:outline-none focus:ring-1 focus:ring-primary uppercase tracking-wide font-bold placeholder:normal-case placeholder:font-normal"
              />
              {couponInput && (
                <button
                  type="button"
                  onClick={() => setCouponInput("")}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              type="submit"
              disabled={!couponInput?.trim() || validateCouponMutation.isPending}
              variant="default"
              size="sm"
              className="rounded-xl text-xs cursor-pointer font-bold px-4 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shrink-0"
            >
              {validateCouponMutation.isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Search
            </Button>
          </form>

          {/* Available Coupons List (Shows all public + verified private coupons) */}
          <div className="flex-1 overflow-y-auto py-2 space-y-3 pr-1 scrollbar-thin">
            {allCoupons?.length === 0 ? (
              <div className="text-center py-8 text-xs text-muted-foreground">
                {tCoupons("noCoupons") || "No coupons available"}
              </div>
            ) : (
              allCoupons?.map((coupon) => {
                const isSelected = appliedCoupon?.toUpperCase() === coupon?.code?.toUpperCase();
                const isValid = coupon?.isValid;

                return (
                  <div
                    key={coupon?._id}
                    onClick={() => {
                      if (!isValid) return;
                      handleSelectCoupon(coupon?.code);
                    }}
                    className={`relative border rounded-xl p-4 flex flex-col justify-between transition-all duration-200 select-none ${
                      !isValid
                        ? "border-border/40 bg-muted/5 opacity-65 cursor-not-allowed"
                        : isSelected
                          ? "border-primary bg-primary/[0.02] ring-1 ring-primary cursor-pointer shadow-xs"
                          : "border-border/60 hover:border-muted-foreground/25 hover:shadow-xs bg-card cursor-pointer"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex gap-3 items-start">
                        {isValid && (
                          <input
                            type="radio"
                            name="popupSelectedCoupon"
                            checked={isSelected}
                            readOnly
                            className="mt-1 h-4 w-4 cursor-pointer accent-primary shrink-0"
                          />
                        )}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-xs text-foreground uppercase tracking-wide">
                              {coupon?.code}
                            </span>
                            <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-semibold capitalize">
                              {coupon?.title}
                            </span>
                          </div>

                          <p className="text-[10px] text-muted-foreground mt-1 font-medium">
                            {coupon?.discountType === "Percent"
                              ? `${coupon?.discountValue}% discount`
                              : `¥${coupon?.discountValue} discount`}
                            {coupon?.minPurchase > 0 &&
                              ` on minimum purchase of ¥${coupon?.minPurchase}`}
                          </p>

                          {!isValid && coupon?.errors && coupon?.errors?.length > 0 && (
                            <div className="pt-1.5 text-[10px] text-destructive font-semibold flex items-center gap-1">
                              <AlertCircle className="h-3 w-3 shrink-0" />
                              <span>{coupon?.errors?.join(", ")}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {isValid && coupon?.appliedDiscount > 0 && (
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full select-none shrink-0 whitespace-nowrap">
                          Save ¥{coupon?.appliedDiscount}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Modal Footer actions */}
          <div className="pt-4 border-t border-border/40 shrink-0 flex justify-between gap-3">
            {appliedCoupon ? (
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  onRemoveCoupon();
                  setIsOpen(false);
                }}
                className="rounded-xl text-xs font-semibold px-4 hover:scale-[1.02] active:scale-[0.98]"
              >
                {t("removeCoupon") || "Remove Coupon"}
              </Button>
            ) : (
              <div />
            )}
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="rounded-xl text-xs font-semibold px-6 hover:scale-[1.02] active:scale-[0.98]"
            >
              {tCommon("close") || "Close"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

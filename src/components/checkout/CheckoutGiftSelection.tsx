"use client";

import { useLocale, useTranslations } from "next-intl";
import { Gift, Check } from "lucide-react";
import { getLocalizedValue } from "@/utils/product/product.utils";
import { ThemedImage } from "@/components/common";

interface CheckoutGiftSelectionProps {
  gifts: any[];
  selectedGiftId: string;
  onSelectGift: (id: string) => void;
  isLoading?: boolean;
}

export function CheckoutGiftSelection({
  gifts,
  selectedGiftId,
  onSelectGift,
  isLoading,
}: CheckoutGiftSelectionProps) {
  const t = useTranslations("checkout");
  const locale = useLocale();

  if (isLoading) {
    return (
      <div className="bg-card rounded-2xl border border-border/60 p-6 space-y-4 shadow-sm animate-pulse">
        <div className="h-5 w-40 bg-muted rounded"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="h-24 bg-muted rounded-xl"></div>
          <div className="h-24 bg-muted rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!gifts || gifts?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-2xl border border-border/60 p-6 space-y-4 shadow-sm transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Gift className="h-5 w-5 text-primary shrink-0" />
        <h3 className="text-base font-bold text-foreground">
          {t("chooseFreeGift") || "Choose a Free Gift"}
        </h3>
      </div>
      <p className="text-xs text-muted-foreground">
        {t("chooseFreeGiftDesc") || "Select one free gift to include with your order."}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {gifts?.map((gift) => {
          const name = getLocalizedValue(gift?.name, locale);
          const imageSrc = gift?.images?.[0];
          const isSelected = selectedGiftId === gift?._id;

          return (
            <button
              key={gift?._id}
              type="button"
              onClick={() => onSelectGift(isSelected ? "" : gift?._id)}
              className={`relative flex flex-col items-center p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer select-none ${
                isSelected
                  ? "border-primary bg-primary/8 text-primary shadow-sm"
                  : "border-border bg-background hover:border-primary/50 text-foreground"
              }`}
            >
              <div className="h-16 w-16 rounded-lg bg-muted/20 flex items-center justify-center overflow-hidden mb-2 border border-border/40 shrink-0">
                <ThemedImage
                  src={imageSrc}
                  alt={name || "Gift"}
                  emoji={gift?.emoji}
                  className="h-full w-full object-contain p-1"
                  fallbackType="product"
                />
              </div>

              <span className="text-xs font-bold text-center line-clamp-2 w-full leading-tight">
                {name || "Gift Product"}
              </span>

              <span className="text-[10px] font-black uppercase text-primary mt-1">
                {t("free") || "FREE"}
              </span>

              {isSelected && (
                <div className="absolute top-1.5 right-1.5 bg-primary text-primary-foreground rounded-full p-0.5 shadow-sm">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

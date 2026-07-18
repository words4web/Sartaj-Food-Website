"use client";

import { useLocale, useTranslations } from "next-intl";
import { Gift, Check, Sparkles } from "lucide-react";
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
      <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm animate-pulse space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-muted" />
          <div className="h-4 w-36 bg-muted rounded" />
        </div>
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-[88px] w-full bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!gifts || gifts?.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border/50 bg-primary/5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
          <Gift className="h-4.5 w-4.5 text-primary" />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-foreground leading-tight">
            {t("chooseFreeGift") || "Choose a Free Gift"}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">
            {t("chooseFreeGiftDesc") || "Select one complimentary gift to include with your order."}
          </p>
        </div>
        <div className="ml-auto shrink-0">
          <Sparkles className="h-4 w-4 text-primary/50" />
        </div>
      </div>

      {/* ── Gift cards ── */}
      <div className="p-4 space-y-2.5">
        {gifts.map((gift) => {
          const name = getLocalizedValue(gift?.name, locale);
          const imageSrc = gift?.images?.[0];
          const isSelected = selectedGiftId === gift?._id;
          const productType = gift?.productType as string | undefined;

          return (
            <button
              key={gift?._id}
              type="button"
              onClick={() => onSelectGift(isSelected ? "" : gift?._id)}
              className={[
                "relative w-full flex items-center gap-4 rounded-xl border px-4 py-3 text-left",
                "transition-all duration-200 cursor-pointer select-none group",
                isSelected
                  ? "border-primary bg-primary/6 shadow-sm ring-1 ring-primary/30"
                  : "border-border bg-background hover:border-primary/40 hover:bg-primary/3",
              ].join(" ")}
            >
              {/* Image */}
              <div
                className={[
                  "h-16 w-16 shrink-0 rounded-lg overflow-hidden border flex items-center justify-center transition-all duration-200",
                  isSelected ? "border-primary/30 bg-primary/8" : "border-border/50 bg-muted/20",
                ].join(" ")}
              >
                <ThemedImage
                  src={imageSrc}
                  alt={name || "Gift"}
                  emoji={gift?.emoji}
                  className="h-full w-full object-contain p-1"
                  fallbackType="product"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
                  {name || "Gift Product"}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  {/* FREE badge */}
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-primary border border-primary/20">
                    {t("free") || "FREE"}
                  </span>
                  {/* Product type badge */}
                  {productType && (
                    <span
                      className={[
                        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide border",
                        productType === "FROZEN"
                          ? "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400"
                          : "bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-400",
                      ].join(" ")}
                    >
                      {productType === "FROZEN" ? "❄ Frozen" : "☀ Dry"}
                    </span>
                  )}
                </div>
              </div>

              {/* Selection indicator */}
              <div
                className={[
                  "shrink-0 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-200",
                  isSelected
                    ? "bg-primary border-primary text-primary-foreground scale-110"
                    : "border-border bg-background group-hover:border-primary/50",
                ].join(" ")}
              >
                {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

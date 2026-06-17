import { Info, ShieldAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ProductInfoProps } from "@/types/product/product.types";

export function ProductInfo({
  product,
  name,
  description,
  manufacturerName,
  price,
  originalPrice,
  isDiscounted,
  discountPercent,
  isOutOfStock,
}: ProductInfoProps) {
  const t = useTranslations();

  const taxAmount = product?.tax?.amount || 0;
  const taxRate = product?.tax?.rate || 8;

  return (
    <div>
      {/* Manufacturer / Brand */}
      {manufacturerName && (
        <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2 block">
          {manufacturerName}
        </span>
      )}

      {/* Product Title */}
      <h1 className="text-2xl lg:text-3xl font-extrabold text-foreground leading-snug mb-3">
        {name}
      </h1>

      {/* SKU */}
      {product?.sku && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-muted-foreground bg-muted border border-border px-2 py-0.5 rounded font-mono">
            {t("products.sku")}: {product?.sku}
          </span>
        </div>
      )}

      {/* Stock Status Badge */}
      <div className="flex items-center gap-3 mb-6">
        {isOutOfStock ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            {t("products.outOfStock")}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            {t("products.inStock")}
          </span>
        )}
        {product?.stockQuantity !== undefined && product?.stockQuantity > 0 && (
          <span className="text-xs text-muted-foreground">
            ({product?.stockQuantity} items left)
          </span>
        )}
      </div>

      {/* Price / Discount block */}
      <div className="border-t border-b border-border py-4 mb-6">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-3xl font-black text-foreground">¥{price?.toLocaleString()}</span>
          {isDiscounted && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                ¥{originalPrice?.toLocaleString()}
              </span>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full dark:bg-green-900/30 dark:text-green-400">
                {discountPercent}% OFF
              </span>
            </>
          )}
        </div>

        {/* VAT / Tax Breakdown */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
          <Info className="h-3 w-3 text-primary/70" />
          <span>
            {t("products.includesTax", {
              rate: taxRate,
              amount: taxAmount?.toLocaleString(),
            })}
          </span>
        </div>
      </div>

      {/* Age Restriction Alert */}
      {product?.restrictions?.age20Plus && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-center gap-3 mb-6">
          <ShieldAlert className="h-5 w-5 text-destructive shrink-0" />
          <p className="text-xs text-destructive font-medium leading-relaxed">
            {t("products.ageWarning") ||
              "Warning: 20+ Age Restriction. Verification required at checkout."}
          </p>
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="mb-6">
          <h3 className="text-sm font-bold text-foreground mb-2">{t("products.description")}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { Package } from "lucide-react";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { ThemedImage } from "@/components/common";
import type { OrderDetailItemsProps } from "@/types/order.types";

export function OrderDetailItems({ items = [] }: OrderDetailItemsProps) {
  const t = useTranslations();

  return (
    <div className="bg-card border border-border/80 rounded-3xl shadow-sm overflow-hidden mb-6 sm:mb-8">
      <div className="p-4 sm:p-6 border-b border-border/60">
        <h2 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          {t("orders.itemsOrdered") || "Items Ordered"}
        </h2>
      </div>
      <div className="divide-y divide-border/60">
        {items?.map((item: any, idx: number) => {
          const product = item?.product;
          const prodName =
            typeof product?.name === "object"
              ? product?.name?.en || product?.name?.ja || "Product"
              : product?.name || "Product";
          const price = product?.price || item?.price || 0;
          const quantity = product?.quantity || item?.quantity || 0;
          const subtotal = product?.lineSubtotal || item?.lineSubtotal || price * quantity;

          return (
            <div
              key={product?._id || idx}
              className="p-4 sm:p-6 flex gap-4 items-center justify-between flex-wrap sm:flex-nowrap"
            >
              <div className="flex gap-3 sm:gap-4 items-center min-w-0">
                <div className="h-16 w-16 bg-muted/50 border border-border/60 rounded-2xl flex items-center justify-center p-2 shrink-0">
                  <ThemedImage
                    src={product?.images?.[0]}
                    alt={prodName}
                    className="max-h-full max-w-full object-contain"
                    fallbackType="product"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-foreground text-sm truncate hover:text-primary transition-colors">
                    <Link href={ROUTES.PRODUCTS(product?._id)}>{prodName}</Link>
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    ¥{price?.toLocaleString()} × {quantity}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-extrabold text-foreground text-sm">
                  ¥{subtotal?.toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

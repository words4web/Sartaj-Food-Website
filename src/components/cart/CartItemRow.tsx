"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { ThemedImage } from "@/components/common";
import { CartActions } from "./CartActions";
import { ICartItem } from "@/types/cart.types";

interface CartItemRowProps {
  item: ICartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const t = useTranslations();
  const product = item?.product;

  const name = typeof product?.name === "object" ? product?.name?.en : product?.name;
  const price = product?.unitPrice ?? product?.price ?? 0;
  const imageSrc = product?.images?.[0] || product?.image;

  return (
    <div className="p-4 sm:p-5 flex gap-4">
      {/* Image */}
      <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-lg bg-muted/50 flex items-center justify-center shrink-0 overflow-hidden border border-border">
        <ThemedImage
          src={imageSrc}
          alt={typeof name === "string" ? name : "Product"}
          emoji={product?.emoji}
          className="h-full w-full object-contain p-1"
          fallbackType="product"
        />
      </div>

      {/* Content area: Name + Price + Controls */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
          <div className="min-w-0">
            <Link
              href={ROUTES.PRODUCTS(item.productId)}
              className="font-semibold text-foreground text-sm sm:text-base line-clamp-2 hover:text-primary transition-colors"
            >
              {typeof name === "string" ? name : "Product"}
            </Link>
            <p className="text-xs text-muted-foreground mt-1">¥{price?.toLocaleString()} / unit</p>
          </div>

          {/* Line total on desktop */}
          <div className="hidden sm:block text-right shrink-0">
            <p className="font-bold text-foreground text-base">
              ¥{(price * item?.quantity)?.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between mt-3 sm:mt-auto">
          {/* Quantity stepper + remove button (single hook instance) */}
          {product && (
            <div className="w-fit shrink-0">
              <CartActions product={product} mode="card" showRemoveButton />
            </div>
          )}

          {/* Line total on mobile */}
          <div className="sm:hidden text-right">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {t("cart.total")}
            </p>
            <p className="font-bold text-foreground text-sm">
              ¥{(price * item?.quantity)?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

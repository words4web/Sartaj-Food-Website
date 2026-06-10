"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { useLocale, useTranslations } from "next-intl";
import { ShoppingBag } from "lucide-react";
import { RootState } from "@/lib/store";
import { ROUTES } from "@/constants/routes";
import { getLocalizedValue } from "@/utils/product/product.utils";
import { ThemedImage } from "@/components/common";

export function CheckoutCartItems() {
  const tCart = useTranslations("cart");
  const locale = useLocale();

  const cart = useSelector((state: RootState) => state.cart?.cart);
  const cartItems = cart?.items || [];

  if (cartItems?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden transition-all duration-300">
      <div className="p-6 border-b border-border/40 flex items-center gap-2">
        <ShoppingBag className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold text-foreground">
          {tCart("item") || "Items"} ({cartItems?.length})
        </h2>
      </div>

      <div className="divide-y divide-border/40 max-h-[320px] overflow-y-auto scrollbar-thin">
        {cartItems?.map((item) => {
          const product = item?.product;
          if (!product) return null;

          const name = getLocalizedValue(product?.name, locale);
          const price = product?.unitPrice ?? product?.price ?? 0;
          const imageSrc = product?.images?.[0] || product?.image;

          return (
            <div
              key={item?.productId}
              className="p-5 flex items-center gap-4 hover:bg-muted/10 transition-colors"
            >
              <div className="h-16 w-16 rounded-xl bg-muted/30 flex items-center justify-center shrink-0 overflow-hidden border border-border/40">
                <ThemedImage
                  src={imageSrc}
                  alt={name || "Product"}
                  emoji={product?.emoji}
                  className="h-full w-full object-contain p-1"
                  fallbackType="product"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <Link
                  href={ROUTES.PRODUCTS(item?.productId)}
                  className="font-semibold text-foreground text-sm line-clamp-1 hover:text-primary transition-colors"
                >
                  {name || "Product"}
                </Link>
                <p className="text-xs text-muted-foreground mt-0.5">
                  ¥{price?.toLocaleString()} × {item?.quantity}
                </p>
              </div>

              {/* Item Subtotal */}
              <div className="text-right shrink-0">
                <p className="font-bold text-foreground text-sm">
                  ¥{(price * (item?.quantity || 1))?.toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { IProduct } from "@/types/product/product.types";
import { Button } from "@/components/ui/button";
import { PRODUCT_BADGES } from "@/constants/product.constants";
import { ROUTES } from "@/constants/routes";
import { CartActions } from "@/components/cart/CartActions";
import { ThemedImage } from "@/components/common";

interface ProductCardProps {
  product?: IProduct;
  badgeOverride?: string;
}

export function ProductCard({ product, badgeOverride }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const t = useTranslations();

  const id = product?._id || product?.id;
  const name = typeof product?.name === "object" ? product?.name?.en : product?.name;
  const brand = product?.brand || (product?.manufacturer as any)?.name || "Sartaj";
  const price = product?.unitPrice ?? product?.price ?? 0;
  const originalPrice = product?.originalPrice;
  const isDiscounted = product?.isDiscounted || !!(originalPrice && originalPrice > price);
  const discountPercent = product?.discountPercent || product?.discountPercentage;

  const imageSrc = product?.images?.[0] || product?.image;
  const emoji = product?.emoji;

  const activeBadge = badgeOverride || product?.badge || product?.badges?.[0];

  const renderBadge = () => {
    if (!activeBadge) return null;

    const badgeLower = activeBadge?.toLowerCase();
    if (badgeLower === PRODUCT_BADGES.FEATURED) {
      return (
        <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          {t("home.featured")}
        </span>
      );
    } else if (badgeLower === PRODUCT_BADGES.HOT) {
      return (
        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          {t("home.hot")}
        </span>
      );
    } else if (badgeLower === PRODUCT_BADGES.NEW_ARRIVAL || badgeLower === "new") {
      return (
        <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          {t("home.new")}
        </span>
      );
    }

    return (
      <span className="bg-gray-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
        {activeBadge}
      </span>
    );
  };

  return (
    <div className="bg-card rounded-lg shadow border border-border hover:shadow-lg hover:border-primary/40 transition-all overflow-hidden flex flex-col h-full group relative">
      {/* Image & Badges */}
      <div className="relative aspect-square bg-muted/50 flex items-center justify-center p-4">
        <Link
          href={ROUTES.PRODUCTS(id)}
          className="absolute inset-0 flex items-center justify-center p-4 cursor-pointer"
        >
          <ThemedImage
            src={imageSrc}
            alt={typeof name === "string" ? name : "Product image"}
            emoji={emoji}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            fallbackType="product"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10 pointer-events-none">
          {renderBadge()}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-2 right-2 rounded-full bg-card shadow hover:shadow-md border border-border text-muted-foreground hover:text-red-500 z-10"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
          />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <Link href={ROUTES.PRODUCTS(id)} className="cursor-pointer group-hover:text-primary mb-2">
          <p className="text-xs text-muted-foreground mb-1">By {brand}</p>
          <h3 className="font-semibold text-foreground text-sm line-clamp-2 h-10 transition-colors">
            {typeof name === "string" ? name : ""}
          </h3>
        </Link>

        <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-border/60">
          {/* Price */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-baseline gap-1 flex-wrap">
              <span className="text-base font-black text-foreground leading-none">
                ¥{price?.toLocaleString()}
              </span>
              {isDiscounted && originalPrice && originalPrice > price && (
                <span className="text-[10px] text-muted-foreground line-through leading-none">
                  ¥{originalPrice?.toLocaleString()}
                </span>
              )}
            </div>
            {isDiscounted && discountPercent && (
              <span className="text-[10px] text-green-600 font-bold mt-0.5 leading-none">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Cart Actions */}
          {product && (
            <div className="w-28 shrink-0">
              <CartActions product={product} mode="card" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import { IProduct } from "@/types/product/product.types";
import { Button } from "@/components/ui/button";
import { PRODUCT_BADGES } from "@/constants/product.constants";

interface ProductCardProps {
  product?: IProduct;
  badgeOverride?: string;
  onAddToCart?: (id: string | number) => void;
  isAddedToCart?: boolean;
}

export function ProductCard({
  product,
  badgeOverride,
  onAddToCart,
  isAddedToCart = false,
}: ProductCardProps) {
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
          {t("home.featuredProducts")}
        </span>
      );
    } else if (badgeLower === PRODUCT_BADGES.HOT) {
      return (
        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          {t("home.hotProducts")}
        </span>
      );
    } else if (badgeLower === PRODUCT_BADGES.NEW_ARRIVAL || badgeLower === "new") {
      return (
        <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          {t("home.newArrivals")}
        </span>
      );
    }

    return (
      <span className="bg-gray-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
        {activeBadge}
      </span>
    );
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (id && onAddToCart) {
      onAddToCart(id);
    }
  };

  return (
    <div className="bg-card rounded-lg shadow border border-border hover:shadow-lg hover:border-primary/40 transition-all overflow-hidden flex flex-col h-full group relative">
      {/* Image & Badges */}
      <div className="relative aspect-square bg-muted/50 flex items-center justify-center p-4">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={typeof name === "string" ? name : "Product image"}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-6xl select-none">{emoji || "📦"}</div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">{renderBadge()}</div>

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
        <div>
          <p className="text-xs text-muted-foreground mb-1">By {brand}</p>
          <h3 className="font-semibold text-foreground text-sm mb-2 line-clamp-2 h-10">
            {typeof name === "string" ? name : ""}
          </h3>
        </div>

        <div>
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-foreground">¥{price.toLocaleString()}</span>
            {isDiscounted && originalPrice && originalPrice > price && (
              <>
                <span className="text-xs text-muted-foreground line-through">
                  ¥{originalPrice.toLocaleString()}
                </span>
                {discountPercent && (
                  <span className="text-xs text-green-600 font-semibold">
                    ({discountPercent}% off)
                  </span>
                )}
              </>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full cursor-pointer rounded-xl"
            size="sm"
            variant={isAddedToCart ? "destructive" : "default"}
            onClick={handleCartClick}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{isAddedToCart ? t("cart.removeItem") : t("products.addToCart")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

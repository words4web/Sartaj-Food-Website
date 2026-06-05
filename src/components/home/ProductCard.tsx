"use client";

import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProductCardProps } from "@/types/product.types";
import { Button } from "@/components/ui/button";

export function ProductCard({ id, name, brand, price, image, isNew, badge }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const t = useTranslations();

  return (
    <div className="bg-card rounded-lg shadow border border-border hover:shadow-lg hover:border-blue-300 transition-all overflow-hidden flex flex-col h-full group relative">
      {/* Image & Badges */}
      <div className="relative aspect-square bg-muted/50 flex items-center justify-center p-4">
        <img
          src={image}
          alt={name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
          {isNew && (
            <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              NEW
            </span>
          )}
          {badge && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              {badge}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-2 right-2 rounded-full bg-card shadow hover:shadow-md border border-border text-muted-foreground hover:text-red-500"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
          />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">By {brand}</p>
        <h3 className="font-semibold text-foreground text-sm mb-2 line-clamp-2 h-10">{name}</h3>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-foreground">¥{price.toLocaleString()}</span>
        </div>

        {/* Add to Cart Button */}
        <Button className="w-full" size="sm">
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline">{t("products.addToCart")}</span>
        </Button>
      </div>
    </div>
  );
}

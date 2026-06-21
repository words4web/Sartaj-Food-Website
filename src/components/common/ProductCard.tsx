"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ProductCardProps } from "@/types/product/product.types";
import { PRODUCT_BADGES } from "@/constants/product.constants";
import { ROUTES } from "@/constants/routes";
import { CartActions } from "@/components/cart/CartActions";
import { ThemedImage, WishlistButton } from "@/components/common";

export function ProductCard({ product, badgeOverride }: ProductCardProps) {
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
        <span className="bg-primary/20 text-primary border border-primary/20 backdrop-blur-sm shadow-sm text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          {t("home.featured")}
        </span>
      );
    } else if (badgeLower === PRODUCT_BADGES.HOT) {
      return (
        <span className="bg-destructive/15 text-destructive border border-destructive/25 backdrop-blur-sm shadow-sm text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          {t("home.hot")}
        </span>
      );
    } else if (badgeLower === PRODUCT_BADGES.NEW_ARRIVAL || badgeLower === "new") {
      return (
        <span className="bg-accent-foreground/15 text-accent-foreground border border-accent-foreground/25 backdrop-blur-sm shadow-sm text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          {t("home.new")}
        </span>
      );
    }

    return (
      <span className="bg-muted/80 text-foreground border border-border backdrop-blur-sm shadow-sm text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
        {activeBadge}
      </span>
    );
  };

  const renderBadgesOverlay = () => (
    <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-20 pointer-events-none hidden sm:flex">
      {renderBadge()}
    </div>
  );

  const renderWishlistOverlay = () => {
    if (!id) return null;
    return (
      <div className="absolute top-2 right-2 z-20">
        <WishlistButton
          productId={String(id)}
          className="transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm"
        />
      </div>
    );
  };

  const renderBottomBar = () => (
    <div className="p-3 sm:p-4 flex items-center justify-between gap-2 mt-auto pt-3 border-t border-border/60 bg-card z-20">
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
          <span className="text-[9px] text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 border border-green-200/50 dark:border-green-800/30 px-1.5 py-0.5 rounded-md font-bold mt-1 leading-none w-fit">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Cart Actions */}
      {product && (
        <div className="w-20 sm:w-28 shrink-0">
          <CartActions product={product} mode="card" />
        </div>
      )}
    </div>
  );

  return (
    <div className="group relative w-full bg-transparent [perspective:1000px]">
      {/* Flipping Card Frame */}
      <div className="relative w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-xl border border-border/80 shadow-sm hover:shadow-[0_16px_36px_-8px_color-mix(in_oklch,var(--primary)_15%,transparent)] hover:border-primary/35 hover:scale-[1.01]">
        {/* FRONT FACE (Main Product Details - Defines card height in normal flow) */}
        <div className="[backface-visibility:hidden] flex flex-col w-full h-full bg-card rounded-xl overflow-hidden pointer-events-auto group-hover:pointer-events-none">
          {/* Image Container */}
          <div className="relative w-full aspect-square sm:h-auto sm:aspect-square bg-muted/40 group-hover:bg-primary/5 flex items-center justify-center p-2 sm:p-4 shrink-0 transition-colors duration-300">
            <Link
              href={ROUTES.PRODUCTS(id)}
              className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 cursor-pointer"
            >
              <ThemedImage
                src={imageSrc}
                alt={typeof name === "string" ? name : "Product image"}
                emoji={emoji}
                className="max-h-full max-w-full object-contain group-hover:scale-[1.07] group-hover:rotate-1 transition-all duration-500 ease-out"
                fallbackType="product"
              />
            </Link>
          </div>

          {/* Name & Brand Content */}
          <div className="p-3 sm:p-4 flex flex-col justify-start min-w-0 bg-card flex-grow">
            <Link href={ROUTES.PRODUCTS(id)} className="cursor-pointer mb-1 block">
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5">By {brand}</p>
              <h3 className="font-semibold text-foreground text-sm line-clamp-2 h-10 transition-colors group-hover:text-primary">
                {typeof name === "string" ? name : ""}
              </h3>
            </Link>
          </div>

          {/* Price & Actions Bottom */}
          {renderBottomBar()}

          {/* Overlays */}
          {renderBadgesOverlay()}
          {renderWishlistOverlay()}
        </div>

        {/* BACK FACE (Description Details) */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col h-full bg-card rounded-xl overflow-hidden pointer-events-none group-hover:pointer-events-auto">
          {/* Scrollable Description Container with extra top padding */}
          <Link
            href={ROUTES.PRODUCTS(id)}
            className="p-4 pt-10 sm:pt-12 flex flex-col justify-start overflow-y-auto no-scrollbar flex-grow bg-muted/5 cursor-pointer block"
          >
            <p className="text-[10px] sm:text-xs font-bold text-primary/80 mb-2 select-none uppercase tracking-wider">
              {t("products.description")}
            </p>
            <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-medium pt-1">
              {typeof product?.description === "string" && product?.description?.trim()
                ? product?.description
                : "Description not available"}
            </p>
          </Link>

          {/* Price & Actions Bottom */}
          {renderBottomBar()}

          {/* Overlays (so they are visible and functional when flipped) */}
          {renderBadgesOverlay()}
          {renderWishlistOverlay()}
        </div>
      </div>
    </div>
  );
}

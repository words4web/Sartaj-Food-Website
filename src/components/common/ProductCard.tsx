"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ProductCardProps } from "@/types/product/product.types";
import { PRODUCT_BADGES } from "@/constants/product.constants";
import { ROUTES } from "@/constants/routes";
import { CartActions } from "@/components/cart/CartActions";
import { ThemedImage, WishlistButton } from "@/components/common";
import { useAuth } from "@/hooks/useAuth";

export function ProductCard({ product, badgeOverride }: ProductCardProps) {
  const t = useTranslations();
  const { isAuthenticated } = useAuth();

  const id = product?._id || product?.id;
  const identifier = product?.slug || id;
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
    <div className="absolute top-2 left-2 flex flex-row flex-wrap items-center gap-1.5 z-20 pointer-events-none">
      {isDiscounted && discountPercent && (
        <span className="bg-red-500 text-white shadow-sm text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider w-fit">
          -{discountPercent}%
        </span>
      )}
      {renderBadge()}
    </div>
  );

  const renderWishlistOverlay = () => {
    if (!id || !isAuthenticated) return null;
    return (
      <div className="absolute top-2 right-2 z-20">
        <WishlistButton
          productId={String(id)}
          className="lg:transition-all lg:duration-300 lg:hover:scale-110 lg:active:scale-95 shadow-sm rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm"
        />
      </div>
    );
  };

  const renderBottomBar = () => (
    <div className="p-3 sm:p-4 flex items-center justify-between gap-2 mt-auto pt-3 border-t border-border/60 bg-card z-20">
      {/* Price */}
      <div className="flex flex-col min-w-0">
        <span className="text-base font-black text-foreground">¥{price?.toLocaleString()}</span>
        {isDiscounted && originalPrice && originalPrice > price && (
          <span className="text-xs text-muted-foreground line-through">
            ¥{originalPrice?.toLocaleString()}
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
    <div className="group relative w-full bg-card rounded-xl border border-border/80 shadow-sm lg:hover:shadow-[0_16px_36px_-8px_color-mix(in_oklch,var(--primary)_15%,transparent)] lg:hover:border-primary/35 lg:hover:scale-[1.01] lg:transition-all lg:duration-300 flex flex-col justify-between overflow-hidden h-full min-h-[380px] sm:min-h-[420px]">
      {/* Static Overlays - Badges & Wishlist */}
      {renderBadgesOverlay()}
      {renderWishlistOverlay()}

      {/* Flipping Middle Content Container */}
      <div className="relative w-full flex-grow [perspective:1000px]">
        <div className="relative w-full h-full lg:transition-transform lg:duration-500 lg:[transform-style:preserve-3d] lg:group-hover:[transform:rotateY(180deg)]">
          {/* FRONT FACE (Main Product Details) */}
          <div className="lg:[backface-visibility:hidden] flex flex-col w-full h-full bg-card pointer-events-auto lg:group-hover:pointer-events-none">
            {/* Image Container */}
            <div className="relative w-full aspect-square bg-muted/40 lg:group-hover:bg-primary/5 flex items-center justify-center p-2 sm:p-4 shrink-0 lg:transition-colors lg:duration-300">
              <Link
                href={ROUTES.PRODUCTS(identifier)}
                className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 cursor-pointer"
              >
                <ThemedImage
                  src={imageSrc}
                  alt={typeof name === "string" ? name : "Product image"}
                  emoji={emoji}
                  className="max-h-full max-w-full object-contain lg:group-hover:scale-[1.07] lg:group-hover:rotate-1 lg:transition-all lg:duration-500 lg:ease-out"
                  fallbackType="product"
                />
              </Link>
            </div>

            {/* Name & Brand Content */}
            <div className="p-3 sm:p-4 flex flex-col justify-start min-w-0 bg-card flex-grow">
              <Link href={ROUTES.PRODUCTS(identifier)} className="cursor-pointer mb-1 block">
                <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5">By {brand}</p>
                <h3 className="font-semibold text-foreground text-sm line-clamp-2 h-10 lg:transition-colors lg:group-hover:text-primary">
                  {typeof name === "string" ? name : ""}
                </h3>
              </Link>
            </div>
          </div>

          {/* BACK FACE (Description Details) - Hidden on Mobile */}
          <div className="hidden lg:flex absolute inset-0 lg:[backface-visibility:hidden] lg:[transform:rotateY(180deg)] flex-col h-full bg-card pointer-events-none lg:group-hover:pointer-events-auto">
            <Link
              href={ROUTES.PRODUCTS(identifier)}
              className="p-4 pt-10 sm:pt-12 flex flex-col justify-start bg-muted/5 cursor-pointer block h-full"
            >
              {/* Product Name - STATIC */}
              <div className="mb-2 border-b border-border/60 pb-2 shrink-0">
                <h4 className="font-bold text-sm text-foreground line-clamp-2 mb-1">
                  {typeof name === "string" ? name : ""}
                </h4>
              </div>

              {/* Description Header - STATIC */}
              <p className="text-[10px] sm:text-xs font-bold text-primary/80 mb-2 select-none uppercase tracking-wider shrink-0">
                {t("products.description")}
              </p>

              {/* Scrollable Description Content */}
              <div className="overflow-y-auto no-scrollbar flex-grow min-h-0">
                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-medium">
                  {typeof product?.description === "string" && product?.description?.trim()
                    ? product?.description
                    : "Description not available"}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {renderBottomBar()}
    </div>
  );
}

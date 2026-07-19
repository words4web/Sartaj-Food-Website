"use client";

import { ProductCard } from "@/components/common/ProductCard";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";
import { useGetDiscountedProducts } from "@/services/product/product.hooks";
import { ProductGridSkeleton } from "@/components/skeletons/ProductCardSkeleton";
import { CommonError } from "@/components/ui/common-error";
import { useCachedSkeletonCount } from "@/hooks/useCachedSkeletonCount";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { IProduct } from "@/types/product/product.types";

export function OffersSection() {
  const t = useTranslations();
  const isDesktop = useIsDesktop();

  const { data: discountedProducts, isLoading, isError, refetch } = useGetDiscountedProducts();

  const productsToRender = discountedProducts || [];

  const skeletonCount = useCachedSkeletonCount(
    "sartaj_products_count_offers",
    productsToRender?.length,
    4,
  );

  if (!isLoading && !isError && productsToRender?.length === 0) {
    return null;
  }

  return (
    <section className="py-6 sm:py-10 md:py-12 bg-muted/50 border-t border-b border-border/40">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 relative z-10">
        {/* Header */}
        <div className="flex items-baseline justify-between gap-4 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {t("home.specialOffers") || "Special Offers"}
          </h2>
          <Link
            href={ROUTES.PRODUCTS()}
            className="text-primary hover:text-primary font-semibold text-sm shrink-0"
          >
            {t("common.viewAll")} →
          </Link>
        </div>

        {/* Products Grid / Loading State */}
        {isLoading ? (
          <ProductGridSkeleton
            count={skeletonCount}
            columnsClass="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 lg:gap-8"
          />
        ) : isError ? (
          <CommonError onRetry={refetch} message="Could not load special offers." />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 lg:gap-8">
            {productsToRender?.slice(0, 4)?.map((product: IProduct, idx: number) => (
              <div
                key={product?._id || product?.id}
                className={isDesktop ? "animate-fade-in-up-card" : ""}
                style={{ animationDelay: isDesktop ? `${idx * 75}ms` : undefined }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

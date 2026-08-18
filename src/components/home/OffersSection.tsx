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
import { RakshaBandhanBanner } from "@/components/home/RakshaBandhanBanner";

export function OffersSection() {
  const t = useTranslations();
  const isDesktop = useIsDesktop();

  const {
    data: discountedProducts,
    isLoading,
    isError,
    refetch,
  } = useGetDiscountedProducts({ limit: 100 });

  const productsToRender = discountedProducts || [];

  const skeletonCount = useCachedSkeletonCount(
    "sartaj_products_count_offers",
    productsToRender?.length,
    4,
  );

  // if (!isLoading && !isError && productsToRender?.length === 0) {
  //   return null;
  // }

  return (
    <section className="py-6 sm:py-10 md:py-12 bg-muted/50 border-t border-b border-border/40">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 relative z-10 space-y-6 sm:space-y-8">
        <RakshaBandhanBanner />

        {/* Header */}
        {/* <div className="flex items-baseline justify-between gap-4 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {t("home.specialOffers") || "Special Offers"}
          </h2>
          <Link
            href={ROUTES.SALE}
            className="text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-1.5 text-sm font-semibold shrink-0"
          >
            <IndiaFlagIcon className="w-5 h-3.5 rounded-sm shadow-sm shrink-0" />
            <span>{t("common.viewAll") || "View All"} →</span>
          </Link>
        </div> */}

        {/* Products Grid / Loading State */}
        {/* {isLoading ? (
          <ProductGridSkeleton
            count={skeletonCount}
            columnsClass="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 lg:gap-8"
          />
        ) : isError ? (
          <CommonError onRetry={refetch} message="Could not load special offers." />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 lg:gap-8">
            {productsToRender?.map((product: IProduct, idx: number) => (
              <div
                key={product?._id || product?.id}
                className={isDesktop ? "animate-fade-in-up-card" : ""}
                style={{ animationDelay: isDesktop ? `${idx * 75}ms` : undefined }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )} */}
      </div>
    </section>
  );
}

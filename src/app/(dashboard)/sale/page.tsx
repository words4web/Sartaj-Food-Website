"use client";

import { useTranslations } from "next-intl";
import { useGetDiscountedProducts } from "@/services/product/product.hooks";
import { ProductCard } from "@/components/common/ProductCard";
import { ProductGridSkeleton } from "@/components/skeletons/ProductCardSkeleton";
import { CommonError } from "@/components/ui/common-error";
import { useCachedSkeletonCount } from "@/hooks/useCachedSkeletonCount";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { IProduct } from "@/types/product/product.types";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function SalePage() {
  const tCommon = useTranslations("common");
  const tSale = useTranslations("sale");
  const isDesktop = useIsDesktop();

  const {
    data: discountedProducts,
    isLoading,
    isError,
    refetch,
  } = useGetDiscountedProducts({ limit: 100 });

  const productsToRender = discountedProducts || [];

  const skeletonCount = useCachedSkeletonCount(
    "sartaj_products_count_sale_page",
    productsToRender?.length,
    8,
  );

  return (
    <main className="min-h-screen bg-card pb-16 sm:pb-24">
      <div className="h-2 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <Link
          href={ROUTES.HOME}
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          {tCommon("backToHome") || "Back to Home"}
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-border/40 pb-6 mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500 animate-pulse" />
              {tSale("sectionTitle") || "On Sale Products"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {tSale("sectionSubtitle") || "Enjoy premium products at special prices."}
            </p>
          </div>
          {!isLoading && !isError && productsToRender.length > 0 && (
            <span className="text-sm font-semibold text-muted-foreground bg-muted px-4 py-2 rounded-full border border-border/50 self-start md:self-center">
              {tSale("offersCount", { count: productsToRender.length }) ||
                `${productsToRender.length} Offers Available`}
            </span>
          )}
        </div>

        {isLoading ? (
          <ProductGridSkeleton
            count={skeletonCount}
            columnsClass="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          />
        ) : isError ? (
          <CommonError onRetry={refetch} message="Could not load special offers." />
        ) : productsToRender.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 border border-dashed border-border/60 rounded-2xl max-w-xl mx-auto">
            <span className="text-4xl block mb-4">🛒</span>
            <h3 className="text-lg font-bold text-foreground mb-1">
              {tSale("noOffersTitle") || "No Items Available"}
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              {tSale("noOffersSubtitle") || "Please check back shortly as we prepare fresh stock!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {productsToRender.map((product: IProduct, idx: number) => (
              <div
                key={product?._id || product?.id}
                className={`relative z-10 ${isDesktop ? "animate-fade-in-up-card" : ""}`}
                style={{ animationDelay: isDesktop ? `${idx * 40}ms` : undefined }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

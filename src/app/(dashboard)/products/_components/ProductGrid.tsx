"use client";

import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/common/ProductCard";
import { ProductGridSkeleton } from "@/components/skeletons/ProductCardSkeleton";
import { CommonError } from "@/components/ui/common-error";
import { ProductGridProps } from "@/types/product/product.types";

export function ProductGrid({
  isProductsLoading,
  productsError,
  refetchProducts,
  products,
  isFetchingNextPage,
  hasNextPage,
  bottomLoadRef,
}: ProductGridProps) {
  const t = useTranslations();
  return isProductsLoading ? (
    <ProductGridSkeleton
      count={16}
      columnsClass="grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6"
    />
  ) : productsError ? (
    <CommonError onRetry={refetchProducts} message="Could not load products for this category." />
  ) : products?.length === 0 ? (
    <div className="text-center py-16 bg-card border border-border rounded-xl text-muted-foreground">
      No products found in this category.
    </div>
  ) : (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
        {products?.map((product, index) => {
          const isTriggerIndex = index === Math.max(0, products?.length - 16);
          return (
            <div
              key={product?.id || product?._id}
              id={isTriggerIndex ? "infinite-scroll-trigger" : undefined}
              className="h-full w-full"
            >
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>

      {isFetchingNextPage && (
        <div className="mt-6">
          <ProductGridSkeleton
            count={4}
            columnsClass="grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6"
          />
        </div>
      )}

      {!hasNextPage && products?.length > 0 && (
        <div className="flex justify-center py-6 border-t border-border/40">
          <span className="text-sm font-semibold text-muted-foreground/60 bg-muted/30 border border-border/40 rounded-full px-5 py-2 select-none">
            ✨ {t("products.noMoreProducts")}
          </span>
        </div>
      )}

      <div ref={bottomLoadRef} className="h-4" />
    </div>
  );
}

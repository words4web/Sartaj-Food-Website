"use client";

import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/common/ProductCard";
import { ProductGridSkeleton } from "@/components/skeletons/ProductCardSkeleton";
import { useGetRelatedProducts } from "@/services/product/product.hooks";
import type { RelatedProductsProps } from "@/types/product/product.types";

export function RelatedProducts({ productId }: RelatedProductsProps) {
  const t = useTranslations();
  const { data: relatedProducts, isLoading } = useGetRelatedProducts(productId);

  return (
    <section className="max-w-7xl mx-auto px-4 mt-16">
      <h2 className="text-2xl font-black text-foreground mb-8">{t("products.relatedProducts")}</h2>

      {isLoading ? (
        <ProductGridSkeleton count={6} scrollable />
      ) : !relatedProducts || relatedProducts.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-center bg-card rounded-2xl border border-dashed border-border p-8">
          <span className="text-4xl mb-3">📦</span>
          <p className="text-muted-foreground text-sm font-medium">{t("common.noResults")}</p>
        </div>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin">
          {relatedProducts.slice(0, 30).map((prod: any) => (
            <div key={prod?._id || prod?.id} className="w-[240px] sm:w-[280px] shrink-0">
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product/product.service";
import { ProductCard } from "@/components/common/ProductCard";
import { ProductCardSkeleton } from "@/components/skeletons/ProductCardSkeleton";
import { IProduct } from "@/types/product/product.types";

export function FeaturedPairingsGrid({ slugs }: { slugs: string[] }) {
  const { data: products = [], isLoading } = useQuery<IProduct[]>({
    queryKey: ["category-seo", "pairings", slugs],
    queryFn: async () => {
      if (!slugs || slugs.length === 0) return [];
      const responses = await Promise.allSettled(
        slugs?.map((slug) => productService.getProductById(slug)),
      );

      const items: IProduct[] = [];
      for (const res of responses) {
        if (res?.status === "fulfilled" && res?.value?.data?.data) {
          items.push(res?.value?.data?.data);
        }
      }
      return items;
    },
    enabled: Array.isArray(slugs) && slugs?.length > 0,
    staleTime: 1000 * 60 * 15,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 pt-1">
        {slugs?.map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products || products?.length === 0) {
    return null;
  }

  return (
    <div className="w-full pt-1">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
        {products?.map((product) => (
          <div key={product?._id || product?.id} className="h-full w-full min-w-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

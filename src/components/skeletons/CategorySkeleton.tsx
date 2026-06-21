import { getCategorySizeClasses } from "@/utils/product/product.utils";
import { Skeleton } from "./Skeleton";

export function CategoryCardSkeleton({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const {
    sizeClasses,
    innerSizeClasses,
    textSkeletonClasses: textClasses,
    subTextSkeletonClasses: subTextClasses,
  } = getCategorySizeClasses(size);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-1.5 rounded-full border border-border bg-card shrink-0 ${sizeClasses}`}
    >
      <Skeleton className={`rounded-full ${innerSizeClasses}`} />
      <Skeleton className={`rounded ${textClasses}`} />
      <Skeleton className={`rounded ${subTextClasses}`} />
    </div>
  );
}

export function CategoryCarouselSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="flex gap-6 overflow-x-hidden pb-4">
      {Array.from({ length: count }).map((_, index) => (
        <CategoryCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function CategoryGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 md:gap-12 lg:gap-16 justify-items-center">
      {Array.from({ length: count }).map((_, index) => (
        <CategoryCardSkeleton key={index} size="lg" />
      ))}
    </div>
  );
}

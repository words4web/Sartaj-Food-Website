import { Skeleton } from "./Skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border/80 flex flex-col justify-between h-full min-h-[290px] sm:min-h-[420px] overflow-hidden w-full">
      {/* Image Skeleton */}
      <div className="relative w-full aspect-square bg-muted/40 flex items-center justify-center p-2 sm:p-4 shrink-0">
        <Skeleton className="h-full w-full aspect-square rounded-lg" />
      </div>

      {/* Content Skeleton */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow justify-start min-w-0">
        <div className="space-y-2 mb-2">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>

      {/* Price & Actions Bottom Skeleton */}
      <div className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-auto pt-3 border-t border-border/60 bg-card">
        {/* Price Skeleton */}
        <div className="space-y-1">
          <Skeleton className="h-5 w-16" />
        </div>

        {/* Button Skeleton */}
        <Skeleton className="h-7 sm:h-8 w-full sm:w-32 rounded-xl shrink-0" />
      </div>
    </div>
  );
}

interface ProductGridSkeletonProps {
  count?: number;
  columnsClass?: string;
  scrollable?: boolean;
}

export function ProductGridSkeleton({
  count = 4,
  columnsClass = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-10",
  scrollable = false,
}: ProductGridSkeletonProps) {
  if (scrollable) {
    return (
      <div className="flex gap-6 overflow-x-hidden pb-4">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="w-[240px] sm:w-[280px] shrink-0">
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid ${columnsClass} gap-6`}>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

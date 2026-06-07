import { Skeleton } from "./Skeleton";
import { ProductGridSkeleton } from "./ProductCardSkeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-pulse">
      {/* Breadcrumb skeleton */}
      <Skeleton className="h-5 w-24" />

      {/* Main product display skeleton */}
      <div className="bg-card rounded-2xl border border-border p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left image skeleton */}
        <Skeleton className="aspect-square w-full rounded-xl" />

        {/* Right details skeleton */}
        <div className="space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-1/3" />
          </div>
          <div className="border-t border-b border-border py-4 space-y-3">
            <Skeleton className="h-9 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-20 w-full rounded-xl" />
          <div className="flex gap-4">
            <Skeleton className="h-11 w-1/3 rounded-xl" />
            <Skeleton className="h-11 flex-1 rounded-xl" />
          </div>
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      </div>

      {/* Related Products skeleton section */}
      <div className="mt-16 space-y-6">
        <Skeleton className="h-8 w-48" />
        <ProductGridSkeleton count={6} scrollable />
      </div>
    </div>
  );
}

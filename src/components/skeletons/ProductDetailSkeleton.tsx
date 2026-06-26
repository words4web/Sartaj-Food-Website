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

      {/* Reviews skeleton section */}
      <div className="bg-card rounded-2xl border border-border p-6 lg:p-8 space-y-8">
        <Skeleton className="h-7 w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Average rating box skeleton */}
          <div className="flex flex-col gap-6">
            <div className="bg-muted/10 rounded-xl p-6 border border-border/40 flex flex-col items-center justify-center text-center">
              <Skeleton className="h-4 w-28 mb-2" />
              <Skeleton className="h-12 w-16 mb-2" />
              <Skeleton className="h-5 w-24 mb-2" />
              <Skeleton className="h-4 w-20" />
            </div>

            <div className="flex flex-col gap-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-3.5 flex-1 rounded-full" />
                  <Skeleton className="h-4 w-8" />
                </div>
              ))}
            </div>
          </div>

          {/* Reviews list skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="border-b border-border/50 pb-6 last:border-0 last:pb-0">
                <div className="flex items-start gap-4 mb-3">
                  <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-3.5 w-20" />
                  </div>
                </div>
                <div className="pl-14 space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                </div>
              </div>
            ))}
          </div>
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

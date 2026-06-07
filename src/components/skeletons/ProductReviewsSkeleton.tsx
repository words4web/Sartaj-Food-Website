import { Skeleton } from "./Skeleton";

export function ProductReviewsSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full" data-slot="product-reviews-skeleton">
      {[1, 2, 3].map((i) => (
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
  );
}

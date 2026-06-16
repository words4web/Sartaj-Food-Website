import { Skeleton } from "./Skeleton";

export function OrderListSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-card border border-border/60 p-6 rounded-3xl shadow-sm space-y-5"
        >
          {/* Card Header Skeleton */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div className="space-y-2">
              <Skeleton className="h-5 w-40 rounded-lg" />
              <Skeleton className="h-3 w-32 rounded" />
            </div>
            <Skeleton className="h-6 w-24 rounded-full self-start sm:self-auto" />
          </div>

          {/* Card Divider */}
          <div className="border-t border-border/40" />

          {/* Card Body (Products thumbnails) Skeleton */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex -space-x-3 overflow-hidden">
              {Array.from({ length: 3 }).map((_, pIdx) => (
                <Skeleton
                  key={pIdx}
                  className="h-12 w-12 rounded-xl ring-2 ring-background shrink-0"
                />
              ))}
            </div>
            <div className="flex-1 min-w-0 space-y-1.5">
              <Skeleton className="h-4 w-2/3 max-w-[320px] rounded" />
              <Skeleton className="h-3 w-24 rounded" />
            </div>
          </div>

          {/* Card Divider */}
          <div className="border-t border-border/40" />

          {/* Card Footer Skeleton */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pt-1">
            <div className="space-y-1">
              <Skeleton className="h-3.5 w-36 rounded" />
              <Skeleton className="h-3 w-20 rounded" />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Skeleton className="h-10 w-full sm:w-28 rounded-xl" />
              <Skeleton className="h-10 w-full sm:w-32 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

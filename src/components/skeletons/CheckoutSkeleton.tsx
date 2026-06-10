import { Skeleton } from "./Skeleton";

export function CheckoutSkeleton() {
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Title skeleton */}
        <Skeleton className="h-10 w-48 mb-8 rounded-xl" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Main column skeleton */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1. Cart Items Container */}
            <div className="bg-card rounded-2xl border border-border/60 p-6 space-y-4">
              <Skeleton className="h-6 w-36 rounded-md" />
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-3 border-b border-border/40 last:border-b-0"
                  >
                    <Skeleton className="h-16 w-16 rounded-xl shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4 rounded" />
                      <Skeleton className="h-3.5 w-1/4 rounded" />
                    </div>
                    <Skeleton className="h-5 w-16 rounded shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Address Selection Container */}
            <div className="bg-card rounded-2xl border border-border/60 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-40 rounded-md" />
                <Skeleton className="h-5 w-24 rounded-md" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="border border-border/60 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-24 rounded" />
                    </div>
                    <Skeleton className="h-3 w-5/6 rounded" />
                    <Skeleton className="h-3 w-2/3 rounded" />
                    <Skeleton className="h-3 w-1/3 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Payment Method Container */}
            <div className="bg-card rounded-2xl border border-border/60 p-6 space-y-4">
              <Skeleton className="h-6 w-44 rounded-md" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border border-border/60 rounded-2xl p-4 space-y-2">
                    <Skeleton className="h-4 w-28 rounded" />
                    <Skeleton className="h-3 w-16 rounded" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-12 w-full rounded-2xl" />
            </div>
          </div>

          {/* Right Summary sidebar skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border/60 p-5 space-y-6">
              <Skeleton className="h-6 w-32 rounded-md" />

              {/* Coupon Form Skeleton */}
              <div className="flex gap-2 pb-4 border-b border-border/40">
                <Skeleton className="h-9 flex-1 rounded-xl" />
                <Skeleton className="h-9 w-16 rounded-xl" />
              </div>

              {/* Price Breakdown lines */}
              <div className="space-y-3 pb-4 border-b border-border/40">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-24 rounded" />
                    <Skeleton className="h-4 w-12 rounded" />
                  </div>
                ))}
              </div>

              {/* Total Skeleton */}
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-16 rounded" />
                <Skeleton className="h-7 w-24 rounded" />
              </div>

              {/* CTA Button Skeleton */}
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

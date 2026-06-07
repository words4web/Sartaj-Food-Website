import { Skeleton } from "./Skeleton";

export function CartSkeleton() {
  return (
    <main className="min-h-screen bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Skeleton className="h-9 w-32 mb-8 rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-5 flex items-center gap-4">
                  <Skeleton className="h-20 w-20 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                  <Skeleton className="h-8 w-28 rounded-xl shrink-0" />
                  <Skeleton className="h-5 w-16 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Order summary skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <Skeleton className="h-6 w-40" />
              <div className="space-y-3 pb-4 border-b border-border">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

export function OrderDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
      {/* Back button skeleton */}
      <div className="h-4 w-24 bg-muted rounded mb-6" />

      {/* Header title skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="h-9 w-48 bg-muted rounded-xl" />
          <div className="h-4 w-36 bg-muted rounded-md mt-2" />
        </div>
        <div className="h-8 w-24 bg-muted rounded-full" />
      </div>

      {/* Main grids skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Left Card Info */}
        <div className="md:col-span-2 border border-border/60 p-6 rounded-3xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 bg-muted rounded-full" />
            <div className="space-y-2 flex-1">
              <div className="h-3 w-16 bg-muted rounded" />
              <div className="h-4 w-32 bg-muted rounded" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 bg-muted rounded-full" />
            <div className="space-y-2 flex-1">
              <div className="h-3 w-20 bg-muted rounded" />
              <div className="h-4 w-40 bg-muted rounded" />
            </div>
          </div>
        </div>

        {/* Right Card Address */}
        <div className="border border-border/60 p-6 rounded-3xl space-y-4">
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-3 w-28 bg-muted rounded" />
            <div className="h-3 w-36 bg-muted rounded mt-2" />
          </div>
        </div>
      </div>

      {/* Items list skeleton */}
      <div className="border border-border/60 rounded-3xl overflow-hidden mb-8">
        <div className="p-6 border-b border-border/60">
          <div className="h-6 w-32 bg-muted rounded" />
        </div>
        <div className="divide-y divide-border/60">
          {[1, 2].map((i) => (
            <div key={i} className="p-6 flex gap-4 items-center justify-between">
              <div className="flex gap-4 items-center flex-1">
                <div className="h-16 w-16 bg-muted rounded-2xl shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded w-2/3" />
                  <div className="h-3 bg-muted rounded w-1/3" />
                </div>
              </div>
              <div className="h-4 w-16 bg-muted rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Total skeleton */}
      <div className="border border-border/60 p-8 rounded-3xl space-y-4">
        <div className="h-5 w-28 bg-muted rounded" />
        <div className="space-y-2 pt-2">
          <div className="flex justify-between">
            <div className="h-4 w-20 bg-muted rounded" />
            <div className="h-4 w-16 bg-muted rounded" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-4 w-16 bg-muted rounded" />
          </div>
          <div className="flex justify-between pt-4 border-t border-border/60">
            <div className="h-5 w-16 bg-muted rounded" />
            <div className="h-6 w-24 bg-muted rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

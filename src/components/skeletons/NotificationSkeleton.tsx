import { Skeleton } from "./Skeleton";

export function NotificationSkeleton() {
  return (
    <div className="flex flex-col gap-0.5 px-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-start gap-3 px-2 py-3 rounded-xl">
          <Skeleton className="h-9 w-9 rounded-full shrink-0 mt-0.5" />

          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-4/5 rounded" />

            <Skeleton className="h-3 w-full rounded" />

            <Skeleton className="h-2.5 w-16 rounded" />
          </div>

          <Skeleton className="h-2 w-2 rounded-full shrink-0 mt-2" />
        </div>
      ))}
    </div>
  );
}

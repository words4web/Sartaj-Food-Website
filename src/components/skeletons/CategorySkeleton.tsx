import { Skeleton } from "./Skeleton";

export function CategoryCardSkeleton({ size = "md" }: { size?: "sm" | "md" }) {
  const isSmall = size === "sm";
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 rounded-full border border-border bg-card shrink-0 ${
        isSmall ? "w-[120px] h-[120px] p-2.5" : "w-[150px] h-[150px] p-4"
      }`}
    >
      <Skeleton className={`rounded-full ${isSmall ? "h-13 w-13" : "h-16 w-16"}`} />
      <Skeleton className={`rounded ${isSmall ? "h-3 w-12" : "h-3.5 w-16"}`} />
      <Skeleton className={`rounded ${isSmall ? "h-2.5 w-8" : "h-3 w-10"}`} />
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

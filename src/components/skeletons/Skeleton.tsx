import { cn } from "@/utils/common/common.utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-accent/60 dark:bg-accent/40", className)}
      {...props}
    />
  );
}

export { Skeleton };

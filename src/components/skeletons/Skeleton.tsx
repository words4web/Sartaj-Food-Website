import { cn } from "@/utils/common/common.utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-gradient-to-r from-accent via-primary/10 to-accent animate-pulse rounded-md",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };

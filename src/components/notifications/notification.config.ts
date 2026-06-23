import {
  Bell,
  ShoppingBag,
  CheckCircle2,
  Loader2,
  Truck,
  CheckSquare,
  XCircle,
  User,
} from "lucide-react";

export const typeConfigs: Record<
  string,
  {
    icon: React.ComponentType<any>;
    iconClass: string;
    bgClass: string;
    borderClass: string;
    indicatorClass: string;
  }
> = {
  ORDER_PLACED: {
    icon: ShoppingBag,
    iconClass: "text-primary bg-primary/10 ring-4 ring-primary/5",
    bgClass: "bg-primary/5 hover:bg-primary/10",
    borderClass: "border-l-primary",
    indicatorClass: "bg-primary shadow-[0_0_8px_var(--primary)]",
  },
  ORDER_CONFIRMED: {
    icon: CheckCircle2,
    iconClass: "text-primary bg-primary/10 ring-4 ring-primary/5",
    bgClass: "bg-primary/5 hover:bg-primary/10",
    borderClass: "border-l-primary",
    indicatorClass: "bg-primary shadow-[0_0_8px_var(--primary)]",
  },
  ORDER_PROCESSING: {
    icon: Loader2,
    iconClass: "text-primary bg-primary/10 ring-4 ring-primary/5",
    bgClass: "bg-primary/5 hover:bg-primary/10",
    borderClass: "border-l-primary",
    indicatorClass: "bg-primary shadow-[0_0_8px_var(--primary)]",
  },
  ORDER_SHIPPED: {
    icon: Truck,
    iconClass: "text-primary bg-primary/10 ring-4 ring-primary/5",
    bgClass: "bg-primary/5 hover:bg-primary/10",
    borderClass: "border-l-primary",
    indicatorClass: "bg-primary shadow-[0_0_8px_var(--primary)]",
  },
  ORDER_DELIVERED: {
    icon: CheckSquare,
    iconClass:
      "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/50 ring-4 ring-emerald-500/10",
    bgClass:
      "bg-emerald-50/10 dark:bg-emerald-950/5 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/10",
    borderClass: "border-l-emerald-500 dark:border-l-emerald-400",
    indicatorClass: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]",
  },
  ORDER_CANCELLED: {
    icon: XCircle,
    iconClass: "text-destructive bg-destructive/10 ring-4 ring-destructive/5",
    bgClass: "bg-destructive/5 hover:bg-destructive/10",
    borderClass: "border-l-destructive",
    indicatorClass: "bg-destructive shadow-[0_0_8px_var(--destructive)]",
  },
  PROFILE_VIEW: {
    icon: User,
    iconClass: "text-primary bg-primary/10 ring-4 ring-primary/5",
    bgClass: "bg-primary/5 hover:bg-primary/10",
    borderClass: "border-l-primary",
    indicatorClass: "bg-primary shadow-[0_0_8px_var(--primary)]",
  },
  DEFAULT: {
    icon: Bell,
    iconClass: "text-primary bg-primary/10 ring-4 ring-primary/5",
    bgClass: "bg-primary/5 hover:bg-primary/10",
    borderClass: "border-l-primary",
    indicatorClass: "bg-primary shadow-[0_0_8px_var(--primary)]",
  },
};

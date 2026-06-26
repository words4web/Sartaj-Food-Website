"use client";

import { Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/utils/common/common.utils";
import { NotificationItemProps } from "@/types/notification/notification.types";
import { typeConfigs } from "./notification.config";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export function NotificationItem({
  notification,
  locale,
  onMarkRead,
  isLoading,
}: NotificationItemProps) {
  const router = useRouter();
  const type = notification?.type || "DEFAULT";
  const config = typeConfigs[type] || typeConfigs.DEFAULT;
  const Icon = config.icon;

  const title = notification?.title || "";
  const body = notification?.body || "";

  const handleClick = () => {
    if (!notification?.isRead && !isLoading) {
      onMarkRead(notification?._id);
    }

    const metadata = notification?.metadata || {};
    if (metadata?.orderId) {
      router.push(ROUTES.ORDERS(metadata?.orderId));
    } else if (metadata?.productId) {
      router.push(ROUTES.PRODUCTS(metadata?.productId));
    } else if (type?.startsWith("ORDER")) {
      router.push(ROUTES.ORDERS());
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full flex items-start gap-4 p-4 text-left transition-all duration-300 focus:outline-none rounded-xl relative overflow-hidden group border-b border-border/30 last:border-b-0",
        "border-l-4 border-l-transparent",
        !notification?.isRead ? cn(config.bgClass, config.borderClass) : "hover:bg-accent/40",
        isLoading && "opacity-60 cursor-not-allowed",
      )}
    >
      {/* Glow Effect on Hover for Unread */}
      {!notification?.isRead && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}

      {/* Icon Area */}
      <div className="shrink-0 relative">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
            notification?.isRead
              ? "bg-muted text-muted-foreground ring-4 ring-muted/20"
              : config.iconClass,
          )}
        >
          <Icon className={cn("h-5 w-5", type === "ORDER_PROCESSING" && "animate-spin")} />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p
            className={cn(
              "text-sm leading-snug line-clamp-1 transition-colors duration-200",
              notification?.isRead
                ? "font-medium text-foreground/80"
                : "font-semibold text-foreground group-hover:text-primary",
            )}
          >
            {title}
          </p>

          {/* Type Tag */}
          {type !== "DEFAULT" && (
            <span
              className={cn(
                "hidden sm:inline-block text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full select-none",
                notification?.isRead
                  ? "bg-muted text-muted-foreground/80"
                  : "bg-primary/10 text-primary dark:text-primary-foreground/90",
              )}
            >
              {type.replace("_", " ")}
            </span>
          )}
        </div>

        <p className="text-xs text-muted-foreground/90 line-clamp-2 leading-relaxed font-normal">
          {body}
        </p>

        {/* Time Stamp */}
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/60 pt-0.5">
          <Clock className="h-3 w-3" />
          <span>{formatDistanceToNow(new Date(notification?.createdAt), { addSuffix: true })}</span>
        </div>
      </div>

      {/* Unread dot */}
      {!notification?.isRead && (
        <span
          className={cn(
            "shrink-0 self-center h-2.5 w-2.5 rounded-full ring-4 ring-background transition-transform duration-300 group-hover:scale-125",
            config.indicatorClass,
          )}
        />
      )}
    </button>
  );
}

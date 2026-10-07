"use client";

import { Clock, Crown, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("notifications");
  const type = notification?.type || "DEFAULT";
  const config = typeConfigs[type] || typeConfigs.DEFAULT;
  const Icon = config.icon;

  const title = notification?.title || "";
  const body = notification?.body || "";
  const isVipNotification =
    type === "VIP_MEMBERSHIP_UNLOCKED" || notification?.metadata?.path === "/loyalty";

  const handleNavigate = () => {
    if (!notification?.isRead && !isLoading) {
      onMarkRead(notification?._id);
    }

    const metadata = notification?.metadata || {};
    if (isVipNotification) {
      router.push(ROUTES.LOYALTY);
    } else if (type === "WALLET_REWARD_CREDITED") {
      router.push(ROUTES.WALLET);
    } else if (metadata?.orderId) {
      router.push(ROUTES.ORDERS(metadata?.orderId));
    } else if (metadata?.productId) {
      router.push(ROUTES.PRODUCTS(metadata?.productId));
    } else if (type?.startsWith("ORDER")) {
      router.push(ROUTES.ORDERS());
    }
  };

  return (
    <div
      onClick={handleNavigate}
      className={cn(
        "w-full flex items-start gap-4 p-4 text-left transition-all duration-300 focus:outline-none rounded-xl relative overflow-hidden group border-b border-border/30 last:border-b-0 cursor-pointer",
        "border-l-4 border-l-transparent",
        !notification?.isRead ? cn(config.bgClass, config.borderClass) : "hover:bg-accent/40",
        isLoading && "opacity-60 cursor-not-allowed",
      )}
    >
      {!notification?.isRead && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}

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

      <div className="flex-1 min-w-0 space-y-2">
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

          {type !== "DEFAULT" && (
            <span
              className={cn(
                "hidden sm:inline-block text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full select-none",
                isVipNotification
                  ? "bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/20"
                  : notification?.isRead
                    ? "bg-muted text-muted-foreground/80"
                    : "bg-primary/10 text-primary dark:text-primary-foreground/90",
              )}
            >
              {isVipNotification ? "VIP PERK" : type?.replaceAll("_", " ")}
            </span>
          )}
        </div>

        <p className="text-xs text-muted-foreground/90 line-clamp-2 leading-relaxed font-normal">
          {body}
        </p>

        {isVipNotification && (
          <div className="pt-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigate();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-semibold shadow-sm transition-all hover:shadow hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Crown className="h-3.5 w-3.5" />
              <span>{t("viewLoyalty")}</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        )}

        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/60 pt-0.5">
          <Clock className="h-3 w-3" />
          <span>{formatDistanceToNow(new Date(notification?.createdAt), { addSuffix: true })}</span>
        </div>
      </div>

      {!notification?.isRead && (
        <span
          className={cn(
            "shrink-0 self-center h-2.5 w-2.5 rounded-full ring-4 ring-background transition-transform duration-300 group-hover:scale-125",
            config?.indicatorClass,
          )}
        />
      )}
    </div>
  );
}

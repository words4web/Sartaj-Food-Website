"use client";

import { Bell } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useGetUnreadCount } from "@/services/notification/notification.hooks";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/utils/common/common.utils";
import { NotificationBellProps } from "@/types/notification/notification.types";

export function NotificationBell({ className }: NotificationBellProps) {
  const { isAuthenticated } = useAuth();
  const unreadCount = useSelector((state: RootState) => state.notification.unreadCount);

  useGetUnreadCount(isAuthenticated);

  if (!isAuthenticated) return null;

  return (
    <Link
      href={ROUTES.NOTIFICATIONS}
      id="notification-bell"
      aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
      className={cn(
        "relative flex items-center justify-center h-9 w-9 rounded-full",
        "text-foreground hover:text-primary hover:bg-accent/60",
        "transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer",
        className,
      )}
    >
      <Bell className="h-5 w-5" />

      {/* Unread badge */}
      {unreadCount > 0 && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute -top-0.5 -right-0.5 flex items-center justify-center",
            "min-w-[16px] h-4 px-0.5 rounded-full",
            "bg-red-500 text-white text-[9px] font-extrabold leading-none",
            "ring-2 ring-background animate-in zoom-in duration-200",
          )}
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </Link>
  );
}

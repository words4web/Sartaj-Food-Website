"use client";

import { useState, useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/utils/common/common.utils";
import { BlockedPermissionBannerProps } from "@/types/notification/notification.types";
import { STORAGE_KEYS } from "@/constants/storage";

export function BlockedPermissionBanner({ className }: BlockedPermissionBannerProps) {
  const t = useTranslations("notifications");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show only if permission is denied AND the user hasn't dismissed it this session
    if (
      typeof window !== "undefined" &&
      Notification.permission === "denied" &&
      !sessionStorage.getItem(STORAGE_KEYS.NOTIF_BANNER_DISMISSED)
    ) {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem(STORAGE_KEYS.NOTIF_BANNER_DISMISSED, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 w-full px-4 py-3 rounded-xl",
        "bg-amber-50 border border-amber-200 text-amber-800",
        "dark:bg-amber-950/30 dark:border-amber-800/40 dark:text-amber-300",
        "animate-in slide-in-from-top-2 duration-300",
        className,
      )}
    >
      <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-snug">{t("notificationsBlockedTitle")}</p>
        <p className="text-xs mt-0.5 leading-relaxed opacity-80">{t("notificationsBlocked")}</p>
      </div>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss notification banner"
        className="shrink-0 p-0.5 rounded hover:opacity-70 transition-opacity"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

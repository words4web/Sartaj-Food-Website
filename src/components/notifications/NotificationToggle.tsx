"use client";

import { useState } from "react";
import { Bell, BellOff, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { Switch } from "@/components/ui/switch";
import { setPermissionStatus, setToggledOn } from "@/lib/store/notificationSlice";
import { cn } from "@/utils/common/common.utils";
import { NotificationToggleProps } from "@/types/notification/notification.types";
import { STORAGE_KEYS } from "@/constants/storage";

export function NotificationToggle({ className }: NotificationToggleProps) {
  const t = useTranslations("notifications");
  const dispatch = useDispatch();
  const { permissionStatus, isToggledOn } = useSelector((state: RootState) => state.notification);
  const [isBusy, setIsBusy] = useState(false);

  const isEnabled = permissionStatus === "granted" && isToggledOn;
  const isDenied = permissionStatus === "denied";
  const isUnsupported = permissionStatus === "unsupported";

  const handleEnable = async () => {
    setIsBusy(true);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED, "true");
      }

      if (typeof window !== "undefined" && "Notification" in window) {
        let permission = Notification.permission;
        if (permission === "default") {
          permission = await Notification.requestPermission();
        }

        dispatch(setPermissionStatus(permission));

        if (permission === "granted") {
          dispatch(setToggledOn(true));
        } else {
          if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED, "false");
          }
          dispatch(setToggledOn(false));
        }
      } else {
        dispatch(setPermissionStatus("unsupported"));
      }
    } catch (err) {
      console.error("[NotificationToggle] Enable error:", err);
    } finally {
      setIsBusy(false);
    }
  };

  const handleDisable = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED, "false");
    }
    dispatch(setToggledOn(false));
  };

  const handleToggle = (checked: boolean) => {
    if (checked) {
      handleEnable();
    } else {
      handleDisable();
    }
  };

  if (isUnsupported) {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border border-border/50 bg-muted/40 px-4 py-3",
          className,
        )}
      >
        <BellOff className="h-5 w-5 text-muted-foreground shrink-0" />
        <div>
          <p className="text-sm font-medium text-foreground">{t("enableNotifications")}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{t("unsupported")}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl border border-border/50 bg-card/60 px-4 py-4",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={cn(
              "h-9 w-9 shrink-0 rounded-full flex items-center justify-center",
              isEnabled ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground",
            )}
          >
            {isEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">{t("notifications")}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isDenied ? t("permissionDenied") : isEnabled ? t("enabledDesc") : t("disabledDesc")}
            </p>
          </div>
        </div>

        <Switch
          id="notification-toggle"
          checked={isEnabled}
          onCheckedChange={handleToggle}
          disabled={isDenied || isBusy}
          aria-label={isEnabled ? t("disableNotifications") : t("enableNotifications")}
        />
      </div>

      {/* Blocked state — guide user to browser settings */}
      {isDenied && (
        <div className="flex items-start gap-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 px-3 py-2.5">
          <Settings className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
            {t("notificationsBlocked")}
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { onForegroundMessage } from "@/lib/firebase";
import { incrementUnreadCount } from "@/lib/store/notificationSlice";
import { NOTIFICATION_QUERY_KEYS } from "@/services/notification/notification.hooks";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";

/**
 * Mounts a foreground FCM listener.
 * When the tab is active and a push arrives:
 *  1. Shows a sonner toast with title + body.
 *  2. Increments the Redux unread badge.
 *  3. Invalidates the notification list query so the panel refreshes.
 */
export function NotificationListener() {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations("notifications");

  useEffect(() => {
    if (!isAuthenticated) return;

    let unsubscribe: (() => void) | null = null;

    const subscribe = async () => {
      unsubscribe = await onForegroundMessage((payload) => {
        console.log("[NotificationListener] FCM payload received:", payload);
        const notification = payload?.notification ?? {};
        const data = payload?.data ?? {};
        const title = notification?.title ?? data?.title ?? t("fallbackTitle");
        const body = notification?.body ?? data?.body ?? t("fallbackBody");
        const orderId = data?.orderId;

        toast(title, {
          description: body,
          duration: 6000,
          action: orderId
            ? {
                label: "View Order",
                onClick: () => router.push(ROUTES.ORDERS(orderId)),
              }
            : undefined,
        });

        // Increment unread badge
        dispatch(incrementUnreadCount());

        // Refresh the notification list in the panel
        queryClient.invalidateQueries({
          queryKey: NOTIFICATION_QUERY_KEYS.all,
        });

        // Invalidate orders list queries to refresh order history
        queryClient.invalidateQueries({
          queryKey: ["orders"],
        });

        // Invalidate specific order details if orderId is present in notification payload
        if (orderId) {
          queryClient.invalidateQueries({
            queryKey: ["order", "detail", orderId],
          });
        }

        // Invalidate cart queries to sync cart item count/state
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });
      });
    };

    subscribe();

    return () => {
      unsubscribe?.();
    };
  }, [isAuthenticated, dispatch, queryClient, router]);

  return null;
}

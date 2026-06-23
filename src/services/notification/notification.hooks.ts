import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "./notification.service";
import { useDispatch } from "react-redux";
import { decrementUnreadCount, setUnreadCount } from "@/lib/store/notificationSlice";
import { toast } from "sonner";
import { SyncDevicePayload } from "@/types/notification/notification.types";

export const NOTIFICATION_QUERY_KEYS = {
  all: ["notifications"] as const,
  list: (page?: number, limit?: number) => ["notifications", "list", page, limit] as const,
  unreadCount: ["notifications", "unread-count"] as const,
};

// ── Queries

export const useGetNotifications = (params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: NOTIFICATION_QUERY_KEYS.list(params?.page, params?.limit),
    queryFn: async () => {
      const response = await notificationService.getNotifications(params);
      return response?.data;
    },
    staleTime: 30_000,
    retry: 1,
  });
};

export const useGetUnreadCount = (isAuthenticated: boolean) => {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: NOTIFICATION_QUERY_KEYS.unreadCount,
    queryFn: async () => {
      const response = await notificationService.getUnreadCount();
      const count = response?.data?.data?.count ?? 0;
      dispatch(setUnreadCount(count));
      return count;
    },
    enabled: isAuthenticated,
    staleTime: 60_000,
    refetchOnWindowFocus: true,
    retry: 1,
  });
};

// ── Mutations

export const useMarkNotificationAsRead = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationService.markAsRead(id),
    onSuccess: () => {
      dispatch(decrementUnreadCount());
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.all });
    },
    onError: () => {
      toast.error("Failed to mark notification as read.");
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: () => {
      dispatch(setUnreadCount(0));
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.all });
    },
    onError: () => {
      toast.error("Failed to mark all notifications as read.");
    },
  });
};

export const useSyncDevice = () => {
  return useMutation({
    mutationFn: (payload: SyncDevicePayload) => notificationService.syncDevice(payload),
  });
};

export const useRemoveDevice = () => {
  return useMutation({
    mutationFn: (fcmToken: string) => notificationService.removeDevice(fcmToken),
  });
};

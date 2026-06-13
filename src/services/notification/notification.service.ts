import axiosInstance from "@/lib/api/axios";
import { API_ROUTES } from "@/constants/api";
import { AxiosResponse } from "axios";
import {
  INotification,
  INotificationMeta,
  IUnreadCountResponse,
  SyncDevicePayload,
} from "@/types/notification/notification.types";

export const notificationService = {
  getNotifications: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<
    AxiosResponse<{ success: boolean; data: INotification[]; meta: INotificationMeta }>
  > => {
    return axiosInstance.get(API_ROUTES.NOTIFICATIONS.GET_ALL, { params });
  },

  getUnreadCount: async (): Promise<
    AxiosResponse<{ success: boolean; data: IUnreadCountResponse }>
  > => {
    return axiosInstance.get(API_ROUTES.NOTIFICATIONS.GET_UNREAD_COUNT);
  },

  markAsRead: async (
    id: string,
  ): Promise<AxiosResponse<{ success: boolean; data: INotification }>> => {
    return axiosInstance.patch(API_ROUTES.NOTIFICATIONS.MARK_READ(id));
  },

  markAllAsRead: async (): Promise<AxiosResponse<{ success: boolean }>> => {
    return axiosInstance.patch(API_ROUTES.NOTIFICATIONS.MARK_ALL_READ);
  },

  syncDevice: async (payload: SyncDevicePayload): Promise<AxiosResponse<{ success: boolean }>> => {
    return axiosInstance.post(API_ROUTES.NOTIFICATIONS.DEVICES.SYNC, payload);
  },

  removeDevice: async (fcmToken: string): Promise<AxiosResponse<{ success: boolean }>> => {
    return axiosInstance.post(API_ROUTES.NOTIFICATIONS.DEVICES.REMOVE, { fcmToken });
  },
};

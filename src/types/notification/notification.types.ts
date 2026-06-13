export interface INotification {
  _id: string;
  type: string;
  title: string;
  body: string;
  isRead: boolean;
  metadata?: {
    orderId?: string;
    displayId?: string;
    [key: string]: string | undefined;
  };
  createdAt: string;
  updatedAt?: string;
}

export interface INotificationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface INotificationListResponse {
  data: INotification[];
  meta: INotificationMeta;
}

export interface IUnreadCountResponse {
  count: number;
}

export interface INotificationState {
  unreadCount: number;
  fcmToken: string | null;
  permissionStatus: "default" | "granted" | "denied" | "unsupported";
  isToggledOn: boolean;
}

export interface NotificationBellProps {
  className?: string;
}

export interface NotificationItemProps {
  notification: INotification;
  locale: string;
  onMarkRead: (id: string) => void;
  isLoading?: boolean;
}

export interface NotificationPanelProps {
  onClose?: () => void;
}

export interface NotificationToggleProps {
  className?: string;
}

export interface BlockedPermissionBannerProps {
  className?: string;
}

export interface SyncDevicePayload {
  fcmToken: string;
  platform: "web";
  language?: string;
}

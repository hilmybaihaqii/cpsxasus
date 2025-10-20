// types/notification.ts
export type NotificationType = "motion" | "lamp_on" | "lamp_off" | "system";

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  time: string;
  isRead: boolean;
  filterKey?: string;
}

export interface NotificationSection {
  title: string;
  data: NotificationItem[];
}
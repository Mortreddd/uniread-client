import api from "@/core/api/ApiService";
import {
  Notification,
  NotificationFilter,
  TotalUnreadNotification,
} from "../types/Notification";
import { Paginate } from "../types/Pagination";

export const getUserNotifications: (
  params: NotificationFilter,
) => Promise<Paginate<Notification[]>> = async ({ ...params }) => {
  const response = await api.get<Paginate<Notification[]>>("/notifications", {
    params,
  });

  return response.data;
};

export const getTotalUnreadNotification: () => Promise<TotalUnreadNotification> =
  async () => {
    const response = await api.get<TotalUnreadNotification>(
      "/notifications/unread-count",
    );

    return response.data;
  };

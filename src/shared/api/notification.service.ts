import api from "@/core/api/ApiService";
import {
  Notification,
  NotificationFilter,
  TotalUnreadNotification,
} from "../types/Notification";
import { Paginate } from "../types/Pagination";
import { AxiosResponse } from "axios";

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

export const markReadNotification: () => Promise<AxiosResponse> = async () => {
  const response = await api.post("/notifications/read");
  return response.data;
};

export const clickedNotification: ({
  notificationId,
}: {
  notificationId: string;
}) => Promise<AxiosResponse> = async ({
  notificationId,
}: {
  notificationId: string;
}) => {
  const response = await api.put(`/notifications/${notificationId}/clicked`);

  return response.data;
};

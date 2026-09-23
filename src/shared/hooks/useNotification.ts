import { useQuery } from "@tanstack/react-query";
import { NotificationFilter } from "../types/Notification";
import {
  getTotalUnreadNotification,
  getUserNotifications,
} from "../api/notification.service";

export function useGetUserNotifications(params: NotificationFilter) {
  return useQuery({
    queryKey: ["userNotifs", params],
    queryFn: () => getUserNotifications(params),
    enabled: !!params,
    staleTime: 0,
  });
}

export function useGetTotalUnreadNotifications() {
  return useQuery({
    queryKey: ["totalUnreadNotifications"],
    queryFn: getTotalUnreadNotification,
  });
}

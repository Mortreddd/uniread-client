import { useMutation, useQuery } from "@tanstack/react-query";
import { NotificationFilter } from "../types/Notification";
import {
  clickedNotification,
  getTotalUnreadNotification,
  getUserNotifications,
  markReadNotification,
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
    staleTime: 0,
  });
}

export function useMarkReadNotification() {
  return useMutation({
    mutationFn: markReadNotification,
  });
}

export function useClickedNotification({
  notificationId,
}: {
  notificationId: string;
}) {
  return useMutation({
    mutationFn: () => clickedNotification({ notificationId }),
  });
}

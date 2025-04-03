import { Notification } from "@/types/Notification";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";
import SockJS from "sockjs-client";
import { Message, over } from "stompjs";
import { AlertType, useAlert } from "./AlertContext";
import useGetUserNotifications from "@/api/notification/useGetUserNotifications";
import { useAuth } from "./AuthContext";

interface NotificationContextProps {
  showNotification: (message: Notification, type: AlertType) => void;
  hideNotification: () => void;
  unreadNotifications: Notification[];
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }

  return context;
}

interface NotificationProviderProps extends PropsWithChildren {}

function NotificationProvider({ children }: NotificationProviderProps) {
  const baseUrl = import.meta.env.VITE_WEBSOCKET_URL as string;
  const socket = SockJS(`${baseUrl}/notifications`);
  const stompClient = over(socket);
  const { showAlert } = useAlert();
  const { user: currentUser } = useAuth();
  const { data } = useGetUserNotifications({
    userId: currentUser?.id,
    pageNo: 0,
    pageSize: 10,
  });
  const unreadNotifications: Notification[] = useMemo(() => {
    if (!data?.content) return [];

    return data.content.filter((notification) => !notification.isRead);
  }, [data]);

  console.log(unreadNotifications);
  useEffect(() => {
    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/notifications", (message: Message) => {
        const notif: Notification = JSON.parse(message.body);
        showNotification(notif, "info");
        console.log("Received notification:", notif);
      });
    });

    return function () {
      if (stompClient.connected) {
        stompClient.disconnect(() => {
          console.log("Notification Disconnected");
          showAlert("Notification Disconnected", "error");
        });
      }
    };
  }, []);

  function showNotification(
    notification: Notification,
    type: AlertType = "info"
  ) {
    showAlert(notification?.description ?? "New Notification", type);
  }

  function hideNotification() {}

  return (
    <NotificationContext.Provider
      value={{ showNotification, hideNotification, unreadNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export { NotificationProvider, useNotification };

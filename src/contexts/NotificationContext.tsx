import { Notification } from "@/types/Notification";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import SockJS from "sockjs-client";
import { Message, over } from "stompjs";
import { AlertType, useAlert } from "./AlertContext";

interface NotificationContextProps {
  showNotification: (message: Notification, type: AlertType) => void;
  hideNotification: () => void;
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
      value={{ showNotification, hideNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export { NotificationProvider, useNotification };

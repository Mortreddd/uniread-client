import { Notification } from "@/types/Notification";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
} from "react";
import SockJS from "sockjs-client";
import { Client, Message, over } from "stompjs";
import { AlertType } from "./AlertContext";
import { useAuth } from "./AuthContext";
import { useToast } from "@/contexts/ToastContext.tsx";

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
  const stompClientRef = useRef<Client | null>(null);
  // Get the current user and login status from the AuthContext
  // This is used to determine if the user is logged in and to fetch their notifications
  const { isLoggedIn, accessToken } = useAuth();
  // Get the base URL from environment variables
  // This is used to connect to the WebSocket server for notifications
  const baseUrl = import.meta.env.VITE_API_URL as string;
  const webSocketUrl = `${baseUrl}/ws`;

  const { showToast } = useToast();

  useEffect(() => {
    if (!isLoggedIn() || !accessToken) return;

    // Create a SockJS connection to the notifications endpoint
    // This allows us to receive real-time notifications from the server
    const socket = SockJS(
      `${webSocketUrl}/notifications?access_token=${accessToken}`
    );
    // Create a STOMP client over the SockJS connection
    // STOMP is a simple text-based protocol for messaging
    const client = over(socket);
    stompClientRef.current = client;

    client.connect({}, () => {
      client.subscribe("/user/queue/notifications", (message: Message) => {
        const notif: Notification = JSON.parse(message.body);
        showNotification(notif, "info");
        console.log("Received notification:", notif);
      });
    });

    return function () {
      if (stompClientRef.current?.connected) {
        stompClientRef.current.disconnect(() => {
          console.log("Notification Disconnected");
          showToast("Notification Disconnected", "error");
        });
      }
    };
  }, []);

  function showNotification(
    notification: Notification,
    type: AlertType = "info"
  ) {
    showToast(notification?.description ?? "New Notification", type);
  }

  function hideNotification() {}

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        hideNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export { NotificationProvider, useNotification };

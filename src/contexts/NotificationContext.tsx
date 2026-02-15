import { Notification } from "@/types/Notification";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { Message } from "stompjs";
import { AlertType } from "./AlertContext";
import { useAuth } from "./AuthContext";
import { useToast } from "@/contexts/ToastContext.tsx";
import { useWebSocket } from "@/hooks/useWebsocket";

interface NotificationContextProps {
  showNotification: (message: Notification, type: AlertType) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined,
);

function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }

  return context;
}

interface NotificationProviderProps extends PropsWithChildren {}

function NotificationProvider({ children }: NotificationProviderProps) {
  // const { connected, subscribe } = useWebSocket({
  //   accessToken,
  //   onConnect: () => {},
  //   onClose: () => {},
  // });

  const { showToast } = useToast();

  // useEffect(() => {
  //   if (!connected) return;

  //   const sub1 = subscribe("/user/queue/notifications", (message: Message) => {
  //     const notif = JSON.parse(message.body) as Notification;
  //     showNotification(notif, "info");
  //     console.log("Received notification:", notif);
  //   });

  //   return () => {
  //     console.log("Unsubscribing from notifications...");
  //     sub1?.unsubscribe();
  //   };
  // }, []);

  function showNotification(
    notification: Notification,
    type: AlertType = "info",
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

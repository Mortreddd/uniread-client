import {
  useGetTotalUnreadNotifications,
  useGetUserNotifications,
} from "@/shared/hooks/useNotification";
import { Notification } from "@/shared/types/Notification";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface NotificationStreamContextProps {
  notificationCount: number;
  resetCountNotification: () => void;
  readNotification: (notificationId: string) => void;
}

const NotificationStreamContext = createContext<
  NotificationStreamContextProps | undefined
>(undefined);

export function useNotificationStream() {
  const context = useContext(NotificationStreamContext);

  if (!context) {
    throw new Error("The context must be within NotificationStreamProvider");
  }

  return context;
}

export default function NotificationStreamProvider({
  children,
}: PropsWithChildren) {
  const apiUrl = import.meta.env.VITE_API_URL as string;
  const [notificationCount, setNotificationCount] = useState(0);
  const { data } = useGetTotalUnreadNotifications();

  useEffect(() => {
    if (data) {
      setNotificationCount(data.totalUnreadNotifications);
    }
  }, [data]);

  useEffect(() => {
    const source = new EventSource(`${apiUrl}/notifications/stream`);

    source.addEventListener("notification", (event) => {
      const notification = JSON.parse(event.data) as Notification;

      console.log(notification);
      setNotificationCount(notificationCount + 1);
    });
  }, []);

  function resetCountNotification() {
    // TODO: Create the pai call

    setNotificationCount(0);
  }

  function readNotification(notificationId: string) {
    // TODO: Create the api call

    setNotificationCount(notificationCount - 1);
  }

  const memoizedValue = useMemo(
    () => ({ notificationCount, resetCountNotification, readNotification }),
    [notificationCount, resetCountNotification, readNotification],
  );

  return (
    <NotificationStreamContext.Provider value={memoizedValue}>
      {children}
    </NotificationStreamContext.Provider>
  );
}

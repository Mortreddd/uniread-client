import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import { useWebSocket } from "@/hooks/useWebsocket";
import { ChatConversationPreview } from "@/features/chats/types/Chat";
import { WebSocketEvent } from "@/types/WebSocketEvent";
import { useUnreadMessageCount } from "@/shared/hooks/useCount";

interface RealtimeContextProps {
  unreadMessagesCount: number;
  resetConversation: (conversation: ChatConversationPreview) => void;
  unreadNotificationsCount: number;
}

const RealtimeContext = createContext<RealtimeContextProps | undefined>(
  undefined,
);

export function useRealtime() {
  const realtimeContext = useContext(RealtimeContext);
  if (!realtimeContext) {
    throw new Error("Realtime Context must be within Realtime Provider");
  }

  return realtimeContext;
}

export function RealtimeProvider({ children }: PropsWithChildren) {
  const { data: unreadCount = 0 } = useUnreadMessageCount();
  const { user } = useAuth();

  const { subscribe } = useWebSocket({});
  const [unreadMessagesCount, setUnreadMessagesCount] =
    useState<number>(unreadCount);
  const [unreadNotificationsCount, setUnreadNotificationsCount] =
    useState<number>(0);

  useEffect(() => {
    setUnreadMessagesCount(unreadCount);
  }, [unreadCount]);

  useEffect(() => {
    if (!user) return;

    const messageSubscription = subscribe(
      `/user/${user.id}/queue/chats`,
      (msg) => {
        const parsed: WebSocketEvent<ChatConversationPreview> = JSON.parse(
          msg.body,
        );

        if (parsed && parsed.type === "CHAT_UPDATED") {
          const convo = parsed.data;
          setUnreadMessagesCount(convo.unreadCount + 1);
        }
      },
    );

    return () => {
      messageSubscription?.unsubscribe();
    };
  }, [user, subscribe]);

  function resetConversation(conversation: ChatConversationPreview) {
    if (!conversation) return;

    const result = unreadMessagesCount - conversation.unreadCount;

    setUnreadMessagesCount(result);
  }

  const memoizedValues = useMemo(() => {
    return { unreadMessagesCount, unreadNotificationsCount, resetConversation };
  }, [unreadMessagesCount, unreadNotificationsCount, resetConversation]);

  return (
    <RealtimeContext.Provider value={memoizedValues}>
      {children}
    </RealtimeContext.Provider>
  );
}

import { ChatConversationPreview } from "@/features/chats/types/Chat";
import { useWebSocket } from "@/hooks/useWebsocket";
import { WebSocketEvent } from "@/shared/types/WebSocketEvent";
import { useEffect, useState } from "react";

interface WebSocketListenerProps {
  userId: string;
}

export default function useWebSocketListener({
  userId,
}: WebSocketListenerProps) {
  const { subscribe } = useWebSocket({});
  const [unreadMessageCount, setUnreadMessageCount] = useState<number>(0);

  useEffect(() => {
    if (!userId) return;

    const subscription = subscribe(`/user/${userId}/queue/chats`, (msg) => {
      const event: WebSocketEvent<ChatConversationPreview> = JSON.parse(
        msg.body,
      );

      if (event.type === "CHAT_UPDATED") {
        setUnreadMessageCount((prevCount) => prevCount + 1);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);
}

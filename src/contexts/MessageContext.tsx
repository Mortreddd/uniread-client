import { ChatConversationPreview } from "@/features/chats/types/Chat.ts";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useWebSocket } from "@/hooks/useWebsocket";
import { useToast } from "./ToastContext";
import { useGetConversations } from "@/features/chats/hooks/useGetConversations";
import { useQueryClient } from "@tanstack/react-query";
import { Paginate } from "@/types/Pagination";

interface MessageContextProps {
  conversations: ChatConversationPreview[];
  unreadCount: number;
}

const MessageContext = createContext<MessageContextProps | undefined>(
  undefined,
);

/**
 * Utility function to access the context of Message Context
 */
function useMessage() {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
}

interface MessageProviderProps extends PropsWithChildren {}

/**
 * Message Wrapper for the whole component
 * @param children
 * @constructor
 */
function MessageProvider({ children }: MessageProviderProps) {
  const { data } = useGetConversations({
    pageNo: 0,
    pageSize: 10,
  });

  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const conversations = useMemo(() => {
    if (!data?.content) return [];
    return data.content;
  }, [data]);

  const unreadCount = useMemo(() => {
    return conversations.reduce(
      (acc, conv) => acc + (conv.unreadCount ?? 0),
      0,
    );
  }, [conversations]);

  const { connected, subscribe } = useWebSocket({
    onConnect: () => showToast("Connected", "success"),
    onClose: () => showToast("Disconnected", "error"),
  });

  useEffect(() => {
    if (!connected) return;

    const sub = subscribe("/user/queue/chats", (msg) => {
      const incoming = JSON.parse(msg.body) as ChatConversationPreview;

      queryClient.setQueriesData(
        { queryKey: ["conversations"] },
        (old: Paginate<ChatConversationPreview[]>) => {
          if (!old?.content) return old;

          const index = old.content.findIndex(
            (c) => c.conversationId === incoming.conversationId,
          );

          let updatedContent;

          if (index !== -1) {
            const updated = {
              ...old.content[index],
              ...incoming,
              unreadCount: (old.content[index].unreadCount || 0) + 1,
            };

            updatedContent = [
              updated,
              ...old.content.filter((_, i) => i !== index),
            ];
          } else {
            updatedContent = [incoming, ...old.content];
          }

          return {
            ...old,
            content: updatedContent,
          };
        },
      );
    });

    return () => sub?.unsubscribe();
  }, [connected, subscribe, queryClient]);
  return (
    <MessageContext.Provider
      value={{
        conversations,
        unreadCount,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
export { MessageProvider, useMessage };

import {
  Message as MessageType,
  ConversationDetail,
  Participant,
  ReaderParticipant,
} from "@/types/Message";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWebSocket } from "@/hooks/useWebsocket";
import { useToast } from "./ToastContext";
import { IMessage } from "@stomp/stompjs";
import useGetUserConversations from "@/api/messages/useGetUserConversations";
interface FriendMessagePayload {
  receiverId: string;
  message: string;
}

interface GroupMessagePayload {
  conversationId: string;
  message: string;
}

interface ConversationMessagePayload {
  conversationId: string;
  message: string;
}

interface MessageContextProps {
  conversations: ConversationDetail[];
  setConversations: Dispatch<SetStateAction<ConversationDetail[]>>;
  sendGroupMessage: (payload: GroupMessagePayload) => void;
  sendFriendMessage: (payload: FriendMessagePayload) => void;
  sendConversationMessage: (payload: ConversationMessagePayload) => void;
  messages: MessageType[];
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
  unreadCount: number;
  markConversationAsRead: (conversationId: string) => void;
  activeConversation: ConversationDetail | null;
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
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [conversations, setConversations] = useState<ConversationDetail[]>([]);
  const { showToast } = useToast();
  const [unreadCount, setUnreadCount] = useState(0);

  const { data } = useGetUserConversations({ pageNo: 0, pageSize: 20 });
  const calculateUnreadCount = useCallback((convos: ConversationDetail[]) => {
    if (!convos) return 0;

    const count = convos.reduce((acc, conv) => acc + conv.unreadCount, 0);
    setUnreadCount(count);
  }, []);

  const [activeConversation, setActiveConversation] =
    useState<ConversationDetail | null>(null);

  useEffect(() => {
    if (data?.content) {
      setConversations(data.content);
      calculateUnreadCount(data.content);
    }
  }, [data]);

  const { connected, subscribe, publish } = useWebSocket({
    onConnect: () => showToast("Connected", "success"),
    onClose: () => showToast("Disconnected", "error"),
  });

  useEffect(() => {
    if (!connected) return;
    const sub1 = subscribe(
      "/user/queue/chat-notifications",
      (message: IMessage) => {
        const receivedConversation = JSON.parse(
          message.body,
        ) as ConversationDetail;
        setConversations((prev) => {
          const filtered = prev.filter(
            (conv) =>
              conv.conversationId !== receivedConversation.conversationId,
          );

          const convos = [receivedConversation, ...filtered];
          calculateUnreadCount(convos);
          return convos;
        });
      },
    );

    return () => {
      sub1?.unsubscribe();
    };
  }, [connected, subscribe]);

  const sendFriendMessage = useCallback(
    (payload: FriendMessagePayload) => {
      if (!connected) return;
      publish({
        destination: "/app/chat/message",
        body: payload,
      });
    },
    [connected, publish],
  );

  const sendGroupMessage = useCallback(
    (payload: GroupMessagePayload) => {
      if (!connected) return;
      publish({
        destination: "/app/chat/group",
        body: payload,
      });
    },
    [connected, publish],
  );

  const sendConversationMessage = useCallback(
    (payload: ConversationMessagePayload) => {
      if (!connected) return;

      publish({
        destination: `/app/chat.${payload.conversationId}.new`,
        body: payload,
      });
    },
    [connected, publish],
  );

  function markConversationAsRead(conversationId: string) {
    if (!connected) return;

    const subMapping = subscribe(`/app/chat.${conversationId}`, (message) => {
      // Optional: Handle the unread messages list returned by the server here
      console.log("Subscribed to mapping and received unread messages");
    });

    const active = conversations.find(
      (convo) => convo.conversationId === conversationId,
    );
    setActiveConversation(active || null);

    setConversations((prev) => {
      const updated = prev.map((conv) =>
        conv.conversationId === conversationId
          ? { ...conv, unreadCount: 0, hasNewMessage: false }
          : conv,
      );
      calculateUnreadCount(updated);
      return updated;
    });

    return () => subMapping?.unsubscribe();
  }

  return (
    <MessageContext.Provider
      value={{
        unreadCount,
        markConversationAsRead,
        conversations,
        setConversations,
        sendFriendMessage,
        sendGroupMessage,
        sendConversationMessage,
        messages,
        setMessages,
        activeConversation,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
export { MessageProvider, useMessage };

import { Message as MessageType } from "@/types/Message";
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
import { Message } from "stompjs";
import { useAuth } from "@/contexts/AuthContext.tsx";
import { useWebSocket } from "@/hooks/useWebsocket";

interface MessageContextProps {
  messages: MessageType[];
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
  sendMessage: (message: SendMessageProps) => void;
}

interface SendMessageProps {
  conversationId?: string;
  receiverIds: string[];
  isGroup: boolean;
  message: string;
}

const MessageContext = createContext<MessageContextProps | undefined>(
  undefined
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
  const { accessToken, user } = useAuth();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { client, subscribe } = useWebSocket(accessToken);

  // Handle incoming messages
  useEffect(() => {
    if (!user?.id) return;

    const sub = subscribe(`/user/queue/messages`, (message: Message) => {
      console.log("Received message:", message);
      try {
        const newMessage = JSON.parse(message.body) as MessageType;
        setMessages((prev) =>
          prev.some((msg) => msg.id === newMessage.id)
            ? prev
            : [newMessage, ...prev]
        );
      } catch (e) {
        console.error("Error parsing message:", e);
      }
    });

    return () => {
      sub?.unsubscribe();
    };
  }, [subscribe, user?.id]);

  const sendMessage = useCallback(
    (message: SendMessageProps) => {
      if (client?.connected) {
        console.log("Sending message:", message);
        client.send("/app/messages/send", {}, JSON.stringify(message));
      } else {
        console.error("Cannot send message - STOMP not connected");
        // Optionally implement a message queue to send when reconnected
      }
    },
    [client]
  );

  return (
    <MessageContext.Provider value={{ messages, setMessages, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
}
export { MessageProvider, useMessage };

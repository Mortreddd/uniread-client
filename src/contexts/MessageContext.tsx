import { Message as MessageType } from "@/types/Message";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Client, Message, over } from "stompjs";
import { useAuth } from "@/contexts/AuthContext.tsx";
import SockJS from "sockjs-client";
import {useToast} from "@/contexts/ToastContext.tsx";

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
  const baseUrl = import.meta.env.VITE_API_URL as string;
  const stompClientRef = useRef<Client | null>(null);
  const { isLoggedIn, accessToken } = useAuth();
  const { showToast } = useToast();
  const [messages, setMessages] = useState<MessageType[]>([]);

  const connect = useCallback(() => {
    if (!isLoggedIn() || !accessToken) return;

    const socket = new SockJS(
      `${baseUrl}/ws/messages?access_token=${accessToken}`
    );
    const client = over(socket);
    console.log("Access Token:", accessToken);
    client.connect(
      {},
      () => {
        console.log("STOMP connected");
        stompClientRef.current = client;

        // Subscribe to private queue
        client.subscribe("/user/queue/messages", (message: Message) => {
          console.log("Received message:", message);
          const newMessage = JSON.parse(message.body) as MessageType;
          showToast(newMessage.message, 'info')
          setMessages((prev) =>
              prev.some((msg) => msg.id === newMessage.id) ? prev : [newMessage, ...prev]
          );
        });
      },
      (error) => {
        console.error("Connection error:", error);
        setTimeout(connect, 5000); // Reconnect after 5 seconds
      }
    );
  }, [isLoggedIn, accessToken, baseUrl, showToast]);

  /**
   * Listening to incoming messages using subscribe function of stomp
   */
  useEffect(() => {
    connect();
    return () => {
      if (stompClientRef.current?.connected) {
        stompClientRef.current.disconnect(() => {});
      }
    };
  }, [connect]);

  /**
   * Sends a message to a server
   * @param message
   */
  const sendMessage = useCallback(
    (message: SendMessageProps) => {
      const stompClient = stompClientRef.current;
      if (stompClient?.connected) {
        console.log("Sending message:", message);
        stompClient.send("/app/messages/send", {}, JSON.stringify(message));
      }
    },
    [stompClientRef]
  );

  console.log("messages from Message Context ", messages);

  return (
    <MessageContext.Provider value={{ messages, setMessages, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

export { MessageProvider, useMessage };

import { Message as MessageType } from "@/types/Message";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SockJS from "sockjs-client";

import { Client, Message, over } from "stompjs";
import { useAuth } from "@/contexts/AuthContext.tsx";

interface MessageContextProps {
  messages: MessageType[];
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
  sendMessage: (message: SendMessageProps) => void;
}

interface SendMessageProps {
  conversationId: string | undefined;
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
  const [messages, setMessages] = useState<MessageType[]>([]);

  /**
   * Sends a message to a server
   * @param message
   */
  function sendMessage(message: SendMessageProps) {
    const stompClient = stompClientRef.current;
    if (stompClient?.connected) {
      stompClient.send("/app/messages/send", {}, JSON.stringify(message));
    }
  }

  /**
   * Listening to incoming messages using subscribe function of stomp
   */
  useEffect(() => {
    if (!isLoggedIn() || !accessToken) return;

    const socket = new SockJS(
      `${baseUrl}/messages?access_token=${accessToken}`
    );
    const client = over(socket);
    stompClientRef.current = client;

    client.connect({}, () => {
      console.log("STOMP connected");
      // Subscribe to user's private queue for all messages
      client.subscribe("/user/queue/messages", (message: Message) => {
        const newMessage = JSON.parse(message.body) as MessageType;
        setMessages((prevMessages) => {
          // Only add the message if it's not already in the list
          if (!prevMessages.some((msg) => msg.id === newMessage.id)) {
            return [newMessage, ...prevMessages];
          }
          return prevMessages;
        });
      });
    });

    return () => {
      if (stompClientRef.current?.connected) {
        stompClientRef.current.disconnect(() => {
          console.log("Disconnected from Websocket");
        });
      }
    };
  }, [isLoggedIn, baseUrl, accessToken]);

  return (
    <MessageContext.Provider value={{ messages, setMessages, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

export { MessageProvider, useMessage };

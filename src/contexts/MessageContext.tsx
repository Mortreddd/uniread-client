import { Message as MessageType } from "@/types/Message";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import SockJS from "sockjs-client";

import { Message, over } from "stompjs";
import {useAuth} from "@/contexts/AuthContext.tsx";

interface MessageContextProps {
  messages: MessageType[] | string[];
  sendMessage: (message: SendMessageProps) => void;
}

interface SendMessageProps {
  conversationId: string;
  senderId: string;
  message: string;
}

const MessageContext = createContext<MessageContextProps | undefined>(
  undefined
);

function useMessage() {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
}

interface MessageProviderProps extends PropsWithChildren {}

function MessageProvider({ children }: MessageProviderProps) {
  const baseUrl = import.meta.env.VITE_WEBSOCKET_URL as string;
  const { isLoggedIn } = useAuth();
  const socket = new SockJS(`${baseUrl}/messages`);
  const stompClient = over(socket);
  const [messages, setMessages] = useState<string[]>([
    "Hello",
    "Kamusta kana?",
    "Kamusta na pakiramdam mo?",
    "Andyan ka pa ba?",
    "Kamusta na ang buhay mo?",
  ]);
  useEffect(() => {
    if(!isLoggedIn()) return;
    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/messages", (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message.body]);
      });
    });

    return () => {
      if (stompClient.connected) {
        stompClient.disconnect(() => {
          console.log("Disconnected");
        });
      }
    };
  }, [messages]);

  const contextValue = useMemo(
    () => ({ messages, sendMessage }),
    [messages, sendMessage]
  );

  function sendMessage(message: SendMessageProps) {
    if (stompClient.connected) {
      stompClient.send(
        "/messages/send",
        { "Content-Type": "application/json" },
        JSON.stringify(message)
      );
    }
  }

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  );
}

export { MessageProvider, useMessage };

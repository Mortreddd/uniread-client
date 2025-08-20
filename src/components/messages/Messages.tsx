import Message from "./Message";
import { useAuth } from "@/contexts/AuthContext.tsx";
import useGetConversationMessages from "@/api/messages/useGetConversationMessages.tsx";
import { useParams } from "react-router-dom";
import { useMessage } from "@/contexts/MessageContext.tsx";
import { useEffect, useRef, useState } from "react";
import { PaginateParams } from "@/types/Pagination.ts";

export default function Messages() {
  const { user: currentUser } = useAuth();
  const { conversationId } = useParams<{ conversationId: string }>();
  const [{ pageNo, pageSize }] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
  });

  const { messages, setMessages } = useMessage();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { data } = useGetConversationMessages({
    conversationId,
    pageNo,
    pageSize,
  });

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-scroll to bottom when component first loads
  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    if(data?.content) {
      setMessages(data?.content || []);
    }
  }, [data, setMessages]);

  return (
      <div className="w-full h-full overflow-y-auto" ref={messagesContainerRef}>
        {messages.length > 0 ? (
            <div className="flex flex-col-reverse w-full gap-3 h-fit min-h-full">
              {messages.map(({ id, sender, message }) => (
                  <div
                      key={id}
                      className={`w-full flex ${
                          sender.id !== currentUser?.id ? "justify-start" : "justify-end"
                      }`}
                  >
                    <Message message={message} />
                  </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
        ) : (
            <div className="flex w-full h-full items-center justify-center">
              <h1 className="text-xl font-sans text-gray-800 font-bold">
                Start a new conversation
              </h1>
            </div>
        )}
      </div>
  );
}
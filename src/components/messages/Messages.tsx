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
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data } = useGetConversationMessages({
    conversationId,
    userId: currentUser?.id,
    pageNo,
    pageSize,
  });

  useEffect(() => {
    // Only update messages if conversationId exists and data is available
    if (conversationId && data) {
      setMessages(data.content);
    }
  }, [conversationId, data, setMessages]);

  useEffect(() => {
    // Scroll to bottom when messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={"w-full h-fit"}>
      {messages.length > 0 ? (
        <div className="gap-2 flex flex-col-reverse w-full h-full overflow-y-auto">
          {messages.map(({ id, sender, message }) =>
            sender.id !== currentUser?.id ? (
              <div className={"w-full justify-start flex"} key={id}>
                <Message message={message} />
              </div>
            ) : (
              <div className={"w-full justify-end flex"} key={id}>
                <Message message={message} />
              </div>
            )
          )}
        </div>
      ) : (
        <div className={"flex w-full h-full items-center justify-center"}>
          <h1 className={"text-xl font-sans text-gray-800 font-bold"}>
            Start a new conversation
          </h1>
        </div>
      )}
      <div ref={bottomRef}></div>
    </div>
  );
}

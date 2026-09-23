import { useIsVisible } from "@/shared/hooks/useIsVisible";
import { PaginateParams } from "@/shared/types/Pagination";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetConversationMessages } from "../hooks/useGetConversationMessages";
import { useWebSocket } from "@/hooks/useWebsocket";
import { AnimatePresence } from "motion/react";
import { Message } from "../types/Chat";
import TimeIndicator from "./TimeIndicator";
import ConvoMessage from "./ConvoMessage";
import ShowTyping from "./ShowTyping";
import { WebSocketEvent } from "@/shared/types/WebSocketEvent";

export default function ChatMessages() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const isActiveReader = useIsVisible(bottomRef);
  const { conversationId } = useParams<{ conversationId: string }>();
  const [params, setParams] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 20,
  });
  const { data, isLoading, error } = useGetConversationMessages({
    conversationId,
    ...params,
  });

  const messages = useMemo(() => {
    if (!data || data.empty || !data.content) return [];
    return data.content.reverse();
  }, [data]);

  const [loadedMessages, setLoadedMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!bottomRef.current) return;

    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [bottomRef.current]);

  useEffect(() => {
    if (!isActiveReader) return;

    setParams({ ...params, pageSize: params.pageSize ?? 0 + 20 });
  }, [isActiveReader]);
  useEffect(() => {
    setLoadedMessages(messages);
  }, [messages]);

  const { subscribe } = useWebSocket({});

  useEffect(() => {
    if (!conversationId) return;

    const sub = subscribe(`/topic/chats.${conversationId}`, (msg) => {
      const parsed: WebSocketEvent<Message> = JSON.parse(msg.body);

      if (parsed.type !== "MESSAGE_RECEIVED") return;

      const message = parsed.data;
      if (!message.message?.trim()) return;

      setLoadedMessages((prev) => {
        const exists = prev.some((m) => m.id === message.id);
        if (exists) return prev;

        return [...prev, message];
      });
    });

    return () => {
      sub?.unsubscribe();
    };
  }, [conversationId, subscribe]);

  return (
    <AnimatePresence>
      <div className="flex-1 w-full flex flex-col min-h-0">
        {isLoading && <LoadingSection />}
        {!loadedMessages && error && <ErrorSection />}
        {loadedMessages && loadedMessages.length <= 0 && <EmptySection />}
        <div className="flex-1 flex flex-col p-2 justify-end gap-y-2 overflow-y-auto min-h-0">
          {loadedMessages.map((message, index) => {
            const previousMessage = loadedMessages[index - 1];

            const currentTime = new Date(message.createdAt).getTime();

            const previousTime = previousMessage
              ? new Date(previousMessage.createdAt).getTime()
              : null;

            const showTimeIndicator =
              !previousTime || currentTime - previousTime >= 60 * 60 * 1000;

            return (
              <div key={message.id}>
                {showTimeIndicator && <TimeIndicator message={message} />}

                <ConvoMessage message={message} />
              </div>
            );
          })}

          <div ref={bottomRef} className="hidden" />
        </div>
        <ShowTyping />
      </div>
    </AnimatePresence>
  );
}

function LoadingSection() {
  return (
    <div className="flex-1 animate-pulse bg-gray-200 dark:bg-slate-800"></div>
  );
}

function ErrorSection() {
  return (
    <div className="flex-1 bg-transparent flex items-center justify-center">
      <p className="text-xs md:text-sm lg:text-base font-sans text-gray-800 dark:text-gray-200 tracking-wide">
        Unable to retrieve messages
      </p>
    </div>
  );
}

function EmptySection() {
  return (
    <div className="flex-1 bg-transparent flex items-center justify-center">
      <p className="text-xs md:text-sm lg:text-base font-sans text-gray-800 dark:text-gray-200 tracking-wide">
        Start a new message
      </p>
    </div>
  );
}

import defaultProfile from "@/assets/profiles/default-profile.jpg";
import { useWebSocket } from "@/hooks/useWebsocket";
import { Button } from "@/shared/components/form/Button";
import { Input } from "@/shared/components/form/Input";

import {
  ArrowLeftIcon,
  FaceSmileIcon,
  InformationCircleIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  PlusIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import {
  ChangeEvent,
  KeyboardEvent,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import { useGetConversationMessages } from "../hooks/useGetConversationMessages";
import { Message as ConversationMessage, MessageType } from "../types/Chat";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/utils/ClassNames";
import { useGetConversation } from "../hooks/useGetConversation";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { useIsVisible } from "@/shared/hooks/useIsVisible";
import { PaginateParams } from "@/types/Pagination";
import { Formatters } from "@/utils/formatters";

function ActiveChat() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4">
        <ChatMessages />
      </div>

      <ChatMessageCreation />
    </div>
  );
}

function ChatHeader() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const { data, isLoading } = useGetConversation({ conversationId });
  return (
    <div className="w-full flex shrink-0 justify-between items-center py-2 px-4 lg:py-3 lg:px-5 shadow-lg bg-gray-100 dark:bg-slate-900">
      {isLoading && <HeaderSkeleton />}
      {data && (
        <>
          <div className="inline-flex items-center gap-1.5">
            <Link to={"/chats"}>
              <ArrowLeftIcon
                className={
                  "size-5 text-gray-800 dark:text-gray-200 inline lg:hidden mr-2 cursor-pointer"
                }
              />
            </Link>
            <div className="inline-flex items-center">
              <img
                src={data.avatarPhoto ?? defaultProfile}
                alt={"gojo satoru"}
                className="size-10 md:size-12 lg:size-14 object-cover border border-primary rounded-full flex-shrink-0"
              />

              <div className="ml-4">
                <h3 className="text-xs md:text-sm lg:text-base truncate dark:text-white mb-1.5">
                  {data.name}
                </h3>
              </div>
            </div>
          </div>
          <div className="inline-flex justify-end items-center">
            <Button variant={"transparent"} className={"rounded-full"}>
              <PhoneIcon
                className={
                  "size-4 md:size-5 text-primary dark:text-primary-dark "
                }
              />
            </Button>
            <Button variant={"transparent"} className={"rounded-full"}>
              <VideoCameraIcon
                className={
                  "size-4 md:size-5 text-primary dark:text-primary-dark "
                }
              />
            </Button>
            <Button variant={"transparent"} className={"rounded-full"}>
              <InformationCircleIcon
                className={
                  "size-4 md:size-5 text-primary dark:text-primary-dark "
                }
              />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function HeaderSkeleton() {
  return (
    <div className="size-full animate-pull bg-gray-300 dark:bg-slate-700 rounded-b"></div>
  );
}

function ChatMessages() {
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

  const [loadedMessages, setLoadedMessages] = useState<ConversationMessage[]>(
    [],
  );

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
      const parsed: ConversationMessage = JSON.parse(msg.body);

      if (!parsed?.message.trim()) return;
      setLoadedMessages((prev) => {
        const exists = prev.some((m) => m.id === parsed.id);
        if (exists) return prev;

        return [...prev, parsed];
      });
    });

    return () => {
      sub?.unsubscribe();
    };
  }, [conversationId, subscribe]);

  const oneHourAgo = Date.now() - 60 * 60 * 1000;

  return (
    <AnimatePresence>
      <div className="min-h-full w-full">
        {isLoading && <LoadingSection />}
        {!data && error && <ErrorSection />}
        {data && data.empty && <EmptySection />}
        <div className="size-full flex flex-col p-2 justify-end gap-y-2 overflow-y-auto">
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
interface ConvoMessageProps {
  message: ConversationMessage;
}
function ConvoMessage({ message }: ConvoMessageProps) {
  const { user } = useAuth();

  const isSender = message.senderId === user?.id;

  return (
    <div
      className={cn("w-full flex", isSender ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[80%] w-fit px-3 py-2 text-sm md:text-base",
          "rounded-lg",
          isSender
            ? "bg-primary dark:bg-primary-dark text-white rounded-br-none"
            : "bg-gray-300 dark:bg-slate-700 text-gray-900 dark:text-gray-200 rounded-bl-none",
        )}
      >
        <p>{message.message}</p>
      </div>
    </div>
  );
}

function TimeIndicator({ message }: { message: ConversationMessage }) {
  return (
    <div className="flex items-center w-full my-2">
      <div className="border-t border-gray-300 dark:border-gray-600 flex-1" />

      <time
        dateTime={message.createdAt}
        className="w-fit px-3 lg:px-5 text-extratiny lg:text-tiny text-gray-500 dark:text-gray-400"
      >
        {Formatters.Date.formatShortDateWithTime(new Date(message.createdAt))}
      </time>

      <div className="border-t border-gray-300 dark:border-gray-600 flex-1" />
    </div>
  );
}
function LoadingSection() {
  return (
    <div className="size-full animate-pulse bg-gray-200 dark:bg-slate-800"></div>
  );
}

function ErrorSection() {
  return (
    <div className="size-full bg-transparent flex items-center justify-center">
      <p className="text-xs md:text-sm lg:text-base font-sans text-gray-800 dark:text-gray-200 tracking-wide">
        Unable to retrieve messages
      </p>
    </div>
  );
}

function EmptySection() {
  return (
    <div className="size-full bg-transparent flex items-center justify-center">
      <p className="text-xs md:text-sm lg:text-base font-sans text-gray-800 dark:text-gray-200 tracking-wide">
        Start a new message
      </p>
    </div>
  );
}

interface NewMessageRequest {
  messageType: MessageType;
  content: string;
}

function ChatMessageCreation() {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { conversationId } = useParams<{ conversationId: string }>();

  const [payload, setPayload] = useState<NewMessageRequest>({
    messageType: MessageType.TEXT,
    content: "",
  });
  const { publish } = useWebSocket({});

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  function handleOnTyping(e: ChangeEvent<HTMLInputElement>) {
    setPayload({ ...payload, content: e.target.value });

    publish({
      destination: `/app/chats/${conversationId}/typing`,
      body: {
        typing: e.target.value.trim() !== "",
        userAvatar: user?.profile.avatarUrl,
      } as { typing: boolean; userAvatar: string },
    });
  }

  function handleSubmit() {
    if (!payload.content.trim()) {
      inputRef.current?.focus();
      return;
    }

    const messageToSend = { ...payload };

    queryClient.invalidateQueries({ queryKey: ["conversations"] });

    publish({
      destination: `/app/chats/${conversationId}/send`,
      body: messageToSend,
    });

    setPayload((prev) => ({ ...prev, content: "" }));
  }

  return (
    <div className="w-full shrink-0 bg-gray-100 dark:bg-slate-900 flex items-center md:p-3 p-2">
      <div className="flex items-center bg-gray-100 dark:bg-slate-900 w-full">
        <Button variant={"transparent"} className={"rounded-full shrink-0"}>
          <PlusIcon
            className={"size-4 md:size-5 text-primary dark:text-primary-dark"}
          />
        </Button>
        <Button variant={"transparent"} className={"rounded-full shrink-0"}>
          <FaceSmileIcon
            className={"size-4 md:size-5 text-primary dark:text-primary-dark"}
          />
        </Button>
        <Input
          ref={inputRef}
          className={"flex-1 w-full"}
          value={payload.content}
          autoComplete={"off"}
          onKeyDown={handleKeyDown}
          onChange={handleOnTyping}
          placeholder="Send a message..."
        />
        <Button
          variant={"transparent"}
          className={"rounded-full shrink-0"}
          onClick={handleSubmit}
        >
          <PaperAirplaneIcon
            className={"size-4 md:size-5 text-primary dark:text-primary-dark"}
          />
        </Button>
      </div>
    </div>
  );
}

type TypingState = {
  userId: string;
  isTyping: boolean;
  avatarPhoto?: string;
} | null;
function ShowTyping() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const { subscribe } = useWebSocket({});
  const { user } = useAuth();

  const [someoneTyping, setSomeoneTyping] = useState<TypingState>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!user || !conversationId) return;

    const sub = subscribe(
      `/topic/chats.${conversationId}.typing`,
      (message) => {
        const response = JSON.parse(message.body) as {
          userId: string;
          avatarPhoto?: string;
          isTyping: boolean;
          timestamp: string;
        };

        if (response.userId === user.id) return;

        if (response.isTyping) {
          setSomeoneTyping({
            avatarPhoto: response.avatarPhoto ?? defaultProfile,
            userId: response.userId,
            isTyping: true,
          });

          if (timeoutRef.current) clearTimeout(timeoutRef.current);

          timeoutRef.current = setTimeout(() => {
            setSomeoneTyping((prev) =>
              prev ? { ...prev, isTyping: false } : null,
            );
          }, 2500);
        } else {
          setSomeoneTyping(null);
        }
      },
    );

    return () => {
      sub?.unsubscribe();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [subscribe, user, conversationId]);

  if (!someoneTyping) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -4, y: 4 }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        transition: { ease: "easeInOut", duration: 0.3 },
      }}
      exit={{ opacity: 0, x: -4, y: 4 }}
      className="w-full flex justify-start"
    >
      <div className="w-full flex justify-start items-end gap-2">
        <img
          src={someoneTyping.avatarPhoto || defaultProfile}
          alt="avatar"
          className="w-6 h-6 rounded-full object-cover"
        />

        <div className="bg-gray-300 dark:bg-slate-700 rounded-lg rounded-bl-none px-3 py-2 flex items-center gap-1">
          <span className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full animate-typing"></span>
          <span className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full animate-typing delay-150"></span>
          <span className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full animate-typing delay-300"></span>
        </div>
      </div>
    </motion.div>
  );
}

export default memo(ActiveChat);

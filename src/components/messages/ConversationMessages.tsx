import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Icon from "../../shared/components/Icon.tsx";
import Spinner from "../../shared/components/Spinner.tsx";
import {
  ConversationDetail,
  ConversationMessage,
  ReaderParticipant,
} from "@/features/chats/types/Chat.ts";
import useGetConversationMessages from "@/api/messages/useGetConversationMessages";
import { useMessage } from "@/contexts/MessageContext";
import { useWebSocket } from "@/hooks/useWebsocket";
import useGetConversationById from "@/api/messages/useGetConversationById";
import CreateMessageSection from "./CreateMessageSection";
import { Button } from "@/shared/components/form/Button";
import {
  InformationCircleIcon,
  PhoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { IMessage } from "@stomp/stompjs";
import { useAuth } from "@/contexts/AuthContext";

export default function ConversationMessages() {
  const { conversationId, recipientId } = useParams<{
    conversationId: string;
    recipientId: string;
  }>();

  const { data: conversation, loading: convoLoading } = useGetConversationById({
    conversationId,
  });

  return (
    <div className="h-full flex flex-col">
      <ConversationHeader
        convoLoading={convoLoading}
        conversation={conversation}
      />
      <MessagesSection conversationId={conversationId} />
      <CreateMessageSection
        conversationId={conversationId}
        recipientId={conversation?.receiverId ?? recipientId}
        isGroup={conversation?.isGroup}
      />
    </div>
  );
}

interface MessagesSectionProps {
  conversationId: string | undefined;
}
function MessagesSection({ conversationId }: MessagesSectionProps) {
  const { markConversationAsRead } = useMessage();
  const { subscribe, connected } = useWebSocket({});
  const bottomRef = useRef<HTMLDivElement>(null);
  const [{ pageNo, pageSize }] = useState({
    pageNo: 0,
    pageSize: 15,
  });
  const { data, loading, error } = useGetConversationMessages({
    conversationId,
    pageNo,
    pageSize,
  });
  const [messages, setMessages] = useState<ConversationMessage[]>([]);

  const memoizedMessages: ConversationMessage[] | null = useMemo(() => {
    if (!messages || messages.length <= 0) {
      return null;
    }

    return messages;
  }, [messages]);

  useEffect(() => {
    if (!conversationId || !connected) return;

    const subReadReceipts = subscribe(
      `/topic/chat.${conversationId}.read`,
      (message) => {
        const reader = JSON.parse(message.body) as ReaderParticipant;
        console.log(reader);
      },
    );

    markConversationAsRead(conversationId);
    return () => {
      subReadReceipts?.unsubscribe();
    };
  }, [conversationId, connected]);

  useEffect(() => {
    if (!connected) return;
    const sub1 = subscribe(
      `/topic/chat.${conversationId}.messages`,
      (message: IMessage) => {
        const receivedMessage = JSON.parse(message.body) as ConversationMessage;

        setMessages((prev) => {
          const filtered = prev.filter((m) => m.id !== receivedMessage.id);

          return [...filtered, receivedMessage];
        });
      },
    );

    return () => {
      sub1?.unsubscribe();
    };
  }, [connected, subscribe]);

  useEffect(() => {
    if (!data) return;

    setMessages(data.content);
  }, [data]);

  return (
    <div className="flex-1 overflow-y-auto p-2">
      {loading && messages == null ? (
        <div className={"w-full flex items-center justify-center h-full"}>
          <Spinner variant={"primary"} />
        </div>
      ) : memoizedMessages != null && !error ? (
        <div className="flex flex-1 flex-col">
          {memoizedMessages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
          <div ref={bottomRef} />
        </div>
      ) : (
        <div className={"w-full flex items-center justify-center h-full"}>
          <p className="text-lg text-gray-700 font-serif">{error}</p>
        </div>
      )}
    </div>
  );
}

function MessageItem({ message }: { message: ConversationMessage }) {
  const { message: content } = message;
  const { user } = useAuth();
  const isMine = user?.id === message.senderId;
  return (
    <div
      className={`w-full p-1 flex ${isMine ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xs md:max-w-md w-fit p-3 rounded-t-lg ${isMine ? "bg-primary text-white rounded-bl-lg" : "bg-gray-200 text-gray-800 rounded-br-lg"}`}
      >
        {content}
      </div>
    </div>
  );
}

interface ConversationHeaderProps {
  convoLoading: boolean;
  conversation: ConversationDetail | null;
}
function ConversationHeader({
  convoLoading,
  conversation,
}: ConversationHeaderProps) {
  return (
    <div className="w-full h-fit shrink-0 min-h-0 md:p-3 p-2 flex items-center justify-between bg-gray-200">
      <div className="size-fit inline-flex md:gap-4 gap-3 items-center">
        <Icon size={"md"} />
        <div className="flex-1">
          <h3 className="text-lg font-bold">
            {!convoLoading && (conversation !== null ? conversation.name : "")}
          </h3>
          {/* <p className="text-sm text-gray-500">Active 1m ago</p> */}
        </div>
      </div>
      <div className="inline-flex items-center gap-3 md:gap-4">
        <Button variant={"transparent"} className={"rounded-full p-2"}>
          <VideoCameraIcon className={"size-6 text-primary"} />
        </Button>
        <Button variant={"transparent"} className={"rounded-full p-2"}>
          <PhoneIcon className={"size-6 text-primary"} />
        </Button>
        <Button variant={"transparent"} className={"rounded-full p-2"}>
          <InformationCircleIcon className={"size-6 text-primary"} />
        </Button>
      </div>
    </div>
  );
}

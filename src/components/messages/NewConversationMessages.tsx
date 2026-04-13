import { useEffect, useMemo, useRef, useState } from "react";
import { ErrorResponse, useParams } from "react-router-dom";
import Icon from "../../shared/components/Icon.tsx";
import { ConversationMessage, ReaderParticipant } from "@/features/chats/types/Chat.ts";
import { useMessage } from "@/contexts/MessageContext";
import { useWebSocket } from "@/hooks/useWebsocket";
import CreateMessageSection from "./CreateMessageSection";
import { Button } from "@/shared/components/form/Button";
import {
  InformationCircleIcon,
  PhoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { IMessage } from "@stomp/stompjs";
import { AxiosError, AxiosResponse } from "axios";
import api from "@/core/api/ApiService.ts";
import { SimpleUserInfo } from "@/types/User";
import { RequestState } from "@/types/Pagination";
import { useAuth } from "@/contexts/AuthContext";

export default function NewConversationMessages() {
  const { recipientId } = useParams<{
    recipientId: string;
  }>();

  useEffect(() => {
    if (!recipientId) return;
  }, [recipientId]);

  return (
    <div className="h-full flex flex-col">
      <ConversationHeader recipientId={recipientId} />
      <MessagesSection />
      <CreateMessageSection
        conversationId={undefined}
        recipientId={recipientId}
        isGroup={false}
      />
    </div>
  );
}

function MessagesSection() {
  const { markConversationAsRead } = useMessage();
  const { subscribe, connected } = useWebSocket({});
  const bottomRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [conversationId, setConversationId] = useState<string>("");
  const memoizedMessages: ConversationMessage[] | null = useMemo(() => {
    if (!messages || messages.length <= 0) {
      return null;
    }

    return messages;
  }, [messages]);

  useEffect(() => {
    if (!connected) return;
    const sub1 = subscribe(`/user/queue/chat.messages`, (message: IMessage) => {
      const receivedMessage = JSON.parse(message.body) as ConversationMessage;

      setConversationId(receivedMessage.conversationId);

      setMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== receivedMessage.id);

        return [...filtered, receivedMessage];
      });
    });

    return () => {
      sub1?.unsubscribe();
    };
  }, [connected, subscribe]);

  useEffect(() => {
    if (!conversationId.trim() || !connected) return;

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

  return (
    <div className="flex-1 overflow-y-auto p-2">
      {memoizedMessages != null ? (
        <div className="flex flex-1 flex-col">
          {memoizedMessages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
          <div ref={bottomRef} />
        </div>
      ) : (
        <div className={"w-full flex items-center justify-center h-full"}>
          <p className="text-lg text-gray-700 font-serif">
            Start a conversation
          </p>
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
  recipientId: string | undefined;
}
function ConversationHeader({ recipientId }: ConversationHeaderProps) {
  const fields = [
    "id",
    "firstName",
    "lastName",
    "fullName",
    "username",
    "photoUrl",
  ];
  const [{ data, loading, error }, setState] = useState<
    RequestState<SimpleUserInfo>
  >({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!recipientId) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    const controller = new AbortController();

    async function fetchReciever() {
      await api
        .get(`/authors/${recipientId}`, {
          params: {
            fields,
          },
          signal: controller.signal,
          paramsSerializer: {
            indexes: null,
          },
        })
        .then((response: AxiosResponse<SimpleUserInfo>) => {
          setState({ loading: false, data: response.data, error: null });
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setState({
            loading: false,
            error: error.response?.data.data,
            data: null,
          });
        });
    }

    fetchReciever();
  }, [recipientId]);

  return (
    <div className="w-full h-fit shrink-0 min-h-0 md:p-3 p-2 flex items-center justify-between bg-gray-200">
      <div className="size-fit inline-flex md:gap-4 gap-3 items-center">
        <Icon size={"md"} />
        <div className="flex-1">
          <h3 className="text-lg font-bold">
            {data && !error ? (loading ? "Loading..." : data.fullName) : error}
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

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Icon from "../Icon";
import LoadingCircle from "../LoadingCirlce";
import TextArea from "../common/form/TextArea";
import { Button } from "../common/form/Button";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { ConversationMessage, ReaderParticipant } from "@/types/Message";
import useGetConversationMessages from "@/api/messages/useGetConversationMessages";
import { useAuth } from "@/contexts/AuthContext";
import { useConversationContext } from "@/pages/MessagesPage";
import { useMessage } from "@/contexts/MessageContext";
import { useWebSocket } from "@/hooks/useWebsocket";

export default function ConversationMessages() {
  const { conversation } = useConversationContext();
  const [content, setContent] = useState<string>("");
  const { markConversationAsRead, sendFriendMessage, sendGroupMessage } =
    useMessage();
  const { subscribe, connected } = useWebSocket({});
  const { conversationId } = useParams<{ conversationId: string }>();
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [{ pageNo, pageSize }] = useState({
    pageNo: 0,
    pageSize: 15,
  });

  const { data: convoMessages, loading: messagesLoading } =
    useGetConversationMessages({
      conversationId,
      pageNo,
      pageSize,
    });

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
    if (convoMessages) {
      setMessages(convoMessages.content);
    }
  }, [convoMessages]);

  function handleSendMessage() {
    if (!conversation || !content) return;

    const isGroup = conversation.isGroup;

    if (isGroup) {
      return;
    }

    // sendFriendMessage({ receiverId})
  }

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div className="w-full h-fit md:p-5 p-3 flex items-center bg-[#f2efeb] md:gap-5 gap-3">
        <Icon size={"md"} />
        <div className="flex-1">
          <h3 className="text-lg font-bold">
            {conversation !== null ? conversation.name : "Anonymous"}
          </h3>
          {/* <p className="text-sm text-gray-500">Active 1m ago</p> */}
        </div>
      </div>

      {/* The messages */}
      <div className="flex-1 overflow-y-auto p-5">
        {messagesLoading && !messages.length ? (
          <div className={"w-full flex items-center justify-center h-full"}>
            <LoadingCircle variant={"primary"} />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
          </div>
        )}
      </div>

      <div className="w-full h-fit sticky bottom-0 bg-[#f2efeb] flex items-center md:p-3 p-2">
        <div className="flex-1 h-fit p-2 md:p-4">
          <TextArea
            className="w-full"
            placeholder="Write a message"
            rows={3}
          ></TextArea>
        </div>
        <div className="w-fit h-fit">
          <Button variant={"primary"} className="rounded-full p-2">
            <PaperAirplaneIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function MessageItem({ message }: { message: ConversationMessage }) {
  const { user } = useAuth();
  const isMine = message.sender.id === user?.id;
  return (
    <div
      className={`w-full p-3 flex ${isMine ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xs md:max-w-md w-fit p-3 rounded-lg ${isMine ? "bg-primary text-white" : "bg-gray-200 text-gray-800"}`}
      >
        {message.message}
      </div>
    </div>
  );
}

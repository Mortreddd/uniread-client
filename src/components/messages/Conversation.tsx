import Icon from "../Icon";
import { Button } from "../common/form/Button";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import TextArea from "../common/form/TextArea";
import Messages from "./Messages";
import { useMessage } from "@/contexts/MessageContext";
import { useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext.tsx";
import useGetConversationById from "@/api/messages/useGetConversationById.ts";
import LoadingCircle from "@/components/LoadingCirlce.tsx";

export default function Conversation() {
  const { user: currentUser } = useAuth();
  const { conversationId } = useParams<{ conversationId: string }>();
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [content, setContent] = useState<string>("");
  const { sendMessage } = useMessage();
  const { data, loading } = useGetConversationById({
    conversationId,
  });
  const conversation = useMemo(() => {
    if (!data) return null;

    return data;
  }, [data]);

  const conversationName : string = useMemo(() => {
    return conversation && conversation.isGroup ? conversation.name ?? conversation?.participants?.map((participant) => participant.user.firstName).join(", ")
        : conversation?.participants?.find((participant) => participant.id !== currentUser?.id)?.user.fullName ?? "Anonymous";
  },[currentUser, conversation])

  function handleSendMessage() {
    if (content.trim() === "") {
      textAreaRef.current?.focus();
      return;
    }
    setContent("");
    sendMessage({
      conversationId,
      receiverIds: conversation?.participants?.map((p) => p.id) || [],
      isGroup: conversation?.isGroup || false,
      message: content,
    });
  }

  return (
    <div className="flex flex-col justify-between">
      {/* The sender user name */}
      <div className="w-full h-fit md:p-5 p-3 flex items-center bg-[#f2efeb] md:gap-5 gap-3">
        <Icon size={"md"} />
        <div className="flex-1">
          <h3 className="text-lg font-bold">{conversationName}</h3>
          {/* <p className="text-sm text-gray-500">Active 1m ago</p> */}
        </div>
      </div>

      {/* The messages */}
      <div className="w-full min-h-[53dvh] max-h-[53dvh] h-full overflow-y-scroll p-5">
        {loading && !data ? (
          <div className={"w-full flex items-center justify-center h-full"}>
            <LoadingCircle variant={"primary"} />
          </div>
        ) : (
          <Messages />
        )}
      </div>

      {/* The message creation */}
      <div className="w-full h-fit sticky bottom-0 bg-[#f2efeb] flex items-center md:p-3 p-2">
        <div className="flex-1 h-fit p-2 md:p-4">
          <TextArea
            ref={textAreaRef}
            className="w-full"
            placeholder="Write a message"
            rows={3}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></TextArea>
        </div>
        <div className="w-fit h-fit">
          <Button
            onClick={handleSendMessage}
            variant={"primary"}
            className="rounded-full p-2"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useAuth } from "@/contexts/AuthContext";
import { MessageType } from "../types/Chat";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useWebSocket } from "@/hooks/useWebsocket";
import { Button } from "@/shared/components/form/Button";
import {
  FaceSmileIcon,
  PaperAirplaneIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Input } from "@/shared/components/form/Input";

interface NewMessageRequest {
  messageType: MessageType;
  content: string;
}

export default function ChatMessageCreation() {
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
    <div className="w-full bg-gray-100 dark:bg-slate-900 flex items-center md:p-3 p-2">
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

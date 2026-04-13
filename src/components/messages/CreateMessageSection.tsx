import { memo, useEffect, useRef, useState } from "react";
import { Input } from "@/shared/components/form/Input";
import { Button } from "@/shared/components/form/Button";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useMessage } from "@/contexts/MessageContext";

interface CreateMessageSectionProps {
  conversationId?: string;
  recipientId?: string;
  isGroup?: boolean;
}

function CreateMessageSection({
  conversationId,
  recipientId,
  isGroup = false,
}: CreateMessageSectionProps) {
  const { sendFriendMessage } = useMessage();

  const [content, setContent] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [conversationId, recipientId]);

  function handleSend() {
    if (!content.trim()) {
      inputRef.current?.focus();
      return;
    }

    if (isGroup) {
      if (!conversationId) {
        inputRef.current?.focus();
        return;
      }

      return;
    }

    if (!recipientId) {
      inputRef.current?.focus();
      return;
    }

    sendFriendMessage({
      message: content,
      receiverId: recipientId,
    });
    setContent("");
  }

  return (
    <div className="w-full h-fit shrink-0 min-h-0 bg-gray-200 flex items-center md:p-3 p-2">
      <div className="flex-1 h-fit p-2 md:p-3">
        <Input
          ref={inputRef}
          inputSize={"md"}
          className="w-full"
          placeholder="Write a message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <Button
        onClick={handleSend}
        variant={"primary"}
        className="rounded-full my-auto p-2"
      >
        <PaperAirplaneIcon className="h-5 w-5" />
      </Button>
    </div>
  );
}

export default memo(CreateMessageSection);

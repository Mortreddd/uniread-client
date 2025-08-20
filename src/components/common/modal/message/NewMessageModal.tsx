import { forwardRef, Ref, useState } from "react";
import Modal, { ModalProps, ModalRef } from "../Modal";
import { AuthorDetail } from "@/types/User";
import Icon from "@/components/Icon";
import defaultProfile from "@/assets/profiles/default-profile.jpg";
import TextArea from "../../form/TextArea";
import { Button } from "../../form/Button";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useMessage } from "@/contexts/MessageContext";
import { useAuth } from "@/contexts/AuthContext";
import Message from "@/components/messages/Message";

interface CreateMessageProps {
  conversationId?: string;
  receiverIds: string[];
  isGroup: boolean;
  message: string;
}

interface NewMessageModalProps extends ModalProps {
  author: AuthorDetail;
  onCreateMessage: () => void;
}

function NewMessageModal(
  { author, onCreateMessage }: NewMessageModalProps,
  ref: Ref<ModalRef>
) {
  const [createMessage, setCreateMessage] = useState<CreateMessageProps>({
    receiverIds: [author.id],
    isGroup: false,
    message: "",
  });

  const { user: currentUser } = useAuth();
  const { sendMessage, messages } = useMessage();

  async function handleSendMessage() {
    if (!createMessage.message || !currentUser) return;

    console.log(createMessage);
    sendMessage(createMessage);
    setCreateMessage({
      ...createMessage,
      message: "",
    });

    onCreateMessage(); // Notify parent component to refresh or update state

    // Optionally, you can fetch the latest messages after sending
    // useGetConversationMessages({ conversationId: "", pageNo: 1, pageSize: 20 });
  }

  return (
    <Modal ref={ref}>
      <div className="min-w-lg">
        {/* TODO: replace the defualt profile picture before production */}
        <Icon src={defaultProfile} size={"xl"} className={"mx-auto"} />
        <h2 className="text-2xl font-serif text-gray-800 font-semibold text-center mt-3">
          {author.fullName}
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Send a message to @{author.username}
        </p>
        <div className="my-5 flex flex-col-reverse gap-2">
          {messages.map((message, index) => (
            <Message key={index} message={message.message} />
          ))}
        </div>
        <div className="flex justify-between items-center">
          <TextArea
            value={createMessage.message}
            onChange={(e) =>
              setCreateMessage({ ...createMessage, message: e.target.value })
            }
            variant={"primary"}
            className={"flex-1 mr-3 resize-y"}
            placeholder={`Message @${author.username}`}
          ></TextArea>
          <Button
            variant={"primary"}
            className="rounded-full p-2"
            onClick={handleSendMessage}
          >
            <PaperAirplaneIcon className="size-5" />
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default forwardRef(NewMessageModal);

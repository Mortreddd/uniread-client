import { forwardRef, Ref, useState } from "react";
import Modal, { ModalProps, ModalRef } from "../Modal.tsx";
import { AuthorDetail } from "@/types/User.ts";
import Icon from "@/components/Icon.tsx";
import defaultProfile from "@/assets/profiles/default-profile.jpg";
import TextArea from "../../common/form/TextArea.tsx";
import { Button } from "../../common/form/Button.tsx";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useMessage } from "@/contexts/MessageContext.tsx";
import { useAuth } from "@/contexts/AuthContext.tsx";
import Message from "@/components/messages/Message.tsx";

interface CreateMessageProps {
  receiverId: string;
  message: string;
}

interface NewMessageModalProps extends ModalProps {
  author: AuthorDetail;
}

function NewMessageModal({ author }: NewMessageModalProps, ref: Ref<ModalRef>) {
  const { messages, sendFriendMessage } = useMessage();
  const [createMessage, setCreateMessage] = useState<CreateMessageProps>({
    receiverId: author.id,
    message: "",
  });

  const { user: currentUser } = useAuth();

  async function handleSendMessage() {
    if (!createMessage.message || !currentUser) return;

    sendFriendMessage({
      receiverId: author.id,
      message: createMessage.message,
    });

    setCreateMessage({
      receiverId: author.id,
      message: "",
    });
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

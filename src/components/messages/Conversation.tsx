import { Fragment } from "react/jsx-runtime";
import Icon from "../Icon";
import { Button } from "../common/form/Button";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import TextArea from "../common/form/TextArea";
import Messages from "./Messages";
import { useMessage } from "@/contexts/MessageContext";
import { ChangeEvent, useState } from "react";

interface SendMessageProps {
  conversationId: string;
  senderId: string;
  message: string;
}

export default function Conversation() {
  const [messageRequest, setMessageRequest] = useState<SendMessageProps>({
    conversationId: "2b70c01c-9804-4542-a30f-0c123c1ef0cc",
    senderId: "efad76f5-ae20-4d67-9242-a1c09376684d",
    message: "",
  });

  const { messages, sendMessage } = useMessage();

  const handleSendMessage = () => {
    sendMessage(messageRequest);
    setMessageRequest({ ...messageRequest, message: "" });
  };

  return (
    <Fragment>
      <div className="flex-grow flex flex-col justify-between">
        {/* The sender user name */}
        <div className="w-full h-fit md:p-5 p-3 flex items-center bg-[#f2efeb] md:gap-5 gap-3">
          <Icon size={"md"} />
          <div className="flex-1">
            <h3 className="text-lg font-bold">John Doe</h3>
            {/* <p className="text-sm text-gray-500">Active 1m ago</p> */}
          </div>
        </div>

        {/* The messages */}
        <div className="w-full min-h-[50dvh] max-h-[50dvh] flex-1 overflow-y-scroll p-5">
          <Messages messages={messages} />
        </div>

        {/* The message creation */}
        <div className="w-full h-fit bg-[#f2efeb] flex items-center md:p-3 p-2">
          <div className="flex-1 h-fit p-2 md:p-4">
            <TextArea
              className="w-full"
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setMessageRequest({
                  ...messageRequest,
                  message: e.target.value,
                })
              }
              value={messageRequest.message}
              placeholder="Write a message"
              rows={3}
            ></TextArea>
          </div>
          <div className="w-fit h-fit">
            <Button
              variant={"primary"}
              onClick={handleSendMessage}
              className="rounded-full p-2"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

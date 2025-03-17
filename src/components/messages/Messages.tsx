import { Message as MessageType } from "@/types/Message";
import Message from "./Message";

interface MessagesProps {
  messages?: string[] | MessageType[];
}
export default function Messages({ messages }: MessagesProps) {
  return (
    <div className={"w-full h-fit flex flex-col gap-y-2"}>
      {messages?.map((message, index) => (
        <Message message={`${index} - ${message}`} key={index} />
      ))}
    </div>
  );
}

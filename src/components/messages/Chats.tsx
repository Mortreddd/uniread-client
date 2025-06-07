import { Conversation } from "@/types/Message";
import { memo } from "react";
import { Link } from "react-router-dom";
import Chat from "./Chat";
import { useMessage } from "@/contexts/MessageContext";

interface ChatsProps {
  chats: Conversation[];
}
function Chats({ chats }: ChatsProps) {
  if (!chats || chats.length === 0) {
    return <p className="text-gray-500 text-center">No messages</p>;
  }

  return (
    <>
      {chats.map((chat) => (
        <Link to={`/conversations/${chat.id}/messages`} key={chat.id}>
          <Chat conversation={chat} />
        </Link>
      ))}
    </>
  );
}

export default memo(Chats);

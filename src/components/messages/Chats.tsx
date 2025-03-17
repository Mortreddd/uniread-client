import { Conversation } from "@/types/Message";
import { memo } from "react";
import { Link } from "react-router-dom";
import Chat from "./Chat";

interface ChatsProps {
  chats: Conversation[] | undefined;
}
function Chats({ chats }: ChatsProps) {
  if (!chats || chats.length === 0) {
    return <p className="text-gray-500 text-center">No messages</p>;
  }

  return (
    <>
      {chats
        .filter((chat) => chat?.messages?.length)
        .map((chat) => (
          <Link to={`/messages/conversations/${chat.id}`} key={chat.id}>
            <Chat latestMessage={chat?.messages?.at(-1)} />
          </Link>
        ))}
    </>
  );
}

export default memo(Chats);

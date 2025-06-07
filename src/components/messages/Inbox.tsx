import { Input } from "../common/form/Input";
import useGetUserConversations from "@/api/messages/useGetUserConversations";
import { useAuth } from "@/contexts/AuthContext";
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import Chats from "./Chats";
import { PaginateParams } from "@/types/Pagination";
import { Conversation as ConversationType } from "@/types/Message.ts";

export default function Inbox() {
  const { user: currentUser } = useAuth();
  const [{ pageNo, pageSize }, setParams] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
    query: "",
  });
  const { data } = useGetUserConversations({
    userId: currentUser?.id,
    pageNo,
    pageSize,
  });

  const [chats, setChats] = useState<ConversationType[]>([])

  const memoizedSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setParams((prev) => ({ ...prev, query: event.target.value }));
  }, []);
  console.log(data);
  useEffect(() => {
    if (data?.content) {
      const filteredChats = data.content.filter((conversation) =>
          !conversation.isGroup &&
          conversation?.participants?.some((participant) => participant.user.id !== currentUser?.id)
      );

      setChats(filteredChats);
    }
  }, [data, currentUser?.id]);

  return (
    <aside className="w-96 h-full bg-white min-h-full">
      <div className="p-6 w-full h-full">
        <h3 className="text-2xl text-black font-sans font-semibold text-left">
          Inbox
        </h3>

        <Input
          variant={"primary"}
          className="my-2 w-full"
          placeholder="Search"
          onChange={memoizedSearch}
        />

        <h6 className="text-xl font-sans text-black fontlight">Messages</h6>
        <div className="flex flex-col w-full h-full overflow-y-auto">
          <Chats chats={chats} />
        </div>
      </div>
    </aside>
  );
}

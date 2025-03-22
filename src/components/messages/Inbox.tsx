import { Input } from "../common/form/Input";
import useGetUserConversations, {
  GetUserConversationsProps,
} from "@/api/messages/useGetUserConversations";
import { useAuth } from "@/contexts/AuthContext";
import { ChangeEvent, useCallback, useState } from "react";
import Chats from "./Chats";

export default function Inbox() {
  const { user } = useAuth();
  const [paginateParams, setPaginateParams] =
    useState<GetUserConversationsProps>({
      pageNo: 0,
      pageSize: 10,
      userId: user?.id || null,
      name: "",
    });

  const memoizedSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setPaginateParams({ ...paginateParams, name: e.target.value }),
    [paginateParams.name]
  );

  const result = useGetUserConversations(paginateParams);
  const chats = result.data?.content;

  return (
    <aside className="w-96 h-full bg-white min-h-[100%]">
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

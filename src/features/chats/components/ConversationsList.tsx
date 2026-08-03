import ChatPreview from "@/features/chats/components/ChatPreview";
import { Input } from "@/shared/components/form/Input";
import { useState } from "react";
import SearchUserResult from "./SearchUserResult";
import useDebounce from "@/hooks/useDebounce";
import { PaginateParams } from "@/types/Pagination";
import { useGetConversations } from "../hooks/useGetConversations";

export default function ConversationsList() {
  const [params] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
  });
  const { data, isLoading, error } = useGetConversations(params);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debounceSearch = useDebounce(searchQuery, 500);
  return (
    <div className="flex flex-col lg:flex-row w-full h-full overflow-y-auto">
      <div className="relative flex flex-col overflow-y-hidden flex-1 min-h-0 px-3">
        <h1 className="text-base mt-2 font-sans font-semibold md:text-xl text-black/80 dark:text-white/80">
          Inbox
        </h1>
        <div className="my-2 shrink-0 relative flex flex-col">
          <Input
            id={"search-friends"}
            type={"search"}
            variant={"primary"}
            autoComplete={"off"}
            withSearch={true}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
            placeholder="Search..."
          />
          {debounceSearch && (
            <div className="relative">
              <SearchUserResult query={debounceSearch} />
            </div>
          )}
        </div>
        <div className="flex flex-col h-full w-full overflow-y-auto gap-1">
          {isLoading && <LoadingSkeleton />}
          {!data && error && <ErrorSection />}
          {data && data.empty && <EmptySection />}
          {data &&
            data.content.map((chat, key) => (
              <div
                key={key}
                className="min-w-44 w-full max-w-full md:max-w-72 lg:max-w-80 shrink-0"
              >
                <ChatPreview chat={chat} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="relative size-full mt-1 bg-gray-100 dark:bg-gray-800 p-2 rounded-md shadow">
      <div className="size-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    </div>
  );
}

function ErrorSection() {
  return (
    <div className="relative flex flex-col h-full w-full overflow-y-auto items-center justify-center gap-1">
      <p className="text-sm lg:text-base font-sans text-gray-800 dark:text-gray-200 tracking-wide">
        Unable to retrieve conversations
      </p>
    </div>
  );
}

function EmptySection() {
  return (
    <div className="relative flex flex-col h-full w-full overflow-y-auto items-center justify-center gap-1">
      <p className="text-sm lg:text-base font-sans text-gray-800 dark:text-gray-200 tracking-wide">
        No conversations so far.
      </p>
    </div>
  );
}

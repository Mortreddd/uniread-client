import ChatPreview from "@/features/chats/components/ChatPreview";
import { Input } from "@/shared/components/form/Input";
import { useEffect, useRef, useState } from "react";
import SearchUserResult from "./SearchUserResult";
import useDebounce from "@/hooks/useDebounce";
import { PaginateParams } from "@/types/Pagination";
import { useGetConversations } from "../hooks/useGetConversations";
import { ChatConversationPreview } from "../types/Chat";
import { BellIcon, TrashIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/shared/components/form/Button";
import DeleteConversationModal from "./modals/DeleteConversationModal";
import { ModalRef } from "@/shared/components/Modal";

export default function ConversationsList() {
  const [params] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
  });
  const [menu, setMenu] = useState<{
    chat: ChatConversationPreview | null;
    x: number;
    y: number;
  }>({
    chat: null,
    x: 0,
    y: 0,
  });
  const [selectedChat, setSelectedChat] =
    useState<ChatConversationPreview | null>(null);
  const confirmDeleteRef = useRef<ModalRef>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading, error } = useGetConversations(params);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debounceSearch = useDebounce(searchQuery, 500);

  const handleOpenMenu = (chat: ChatConversationPreview, rect: DOMRect) => {
    const menuWidth = 180;
    const menuHeight = 100;

    const x = Math.min(rect.right - menuWidth, window.innerWidth - menuWidth);
    const y = Math.min(rect.bottom + 4, window.innerHeight - menuHeight);

    setMenu({ chat, x, y });
    setSelectedChat(chat);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setMenu((prev) => ({ ...prev, chat: null }));
      }
    };

    if (menu.chat) {
      window.addEventListener("mousedown", handleClick);
    }

    return () => window.removeEventListener("mousedown", handleClick);
  }, [menu.chat]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
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
        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto gap-1">
          {isLoading && <LoadingSkeleton />}
          {!data && error && <ErrorSection />}
          {data && data.content.length === 0 && <EmptySection />}
          {data &&
            data.content.map((chat) => (
              <div
                key={chat.conversationId}
                className="min-w-44 w-full shrink-0"
              >
                <ChatPreview chat={chat} onOpenMenu={handleOpenMenu} />
              </div>
            ))}
          <AnimatePresence>
            {menu.chat && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 5 }}
                transition={{ duration: 0.15 }}
                className="fixed z-50 w-48 bg-gray-100 dark:bg-gray-800 shadow-lg rounded-md overflow-hidden"
                style={{ top: menu.y, left: menu.x }}
              >
                <Button
                  variant={"ghost"}
                  size={"custom"}
                  className="p-1 flex items-center gap-2 w-full text-xs lg:text-sm"
                  onClick={() => {
                    setMenu((prev) => ({ ...prev, chat: null }));
                  }}
                >
                  <BellIcon className="size-4" />
                  Mute Conversation
                </Button>

                <Button
                  variant={"ghost"}
                  size={"custom"}
                  className="p-1 flex items-center gap-2 w-full px-3 py-2"
                  onClick={() => {
                    setSelectedChat(menu.chat);
                    confirmDeleteRef.current?.open();
                    setMenu((prev) => ({ ...prev, chat: null }));
                  }}
                >
                  <TrashIcon className="size-4 text-red-600 hover:text-red-700" />
                  <p className="text-xs lg:text-sm text-red-600 hover:text-red-700">
                    Delete Conversation
                  </p>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          {selectedChat && (
            <DeleteConversationModal
              ref={confirmDeleteRef}
              chat={selectedChat}
            />
          )}
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

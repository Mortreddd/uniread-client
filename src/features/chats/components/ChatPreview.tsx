import { Button } from "@/shared/components/form/Button";
import { Link } from "react-router-dom";
import { ChatConversationPreview } from "../types/Chat";
import Badge from "@/shared/components/Badge";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import SeperatorDot from "@/shared/components/SeperatorDot";
import { Formatters } from "@/utils/formatters";
import { memo } from "react";
import defaultProfile from "@/assets/profiles/default-profile.jpg";

interface ChatPreviewProps {
  chat: ChatConversationPreview;
  onOpenMenu: (chat: ChatConversationPreview, rect: DOMRect) => void;
}

function ChatPreview({ chat, onOpenMenu }: ChatPreviewProps) {
  return (
    <div
      className={`flex items-center p-2 md:p-3 rounded-sm ${
        chat.hasNewMessage
          ? "bg-slate-200/50 dark:bg-slate-700/50 font-bold"
          : "bg-transparent"
      } hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200 ease-in-out w-full`}
    >
      <img
        src={chat.avatarPhoto ?? defaultProfile}
        alt={chat.name}
        className="size-10 object-cover border border-primary rounded-full flex-shrink-0 mr-2"
      />

      <Link
        to={`/chats/${chat.conversationId}`}
        className="flex-1 min-w-0 flex flex-col"
      >
        <div className="flex items-center w-full gap-x-1 md:gap-x-1.5">
          <h3 className="text-sm lg:text-base truncate dark:text-white">
            {chat.name}
          </h3>
          {chat.unreadCount > 0 && <SeperatorDot />}
          {chat.unreadCount > 0 && (
            <Badge variant={"primary"} size={"xs"} className="mb-1">
              {chat.unreadCount}
            </Badge>
          )}
        </div>

        <div className="flex justify-between items-baseline w-fit">
          <p className="text-xs text-gray-500 truncate w-fit">
            {chat.lastMessageText}
          </p>
          <SeperatorDot className="mx-1" />
          {chat.lastMessageAt && (
            <time className="text-xs text-gray-500 ml-2">
              {Formatters.Date.formatShortenDate(new Date(chat.lastMessageAt))}
            </time>
          )}
        </div>
      </Link>

      {/* ✅ Replace Dropdown with simple button */}
      <div className="flex shrink-0 ml-2">
        <Button
          size={"custom"}
          variant={"custom"}
          className="group"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onOpenMenu(chat, e.currentTarget.getBoundingClientRect());
          }}
        >
          <EllipsisVerticalIcon className="size-7 lg:size-9 p-1 text-gray-500 rounded-full group-hover:bg-gray-200 dark:group-hover:bg-gray-600" />
        </Button>
      </div>
    </div>
  );
}

export default memo(ChatPreview);

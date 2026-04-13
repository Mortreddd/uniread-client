import { Button } from "@/shared/components/form/Button";
import { Link } from "react-router-dom";
import { ChatConversationPreview } from "./types/Chat";
import { formatShortenDate } from "@/utils/Dates";
import Badge from "@/shared/components/Badge";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import SeperatorDot from "@/shared/components/SeperatorDot";

interface ChatPreviewProps {
  chat: ChatConversationPreview;
}

export default function ChatPreview({ chat }: ChatPreviewProps) {
  return (
    <div
      className={`flex items-center p-2 md:p-3 rounded-sm ${
        chat.hasNewMessage
          ? "bg-slate-200/50 dark:bg-slate-700/50 font-bold"
          : "bg-transparent"
      } hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200 ease-in-out w-full`}
    >
      <img
        src={chat.avatar}
        alt={chat.name}
        className="size-10 object-cover border border-primary rounded-full flex-shrink-0 mr-2"
      />

      {/* min-w-0 is CRITICAL here to allow truncation */}
      <Link
        to={`/chats/${chat.conversationId}`}
        className="flex-1 min-w-0 flex flex-col"
      >
        <div className="flex items-center w-full gap-x-1 md:gap-x-1.5">
          <h3 className="text-xs lg:text-base truncate dark:text-white">
            {chat.name}
          </h3>
          {chat.unreadCount > 0 && (
            <SeperatorDot className="text-sm lg:text-base" />
          )}
          {chat.unreadCount > 0 && (
            <Badge variant={"primary"} size={"xs"} className="mb-1">
              {chat.unreadCount}
            </Badge>
          )}
        </div>
        <div className="flex justify-between items-baseline w-full">
          <p className="text-tiny lg:text-sm text-gray-500 truncate w-full">
            {chat.lastMessage}
          </p>
          <SeperatorDot className={"text-xs lg:text-sm mx-1 lg:mx-1.5"} />
          <time className="text-extratiny md:text-xs lg:text-sm text-gray-500 flex-shrink-0 ml-2">
            {formatShortenDate(new Date(chat.lastMessageAt))}
          </time>
        </div>
      </Link>

      <div className="flex flex-col items-end flex-shrink-0">
        <Button
          variant={"custom"}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <EllipsisVerticalIcon className="size-4 md:size-5 text-gray-500" />
        </Button>
      </div>
    </div>
  );
}

import { Button } from "@/shared/components/form/Button";
import { Link } from "react-router-dom";
import { ChatConversationPreview } from "../types/Chat";
import Badge from "@/shared/components/Badge";
import {
  BellIcon,
  EllipsisVerticalIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import SeperatorDot from "@/shared/components/SeperatorDot";
import { Formatters } from "@/utils/formatters";
import { memo } from "react";
import Dropdown from "@/shared/components/Dropdown";
import defaultProfile from "@/assets/profiles/default-profile.jpg";

interface ChatPreviewProps {
  chat: ChatConversationPreview;
}

function ChatPreview({ chat }: ChatPreviewProps) {
  const convoOptions = [
    {
      icon: <BellIcon className="size-4 md:size-5 lg:size-6 flex-shrink-0" />,
      label: "Mute Conversation",
    },
    {
      icon: <TrashIcon className="size-4 md:size-5 lg:size-6 flex-shrink-0" />,
      label: "Delete Convesrsation",
    },
  ];

  return (
    <div
      className={`flex items-center p-2 md:p-3 rounded-sm ${
        chat.hasNewMessage
          ? "bg-slate-200/50 dark:bg-slate-700/50 font-bold"
          : "bg-transparent"
      } hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200 ease-in-out w-full`}
    >
      <img
        src={chat.avatar ?? defaultProfile}
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
          {chat.unreadCount > 0 && (
            <SeperatorDot className="text-sm lg:text-base" />
          )}
          {chat.unreadCount > 0 && (
            <Badge variant={"primary"} size={"xs"} className="mb-1">
              {chat.unreadCount}
            </Badge>
          )}
        </div>
        <div className="flex justify-between items-baseline w-fit">
          <p className="text-xs text-gray-500 truncate w-fit">
            {chat.lastMessage.message}
          </p>
          <SeperatorDot className={"text-tiny lg:text-xs mx-1 lg:mx-1.5"} />
          <time className="text-xs text-gray-500 flex-shrink-0 ml-2">
            {Formatters.Date.formatShortenDate(
              new Date(chat.lastMessage.deliveredAt),
            )}
          </time>
        </div>
      </Link>

      <div className="flex shrink-0 ml-2">
        <Dropdown
          hasArrowIcon={false}
          align="right"
          trigger={
            <Button size={"custom"} variant={"custom"} className="group">
              <EllipsisVerticalIcon className="size-7 lg:size-9 p-1 text-gray-500 rounded-full group-hover:bg-gray-200 dark:group-hover:bg-gray-600" />
            </Button>
          }
          closeOnItemClick={true}
        >
          {convoOptions.map(({ label, icon }, index) => (
            <Dropdown.Item
              key={index}
              icon={icon}
              className="text-tiny md:text-xs lg:text-sm"
            >
              {label}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
    </div>
  );
}

export default memo(ChatPreview);

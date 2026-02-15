import { ConversationDetail } from "@/types/Message";
import { formatRelativeTime } from "@/utils/Dates";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "../Badge";
import { Button } from "../common/form/Button";
import { Input } from "../common/form/Input";
import Icon from "../Icon";
import { motion, AnimatePresence } from "motion/react";

interface InbokProps {
  conversations: ConversationDetail[];
}

export default function Inbox({ conversations }: InbokProps) {
  return (
    <aside className="h-full w-full bg-white flex flex-col border-r border-gray-200">
      <div className="p-6 shrink-0">
        <div className="flex items-center flex-wrap justify-between w-full">
          <h3 className="text-2xl text-black font-sans font-semibold text-left mb-1">
            Inbox
          </h3>
          <NewConversationDropdown />
        </div>
        <Input
          variant={"primary"}
          className="my-2 w-full"
          placeholder="Search conversations..."
          withSearch={true}
          inputSize={"md"}
        />
      </div>
      <section className="flex-1 overflow-y-auto flex justify-center items-start">
        {conversations && conversations.length > 0 ? (
          conversations.map((convo) => (
            <ConversationItem key={convo.conversationId} convo={convo} />
          ))
        ) : (
          <div className="text-gray-500 text-center mt-10">
            Start chatting with your friends!
          </div>
        )}
      </section>
    </aside>
  );
}

function ConversationItem({ convo }: { convo: ConversationDetail }) {
  return (
    <div
      key={convo.conversationId}
      className={`w-full p-3 flex items-center justify-between gap-2 ${convo.hasNewMessage ? "bg-gray-50 font-bold" : "bg-transparent"} hover:bg-gray-100 cursor-pointer transition-all duration-200 ease-in-out`}
    >
      <Icon size={"lg"} className={""} />
      <Link
        to={`/conversations/${convo.conversationId}/messages`}
        className="flex-1 inline-flex items-start flex-col"
      >
        <h3 className="font-sans text-base">{convo.name}</h3>
        <div className="inline-flex text-wrap items-center gap-1">
          <p className="font-sans text-xs line-clamp-1 truncate">
            {convo.lastMessage}
          </p>
          <time className="font-sans text-xs text-gray-500">
            {formatRelativeTime(new Date(convo.lastMessageAt))}
          </time>
        </div>
      </Link>
      <div className="inline-flex items-center">
        {convo.unreadCount > 0 && (
          <Badge variant={"primary"} size={"xs"}>
            {convo.unreadCount}
          </Badge>
        )}
        <Button
          variant={"custom"}
          className="p-1 rounded-full bg-transparent hover:bg-gray-200"
        >
          <EllipsisVerticalIcon className="w-5 h-5 text-gray-500" />
        </Button>
      </div>
    </div>
  );
}

function NewConversationDropdown() {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference for the whole container
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <Button
        onClick={() => setOpen(!open)}
        variant={"ghost"}
        className="rounded-full px-1 py-1.5"
      >
        <PencilSquareIcon
          className={
            "size-5 text-gray-700 transition-all duration-200 ease-in-out"
          }
        />
      </Button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute left-0 z-50 mt-2 text-start bg-white shadow-xl border border-gray-100 sm:w-60 w-72 rounded-lg overflow-hidden"
          >
            <li className="relative isolate block px-5 py-2.5 text-gray-700 transition-colors group-hover:text-black group-hover:bg-gray-100 duration-200 ease-in-out">
              New Conversation
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

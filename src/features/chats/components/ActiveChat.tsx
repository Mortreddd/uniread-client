import defaultProfile from "@/assets/profiles/default-profile.jpg";
import { Button } from "@/shared/components/form/Button";

import {
  ArrowLeftIcon,
  InformationCircleIcon,
  PhoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { memo } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetConversation } from "../hooks/useGetConversation";
import ChatMessages from "./ChatMessages";
import ChatMessageCreation from "./ChatMessageCreation";

function ActiveChat() {
  return (
    <div className="flex-1 flex flex-col min-h-0 min-w-0 relative overflow-hidden">
      <div className="shrink-0 min-h-0 relative shadow-lg">
        <ChatHeader />
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 p-4 no-scrollbar">
        <ChatMessages />
      </div>

      <div className="shrink-0 relative min-h-0">
        <ChatMessageCreation />
      </div>
    </div>
  );
}

function ChatHeader() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const { data, isLoading } = useGetConversation({ conversationId });
  return (
    <div className="w-full flex justify-between items-center bg-gray-100 dark:bg-slate-900 py-2 px-4 lg:py-3 lg:px-5">
      {isLoading && <HeaderSkeleton />}
      {data && (
        <>
          <div className="inline-flex items-center gap-1.5">
            <Link to={"/chats"}>
              <ArrowLeftIcon
                className={
                  "size-5 text-gray-800 dark:text-gray-200 inline lg:hidden mr-2 cursor-pointer"
                }
              />
            </Link>
            <div className="inline-flex items-center">
              <img
                src={data.avatarPhoto ?? defaultProfile}
                alt={"gojo satoru"}
                className="size-10 md:size-12 lg:size-14 object-cover border border-primary rounded-full flex-shrink-0"
              />

              <div className="ml-4">
                <h3 className="text-xs md:text-sm lg:text-base truncate dark:text-white mb-1.5">
                  {data.name}
                </h3>
              </div>
            </div>
          </div>
          <div className="inline-flex justify-end items-center">
            <Button variant={"transparent"} className={"rounded-full"}>
              <PhoneIcon
                className={
                  "size-4 md:size-5 text-primary dark:text-primary-dark "
                }
              />
            </Button>
            <Button variant={"transparent"} className={"rounded-full"}>
              <VideoCameraIcon
                className={
                  "size-4 md:size-5 text-primary dark:text-primary-dark "
                }
              />
            </Button>
            <Button variant={"transparent"} className={"rounded-full"}>
              <InformationCircleIcon
                className={
                  "size-4 md:size-5 text-primary dark:text-primary-dark "
                }
              />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function HeaderSkeleton() {
  return (
    <div className="size-full animate-pull bg-gray-300 dark:bg-slate-700 rounded-b"></div>
  );
}

export default memo(ActiveChat);

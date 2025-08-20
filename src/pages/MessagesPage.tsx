import Inbox from "@/components/messages/Inbox";
import { Outlet, useMatch } from "react-router-dom";
import AuthenticatedNavbar from "@/components/common/navbar/AuthenticatedNavbar";
import { motion } from "motion/react";

export default function MessagesPages() {
  const hasActiveConversation = useMatch(
    "/conversations/:conversationId/messages"
  );
  return (
    <>
      <header className={"w-full relative h-fit"}>
        <AuthenticatedNavbar />
      </header>
      <div className="w-full h-full flex">
        <div className="w-full h-full flex">
          <motion.div
            initial={{
              opacity: 0,
              x: -10,
            }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.3,
                ease: "easeInOut",
              },
            }}
            className="w-fit h-full"
          >
            <Inbox />
          </motion.div>
          <div className="flex-1">
            {hasActiveConversation ? (
              <Outlet />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-100">
                <p className="text-2xl text-gray-400">No active conversation</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

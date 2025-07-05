import Inbox from "@/components/messages/Inbox";
import { Outlet, useMatch } from "react-router-dom";
import AuthenticatedNavbar from "@/components/common/navbar/AuthenticatedNavbar";
import { motion } from "motion/react";

export default function MessagesPages() {
  const hasNoActiveConversation = useMatch("/conversations");
  return (
    <>
      <header className={"w-full relative"}>
        <AuthenticatedNavbar />
      </header>
      <div className="w-full h-full flex min-h-[87vh] relative">
        <div className="flex-1 flex">
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
            {hasNoActiveConversation ? (
              <div className="h-full w-full flex items-center justify-center bg-gray-100">
                <p className="text-2xl text-gray-400">No active conversation</p>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

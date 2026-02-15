import Inbox from "@/components/messages/Inbox";
import { Outlet, useMatch, useOutletContext } from "react-router-dom";
import AuthenticatedNavbar from "@/components/common/navbar/AuthenticatedNavbar";
import { motion } from "motion/react";
import BaseLayout from "@/layouts/BaseLayout";
import { useMessage } from "@/contexts/MessageContext";
import { ConversationDetail } from "@/types/Message";

interface ConnversationContextProps {
  conversation: ConversationDetail | null;
}

export default function MessagesPages() {
  const { conversations, activeConversation } = useMessage();
  const hasActiveConversation = useMatch(
    "/conversations/:conversationId/messages",
  );
  return (
    <BaseLayout>
      <div className="flex-1 overflow-hidden">
        <header className={"w-full shrink-0"}>
          <AuthenticatedNavbar />
        </header>
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
            className="w-sm h-full"
          >
            <Inbox conversations={conversations} />
          </motion.div>
          <div className="relative flex-1 bg-gray-50">
            {hasActiveConversation && (
              <Outlet
                context={
                  {
                    conversation: activeConversation,
                  } satisfies ConnversationContextProps
                }
              />
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export function useConversationContext() {
  return useOutletContext<ConnversationContextProps>();
}

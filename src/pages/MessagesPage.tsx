import { useNavigate } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/shared/components/form/Button";
import { ArrowLeftIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import Sidebar from "@/shared/components/Sidebar";

import ActiveChat from "@/features/chats/components/ActiveChat";
import ConversationsList from "@/features/chats/components/ConversationsList";
import { useLayout } from "@/contexts/LayoutContext";
import { useSidebar } from "@/contexts/SidebarContext";

export default function MessagesPages() {
  const { closeSidebar } = useSidebar();
  const { setHasSidebar } = useLayout();
  setHasSidebar(true);

  return (
    <AppLayout>
      <section className="flex flex-1 min-h-0 relative dark:bg-slate-800 bg-slate-100">
        {/* Automatic expandable sidebar and responsive */}
        <div className="flex flex-col shrink-0">
          <Sidebar>
            <ConversationsList />
          </Sidebar>
        </div>
        <div className="flex-1 relative flex flex-col">
          {/* Auto hide button option for mobile */}
          <div className="flex items-center md:hidden bg-transparent">
            <Button variant={"transparent"} onClick={() => navigate(-1)}>
              <ArrowLeftIcon
                className={
                  "text-black dark:text-white text-xs md:text-base size-4"
                }
              />
            </Button>
            <Button
              variant={"transparent"}
              className={"rounded"}
              onClick={() => sidebarRef.current?.open()}
            >
              <Bars3Icon
                className={
                  "text-black dark:text-white text-xs md:text-base size-4"
                }
              />
            </Button>
          </div>
          <div className="flex-1 relative flex flex-col min-w-0">
            <ActiveChat />
          </div>
        </div>
      </section>
    </AppLayout>
  );
}

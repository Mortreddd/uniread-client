import AppLayout from "@/layouts/AppLayout";
import Sidebar from "@/shared/components/Sidebar";

import ConversationsList from "@/features/chats/components/ConversationsList";
import { useLayout } from "@/contexts/LayoutContext";
import useMobileCheck from "@/hooks/useMobileCheck";
import { useEffect } from "react";
import { matchPath, Outlet, useLocation } from "react-router-dom";

export default function ChatsPage() {
  const isMobile = useMobileCheck(768);
  const { setHasSidebar } = useLayout();

  useEffect(() => {
    setHasSidebar(!isMobile);
  }, [isMobile]);

  return <AppLayout>{isMobile ? <MobileView /> : <DesktopView />}</AppLayout>;
}

function DesktopView() {
  const { pathname } = useLocation();

  const isMatch = matchPath({ path: "/chats" }, pathname);

  return (
    <section className="flex flex-1 min-h-0 relative dark:bg-slate-800 bg-slate-100">
      <div className="flex flex-col shrink-0">
        <Sidebar>
          <ConversationsList />
        </Sidebar>
      </div>
      <div className="flex-1 relative flex flex-col">
        <div className="flex-1 relative flex flex-col min-w-0">
          {isMatch ? (
            <div className="flex-1 min-w-0 flex justify-center items-center">
              <h1 className="text-2xl font-serif font-medium text-gray-700 tracking-tight dark:text-gray-200">
                No selected conversation
              </h1>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </section>
  );
}

function MobileView() {
  const { pathname } = useLocation();

  const isMatch = matchPath({ path: "/chats" }, pathname);

  return (
    <section className="flex flex-1 min-h-0 relative dark:bg-slate-800 bg-slate-100">
      <div className="flex-1 relative flex flex-col shrink-0 min-w-0">
        {isMatch ? <ConversationsList /> : <Outlet />}
      </div>
    </section>
  );
}

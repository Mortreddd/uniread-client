import Inbox from "@/components/messages/Inbox";
import { Outlet, useMatch } from "react-router-dom";
import Navbar from "@/components/common/navbar/Navbar.tsx";

export default function MessagesPages() {
  const hasNoActiveConversation = useMatch("/conversations");
  return (
    <>
      <header className={'w-full relative'}>
        <Navbar />
      </header>
      <div className="w-full h-full flex flex-col">
        <div className="flex grow">
          <div className="w-fit h-full">
            <Inbox />
          </div>
          <div className="flex-1 flex flex-col">
            {hasNoActiveConversation ? (
              <div className="grow flex items-center justify-center bg-gray-100">
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

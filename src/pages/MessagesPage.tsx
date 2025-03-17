import Navbar from "@/components/common/navbar/Navbar";
import Inbox from "@/components/messages/Inbox";
import { Fragment } from "react";
import { Outlet, useMatch } from "react-router-dom";

export default function MessagesPages() {
  const hasNoActiveConversation = useMatch("/messages");

  return (
    <Fragment>
      <div className="w-full min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-grow">
          <div className="w-fit h-full">
            <Inbox />
          </div>
          <div className="flex-1 flex flex-col">
            {hasNoActiveConversation ? (
              <div className="flex-grow flex items-center justify-center bg-gray-100">
                <p className="text-2xl text-gray-400">No active conversation</p>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

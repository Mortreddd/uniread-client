import { Fragment, memo } from "react";
import Icon from "../Icon";
import { Message } from "@/types/Message";

interface ChatProps {
  latestMessage: Message | undefined;
}

function Chat({ latestMessage, ...props }: ChatProps) {
  const fullName = `${latestMessage?.sender?.firstName} ${latestMessage?.sender?.lastName}`;
  return (
    <Fragment>
      <div
        {...props}
        className="bg-gray-50 rounded p-4 flex items-center transition-all duration-200 ease-in-out hover:bg-gray-100 cursor-pointer"
      >
        <Icon />
        <div className="flex flex-col ml-4 min-w-48">
          <h3 className="text-lg font-bold text-black ">
            {fullName ?? "Unknown"}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-1 truncate mr-3">
            {latestMessage?.message}
          </p>
        </div>
        <p className="text-xs font-bold text-black">2:00 PM</p>
      </div>
    </Fragment>
  );
}

export default memo(Chat);

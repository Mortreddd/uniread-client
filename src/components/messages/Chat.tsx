import { memo } from "react";
import Icon from "../Icon";
import {Conversation} from "@/types/Message";
import {useAuth} from "@/contexts/AuthContext.tsx";

interface ChatProps {
  conversation: ;
}

function Chat({ conversation, ...props }: ChatProps) {
  
  return (
      <div
        {...props}
        className="bg-gray-50 rounded-sm p-4 flex items-center transition-all duration-200 ease-in-out hover:bg-gray-100 cursor-pointer"
      >
        <Icon />
        <div className="flex flex-col ml-4 min-w-48">
          <h3 className="text-lg font-bold text-black ">
            {conversationName}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-1 truncate mr-3">
            {message?.message ?? "Start a conversation"}
          </p>
        </div>
        <p className="text-xs font-bold text-black">2:00 PM</p>
      </div>
  );
}

export default memo(Chat);

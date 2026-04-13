import gojoProfile from "@/assets/profiles/gojo.jpg";
import { Button } from "@/shared/components/form/Button";
import { Input } from "@/shared/components/form/Input";
import {
  FaceSmileIcon,
  InformationCircleIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  PlusIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

function ActiveChat() {
  return (
    <div className="w-full flex flex-col h-full overflow-hidden">
      <ChatHeader />

      <div className="flex-1 min-h-0 overflow-y-auto p-4">
        <ChatMessages />
      </div>

      <ChatMessageCreation />
    </div>
  );
}

function ChatHeader() {
  return (
    <div className="w-full flex shrink-0 justify-between items-center py-2 px-4 lg:py-3 lg:px-5 shadow-lg bg-gray-100 dark:bg-slate-900">
      <div className="inline-flex items-center">
        <img
          src={gojoProfile}
          alt={"gojo satoru"}
          className="size-10 md:size-12 lg:size-14 object-cover border border-primary rounded-full flex-shrink-0"
        />

        <div className="ml-4">
          <h3 className="text-xs md:text-sm lg:text-base truncate dark:text-white mb-1.5">
            Gojo Satoru
          </h3>
          <p className="text-green-600 font-sans text-tiny md:text-xs">
            Active
          </p>
        </div>
      </div>
      <div className="inline-flex justify-end items-center">
        <Button variant={"transparent"} className={"rounded-full"}>
          <PhoneIcon
            className={"size-4 md:size-5 text-primary dark:text-primary-dark "}
          />
        </Button>
        <Button variant={"transparent"} className={"rounded-full"}>
          <VideoCameraIcon
            className={"size-4 md:size-5 text-primary dark:text-primary-dark "}
          />
        </Button>
        <Button variant={"transparent"} className={"rounded-full"}>
          <InformationCircleIcon
            className={"size-4 md:size-5 text-primary dark:text-primary-dark "}
          />
        </Button>
      </div>
    </div>
  );
}

function ChatMessages() {
  return <div className="min-h-full bg-transparent"></div>;
}

function ChatMessageCreation() {
  return (
    <div className="w-full shrink-0 bg-gray-100 dark:bg-slate-900 flex items-center md:p-3 p-2">
      <div className="flex items-center bg-gray-100 dark:bg-slate-900 w-full">
        <Button variant={"transparent"} className={"rounded-full shrink-0"}>
          <PlusIcon
            className={"size-4 md:size-5 text-primary dark:text-primary-dark"}
          />
        </Button>
        <Button variant={"transparent"} className={"rounded-full shrink-0"}>
          <FaceSmileIcon
            className={"size-4 md:size-5 text-primary dark:text-primary-dark"}
          />
        </Button>
        <Input className={"flex-1"} placeholder="Type a message..." />
        <Button variant={"transparent"} className={"rounded-full shrink-0"}>
          <PaperAirplaneIcon
            className={"size-4 md:size-5 text-primary dark:text-primary-dark"}
          />
        </Button>
      </div>
    </div>
  );
}

export default ActiveChat;

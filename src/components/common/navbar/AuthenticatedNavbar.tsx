import { Button } from "../form/Button";
import { Link } from "react-router-dom";
import { BuildingLibraryIcon } from "@heroicons/react/24/outline";

import Popover from "@/components/Popover.tsx";
import MessageButton from "../../messages/MessageButton.tsx";
import ProfileDropdown from "../dropdown/ProfileDropdown.tsx";
import NotificationDropdown from "../dropdown/NotificationDropdown.tsx";
import WriteDropdown from "../dropdown/WriteDropdown.tsx";
export default function AuthenticatedNavbar() {
  return (
    <div className="flex items-center gap-3 md:gap-5 h-fit">
      {/**
       * Library navbar option
       */}
      <Link to="/library/saved">
        <Button
          variant={"light"}
          size={"custom"}
          className={"rounded-full p-3"}
        >
          <BuildingLibraryIcon className={"size-5"} />
          <Popover position={"top"}>
            <h3 className="text-xs font-sans text-black">Library</h3>
          </Popover>
        </Button>
      </Link>

      <div className="relative">
        <WriteDropdown />
      </div>
      {/* Messages navbar option*/}
      <MessageButton />

      {/* Notification navbar option */}
      <NotificationDropdown />

      {/*
       * Avatar dropdown with preferences options
       */}

      <ProfileDropdown />
    </div>
  );
}

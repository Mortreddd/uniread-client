import { Fragment } from "react";
import { Button } from "../form/Button";
import { Link } from "react-router-dom";
import { BuildingLibraryIcon, PencilIcon } from "@heroicons/react/24/outline";

import Popover from "@/components/Popover.tsx";
import MessageButton from "../../messages/MessageButton.tsx";
import ProfileDropdown from "../dropdown/ProfileDropdown.tsx";
import NotificationDropdown from "../dropdown/NotificationDropdown.tsx";
export default function AuthenticatedNavbar() {
  return (
    <Fragment>
      <div className="flex items-center gap-3 md:gap-5 h-fit">
        <Button
          variant={"light"}
          size={"custom"}
          className={"rounded-full p-3"}
        >
          <Link to="/write">
            <PencilIcon className={"size-5"} />
          </Link>
        </Button>
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
        {/* Messages navbar option*/}
        <MessageButton />

        {/* Notification navbar option */}
        <NotificationDropdown />

        {/*
         * Avatar dropdown with preferences options
         */}

        <div>
          <ProfileDropdown />
        </div>
      </div>
    </Fragment>
  );
}

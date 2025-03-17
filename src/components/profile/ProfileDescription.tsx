import { NavLink, Outlet } from "react-router-dom";
import { Button } from "../common/form/Button";
import { EnvelopeIcon, UserPlusIcon } from "@heroicons/react/24/outline";

export default function ProfileDescription() {
  const isFollowed = true;

  return (
    <>
      <div className="w-full h-full">
        <div className="w-full h-fit shadow-lg px-10 bg-white flex justify-between items-center">
          <div className="h-fit flex items-center justify-start gap-10">
            <NavLink
              to="/profile/works"
              className={({ isActive }) =>
                `${
                  isActive ? "border-b-2 border-solid border-primary" : ""
                } text-2xl font-bold py-2 px-4 text-black`
              }
            >
              Works
            </NavLink>
            <NavLink
              // Replace with the actual usernmae
              to="/profile/about"
              className={({ isActive }) =>
                `${
                  isActive ? "border-b-2 border-solid border-primary" : ""
                } text-2xl font-bold py-2 px-4 text-black`
              }
            >
              About
            </NavLink>
          </div>
          <div className="h-fit flex items-start justify-end gap-3">
            <Button
              variant={"primary"}
              size={"md"}
              className="flex items-center gap-2 px-3 rounded py-2"
            >
              <UserPlusIcon className="size-6" />
              <span>Follow</span>
            </Button>
            {isFollowed && (
              <Button
                variant={"primary"}
                size={"md"}
                className="flex items-center gap-2 px-3 rounded py-2"
              >
                <EnvelopeIcon className="size-6" />
                <span>Message</span>
              </Button>
            )}
          </div>
        </div>
        <div className="w-full h-fit">
          <Outlet />
        </div>
      </div>
    </>
  );
}

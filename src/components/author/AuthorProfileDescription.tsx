import { NavLink, Outlet } from "react-router-dom";
import { Button } from "../common/form/Button";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { UserMinusIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";

interface AuthorProfileDescriptionProps {
  userId?: string;
}

export default function AuthorProfileDescription({
  userId,
}: AuthorProfileDescriptionProps) {
  const { user: currentUser } = useAuth();
  const isFollowed = currentUser?.followings?.some(
    (f) => f.following.id === userId
  );
  return (
    <div className="w-full h-full">
      <div className="w-full h-fit shadow-lg px-10 bg-white flex justify-between items-center">
        <div className="h-fit flex items-center justify-start gap-10">
          <NavLink
            to={`/authors/${userId}/profile/works`}
            className={({ isActive }) =>
              `${
                isActive ? "border-b-2 border-solid border-primary" : ""
              } text-xl font-bold py-2 px-4 text-black`
            }
          >
            Works
          </NavLink>
          <NavLink
            // Replace with the actual usernmae
            to={`/authors/${userId}/profile/about`}
            className={({ isActive }) =>
              `${
                isActive ? "border-b-2 border-solid border-primary" : ""
              } text-xl font-bold py-2 px-4 text-black`
            }
          >
            About
          </NavLink>
        </div>
        <div className="h-fit flex items-start justify-end gap-3">
          {isFollowed ? (
            <Button
              variant={"primary"}
              size={"md"}
              className="flex items-center gap-2 px-3 rounded py-2"
            >
              <UserMinusIcon className="size-6" />
              <span>Unfollow</span>
            </Button>
          ) : (
            <Button
              variant={"primary"}
              size={"md"}
              className="flex items-center gap-2 px-3 rounded py-2"
            >
              <UserPlusIcon className="size-6" />
              <span>Follow</span>
            </Button>
          )}
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
  );
}

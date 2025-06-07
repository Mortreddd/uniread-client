import {NavLink, Outlet, useOutletContext} from "react-router-dom";
import { Button } from "../common/form/Button";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { UserMinusIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "@/types/User.ts";
import {useRef} from "react";
import { ModalRef } from "../common/modal/Modal";
import LoginModal from "../common/modal/auth/LoginModal";
import useFollow from "@/hooks/useFollow.ts";
interface AuthorInfo {
  author?: User | null
}
interface AuthorProfileDescriptionProps {
  user?: User | null;
}

export default function AuthorProfileDescription({
  user,
}: AuthorProfileDescriptionProps) {
  const { isLoggedIn } = useAuth();
  const loginModalRef = useRef<ModalRef>(null);
  const { isMutualFollowing, followUser, unfollowUser } = useFollow();
  function onFollow() {
    if (!isLoggedIn()) {
      loginModalRef.current?.open();
      return;
    }

    followUser(user?.id)
  }

  function onUnfollow() {
    if (!isLoggedIn()) {
      loginModalRef.current?.open()
      return;
    }

    unfollowUser(user?.id)
  }

  return (
    <>
      <div className="w-full h-full">
        <LoginModal ref={loginModalRef} />
        <div className="w-full h-fit shadow-lg px-10 bg-white flex justify-between items-center">
          <div className="h-fit flex items-center justify-start gap-10">
            <NavLink
              to={`/authors/${user?.id}/profile/works`}
              className={({ isActive }) =>
                `${
                  isActive ? "border-b-2 border-solid border-primary" : ""
                } text-xl font-bold py-2 px-4 text-black`
              }
            >
              Works
            </NavLink>
            <NavLink
              // Replace with the actual username
              to={`/authors/${user?.id}/profile/about`}
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
            {isMutualFollowing(user?.id) ? (
              <Button
                variant={"inactivePrimary"}
                size={"md"}
                onClick={() => onUnfollow()}
                className="flex items-center gap-2 px-3 rounded-sm py-2"
              >
                <UserMinusIcon className="size-6" />
                <span>Unfollow</span>
              </Button>
            ) : (
              <Button
                variant={"primary"}
                size={"md"}
                onClick={() => onFollow()}
                className="flex items-center gap-2 px-3 rounded-sm py-2"
              >
                <UserPlusIcon className="size-6" />
                Follow
              </Button>
            )}
            {isMutualFollowing(user?.id) && (
              <Button
                variant={"primary"}
                size={"md"}
                className="flex items-center gap-2 px-3 rounded-sm py-2"
              >
                <EnvelopeIcon className="size-6" />
                <span>Message</span>
              </Button>
            )}
          </div>
        </div>
        <div className="w-full h-fit">
          <Outlet context={{ author : user } satisfies AuthorInfo} />
        </div>
      </div>
    </>
  );
}


export function useAuthorInfo() {
  return useOutletContext<AuthorInfo>()
}
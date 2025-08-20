import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import { Button } from "../common/form/Button";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { UserMinusIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import { AuthorDetail } from "@/types/User.ts";
import { useRef } from "react";
import { ModalRef } from "../common/modal/Modal";
import LoginModal from "../common/modal/auth/LoginModal";
import useFollow from "@/hooks/useFollow.ts";
import { useToast } from "@/contexts/ToastContext.tsx";
import NewMessageModal from "../common/modal/message/NewMessageModal";

interface AuthorInfo {
  author?: AuthorDetail | null;
}
interface AuthorProfileDescriptionProps {
  user?: AuthorDetail | null;
}

export default function AuthorProfileDescription({
  user,
}: AuthorProfileDescriptionProps) {
  const { isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const loginModalRef = useRef<ModalRef>(null);
  const newMessageModal = useRef<ModalRef>(null);
  const { followUser, unfollowUser } = useFollow();
  async function onFollow() {
    if (!isLoggedIn()) {
      loginModalRef.current?.open();
      return;
    }

    await followUser(user?.id, {
      onSuccess: (message) => {
        showToast(message, "success");
      },
      onError: (message) => {
        showToast(message, "error");
      },
    });
  }

  async function onUnfollow() {
    if (!isLoggedIn()) {
      loginModalRef.current?.open();
      return;
    }

    await unfollowUser(user?.id, {
      onSuccess: (message) => {
        showToast(message, "info");
      },
      onError: (message) => {
        showToast(message, "error");
      },
    });
  }

  function onClickMessage() {
    if (!isLoggedIn()) {
      loginModalRef.current?.open();
      return;
    }
    // Logic to open the message modal or redirect to messages page

    newMessageModal.current?.open();
  }

  return (
    <>
      <div className="w-full h-full">
        <LoginModal ref={loginModalRef} />
        {user ? (
          <NewMessageModal
            author={user}
            onCreateMessage={() => newMessageModal.current?.close()}
            ref={newMessageModal}
          />
        ) : null}
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
            {user?.isFollowing ? (
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
            <Button
              variant={"primary"}
              size={"md"}
              className="flex items-center gap-2 px-3 rounded-sm py-2"
              onClick={onClickMessage}
            >
              <EnvelopeIcon className="size-6" />
              <span>Message</span>
            </Button>
          </div>
        </div>
        <div className="w-full h-fit">
          <Outlet context={{ author: user } satisfies AuthorInfo} />
        </div>
      </div>
    </>
  );
}

export function useAuthorInfo() {
  return useOutletContext<AuthorInfo>();
}

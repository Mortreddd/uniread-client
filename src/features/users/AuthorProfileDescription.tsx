import { Button } from "@/shared/components/form/Button.tsx";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { UserMinusIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext.tsx";
import { AuthorDetail } from "@/types/User.ts";
import { useRef } from "react";
import { ModalRef } from "../../shared/components/Modal.tsx";
import LoginModal from "@/features/authentication/LoginModal.tsx";
import useFollow from "@/hooks/useFollow.ts";
import { useToast } from "@/contexts/ToastContext.tsx";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import api from "@/core/api/ApiService.ts";
import { AxiosError } from "axios";
import { ConversationInfo } from "@/features/chats/types/Chat.ts";

interface AuthorInfo {
  author?: AuthorDetail | null;
}
interface AuthorProfileDescriptionProps {
  user?: AuthorDetail | null;
}

export default function AuthorProfileDescription({
  user,
}: AuthorProfileDescriptionProps) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const loginModalRef = useRef<ModalRef>(null);
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

  async function onClickMessage() {
    if (!user) return;

    if (!isLoggedIn()) {
      loginModalRef.current?.open();
      return;
    }

    try {
      const response = await api.get<ConversationInfo>(
        `/conversations/recipient/${user.id}`,
        {
          params: { isGroup: false },
        },
      );

      // 3. Robust check for existing conversation
      if (response.data && response.data.id) {
        navigate(`/conversations/${response.data.id}`);
      } else {
        // Fallback if 200 OK but body is empty
        navigate(`/conversations/new/${user.id}`);
      }
    } catch (error) {
      const axiosError = error as AxiosError;

      // 4. Handle 404 (New conversation needed)
      if (axiosError.response?.status === 404) {
        navigate(`/conversations/new/${user.id}`);
      } else {
        showToast("Could not open messages. Please try again.", "error");
      }
    }
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
      </div>
    </>
  );
}

export function useAuthorInfo() {
  return useOutletContext<AuthorInfo>();
}

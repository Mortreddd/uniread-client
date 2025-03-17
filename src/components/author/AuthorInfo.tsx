import defaultProfile from "@/assets/profiles/default-profile.jpg";
import Icon from "../Icon";
import { User } from "@/types/User";
import { Button } from "../common/form/Button";
import { UserMinusIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { HTMLAttributes, useRef } from "react";
import { cn } from "@/utils/ClassNames";
import { Link } from "react-router-dom";
import api from "@/services/ApiService";
import { Follow } from "@/types/Follow";
import { AxiosError, AxiosResponse } from "axios";
import { useAlert } from "@/contexts/AlertContext";
import { useAuth } from "@/contexts/AuthContext";
import { ModalRef } from "../common/modal/Modal";
import LoginModal from "../common/modal/auth/LoginModal";
import { ErrorResponse } from "@/types/Error";
import { SuccessResponse } from "@/types/Success";

interface AuthorInfoProps extends HTMLAttributes<HTMLDivElement> {
  user?: User;
}

export default function AuthorInfo({ user, className }: AuthorInfoProps) {
  const loginModalRef = useRef<ModalRef>(null);

  const fullName = `${user?.firstName} ${user?.lastName}`;
  const { showAlert } = useAlert();
  const { user: currentUser, isLoggedIn } = useAuth();
  const requesterId: string | undefined = currentUser?.id;

  const followUser: () => Promise<void> = async () => {
    if (!isLoggedIn()) {
      loginModalRef.current?.open();
      return;
    }
    api
      .post(`/users/${user?.id}/follow/new`, {
        requesterId,
      })
      .then((response: AxiosResponse<Follow>) => {
        console.log(response);
        showAlert(`You followed ${response.data.following.username}`, "info");
        currentUser?.followings.push(response.data);
      })
      .catch((error: AxiosError<ErrorResponse>) => console.log(error));
  };

  const unfollowUser: () => Promise<void> = async () => {
    if (!isLoggedIn()) {
      loginModalRef.current?.open();
      return;
    }
    api
      .delete(`/users/${user?.id}/follow/unfollow/${requesterId}`)
      .then((response: AxiosResponse<SuccessResponse>) => {
        showAlert(response.data.message, "info");
        if (currentUser?.followings) {
          currentUser.followings = currentUser?.followings?.filter(
            (f) => f.following.id === user?.id
          );
        }
      })
      .catch((error: AxiosError<ErrorResponse>) =>
        showAlert(
          error?.response?.data.message ?? "Unable to unfollow user",
          "error"
        )
      );
  };

  const isFollowing = currentUser?.followings?.some(
    (f) => f.following.id === user?.id
  );

  return (
    <div
      className={cn(
        className,
        "w-full h-full py-2 md:py-3 px-4 md:px-6 bg-gray-100"
      )}
    >
      <LoginModal ref={loginModalRef} />
      <div className="w-full h-full flex items-center justify-between">
        <Icon
          src={defaultProfile}
          size={"2xl"}
          bordered={"primary"}
          className={"mr-2 md:mr-4"}
        />
        <div className="flex flex-1 flex-col gap-2 justify-center md:gap-3">
          <div className="w-full items-center gap-3 md:gap-5">
            <Link to={`/authors/${user?.username}/profile/works`}>
              <h2 className="text-xl font-bold font-sans hover:underline">
                {fullName}
              </h2>
            </Link>
            <p className="text-gray-500 font-semibold text-md">
              {`@${user?.username}`}
            </p>
          </div>
          <div className="flex w-full items-center gap-3 md:gap-5">
            <h2 className="text-lg font-semibold text-gray-500 font-sans">
              16 stories
            </h2>
            <p className="text-gray-500 font-semibold text-lg">2.4 followers</p>
          </div>
        </div>

        <div className="w-fit flex items-center">
          {isFollowing ? (
            <Button
              variant={"primary"}
              onClick={unfollowUser}
              className="rounded flex items-center gap-1 md:gap-2"
            >
              <UserMinusIcon className={"size-4 md:size-6"} />
              Unfollow
            </Button>
          ) : (
            <Button
              variant={"primary"}
              onClick={followUser}
              className="rounded flex items-center gap-1 md:gap-2"
            >
              <UserPlusIcon className={"size-4 md:size-6"} />
              Follow
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

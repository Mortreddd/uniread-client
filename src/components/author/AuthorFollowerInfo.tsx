import { Button } from "@/components/common/form/Button.tsx";
import Icon from "@/components/Icon.tsx";
import gojoProfilePicture from "@/assets/profiles/gojo.jpg";
import { UserMinusIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { memo } from "react";
import useFollow from "@/hooks/useFollow.ts";
import {useToast} from "@/contexts/ToastContext.tsx";
import {AuthorDetail} from "@/types/User.ts";
import {useAuth} from "@/contexts/AuthContext.tsx";

interface AuthorFollowerInfo {
  author: AuthorDetail;
}

function AuthorFollowerInfo({
  author,
}: AuthorFollowerInfo) {
  const { showToast } = useToast();
  const { user: currentUser } = useAuth();
  const { followUser, unfollowUser } = useFollow();

  async function onFollow() {
    await followUser(author.id, {
      onSuccess: message => {
        showToast(message, "success")
      },
      onError: message => {
        showToast(message, "error")
      }
    })
  }

  async function onUnfollow() {
    await unfollowUser(author.id, {
      onSuccess: message => {
        showToast(message, "success")
      },
      onError: message => {
        showToast(message, "error")
      }
    })
  }

  return (
    <div className={"w-full bg-transparent rounded-sm flex items-center py-1"}>
      <Icon src={gojoProfilePicture} size={"lg"} className="mr-3" />
      <div className="flex flex-1 items-center">
        <div className="w-full inline-block">
          <h1 className="text-lg font-bold">{author.fullName}</h1>
          <h1 className="font-semibold">@{author.username}</h1>
        </div>
        {currentUser?.id !== author.id && (
        author.isFollowing? (
            <Button
              variant={"inactivePrimary"}
              size={"md"}
              onClick={onUnfollow}
              className="flex items-center gap-2 px-3 rounded-sm py-2"
            >
              <UserMinusIcon className={"size-5"} />
            </Button>
          ) : (
            <Button
              variant={"primary"}
              onClick={onFollow}
              size={"md"}
              className="flex items-center gap-2 px-3 rounded-sm py-2"
            >
              <UserPlusIcon className={"size-5"} />
            </Button>
          )
        )}
      </div>
    </div>
  );
}

export default memo(AuthorFollowerInfo);

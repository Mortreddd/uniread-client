import { Follow } from "@/types/Follow.ts";
import { Button } from "@/components/common/form/Button.tsx";
import Icon from "@/components/Icon.tsx";
import gojoProfilePicture from "@/assets/profiles/gojo.jpg";
import { UserMinusIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { memo } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface AuthorFollowerInfo {
  follow: Follow;
  isMutualFollowing: boolean;
  onFollow: (authorId: string) => Promise<void>;
  onUnfollow: (authorId: string) => Promise<void>;
}

function AuthorFollowerInfo({
  follow,
  isMutualFollowing,
  onFollow,
  onUnfollow,
}: AuthorFollowerInfo) {
  const { follower } = follow;
  const { user: currentUser } = useAuth();

  return (
    <div className={"w-full bg-transparent rounded flex items-center py-1"}>
      <Icon src={gojoProfilePicture} size={"lg"} className="mr-3" />
      <div className="flex flex-1 items-center">
        <div className="w-full inline-block">
          <h1 className="text-lg font-bold">{follower.fullName}</h1>
          <h1 className="font-semibold">@{follower?.username}</h1>
        </div>
        {currentUser?.id !== follower.id &&
          (isMutualFollowing ? (
            <Button
              variant={"inactivePrimary"}
              size={"md"}
              onClick={() => onUnfollow(follower.id)}
              className="flex items-center gap-2 px-3 rounded py-2"
            >
              <UserMinusIcon className={"size-5"} />
            </Button>
          ) : (
            <Button
              variant={"primary"}
              onClick={() => onFollow(follower.id)}
              size={"md"}
              className="flex items-center gap-2 px-3 rounded py-2"
            >
              <UserPlusIcon className={"size-5"} />
            </Button>
          ))}
      </div>
    </div>
  );
}

export default memo(AuthorFollowerInfo);

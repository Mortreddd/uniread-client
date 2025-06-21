import defaultProfile from "@/assets/profiles/default-profile.jpg";
import Icon from "../Icon";
import {AuthorDetail} from "@/types/User";
import { Button } from "../common/form/Button";
import { UserMinusIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { HTMLAttributes, memo } from "react";
import { cn } from "@/utils/ClassNames";
import { Link } from "react-router-dom";

interface AuthorInfoProps extends HTMLAttributes<HTMLDivElement> {
  author: AuthorDetail;
  onFollow: (authorId: string) => Promise<void>;
  onUnfollow: (authorId: string) => Promise<void>;
  isFollowing: boolean;
}

function AuthorInfo({
  author,
  className,
  onUnfollow,
  onFollow,
  isFollowing,
}: AuthorInfoProps) {
  const fullName = `${author?.firstName} ${author?.lastName}`;

  return (
    <div
      className={cn(
        className,
        "w-full h-full py-2 md:py-3 px-4 md:px-6 bg-gray-100"
      )}
    >
      <div className="w-full h-full flex items-center justify-between">
        <Icon
          src={defaultProfile}
          size={"2xl"}
          bordered={"primary"}
          className={"mr-2 md:mr-4"}
        />
        <div className="flex flex-1 flex-col gap-2 justify-center md:gap-3">
          <div className="w-full items-center gap-3 md:gap-5">
            <Link to={`/authors/${author.id}/profile`}>
              <h2 className="text-xl font-bold font-sans hover:underline">
                {fullName}
              </h2>
            </Link>
            <p className="text-gray-500 font-semibold text-md">
              {`@${author.username}`}
            </p>
          </div>
          <div className="flex w-full items-center gap-3 md:gap-5">
            <h2 className="text-lg font-semibold text-gray-500 font-sans">
              {author.storiesCount} stories
            </h2>
            <p className="text-gray-500 font-semibold text-lg">
              {author.followersCount} followers
            </p>
          </div>
        </div>

        <div className="w-fit flex items-center">
          {isFollowing ? (
            <Button
              variant={"inactivePrimary"}
              onClick={() => onUnfollow(author.id)}
              className="rounded-xs flex items-center gap-1 md:gap-2"
            >
              <UserMinusIcon className={"size-4 md:size-6"} />
              Unfollow
            </Button>
          ) : (
            <Button
              variant={"primary"}
              onClick={() => onFollow(author.id)}
              className="rounded-xs flex items-center gap-1 md:gap-2"
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

export default memo(AuthorInfo);

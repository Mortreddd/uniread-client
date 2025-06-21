import gojoProfile from "@/assets/profiles/gojo.jpg";
import Icon from "../Icon";
import { Button } from "../common/form/Button";
import {AuthorDetail as AuthorDetailType} from "@/types/User";
import { UserPlusIcon, UserMinusIcon } from "@heroicons/react/24/outline";
import { memo } from "react";
import { Link } from "react-router-dom";
interface AuthorDetailProps {
  user: AuthorDetailType;
  onUnfollow: (authorId: string) => void;
  onFollow: (authorId: string) => void
  isFollowing: boolean;
}

function AuthorDetail({
  user,
  onUnfollow,
  onFollow,
  isFollowing,
}: AuthorDetailProps) {
  return (
    <article className={"rounded-lg w-full border shadow-md pt-10"}>
      <div className="flex w-full flex-col">
        <div className="items-center flex flex-col w-full">
          <Icon src={gojoProfile} size={"xl"} className={"mx-auto"} />
          <Link to={`/authors/${user.id}/profile/works`}>
            <h2 className="text-xl font-sans font-semibold text-black">
              {user.fullName}
            </h2>
            <h2 className="text-md font-sans font-semibold text-gray-500">
              @{user.username}
            </h2>
          </Link>
          <div className="w-full px-5 mt-2 flex justify-center">
            {isFollowing ? (
              <Button
                variant={"inactivePrimary"}
                onClick={() => onUnfollow(user.id)}
                className={"flex gap-1 items-center rounded-sm w-full"}
              >
                <UserMinusIcon className={"size-5"} />
                Unfollow
              </Button>
            ) : (
              <Button
                variant={"primary"}
                onClick={() => onFollow(user.id)}
                className={"flex gap-1 items-center rounded-sm w-full"}
              >
                <UserPlusIcon className={"size-5"} />
                Follow
              </Button>
            )}
          </div>
        </div>
        <div className="bg-fuchsia-50 w-full py-1 px-2 flex justify-around items-center mt-3">
          <div className="flex-col flex items-center">
            <p className="text-lg font-sans text-gray-500">
              {user?.storiesCount}
            </p>
            <p className="text-sm font-sans text-gray-500">Works</p>
          </div>
          <div className="flex-col flex items-center">
            <p className="text-lg font-sans text-gray-500">
              {user?.followingsCount}
            </p>
            <p className="text-sm font-sans text-gray-500">Following</p>
          </div>
          <div className="flex-col flex items-center">
            <p className="text-lg font-sans text-gray-500">
              {user?.followersCount}
            </p>
            <p className="text-sm font-sans text-gray-500">Followers</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default memo(AuthorDetail);

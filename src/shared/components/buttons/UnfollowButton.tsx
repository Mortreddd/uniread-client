import { Button } from "../form/Button";
import { UserMinusIcon } from "@heroicons/react/24/outline";

export default function UnfollowButton({
  onUnfollow,
}: {
  onUnfollow: () => void;
}) {
  return (
    <Button
      variant={"secondary"}
      className="inline-flex text-tiny md:text-xs lg:text-sm items-center tracking-wider rounded-sm md:rounded-md lg:rounded-lg ml-1.5"
      onClick={onUnfollow}
    >
      <UserMinusIcon
        fill="currentColor"
        className="size-3 md:size-4 text-white md:mr-0.5"
      />
      <span className="text-white">Unfollow</span>
    </Button>
  );
}

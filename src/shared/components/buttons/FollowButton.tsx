import { UserPlusIcon } from "@heroicons/react/24/outline";
import { Button } from "../form/Button";

export default function FollowButton({ onFollow }: { onFollow: () => void }) {
  return (
    <Button
      className="inline-flex text-tiny md:text-xs lg:text-sm items-center tracking-wider rounded-sm md:rounded-md lg:rounded-lg ml-1.5"
      onClick={onFollow}
    >
      <UserPlusIcon
        fill="currentColor"
        className="size-3 md:size-4 text-white md:mr-0.5"
      />
      <span className="text-white">Follow</span>
    </Button>
  );
}

import { HeartIcon } from "@heroicons/react/24/outline";

interface LikeCountProps {
  count: number;
}
export default function LikeCount({ count = 42000 }: LikeCountProps) {
  return (
    <div
      className={
        "inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400"
      }
    >
      <HeartIcon className={"size-4 md:size-5"} />
      <span>{count}</span>
    </div>
  );
}

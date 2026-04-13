import { EyeIcon } from "@heroicons/react/24/outline";

interface ReadCountProps {
  count: number;
}

export default function ReadCount({ count = 1200 }: ReadCountProps) {
  return (
    <div
      className={
        "inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400"
      }
    >
      <EyeIcon className={"size-4 md:size-5"} />
      <span>{count}</span>
    </div>
  );
}

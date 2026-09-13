import { BookOpenIcon } from "@heroicons/react/24/outline";

interface ChapterCountProps {
  count: number;
}
export default function ChapterCount({ count = 42000 }: ChapterCountProps) {
  return (
    <div
      className={
        "inline-flex items-center gap-0.5 md:gap-1 text-sm text-gray-600 dark:text-gray-400"
      }
    >
      <BookOpenIcon className={"size-3 md:size-4 lg:size-5"} />
      <span className={"text-tiny md:text-xs lg:text-sm"}>
        {count} Chapters
      </span>
    </div>
  );
}

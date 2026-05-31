
interface ChapterCountProps {
  count: number;
}
export default function ChapterCount({ count = 42000 }: ChapterCountProps) {
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

export default function GenreBadge({ name }: { name: string }) {
  return (
    <span className="max-w-fit text-extratiny md:text-tiny lg:text-xs rounded text-wrap py-0.5 px-1 md:py-1 md:px-1.5 bg-gray-200 dark:bg-slate-700 text-gray-600 font-semibold dark:text-gray-300">
      {name}
    </span>
  );
}

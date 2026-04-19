// components/TableOfContents.tsx
import { Button } from "@/shared/components/form/Button";
import {
  Bars3BottomLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { ChapterPreview } from "@/types/Chapter";
import { Formatters } from "@/utils/formatters";

interface TableOfContentsProps {
  chapters: ChapterPreview[]; // Replace with proper Chapter type
}

export default function TableOfContents({ chapters }: TableOfContentsProps) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h4 className="flex-1 text-sm md:text-base font-bold font-sans tracking-wide text-black dark:text-white px-1.5 py-1 md:px-2 md:py-1 border-l-2 border-solid border-primary dark:border-primary-dark mb-2 md:mb-3">
          Table of Contents
        </h4>
        <Button
          variant="transparent"
          className="inline-flex items-center text-blue-700 space-x-2"
        >
          <span className="text-tiny md:text-xs">Sort</span>
          <Bars3BottomLeftIcon className="size-3" />
        </Button>
      </div>

      <div className="w-full mt-2 md:mt-3">
        <div className="space-y-2 md:space-y-3">
          {chapters.map((chapter, index) => (
            <ChapterItem key={chapter.id || index} chapter={chapter} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChapterItem({ chapter }: { chapter: ChapterPreview }) {
  return (
    <div className="bg-gray-200 dark:bg-slate-800 flex items-center justify-between hover:bg-gray-300 dark:hover:bg-slate-700 px-3 py-2 md:px-4 md:py-3 rounded">
      <div className="flex-1 flex flex-col">
        <h2 className="text-tiny md:text-xs text-black dark:text-white font-semibold font-sans min-w-0 truncate">
          {chapter.title}
        </h2>
        <ChapterMeta chapter={chapter} />
      </div>
      <Button size="sm" variant="transparent" className="rounded-full">
        <ChevronRightIcon className="size-3 md:size-4 text-black dark:text-white" />
      </Button>
    </div>
  );
}

function ChapterMeta({ chapter }: { chapter: ChapterPreview }) {
  return (
    <div className="inline-flex items-center space-x-1.5 md:space-x-2 text-extratiny md:text-tiny text-gray-600 dark:text-gray-300">
      <time className="font-semibold">
        {Formatters.Date.formatDateOnly(new Date(chapter.createdAt))}
      </time>
      <div className="rounded-full size-0.5 bg-gray-600 dark:bg-gray-300" />
      <span className="inline-flex items-center text-black dark:text-white font-semibold">
        <StarIcon
          fill="currentColor"
          className="size-2 lg:size-3 text-amber-600 mr-0.5"
        />
        {chapter.averageRating || "0.0"}
      </span>
      <div className="rounded-full size-0.5 bg-gray-600 dark:bg-gray-300" />
      <span className="inline-flex items-center text-black dark:text-white font-semibold">
        <EyeIcon className="size-2 lg:size-3 mr-0.5" />
        {Formatters.Number.formatRelativeNumber(chapter.readCount || 0)}
      </span>
    </div>
  );
}

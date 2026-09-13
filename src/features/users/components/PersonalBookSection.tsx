import { useEffect, useState } from "react";
import { UserBook, UserBookFilter } from "../types/UserBook";
import { usePersonalBooks } from "../hooks/usePersonalBooks";
import BookSectionSkeleton from "./BookSectionSkeleton";
import { AnimatePresence, motion } from "motion/react";
import ChapterCount from "@/shared/components/ChapterCount";
import { Formatters } from "@/utils/formatters";
import { Button } from "@/shared/components/form/Button";
import { PencilIcon } from "@heroicons/react/24/outline";
import { BookStatus } from "@/features/books/types/Book";
export default function PersonalBookSection() {
  const [params, setParams] = useState<UserBookFilter>({
    pageNo: 0,
    pageSize: 5,
    query: "",
  });
  const { data, isLoading } = usePersonalBooks(params);
  const [personalBooks, setPersonalBooks] = useState<UserBook[]>([]);

  useEffect(() => {
    if (!data || data.empty) return;
    setPersonalBooks(data.content);
  }, [data]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ translateY: -10, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.6 }}
        className="relative p-2 md:p-3 rounded-lg"
      >
        {isLoading && <BookSectionSkeleton />}

        {personalBooks.length > 0 && (
          <div className="grid grid-cols-12 gap-3 md:gap-4">
            {personalBooks.map((book) => (
              <div
                key={book.id}
                className="relative col-span-6 md:col-span-4 lg:col-span-2"
              >
                <PersonalBook book={book} />
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function PersonalBook({ book }: { book: UserBook }) {
  const isDraft = book.status === BookStatus.DRAFT;
  return (
    <figure className="flex flex-col w-full bg-gray-200 dark:bg-slate-800 shadow rounded-lg">
      <div className="relative w-full aspect-[2/3] rounded overflow-hidden">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="absolute inset-0 size-full object-cover object-center"
        />
      </div>

      <figcaption className="px-1 py-1.5 md:px-1.5 md:py-2 flex flex-col gap-1.5 md:gap-2 flex-1">
        <h6 className="text-sm md:text-base font-medium font-newsreader text-gray-800 dark:text-gray-200 truncate">
          {book.title}
        </h6>

        <p className="text-tiny md:text-xs font-sans text-gray-600 dark:text-gray-400 line-clamp-2 flex-1">
          {book.description}
        </p>

        <ChapterCount count={book.totalChapters} />
        <span className="text-tiny md:text-xs font-sans font-semibold text-gray-800 dark:text-gray-200">
          Last Updated{" "}
          {Formatters.Date.formatRelativeDateTime(new Date(book.updatedAt))}
        </span>
        {isDraft && (
          <Button className={"rounded inline-flex items-center"}>
            <PencilIcon className={"text-gray-200 size-2 lg:size-3"} />
            <span className={"text-gray-200 text-xs md:text-xs"}>Edit</span>
          </Button>
        )}
      </figcaption>
    </figure>
  );
}

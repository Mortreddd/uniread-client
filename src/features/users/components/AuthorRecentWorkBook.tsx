import { Formatters } from "@/utils/formatters";
import { AuthorRecentWorkBookDetails } from "../types/Book";
import BookStatusBadge from "./BookStatusBadge";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { Button } from "@/shared/components/form/Button";

interface AuthorRecentWorkBookProps {
  book: AuthorRecentWorkBookDetails;
}

export default function AuthorRecentWorkBook({
  book,
}: AuthorRecentWorkBookProps) {
  return (
    <figure
      className={
        "size-full flex rounded lg:rounded-lg overflow-hidden shadow-lg bg-gray-200 dark:bg-slate-800"
      }
    >
      <img
        src={book.coverPhoto}
        alt={book.title}
        className="aspect-[3/4] max-w-32 lg:max-w-36  object-center object-cover w-auto"
      />
      <figcaption className="p-2 md:p-3 text-black dark:text-white font-sans min-w-0 flex-1">
        <div className="space-y-1.5 md:space-y-2">
          <div className="flex items-center justify-between">
            <BookStatusBadge
              variant={"draft"}
              className={"text-extratiny md:text-tiny lg:text-xs"}
            />
            <span className="text-extratiny md:text-tiny lg:text-xs font-sans font-thin tracking-light text-gray-600 dark:text-gray-400">
              {"Updated "}
              {Formatters.Date.formatRelativeDateTime(
                new Date(book.lastModifiedAt),
              )}
            </span>
          </div>
          <h5 className="text-base md:text-lg lg:text-xl text-inherit font-bold tracking-light line-clamp-1">
            {book.title}
          </h5>
          <p className="text-extratiny md:text-tiny lg:text-xs font-thin line-clamp-2 md:line-clamp-3 tracking-tight">
            {book.description}
          </p>
          <div className="inline-flex items-center dark:text-gray-400 text-gray-600 ">
            <ListBulletIcon
              className={"size-3 md:size-4 lg:size-5 text-inherit mr-1 md:mr-2"}
            />
            <span className="text-extratiny md:text-tiny lg:text-xs text-inherit">{`${book.totalChapters} ${book.totalChapters > 1 ? "Chapters" : "Chapter"}`}</span>
          </div>
          <Button
            className={
              "mt-2 md:mt-3 rounded-sm text-extratiny md:text-tiny lg:text-xs"
            }
          >
            Continue Writing
          </Button>
        </div>
      </figcaption>
    </figure>
  );
}

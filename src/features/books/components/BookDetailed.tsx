import { BookDetail } from "@/features/books/types/Book.ts";
import { Button } from "@/shared/components/form/Button.tsx";
import {
  EyeIcon,
  HeartIcon,
  NumberedListIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import GenreBadge from "./GenreBadge";

interface BookDetailProps {
  book: BookDetail;
}

export default function BookDetailed({ book }: BookDetailProps) {
  const { author } = book;
  const authorFullName = `${author.firstName} ${author.lastName}`;
  return (
    <div
      className={
        "size-full flex rounded lg:rounded-lg overflow-hidden shadow-lg bg-gray-50 dark:bg-slate-800"
      }
    >
      <a href={`/books/${book.id}`}>
        <img
          src={book.coverPhoto}
          alt={book.title}
          className={"w-auto max-w-32 lg:max-w-52 h-full object-cover"}
        />
      </a>
      <div className={"flex-1 p-2 lg:p-3 flex flex-col justify-between"}>
        <div className="flex-1 relative">
          <div className={"w-full flex items-center mb-0.5 md:mb-1"}>
            <h3
              className={
                "min-w-0 flex-1 text-sm lg:text-lg font-sans font-bold tracking-light text-wrap line-clamp-1 text-black dark:text-white"
              }
            >
              <a href={`/books/${book.id}`}>{book.title}</a>
            </h3>
            <Button variant={"transparent"} className={"shrink-0 rounded"}>
              <PlusIcon
                className={"size-4 md:size-5 text-black dark:text-white"}
              />
            </Button>
          </div>
          <h6
            className={
              "text-tiny lg:text-sm text-gray-600 dark:text-gray-400 mb-0.5 md:mb-1 inline-flex"
            }
          >
            by
            <p
              className={
                "ml-0.5 md:ml-1 text-primary dark:text-primary-dark font-semibold"
              }
            >
              {authorFullName}
            </p>
          </h6>
          <p
            className={
              "text-tiny text-gray-600 dark:text-gray-400 truncate line-clamp-2 md:line-clamp-3 text-wrap mb-2"
            }
          >
            {book.description}
          </p>
          <div className={"inline-flex items-center gap-2"}>
            {book.genres.map(({ id, name }) => (
              <GenreBadge key={id} name={name} />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between p-1.5 md:p-2">
          <div className="flex gap-1.5 md:gap-2 items-center flex-nowrap">
            <p className="text-gray-600 dark:text-gray-400 font-sans inline-flex items-center">
              <HeartIcon
                fill={"currentColor"}
                className={
                  "size-3 text-red-600 dark:text-red-400 mr-1 md:mr-1.5"
                }
              />
              <span className="text-tiny tracking-wide">4.8k</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 font-sans inline-flex items-center">
              <EyeIcon
                className={
                  "size-3 text-gray-600 dark:text-gray-400 mr-1 md:mr-1.5"
                }
              />
              <span className="text-tiny tracking-wide">67k</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 font-sans inline-flex items-center">
              <NumberedListIcon
                className={
                  "size-3 text-gray-600 dark:text-gray-400 mr-1 md:mr-1.5"
                }
              />
              <span className="text-tiny tracking-wide">25 chapters</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

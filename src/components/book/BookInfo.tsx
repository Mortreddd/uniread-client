import { Book } from "@/types/Book";
import { cn } from "@/utils/ClassNames";
import { HTMLAttributes } from "react";
import { BookCover } from "./BookCover";
import bookCover from "@/assets/cover6.jpg";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import Banner from "../Banner";

interface BookInfoProps extends HTMLAttributes<HTMLElement> {
  book?: Book;
}

export default function BookInfo({ book, className, ...rest }: BookInfoProps) {
  return (
    <article
      className={cn("w-full h-fit flex items-center", className)}
      {...rest}
    >
      <BookCover
        src={bookCover}
        size={"md"}
        className={"border-2 border-solid border-primary"}
      />
      <div className="p-2 md:p-4 flex-1 flex flex-col justify-between">
        <div className="w-full h-full space-y-2">
          <h3 className="text-lg font-sans font-bold text-ellipsis line-clamp-2 w-full">
            {book?.title}
          </h3>
          <p className="text-sm font-sans mb-0.5 text-semibold">
            by <strong>Luna Sol</strong>
          </p>
          <p className="text sm font-sans text-ellipsis line-clamp-3 w-full">
            {book?.description}
          </p>
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-1">
              <BookOpenIcon className="size-5" />
              <h6 className="font-sans font-medium text-gray-500 text-md">
                5.3M
              </h6>
            </div>
            <div className="flex justify-end gap-2 items-center">
              {book?.completed ? (
                <Banner variant={"completed"}>Complete</Banner>
              ) : (
                <Banner variant={"onGoing"}>Ongoing</Banner>
              )}
              {book?.matured && <Banner variant={"mature"}>Mature</Banner>}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

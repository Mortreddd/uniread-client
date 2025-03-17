import {
  Bars3BottomLeftIcon,
  BookOpenIcon,
  HandThumbUpIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import Banner from "../Banner";
import { Book } from "@/types/Book";

interface BookDetailProps {
  book?: Book;
}

export default function BookDetail({ book }: BookDetailProps) {
  return (
    <>
      <div className="w-full h-fit space-y-1">
        <h1 className="block truncate text-gray-700 text-3xl z-10 font-extrabold font-sans">
          {book?.title ?? `The Curse of the Crying Baby`}
        </h1>
        {/**
         * Book popularity details
         *
         */}
        <div className="flex items-center gap-3 -z-10">
          {/**
           * Total Read of the book icon
           */}
          <div className="flex items-center gap-1">
            <BookOpenIcon className="size-5" />
            <h6 className="font-sans font-medium text-gray-500 text-md">
              5.3M
            </h6>
          </div>
          {/**
           * Total rating of the book icon
           */}
          <div className="flex items-center gap-1">
            <StarIcon className="size-5" />
            <h6 className="font-sans font-medium text-gray-500 text-md">
              500k
            </h6>
          </div>
          {/**
           * Total likes of the book icon
           */}
          <div className="flex items-center gap-1">
            <HandThumbUpIcon className="size-5" />
            <h6 className="font-sans font-medium text-gray-500 text-md">
              1.5M
            </h6>
          </div>
          {/**
           * Total completed parts of the book icon
           */}
          <div className="flex items-center gap-1">
            <Bars3BottomLeftIcon className="size-5" />
            <h6 className="font-sans font-medium text-gray-500 text-md">
              12 parts
            </h6>
          </div>
        </div>
        {/**
         * Book status details
         *
         */}
        <div className="flex items-center gap-3 -z-10">
          {/**
           * Add a condition for maturity if the book was a rated +18
           */}
          {/**
           * Book status
           */}
          <Banner
            className="text-white font-sans text-sm"
            variant={"completed"}
          >
            Completed
          </Banner>
          {/**
           * Book maturity
           */}
          {book?.matured ? (
            <Banner className="text-white font-sans text-sm" variant={"mature"}>
              Mature
            </Banner>
          ) : null}
        </div>
      </div>
    </>
  );
}

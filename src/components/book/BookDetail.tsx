import {
  Bars3BottomLeftIcon,
  EyeIcon,
  HandThumbUpIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import Banner from "../Banner";
import { Book } from "@/types/Book";

interface BookDetailProps {
  book: Book;
}

export default function BookDetail({ book }: BookDetailProps) {
  const {
    title,
    totalReadsCount,
    totalChaptersCount,
    totalRatingsCount,
    totalLikesCount,
    matured,
    completed,
  } = book;
  return (
    <>
      <div className="w-full h-fit space-y-1">
        <h1 className="block truncate text-gray-700 text-3xl z-10 font-extrabold font-sans">
          {title ?? `The Curse of the Crying Baby`}
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
            <EyeIcon className="size-5" />
            <h6 className="font-sans font-medium text-gray-500 text-md">
              {totalReadsCount}
            </h6>
          </div>
          {/**
           * Total rating of the book icon
           */}
          <div className="flex items-center gap-1">
            <StarIcon className="size-5" />
            <h6 className="font-sans font-medium text-gray-500 text-md">
              {totalRatingsCount}
            </h6>
          </div>
          {/**
           * Total likes of the book icon
           */}
          <div className="flex items-center gap-1">
            <HandThumbUpIcon className="size-5" />
            <h6 className="font-sans font-medium text-gray-500 text-md">
              {totalLikesCount}
            </h6>
          </div>
          {/**
           * Total completed parts of the book icon
           */}
          <div className="flex items-center gap-1">
            <Bars3BottomLeftIcon className="size-5" />
            <h6 className="font-sans font-medium text-gray-500 text-md">
              {totalChaptersCount ?? "No"} parts
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
          {completed ? (
            <Banner className={"text-sm"} variant={"completed"}>
              Completed
            </Banner>
          ) : (
            <Banner className={"text-sm"} variant={"onGoing"}>
              OnGoing
            </Banner>
          )}
          {/**
           * Book maturity
           */}
          {matured ? (
            <Banner className="text-white font-sans text-sm" variant={"mature"}>
              Mature
            </Banner>
          ) : null}
        </div>
      </div>
    </>
  );
}

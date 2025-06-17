import bookCover from "@/assets/cover6.jpg";
import { Book } from "@/types/Book";
import {
  EyeIcon,
  StarIcon,
  HandThumbUpIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/24/outline";

interface PersonalBookProps {
  book: Book;
}

export default function PersonalBook({ book }: PersonalBookProps) {
  const {
    title,
    description,
    totalReadsCount,
    totalChaptersCount,
    totalRatingsCount,
    totalLikesCount,
    user: { username },
  } = book;
  book.user.fullName;
  return (
    <figure className="flex font-serif rounded-lg shadow-md overflow-hidden">
      <div className="flex-none min-w-40 min-h-56 relative">
        <img
          src={bookCover}
          className={
            "absolute w-full h-full object-cover object-center inset-0"
          }
        />
      </div>
      <div className="flex-auto p-3 relative">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="mt-2 relative">
          <div className="flex items-center gap-3">
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
        </div>
        <p className="text-gray-600 mt-1 inline-flex">
          by <p className="font-semibold ml-2">{username}</p>
        </p>
        <p className="text-gray-500 mt-3 truncate line-clamp-3">
          {description}
        </p>
      </div>
    </figure>
  );
}

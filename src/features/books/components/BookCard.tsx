import { EyeIcon, StarIcon } from "@heroicons/react/24/outline";
import { BookDetail } from "../types/Book";

interface BookCardProps {
  book: BookDetail;
}

export default function BookCard({ book }: BookCardProps) {
  const { author } = book;
  const { firstName, lastName } = author;
  const fullName = `${firstName}, ${lastName}`;
  return (
    <article className="flex flex-col h-full bg-gray-200 dark:bg-slate-900 rounded-lg shadow-sm">
      <div className="aspect-[3/4] w-full overflow-hidden shrink-0">
        <img
          src={book.coverPhoto}
          className="w-full h-full rounded-lg object-cover hover:scale-105 transition-transform duration-300"
          alt={book.title}
        />
      </div>
      <div className="p-2 flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-xs md:text-sm text-wrap font-semibold line-clamp-2 md:line-clamp-1 dark:text-white">
            {book.title}
          </h3>
          <p className="text-tiny md:text-xs text-gray-500 mt-0.5">
            {fullName}
          </p>
        </div>
        <div className="flex items-center mt-1 gap-0.5">
          {/* Average rating */}
          <div className="inline-flex items-center">
            <StarIcon
              fill={"currentColor"}
              className={"text-amber-600 dark:text-amber-400 size-2 mr-0.5"}
            />
            <p className="font-bold font-sans text-extratiny md:text-tiny text-gray-800 dark:text-gray-200">
              4.6
            </p>
          </div>

          {/* Total Reads */}
          <div className="inline-flex items-center">
            <EyeIcon
              className={"text-gray-600 dark:text-gray-400 size-2 mr-0.5"}
            />
            <p className="font-sans text-extratiny md:text-tiny text-gray-800 dark:text-gray-200">
              42.1k
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

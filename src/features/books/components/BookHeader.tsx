import { Button } from "@/shared/components/form/Button";
import { BookmarkIcon, PlayIcon, StarIcon } from "@heroicons/react/24/outline";
import { BookAuthor, BookDetail } from "../types/Book";
import FollowButton from "@/shared/components/buttons/FollowButton";
import GenreBadge from "./GenreBadge";
import AuthorInfo from "./AuthorInfo";
import BookStats from "./BookStats";

interface BookHeaderProps {
  book: BookDetail; // Replace with proper type
  onFollow: () => void;
  onAddToLibrary: () => void;
}

export default function BookHeader({
  book,
  onFollow,
  onAddToLibrary,
}: BookHeaderProps) {
  const { genres, title, author, averageRating } = book;
  return (
    <div className="py-3 lg:py-4 size-full flex flex-col max-w-2xl">
      {/* Genres */}
      <div className="inline-flex items-center gap-2 md:gap-3 mb-0.5 md:mb-1">
        {genres.map(({ id, name }) => (
          <GenreBadge key={id} name={name} />
        ))}
      </div>

      {/* Title */}
      <h1 className="text-xl md:text-2xl lg:text-3xl font-sans font-bold text-black dark:text-white tracking-light text-wrap mb-0.5 md:mb-1">
        {title}
      </h1>

      {/* Author Info */}
      <AuthorInfo author={author} onFollow={onFollow} />

      {/* Rating */}
      <RatingSection rating={averageRating} />

      {/* Action Buttons */}
      <ActionButtons onReadNow={() => {}} onAddToLibrary={onAddToLibrary} />

      <BookStats book={book} />
    </div>
  );
}

function ActionButtons({
  onReadNow,
  onAddToLibrary,
}: {
  onReadNow: () => void;
  onAddToLibrary: () => void;
}) {
  return (
    <div className="inline-flex items-center gap-3 md:gap-4 mt-3 md:mt-5">
      <Button
        className="px-3 py-1.5 inline-flex items-center tracking-light gap-2 md:gap-3 rounded md:rounded-lg"
        onClick={onReadNow}
      >
        <PlayIcon fill="currentColor" className="size-3 md:size-4 text-white" />
        <span className="font-bold text-white text-tiny md:text-xs font-sans">
          Read Now
        </span>
      </Button>
      <Button
        variant="custom"
        size="custom"
        className="inline-flex px-3 py-1.5 md:py-2 md:px-4 items-center tracking-light bg-gray-200 hover:bg-gray-300 gap-1 md:gap-2 dark:bg-slate-700 dark:hover:bg-slate-700/80 rounded md:rounded-lg text-black dark:text-white"
        onClick={onAddToLibrary}
      >
        <BookmarkIcon
          fill="currentColor"
          className="text-black dark:text-white size-2 md:size-3"
        />
        <span className="font-bold text-tiny md:text-xs">Add to Library</span>
      </Button>
    </div>
  );
}

function RatingSection({ rating }: { rating: number }) {
  return (
    <div className="inline-flex items-center ml-2 md:ml-3 space-x-1 mt-1.5">
      <span className="inline-flex items-center text-black dark:text-white font-semibold text-tiny md:text-xs">
        <StarIcon
          fill="currentColor"
          className="size-3 lg:size-4 text-amber-600"
        />
        {rating}
      </span>
      <span className="text-gray-600 dark:text-gray-300 font-thin text-tiny md:text-xs">
        (2.4k) Reviews
      </span>
    </div>
  );
}

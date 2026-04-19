import FollowButton from "@/shared/components/buttons/FollowButton";
import { BookAuthor } from "../types/Book";

export default function AuthorInfo({
  author,
  onFollow,
}: {
  author: BookAuthor;
  onFollow: () => void;
}) {
  const { firstName, lastName } = author;
  const authorFullName = `${firstName} ${lastName}`;
  return (
    <div className="inline-flex items-center flex-wrap">
      <img
        src={author.avatarUrl}
        className="size-7 md:size-9 lg:size-10 rounded-full"
      />
      <div className="ml-1.5">
        <a
          href={`/authors/${author.id}`}
          className="text-tiny font-bold font-sans md:text-xs text-black dark:text-white"
        >
          {authorFullName}
        </a>
        <p className="text-extratiny font-sans md:text-tiny text-gray-600 dark:text-gray-300">
          Writer
        </p>
      </div>
      <FollowButton onFollow={onFollow} />
    </div>
  );
}

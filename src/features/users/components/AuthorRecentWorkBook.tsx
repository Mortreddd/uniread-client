import { AuthorRecentWorkBookDetails } from "../types/Book";

interface AuthorRecentWorkBookProps {
  book: AuthorRecentWorkBookDetails;
}

export default function AuthorRecentWorkBook({
  book,
}: AuthorRecentWorkBookProps) {
  return (
    <figure
      className={
        "size-full flex items-center rounded lg:rounded-lg overflow-hidden shadow-lg bg-gray-200 dark:bg-slate-800"
      }
    >
      <img
        src={book.coverPhoto}
        alt=""
        className="aspect-[3/4] max-w-32 lg:max-w-36  object-center object-cover w-auto"
      />
      <figcaption className="p-2 md:p-3 text-black dark:text-white font-sans flex flex-col justify-between flex-1">
        <div className="space-y-1.5 md:space-y-2">

        <div className="flex justify-between items-center">
            
        </div>
        <h5 className="text-base md:text-lg lg:text-xl text-inherit font-bold tracking-light line-clamp-1">
          {book.title}
        </h5>
        <p className="text-extratiny md:text-tiny lg:text-xs font-thin line-clamp-2 md:line-clamp-3 tracking-tight">
          {book.description}
        </p>
        </div>

      </figcaption>
    </figure>
  );
}

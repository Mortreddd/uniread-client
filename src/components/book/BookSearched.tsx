import { Book } from "@/types/Book";
import { BookCover } from "./BookCover";
import BookSearchedDetails from "./BookSearchedDetails";

interface BookSearchedProps {
  book?: Book;
}

/**
 * The component used in the search page to display the book details and cover
 * @param book
 * @returns
 */
export default function BookSearched({ book }: BookSearchedProps) {
  return (
    <section className="flex w-full h-full">
      <article className="w-full my-5 flex flex-row h-fit bg-gray-100 rounded-lg p-4">
        <div className="mr-3 md:mr-5">
          <BookCover size={"default"} />
        </div>
        <div className="flex-1">
          <BookSearchedDetails book={book} />
        </div>
      </article>
    </section>
  );
}

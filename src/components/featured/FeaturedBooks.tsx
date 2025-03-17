import { Fragment } from "react/jsx-runtime";
import Book from "../book/Book";
import { Link } from "react-router-dom";
import withHover from "../withHover";

export default function FeaturedBooks() {
  const bookdIds: number[] = [1, 2, 3];

  const BookWithHover = withHover(Book);
  return (
    <Fragment>
      <div className="w-full h-fit">
        <h3 className="text-xl mb-4 text-gray-500 font-sans font-medium text-left">
          MOST READ BOOKS
        </h3>
        <div className="w-full h-fit flex items-start gap-3 flex-wrap">
          {bookdIds.map((bookId: number, key: number) => (
            <Link to={`/books/${bookId}`} key={key}>
              <BookWithHover variant={"custom"} className="rounded" />
            </Link>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

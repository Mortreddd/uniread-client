import Book from "../book/Book";
import { Link } from "react-router-dom";
import { useState } from "react";
import { PaginateParams } from "@/types/Pagination";
import { useGetBooks } from "@/api/books/useGetBooks";
import withHover from "../withHover";

export default function WorksSection() {
  // TODO: remove the @ts-ignore comment before deploying the application
  // @ts-ignore
  const [params, setParams] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
    query: "",
  });
  const { data } = useGetBooks(params);
  const BookWithHover = withHover(Book);

  return (
    <>
      <div className="w-full h-full grid grid-cols-6 gap-4 grid-flow-row px-16 py-6">
        {data?.content.length ? (
          data?.content.map((book) => (
            <Link
              to={`/books/${book.id}`}
              key={book.id}
              className={"col-span-1"}
            >
              <BookWithHover
                book={book}
                className="rounded"
                size={"default"}
                variant={"custom"}
              />
            </Link>
          ))
        ) : (
          <div className="col-span-6 row-span-1 w-full h-full flex justify-center items-center text-primary font-serif font-medium text-xl">
            No books available
          </div>
        )}
      </div>
    </>
  );
}

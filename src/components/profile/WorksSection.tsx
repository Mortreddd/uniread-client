import Book from "@/components/book/Book.tsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import { PaginateParams } from "@/types/Pagination";
import { useGetBooks } from "@/api/books/useGetBooks";
import withHover from "../withHover";
import LoadingCircle from "@/components/LoadingCirlce.tsx";

export default function WorksSection() {
  // TODO: remove the @ts-ignore comment before deploying the application
  // @ts-ignore
  const [{ pageNo, pageSize, query }, setParams] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
    query: "",
  });
  const { data, loading } = useGetBooks({ pageNo, pageSize, query });
  // const [books, setBooks] = useState<BookType[]>(data?.content ?? []);
  const BookWithHover = withHover(Book);
  return (
    <>
      <div className="w-full h-full grid grid-cols-6 gap-4 grid-flow-row px-16 py-6">
        {loading && !data?.content && <LoadingCircle />}
        {!loading && data?.content ? (
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

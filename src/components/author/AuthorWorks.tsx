import { Link, useParams } from "react-router-dom";
import useGetUserBooks from "@/api/books/useGetUserBooks.ts";
import { useEffect, useState } from "react";
import { PaginateParams } from "@/types/Pagination.ts";
import LoadingCircle from "@/components/LoadingCirlce.tsx";
import Book from "@/components/book/Book.tsx";
import withHover from "@/components/withHover.tsx";
import { Book as BookType } from "@/types/Book";

export default function AuthorWorks() {
  const { userId } = useParams<"userId">();
  const BookWithHover = withHover(Book);
  const [{ pageNo, pageSize, query }, setState] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
    query: "",
  });

  const { data, loading } = useGetUserBooks({userId, pageNo, pageSize, query});
  const [books, setBooks] = useState<BookType[]>([]);
  useEffect(() => {
    if (data?.content) {
      setBooks(data.content);
    }
  }, [data]);

  return (
    <>
      <div className="w-full h-full grid grid-cols-6 gap-4 grid-flow-row px-16 py-6">
        {loading && !data?.content && <LoadingCircle />}
        {!loading && books.length !== 0 ? (
          books.map((book) => (
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

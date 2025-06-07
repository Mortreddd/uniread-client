import Book from "@/components/book/Book.tsx";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import withHover from "../withHover";
import LoadingCircle from "@/components/LoadingCirlce.tsx";
import {Book as BookType, BookParams} from "@/types/Book.ts";
import useGetUserBooks from "@/api/books/useGetUserBooks.ts";
import {useAuth} from "@/contexts/AuthContext.tsx";

export default function WorksSection() {
  // TODO: remove the @ts-ignore comment before deploying the application
  const { user } = useAuth();
  const [{ pageNo, pageSize, query }] = useState<BookParams>({
    pageNo: 0,
    pageSize: 10,
    query: "",
  });

  const { data, loading } = useGetUserBooks({ userId: user?.id, pageNo, pageSize, query });
  const [books, setBooks] = useState<BookType[]>([]);

  const BookWithHover = withHover(Book);

  useEffect(() => {
    if (data?.content) {
      setBooks(data.content);
    }
  }, [data]);

  return (
    <>
      <div className="w-full h-full grid grid-cols-6 gap-4 grid-flow-row px-16 py-6">
        {loading && !data?.content ? (
          <LoadingCircle />
        ) : !loading && books.length > 0 ? (
          data?.content.map((book) => (
            <Link
              to={`/books/${book.id}`}
              key={book.id}
              className={"col-span-1"}
            >
              <BookWithHover
                book={book}
                className="rounded-xs"
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

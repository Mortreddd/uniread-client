import { BookStatus } from "@/types/Enums.ts";
import PublishedBookItem from "@/components/write/PublishedBookItem.tsx";
import useGetUserBooks from "@/api/books/useGetUserBooks";
import { useAuth } from "@/contexts/AuthContext";
import { Book } from "@/types/Book";
import { PaginateParams } from "@/types/Pagination";
import { useState, useEffect } from "react";
import LoadingCircle from "../LoadingCirlce";

export default function PublishedBookList() {
  const [{ pageNo, pageSize, query }] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
    query: "",
  });
  const { user } = useAuth();
  const { data, loading } = useGetUserBooks({
    userId: user?.id,
    pageNo,
    pageSize,
    query,
    status: BookStatus.PUBLISHED,
  });
  const [publishedBooks, setPublishedBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (data?.content) {
      setPublishedBooks(data.content);
    }
  }, [data]);

  return (
    <section className={"w-full h-full space-y-2"}>
      {loading && !data?.content ? (
        <div className={"w-full flex items-center justify-center h-full"}>
          <LoadingCircle />
        </div>
      ) : publishedBooks.length > 0 ? (
        publishedBooks.map((book) => (
          <PublishedBookItem book={book} key={book.id} />
        ))
      ) : (
        <div className={"w-full h-full flex items-center justify-center"}>
          <h1 className={"text-xl font-sans text-gray-800 font-bold"}>
            Empty published books
          </h1>
        </div>
      )}
    </section>
  );
}

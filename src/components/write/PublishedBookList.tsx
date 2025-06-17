import { BookStatus } from "@/types/Enums.ts";
import useGetUserBooks from "@/api/books/useGetUserBooks";
import { useAuth } from "@/contexts/AuthContext";
import { Book } from "@/types/Book";
import { PaginateParams } from "@/types/Pagination";
import { useState, useEffect } from "react";
import LoadingCircle from "../LoadingCirlce";
import PersonalBook from "../book/PersonalBook";

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
    <section className={"w-full h-full p-10 space-y-4"}>
      {loading && !data?.content ? (
        <div className={"w-full flex h-full justify-center items-center"}>
          <LoadingCircle size={"lg"} />
        </div>
      ) : !loading && publishedBooks.length !== 0 ? (
        publishedBooks.map((book) => <PersonalBook book={book} />)
      ) : (
        <div className={"w-full h-full flex items-center justify-center"}>
          <p className={"text-2xl font-serif font-semibold text-gray-800"}>
            No Available Books
          </p>
        </div>
      )}
    </section>
  );
}

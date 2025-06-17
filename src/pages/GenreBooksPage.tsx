import { genres } from "@/components/genre/MockGenre";
import { Link, useParams } from "react-router-dom";
import BookInfo from "@/components/book/BookInfo";
import withHover from "@/components/withHover";
import useGetBooksByGenreId from "@/api/books/useGetBooksByGenreId";
import LoadingCircle from "@/components/LoadingCirlce";
import { useState } from "react";
import { BookParams } from "@/types/Book.ts";
import { BookStatus } from "@/types/Enums.ts";
import AuthenticatedNavbar from "@/components/common/navbar/AuthenticatedNavbar.tsx";

type GenreBooksProps = {
  genreId: string;
};

export default function GenreBooksPage() {
  const { genreId } = useParams<GenreBooksProps>();
  const genre = genres.find(({ id }) => {
    return id === Number(genreId);
  });
  const [{ pageNo, pageSize, query, status }] = useState<BookParams>({
    pageNo: 0,
    pageSize: 10,
    query: "",
    status: BookStatus.PUBLISHED,
  });
  const { data, loading } = useGetBooksByGenreId({
    genreId: Number(genreId),
    pageNo,
    pageSize,
    query,
    status,
  });

  const BookInfoWithHover = withHover(BookInfo);
  return (
    <>
      <header className={"w-full relative mb-20"}>
        <AuthenticatedNavbar />
      </header>
      <div className="w-full h-full">
        <div
          style={{ background: `url(${genre?.backgroundImage})` }}
          className="w-full h-[40dvh] bg-cover bg-center bg-no-repeat backdrop-blur-xs"
        >
          <div className="w-full md:p-20 p-14 bg-[rgba(0,0,0,0.4)] h-full flex items-center">
            <div className="w-fit h-fit space-y-5 md:space-y-10">
              <h1 className="text-3xl font-serif font-bold text-white block">
                {genre?.name}
              </h1>
              <p className="text-lg font-sans font-semibold text-white block">
                {genre?.description}
              </p>
            </div>
          </div>
        </div>

        {loading && (
          <div className="w-full h-fit min-h-52 flex justify-center items-center">
            <LoadingCircle size={"xl"} />
          </div>
        )}
        {data?.content && (
          <div className="w-full h-full md:px-20 md:py-14 px-10 py-6 grid grid-flow-row grid-cols-2">
            {data.content.map((book) => (
              <Link to={`/books/${book.id}`} key={book.id}>
                <BookInfoWithHover book={book} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

import { genres } from "@/components/genre/MockGenre";
import Navbar from "@/components/common/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import BookInfo from "@/components/book/BookInfo";
import withHover from "@/components/withHover";
type GenreBooksProps = {
  genreId: string;
};

export default function GenreBooksPage() {
  const params = useParams<GenreBooksProps>();
  const genre = genres.find(({ id }) => {
    return id === Number(params.genreId);
  });

  const BookInfoWithHover = withHover(BookInfo);
  return (
    <main className="w-full h-[100dvh] antialiased">
      <Navbar />
      <div className="w-full h-full">
        <div
          style={{ background: `url(${genre?.backgroundImage})` }}
          className="w-full h-[40dvh] bg-cover bg-center bg-no-repeat backdrop-blur-sm"
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
        <div className="w-full h-full md:px-20 md:py-14 px-10 py-6 grid grid-flow-row grid-cols-2">
          <Link to={"/books/1"}>
            <BookInfoWithHover />
          </Link>
          <Link to={"/books/2"}>
            <BookInfoWithHover />
          </Link>
          <Link to={`/books/3}`}>
            <BookInfoWithHover />
          </Link>
        </div>
      </div>
    </main>
  );
}

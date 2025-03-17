import withHover from "@/components/withHover";
import Genre from "./Genre";
import { genres as mockGenres } from "./MockGenre";
import { Link } from "react-router-dom";
import { Genre as GenreType } from "@/types/Book";

interface GenreProps {
  genres: GenreType[] | null;
}
// TODO: remove the @ts-ignore comment before deploying the application
// @ts-ignore
export default function Genres({ genres }: GenreProps) {
  const GenreWithHover = withHover(Genre);
  return (
    <>
      <div className="w-full h-fit md:px-20 md:py-10 px-16 py-6 flex justify-center flex-wrap">
        <article className="bg-white rounded-lg shadow-lg p-10 w-[90dvw] h-fit min-h-[50dvh]">
          <h1 className="text-4xl font-bold text-gray-800 mb-10">Genres</h1>
          <div className="w-full h-fit gap-5 grid grid-cols-4 grid-flow-row">
            {mockGenres.map(
              ({ id, description, name, backgroundImage }, key) => (
                <Link to={`/genres/${id}/books`}>
                  <GenreWithHover
                    key={key}
                    genre={{ id, description, name, backgroundImage }}
                  />
                </Link>
              )
            )}
          </div>
        </article>
      </div>
    </>
  );
}

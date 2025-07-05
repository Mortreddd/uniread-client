import GenreOption from "@/components/genre/GenreOption.tsx";
import LoadingCircle from "@/components/LoadingCirlce.tsx";
import { useSearchParams } from "react-router-dom";
import useGetGenres from "@/api/genres/useGetGenres";
import { useCallback } from "react";
import { Button } from "../common/form/Button";
import { FunnelIcon } from "@heroicons/react/24/outline";

/**
 * The component for genre options in home page
 * @constructor
 */
function GenreFilter() {
  const { data: genres, loading } = useGetGenres();
  const [params, setParams] = useSearchParams();
  const genreIds: number[] = params
    .getAll("genres")
    .map((genreId) => Number(genreId));

  /**
   * Add or remove genre from query params
   * @param id
   */
  const addGenre = useCallback((id: number) => {
    const currentGenres = params.getAll("genres").map(Number);
    const updatedGenres = currentGenres.includes(id)
      ? currentGenres.filter((genre) => genre !== id)
      : currentGenres.concat(id);

    setParams((prev) => {
      prev.delete("genres");
      updatedGenres.forEach((genre) => prev.append("genres", genre.toString()));
      return prev;
    });
  }, []);

  /**
   * Clear all genres from query params
   */
  const clearGenres = useCallback(() => {
    setParams((prev) => {
      prev.delete("genres");
      return prev;
    });
  }, [setParams]);

  if (loading || !genres) {
    return (<div className="h-fit py-5 px-4 flex items-center justify-center">
      <LoadingCircle />
    </div>);
  }

  return (
    <section className={"w-full py-5 px-10"}>
      <div className="mb-5 relative flex items-center">
        <FunnelIcon
          fill="currentColor"
          className={"size-5 text-primary mr-2"}
        />
        <p className="text-xl text-zinc-800 font-semibold">Filters</p>
      </div>
      {genres && (
        <div className="flex flex-wrap gap-4 items-center">
          <Button
            variant={"custom"}
            className={
              "border border-primary text-primary bg-white hover:cursor-pointer hover:text-white hover:bg-primary rounded-lg"
            }
            size={"md"}
            onClick={clearGenres}
          >
            Clear
          </Button>
          {genres.map((genre) => (
            <GenreOption
              className={"w-fit h-fit"}
              genre={genre}
              genreIds={genreIds}
              key={genre.id}
              onClick={() => addGenre(genre.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default GenreFilter;

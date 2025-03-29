import GenreOption from "@/components/genre/GenreOption.tsx";
import LoadingCircle from "@/components/LoadingCirlce.tsx";
import { useSearchParams } from "react-router-dom";
import useGetGenres from "@/api/genres/useGetGenres";
import { useCallback } from "react";
import { Button } from "../common/form/Button";

/**
 * The component for genre options in home page
 * @constructor
 */
function GenreOptions() {
  const { data: genres, loading, error } = useGetGenres();
  const [params, setParams] = useSearchParams();

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
  }, []);
  return (
    <section className={"w-full flex gap-4 py-5 px-10 flex-wrap items-center"}>
      {loading && <LoadingCircle />}
      {error !== null && <p>{error}</p>}
      {genres && (
        <>
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
              key={genre.id}
              onClick={() => addGenre(genre.id)}
            />
          ))}
        </>
      )}
    </section>
  );
}

export default GenreOptions;

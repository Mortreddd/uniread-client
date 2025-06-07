import Genres from "@/components/genre/Genres";
import useGetGenres from "@/api/genres/useGetGenres";

export default function GenresPage() {
  // TODO: remove the @ts-ignore comment before deploying the application
  // @ts-ignore
  const { data: genres, loading, error } = useGetGenres();
  return (
    <>
        <header className={'w-full'}>

        </header>
      <div className="w-full min-h-screen flex flex-col">
        <div className="w-full h-full flex flex-1 bg-gray-100">
          <Genres genres={genres} />
        </div>
      </div>
    </>
  );
}

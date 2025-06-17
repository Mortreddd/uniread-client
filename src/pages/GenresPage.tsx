import Genres from "@/components/genre/Genres";
import useGetGenres from "@/api/genres/useGetGenres";
import GuestNavbar from "@/components/common/navbar/GuestNavbar.tsx";

export default function GenresPage() {
  // TODO: remove the @ts-ignore comment before deploying the application
  const { data: genres } = useGetGenres();
  return (
    <>
      <header className={"w-full relative mb-20"}>
        <GuestNavbar />
      </header>
      <div className="w-full min-h-screen flex flex-col">
        <div className="w-full h-full flex flex-1 bg-gray-100">
          <Genres genres={genres} />
        </div>
      </div>
    </>
  );
}

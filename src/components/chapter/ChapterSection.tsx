import useGetBookChapters from "@/api/chapters/useGetBookChapters";
import { PaginateParams } from "@/types/Pagination";
import { useEffect, useState } from "react";
import ChapterDetail from "./ChapterDetail";
import { Link } from "react-router-dom";
import { Chapter } from "@/types/Chapter";
import LoadingCircle from "../LoadingCirlce";

interface ChapterSectionProps {
  bookId?: undefined | string;
}

export default function ChapterSection({ bookId }: ChapterSectionProps) {
  const [{ pageNo, pageSize }] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
  });
  const { data, loading } = useGetBookChapters({ bookId, pageNo, pageSize });
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    if (data?.content) {
      setChapters(data.content);
    }
  }, [data]);

  console.log(data);

  return (
    <div className="flex flex-col h-fit min-h-72 w-full rounded-lg border">
      <h1 className="text-2xl font-bold text-gray-800 my-4 ml-4">
        Table of Contents
      </h1>
      <div className="flex flex-col w-full bg-white flex-1">
        {loading && !data?.content ? (
          <div className="flex items-center justify-center w-full h-full">
            <LoadingCircle />
          </div>
        ) : !loading && chapters.length > 0 ? (
          chapters.map((chapter) => (
            <Link
              to={`/books/${bookId}/chapters/${chapter.id}`}
              className="w-full hover:bg-gray-100 bg-gray-50 duration-200 ease-in-out transition-all py-2"
            >
              <ChapterDetail chapter={chapter} />
            </Link>
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p className="font-sans font-thin text-gray-500">
              No current chapters yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

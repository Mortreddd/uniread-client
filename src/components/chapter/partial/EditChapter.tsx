import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EmptyChapter from "../EmptyChapter.tsx";
import useGetBookChapterById from "@/api/chapters/useGetBookChapterById.ts";
import LoadingCircle from "@/components/LoadingCirlce.tsx";
import { Chapter } from "@/types/Chapter.ts";
import ChapterEditor from "@/components/chapter/ChapterEditor.tsx";


export default function EditChapter() {
  /**
   * The current url parameters are used to get the bookId and chapterId
   * from the url. This is used to get the chapter data from the API.
   */
  const { bookId, chapterId } = useParams<{
    bookId: string;
    chapterId: string;
  }>();
  const { data, loading } = useGetBookChapterById({ bookId, chapterId });
  const [chapter, setChapter] = useState<Chapter | null>(null);
  useEffect(() => {
    if(data) {
      setChapter(data)
    }
  }, [data]);
  return (
    <>
      {loading && !chapter ? (
        <div className={"h-full w-full flex items-center justify-center"}>
          <LoadingCircle />
        </div>
      ) : chapter ? (
        <div className="h-full w-full flex flex-col border border-solid py-4">
          <ChapterEditor chapter={chapter} />
        </div>
      ) : (
        <EmptyChapter />
      )}
    </>
  );
}

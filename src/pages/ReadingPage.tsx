import useGetBookChapters from "@/api/chapters/useGetBookChapters";
import ChaptersDropdown from "@/components/common/dropdown/ChaptersDropdown";
import AuthenticatedNavbar from "@/components/common/navbar/AuthenticatedNavbar";
import { Chapter, ChapterParams } from "@/types/Chapter";
import { ChapterStatus } from "@/types/Enums";
import { useMemo, useState } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";

interface ReadBookChaptersProps {
  chapter: Chapter;
}

export default function ReadingPage() {
  const { bookId, chapterId } = useParams<{
    bookId: string;
    chapterId: string;
  }>();
  const [{ pageNo, pageSize, status }] = useState<ChapterParams>({
    bookId,
    pageNo: 0,
    pageSize: 10,
    status: ChapterStatus.PUBLISHED,
  });

  const { data } = useGetBookChapters({ bookId, pageNo, pageSize, status });
  const chapters = useMemo(() => {
    if (!data?.content) return [];

    return data.content;
  }, [data]);

  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);

  function handleSelectChapter(chapterId: string | undefined) {
    const chapter = chapters.find((c) => c.id === chapterId);
    setCurrentChapter(chapter || null);
  }

  return (
    <>
      <header className={"relative"}>
        <AuthenticatedNavbar />
      </header>
      <section className="w-full h-full">
        <div className="px-4 py-5 mb-5 flex justify-between bg-transparent border border-gray-200 shadow-sm">
          <ChaptersDropdown chapters={chapters} onClick={handleSelectChapter} />
        </div>
        <div className="flex justify-center bg-transparent h-full">
          <div className="w-96 bg-gray-50 px-4 py-8 shadow h-full">
            {currentChapter ? (
              <Outlet
                context={
                  { chapter: currentChapter } satisfies ReadBookChaptersProps
                }
              />
            ) : (
              <p className="text-gray-500">Select a chapter to read</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export function useBookChapter() {
  return useOutletContext<ReadBookChaptersProps>();
}

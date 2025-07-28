import Footer from "@/components/Footer.tsx";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/common/form/Button";
import { Chapter } from "@/types/Chapter";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ModalRef } from "@/components/common/modal/Modal.tsx";
import AddNewChapterModal from "@/components/common/modal/chapter/AddNewChapterModal.tsx";
import useGetBookChapters from "@/api/chapters/useGetBookChapters.ts";
import { PaginateParams } from "@/types/Pagination.ts";
import LoadingCircle from "@/components/LoadingCirlce.tsx";
import AuthenticatedNavbar from "@/components/common/navbar/AuthenticatedNavbar.tsx";
import ChapterSectionList from "@/components/chapter/ChapterSectionList.tsx";

export default function WriteChapterPage() {
  const { bookId, chapterId } = useParams<{
    bookId: string;
    chapterId: string;
  }>();
  const newChapterModalRef = useRef<ModalRef>(null);
  const navigate = useNavigate();
  const [{ pageNo, pageSize }] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
    query: "",
  });
  const { data, loading } = useGetBookChapters({ bookId, pageNo, pageSize });
  const [chapters, setChapters] = useState<Chapter[]>([]);

  function handleOpen() {
    newChapterModalRef.current?.open();
  }

  function handleClose() {
    newChapterModalRef.current?.close();
  }

  function onCreate(chapter: Chapter) {
    setChapters((prev) => {
      return [...prev, chapter];
    });
    handleClose();
    navigate(`/workspace/stories/${chapter.bookId}/chapters/${chapter.id}`);
  }

  useEffect(() => {
    if (data?.content) {
      setChapters(data.content);
    }
  }, [data?.content]);

  return (
    <>
      <header className={"w-full relative"}>
        <AuthenticatedNavbar />
      </header>
      <section className="w-full h-fit min-h-screen flex flex-col bg-gray-50">
        <div className="w-full flex flex-1 overflow-hidden ">
          <aside className="w-96 px-5 border border-solid rounded-sm relative">
            <div className="w-full h-full my-7">
              <h3 className="text-2xl font-serif text-center w-full">
                Chapters
              </h3>
              {loading && !data ? (
                  <LoadingCircle />
              ) : (
                  <ChapterSectionList chapters={chapters ?? []} />
              )}
              <AddNewChapterModal
                bookId={bookId}
                ref={newChapterModalRef}
                onCreate={onCreate}
              />

              <Button
                variant={"primary"}
                onClick={() => handleOpen()}
                className="rounded-xs flex items-center justify-center w-full"
              >
                Add Chapter
                <PlusIcon className="size-6 ml-3" />
              </Button>
            </div>
          </aside>
          <div className="flex-1 min-h-0">
            {chapterId ? (
              <Outlet />
            ) : (
              <div className={"h-full w-full flex items-center justify-center"}>
                <h2 className={"font-sans font-medium text-xl text-gray-900"}>
                  No chapter selected
                </h2>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

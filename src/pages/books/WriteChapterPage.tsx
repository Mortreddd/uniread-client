import Navbar from "@/components/common/navbar/Navbar.tsx";
import Footer from "@/components/Footer.tsx";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/common/form/Button";
import { Chapter } from "@/types/Chapter";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ModalRef } from "@/components/common/modal/Modal.tsx";
import AddNewChapterModal from "@/components/common/modal/chapter/AddNewChapterModal.tsx";
import useGetBookChapters from "@/api/chapters/useGetBookChapters.ts";
import { PaginateParams } from "@/types/Pagination.ts";
import LoadingCircle from "@/components/LoadingCirlce.tsx";
import api from "@/services/ApiService.ts";
import { AxiosError, AxiosResponse } from "axios";
import { SuccessResponse } from "@/types/Success.ts";
import { ErrorResponse } from "@/types/Error.ts";
import { useAlert } from "@/contexts/AlertContext.tsx";
import WarningPublishedChapterModal from "@/components/common/modal/chapter/WarningPublishedChapterModal.tsx";

export default function WriteChapterPage() {
  const { bookId, chapterId } = useParams<{
    bookId: string;
    chapterId: string;
  }>();
  const newChapterModalRef = useRef<ModalRef>(null);
  const navigate = useNavigate();
  const deleteChapterModalRef = useRef<ModalRef>(null);
  const { showAlert } = useAlert();
  const [{ pageNo, pageSize }] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
    query: "",
  });
  const { data, loading } = useGetBookChapters({ bookId, pageNo, pageSize });
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  function handleOpen() {
    newChapterModalRef.current?.open();
  }

  function handleClose() {
    newChapterModalRef.current?.close();
  }

  function handleWarningChapterModalOpen() {
    deleteChapterModalRef.current?.open();
  }

  function handleWarningChapterModalClose() {
    deleteChapterModalRef.current?.close();
  }

  function onCreate(chapter: Chapter) {
    setChapters((prev) => {
      return [...prev, chapter];
    });
    handleClose();
    navigate(`/stories/edit/${chapter.book.id}/chapters/${chapter.id}`);
  }
  async function handleDelete(chapter?: Chapter) {
    await api
      .delete(`/books/${chapter?.book.id}/chapters/${chapter?.id}/delete`)
      .then((response: AxiosResponse<SuccessResponse>) => {
        showAlert(response.data.message ?? "Successfully deleted!", "success");
        setChapters((prev) => {
          return prev.filter((c) => c.id !== chapter?.id);
        });
        deleteChapterModalRef.current?.close();
        if (chapter?.id === chapterId) {
          navigate(`/stories/edit/${chapter?.book.id}`, { replace: true });
        }
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        showAlert(
          error?.response?.data.message ??
            "Something went wrong deleting the chapter",
          "error"
        );
      });
  }

  useEffect(() => {
    if (data?.content) {
      setChapters(data.content);
    }
  }, [data?.content]);

  useEffect(() => {
    if (selectedChapter) {
      deleteChapterModalRef.current?.open();
    }
  }, [selectedChapter]);

  return (
    <main className="w-full antialiased">
      <section className="w-full h-fit min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="w-full flex flex-1 overflow-hidden ">
          <aside className="w-96 px-5 border border-solid rounded relative">
            <div className="w-full h-full my-7">
              <h3 className="text-2xl font-sans text-center w-full">
                Chapters
              </h3>
              <section className="w-full inline-block space-y-2 overflow-y-auto h-fit">
                {!data?.content && loading ? (
                  <div className="w-full h-full flex justify-center">
                    <LoadingCircle />
                  </div>
                ) : chapters.length !== 0 ? (
                  chapters.map((chapter) => (
                    <article key={chapter.id} className="w-full h-fit">
                      <h3 className="text-nowrap text-gray-800 bg-gray-50 rounded truncate font-sans text-lg mb-4">
                        {chapter.title}
                      </h3>
                      <div className="flex items-end justify-end w-full h-fit">
                        <NavLink
                          to={`/stories/edit/${chapter.book.id}/chapters/${chapter.id}`}
                        >
                          <Button
                            variant={"custom"}
                            className="rounded-full text-primary text-sm"
                          >
                            Edit
                          </Button>
                        </NavLink>
                        <Button
                          variant={"custom"}
                          onClick={() => {
                            handleWarningChapterModalOpen();
                            setSelectedChapter(chapter);
                          }}
                          className="rounded-full ml-2 text-red-500 text-sm"
                        >
                          Delete
                        </Button>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="w-full h-full flex justify-center">
                    <h3 className="text-gray-500 text-lg mt-10 font-sans">
                      No Chapters Found
                    </h3>
                  </div>
                )}
              </section>
              <AddNewChapterModal
                bookId={bookId}
                ref={newChapterModalRef}
                onCreate={onCreate}
              />

              {selectedChapter && (
                <WarningPublishedChapterModal
                  ref={deleteChapterModalRef}
                  chapter={selectedChapter}
                  onCancel={handleWarningChapterModalClose}
                  onDelete={() => handleDelete(selectedChapter)}
                />
              )}

              <Button
                variant={"primary"}
                onClick={() => handleOpen()}
                className="rounded w-full flex items-center"
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
    </main>
  );
}

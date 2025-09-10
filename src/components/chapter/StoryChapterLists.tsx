import useChapter from "@/hooks/useChapter";
import LoadingCircle from "../LoadingCirlce";
import { useRef, useState } from "react";
import { PaginateParams } from "@/types/Pagination";
import { formatDateWithTime } from "@/utils/Dates";
import { Button } from "../common/form/Button";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Chapter } from "@/types/Chapter";
import { ChapterStatus } from "@/types/Enums";
import { useAlert } from "@/contexts/AlertContext";
import { ModalRef } from "../modal/Modal.tsx";
import { AnimatePresence, motion } from "motion/react";
import WarningConfirmationModal from "../modal/WarningConfirmationModal.tsx";

interface StoryChapterListsProps {
  storyId: string;
}

export default function StoryChapterLists({ storyId }: StoryChapterListsProps) {
  const [{ pageNo, pageSize }] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
  });

  const {
    chapters,
    loading,
    onDeleteChapter,
    onForceDeleteChapter,
    onPublish,
  } = useChapter({ bookId: storyId, pageNo, pageSize });
  const { showAlert } = useAlert();
  const deletedModalRef = useRef<ModalRef>(null);
  const forceDeleteModalRef = useRef<ModalRef>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<null | Chapter>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");

  async function handlePublish() {
    if (!selectedChapter) return;

    setIsProcessing(true);
    const status =
      selectedChapter.status === ChapterStatus.DRAFT
        ? ChapterStatus.PUBLISHED
        : ChapterStatus.DRAFT;

    try {
      await onPublish(
        selectedChapter.id,
        { status },
        {
          onUpdate: (chapter) => {
            showAlert(
              `Successfully ${
                status === ChapterStatus.PUBLISHED ? "published" : "unpublished"
              } chapter ${chapter.title}`,
              "success"
            );
            setSelectedOption("");
          },
          onError: (message) => {
            showAlert(message, "error");
          },
        }
      );
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleDelete() {
    if (!selectedChapter) return;

    setIsProcessing(true);
    try {
      await onDeleteChapter(selectedChapter.id, {
        onDelete: (message) => {
          showAlert(message, "success");
          deletedModalRef.current?.close();
          resetSelection();
        },
        onError: (message) => {
          showAlert(message, "error");
          resetSelection();
        },
      });
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleForceDelete() {
    if (!selectedChapter) return;

    setIsProcessing(true);
    try {
      await onForceDeleteChapter(selectedChapter.id, {
        onForceDelete: (message) => {
          showAlert(message, "success");
          forceDeleteModalRef.current?.close();
          resetSelection();
        },
        onError: (message) => {
          showAlert(message, "error");
          resetSelection();
        },
      });
    } finally {
      setIsProcessing(false);
    }
  }

  function resetSelection() {
    setSelectedOption("");
    setSelectedChapter(null);
  }

  function handleOptionClick(chapter: Chapter) {
    if (selectedOption === chapter.id) {
      resetSelection();
    } else {
      setSelectedOption(chapter.id);
      setSelectedChapter(chapter);
    }
  }

  return (
    <div className="mt-3 space-y-3">
      <WarningConfirmationModal
        ref={deletedModalRef}
        onConfirm={handleDelete}
        onCancel={() => deletedModalRef.current?.close()}
      >
        Are you sure you want to delete this chapter? You may retrieve it later
        from the trash, but it will be permanently deleted after 30 days.
      </WarningConfirmationModal>

      <WarningConfirmationModal
        ref={forceDeleteModalRef}
        onConfirm={handleForceDelete}
        onCancel={() => forceDeleteModalRef.current?.close()}
      >
        Are you sure you want to permanently delete this chapter? This action
        cannot be undone. It will be removed from the trash and cannot be
        retrieved.
      </WarningConfirmationModal>

      {loading ? (
        <div className="flex justify-center items-center min-h-20">
          <LoadingCircle />
        </div>
      ) : chapters.length > 0 ? (
        chapters.map((chapter) => (
          <div
            key={chapter.id}
            className="rounded relative flex justify-between items-center group"
          >
            <div className="flex-1 relative isolate flex justify-between items-center px-2 duration-200 transition-all ease-in-out hover:bg-gray-200">
              <a
                href={`/workspace/stories/${chapter.bookId}/chapters/${chapter.id}`}
                className="font-bold px-4 py-2 text-wrap text-gray-800 truncate line-clamp-1 transition-all ease-in-out hover:text-shadow-md hover:cursor-pointer"
                aria-label={`Edit chapter: ${chapter.title}`}
              >
                {chapter.title}
              </a>
              <time
                className="text-gray-500 text-sm whitespace-nowrap"
                aria-label={`Last updated: ${formatDateWithTime(
                  new Date(chapter.updatedAt)
                )}`}
              >
                Last Updated: {formatDateWithTime(new Date(chapter.updatedAt))}
              </time>
            </div>

            <div className="inline-flex relative items-center">
              <Button
                onClick={() => handleOptionClick(chapter)}
                variant={"ghost"}
                className="p-0.5 rounded-full"
                aria-expanded={selectedOption === chapter.id}
              >
                <EllipsisHorizontalIcon className="size-6 text-gray-800" />
              </Button>

              <AnimatePresence>
                {selectedOption === chapter.id && (
                  <motion.ul
                    initial={{ opacity: 0, scale: 0.8, y: 0 }}
                    animate={{ opacity: 1, scale: 1, y: -10 }}
                    exit={{ opacity: 0, scale: 0.8, y: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    onMouseLeave={resetSelection}
                    className="absolute bottom-3 w-fit min-w-32 font-serif text-gray-800 right-0 items-center gap-3 rounded-xs bg-gray-100 z-50 shadow-lg"
                  >
                    <li
                      onClick={handlePublish}
                      className={`py-2 px-3 hover:cursor-pointer transition-all ${
                        isProcessing ? "opacity-50 cursor-not-allowed" : ""
                      } duration-200 ease-in-out hover:bg-gray-300 bg-transparent`}
                    >
                      {isProcessing
                        ? "Publishing..."
                        : chapter.isPublished
                        ? "Unpublish"
                        : "Publish"}
                    </li>
                    <li
                      onClick={() => deletedModalRef.current?.open()}
                      className="py-2 px-3 transition-all duration-200 ease-in-out hover:bg-red-600 hover:text-white bg-transparent hover:cursor-pointer"
                    >
                      Delete
                    </li>
                    <li
                      onClick={() => forceDeleteModalRef.current?.open()}
                      className="py-2 px-3 transition-all duration-200 ease-in-out hover:bg-red-600 hover:text-white bg-transparent hover:cursor-pointer"
                    >
                      Delete (Force)
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center min-h-20">
          <h6 className="text-lg text-gray-700">No chapters available</h6>
        </div>
      )}
    </div>
  );
}

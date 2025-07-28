import { Book } from "@/types/Book";
import Modal, { ModalRef } from "../Modal";
import { forwardRef, Ref, useRef, useState } from "react";
import defaultCover from "@/assets/cover6.jpg";
import { PaginateParams } from "@/types/Pagination";
import {
  EllipsisHorizontalIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { formatDateWithTime } from "@/utils/Dates";
import WarningConfirmationModal from "../WarningConfirmationModal";
import { useAlert } from "@/contexts/AlertContext";
import useChapter from "@/hooks/useChapter.ts";
import LoadingCircle from "@/components/LoadingCirlce.tsx";
import { Button } from "../../form/Button";
import { ChapterStatus } from "@/types/Enums.ts";
import { Chapter } from "@/types/Chapter.ts";

interface ViewStoryModalProps {
  story: Book;
}

function ViewStoryModal({ story }: ViewStoryModalProps, ref: Ref<ModalRef>) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<null | Chapter>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const deletedModalRef = useRef<ModalRef>(null);
  const forceDeleteModalRef = useRef<ModalRef>(null);

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
  } = useChapter({ bookId: story.id, pageNo, pageSize });
  const { showAlert } = useAlert();

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
    <Modal ref={ref}>
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

      <article className="font-sans text-gray-800 relative isolate">
        <div className="flex">
          <figure className="flex-none rounded overflow-hidden h-auto w-32">
            <img
              src={defaultCover}
              alt={story.title}
              className="object-cover h-full"
              aria-hidden="true"
            />
          </figure>
          <figcaption className="ml-3 relative">
            <h3 className="font-bold line-clamp-1 text-wrap text-2xl truncate">
              {story.title}
            </h3>
            <Button
              variant="primary"
              size="custom"
              className="mt-1 mb-3 rounded-full px-3 py-1.5 inline-flex text-xs items-center"
            >
              <a href={`/workspace/stories/${story.id}`}>Continue Editing</a>
              <PencilIcon className="size-3 text-white ml-2" />
            </Button>
            <p className="mt-2 line-clamp-3 text-wrap truncate">
              {story.description}
            </p>
          </figcaption>
        </div>

        <div className="mt-5">
          <h6 className="text-lg font-semibold">Table of Contents</h6>

          <div className="mt-3 space-y-3">
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
                      Last Updated:{" "}
                      {formatDateWithTime(new Date(chapter.updatedAt))}
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
                              isProcessing
                                ? "opacity-50 cursor-not-allowed"
                                : ""
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
        </div>
      </article>
    </Modal>
  );
}

export default forwardRef(ViewStoryModal);

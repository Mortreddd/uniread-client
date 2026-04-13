import { BookDetail } from "@/features/books/types/Book.ts";
import Modal, { ModalRef } from "../../../shared/components/Modal.tsx";
import { forwardRef, Ref, useRef, useState } from "react";
import defaultCover from "@/assets/cover6.jpg";
import {
  EllipsisHorizontalIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/shared/components/form/Button.tsx";
import StoryChapterLists from "@/components/chapter/StoryChapterLists.tsx";
import useBook from "@/hooks/useBook.ts";
import { useToast } from "@/contexts/ToastContext.tsx";
import WarningConfirmationModal from "@/components/modal/WarningConfirmationModal.tsx";
import ViewCollaboratorRequests from "../../../components/modal/collaborator/ViewCollaboratorRequests.tsx";

interface ViewStoryModalProps {
  story: BookDetail;
  onDelete: (storyId: string) => void;
}

function ViewStoryModal(
  { story, onDelete }: ViewStoryModalProps,
  ref: Ref<ModalRef>
) {
  const [showOptions, setShowOptions] = useState(false);
  const deletedModalRef = useRef<ModalRef>(null);
  const forceDeleteModalRef = useRef<ModalRef>(null);
  const viewCollaboratorRequestsRef = useRef<ModalRef>(null);
  const { onDeleteBook, onForceDeleteBook } = useBook();
  const { showToast } = useToast();

  function onViewCollaborationRequests() {
    viewCollaboratorRequestsRef.current?.open();
  }

  function onClickDelete() {
    deletedModalRef.current?.open();
  }

  function onClickForceDelete() {
    forceDeleteModalRef.current?.open();
  }

  async function handleDelete() {
    await onDeleteBook(story.id, {
      onDelete: (message) => {
        onDelete(story.id);
        showToast(message, "info");
        deletedModalRef.current?.close();
      },
      onError: (message) => {
        showToast(message, "error");
      },
    });
  }

  async function handleForceDelete() {
    await onForceDeleteBook(story.id, {
      onForceDelete: (message) => {
        onDelete(story.id);
        showToast(message, "info");
        forceDeleteModalRef.current?.close();
      },
      onError: (message) => {
        showToast(message, "error");
      },
    });
  }
  return (
    <Modal ref={ref}>
      <ViewCollaboratorRequests
        bookId={story.id}
        ref={viewCollaboratorRequestsRef}
      />
      <WarningConfirmationModal
        ref={deletedModalRef}
        onConfirm={handleDelete}
        onCancel={() => deletedModalRef.current?.close()}
      >
        Are you sure you want to delete this book? You may retrieve it later
        from the trash, but if it has collaborator, they will be affected and
        not able to work and this book will be permanently deleted after 30
        days.
      </WarningConfirmationModal>

      <WarningConfirmationModal
        ref={forceDeleteModalRef}
        onConfirm={handleForceDelete}
        onCancel={() => forceDeleteModalRef.current?.close()}
      >
        Are you sure you want to permanently delete this book? the collaborators
        will be affected and not able to work anymore. This actions cannot be
        undone.
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
            <div className="inline-flex gap-2 items-center">
              <Button
                variant="primary"
                size="custom"
                className="mt-1 mb-3 rounded-full px-3 py-1.5 inline-flex text-xs items-center"
              >
                <a href={`/workspace/stories/${story.id}`}>Continue Editing</a>
                <PencilIcon className="size-3 text-white ml-2" />
              </Button>
              <Button
                variant={"ghost"}
                onClick={() => setShowOptions((prev) => !prev)}
                className={"rounded-full p-0.5"}
                size={"custom"}
              >
                <EllipsisHorizontalIcon className={"size-6 text-gray-800"} />
              </Button>
              <div className="inline-flex relative items-center">
                <AnimatePresence>
                  {showOptions && (
                    <motion.ul
                      initial={{ opacity: 0, scale: 0.8, y: 0 }}
                      animate={{ opacity: 1, scale: 1, y: -10 }}
                      exit={{ opacity: 0, scale: 0.8, y: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      onMouseLeave={() => setShowOptions(false)}
                      className="absolute top-3 w-fit min-w-52 font-serif text-gray-800 left-0 items-center gap-3 rounded-xs bg-gray-100 z-50 shadow-lg"
                    >
                      <li
                        onClick={onViewCollaborationRequests}
                        className="py-2 px-3 transition-all duration-200 ease-in-out hover:bg-gray-300 bg-transparent hover:cursor-pointer"
                      >
                        Collaboration Requests
                      </li>
                      <li
                        onClick={onClickDelete}
                        className="py-2 px-3 transition-all duration-200 ease-in-out hover:bg-red-600 hover:text-white bg-transparent hover:cursor-pointer"
                      >
                        Delete
                      </li>
                      <li
                        onClick={onClickForceDelete}
                        className="py-2 px-3 transition-all duration-200 ease-in-out hover:bg-red-600 hover:text-white bg-transparent hover:cursor-pointer"
                      >
                        Delete (Force)
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <p className="mt-2 line-clamp-3 text-wrap truncate">
              {story.description}
            </p>
          </figcaption>
        </div>

        <div className="mt-5">
          <h6 className="text-lg font-semibold">Table of Contents</h6>
          <StoryChapterLists storyId={story.id} />
        </div>
      </article>
    </Modal>
  );
}

export default forwardRef(ViewStoryModal);

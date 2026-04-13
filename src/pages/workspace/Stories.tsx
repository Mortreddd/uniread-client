import { useCallback, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useCurrentUserBooks from "@/api/profile/useCurrentUserBooks.ts";
import { PaginateParams } from "@/types/Pagination.ts";
import { Button } from "@/shared/components/form/Button.tsx";
import { motion } from "motion/react";
import Spinner from "@/shared/components/Spinner.tsx";
import UserStory from "@/features/books/UserStory.tsx";
import { BookDetail } from "@/features/books/types/Book.ts";
import { ModalRef } from "@/shared/components/Modal.tsx";
import ViewStoryModal from "@/features/books/modal/ViewStoryModal.tsx";
import AddBookModal from "@/features/books/modal/AddBookModal.tsx";

type BookCategories = "ALL" | "PUBLISHED" | "DRAFT";

export default function Stories() {
  const viewStoryModalRef = useRef<ModalRef>(null);
  const createBookModalRef = useRef<ModalRef>(null);

  const [story, selectedStory] = useState<BookDetail | null>(null);
  const [params, setParams] = useSearchParams();
  const [category, setCategory] = useState<BookCategories>(() => {
    const category = params.get("category") as BookCategories;
    return category || "ALL";
  });
  const [{ pageNo, pageSize, query }] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
    query: "",
  });

  const { data, loading } = useCurrentUserBooks({
    pageNo,
    pageSize,
    query,
    category,
  });

  const stories = useMemo(() => {
    if (!data) return [];

    return data.content;
  }, [data]);

  const handleViewStory = useCallback(
    (story: BookDetail) => {
      viewStoryModalRef.current?.open();
      selectedStory(story);
    },
    [story]
  );

  function onDelete(storyId: string) {
      stories.filter((s) => s.id === storyId)
      viewStoryModalRef.current?.close()
  }

  return (
    <section className="w-full h-full p-4 relative font-serif bg-gray-50 overflow-y-auto">
      {story && <ViewStoryModal ref={viewStoryModalRef} story={story} onDelete={onDelete} />}
      <AddBookModal ref={createBookModalRef} />
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{ opacity: 1, y: 0 }}
        className={"mb-5 flex justify-between items-center"}
      >
        <div className={"relative"}>
          <h2 className="text-2xl font-medium">My Stories</h2>
          <div className="mt-4 inline-flex items-center gap-4">
            {/* Map through user's stories and display them here */}
            <span
              onClick={() => {
                const newCategory: BookCategories = "ALL";
                setCategory(newCategory);
                setParams({ category: newCategory });
              }}
              className={`${
                category === "ALL"
                  ? "text-white bg-primary hover:bg-primary/80"
                  : "border-primary bg-transparent text-primary hover:text-white hover:bg-primary"
              } border-primary border rounded-full text-primary transition-all ease-in-out duration-200 px-3 py-1 hover:cursor-pointer`}
            >
              All
            </span>
            <span
              onClick={() => {
                const newCategory: BookCategories = "PUBLISHED";
                setCategory(newCategory);
                setParams({ category: newCategory });
              }}
              className={`${
                category === "PUBLISHED"
                  ? "text-white bg-primary hover:bg-primary/80"
                  : "border-primary bg-transparent text-primary hover:text-white hover:bg-primary"
              } border-primary border rounded-full transition-all ease-in-out duration-200 px-3 py-1 hover:cursor-pointer`}
            >
              Published
            </span>
            <span
              onClick={() => {
                const newCategory: BookCategories = "DRAFT";
                setCategory(newCategory);
                setParams({ category: newCategory });
              }}
              className={`${
                category === "DRAFT"
                  ? "text-white bg-primary hover:bg-primary/80"
                  : "border-primary bg-transparent text-primary hover:text-white hover:bg-primary"
              } border-primary border rounded-full transition-all ease-in-out duration-200 px-3 py-1 hover:cursor-pointer`}
            >
              Draft
            </span>
          </div>
        </div>
        <Button
          onClick={() => createBookModalRef.current?.open()}
          variant={"success"}
          className={"rounded"}
        >
          New Story
        </Button>
      </motion.div>
      <div className="grid grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-2 flex justify-center items-center h-96">
            <Spinner />
          </div>
        ) : (
          stories.map((story) => (
            <UserStory
              onView={() => handleViewStory(story)}
              story={story}
              key={story.id}
            />
          ))
        )}
      </div>
    </section>
  );
}

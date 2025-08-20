import { useCallback, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useCurrentUserBooks from "@/api/profile/useCurrentUserBooks.ts";
import { PaginateParams } from "@/types/Pagination.ts";
import { Button } from "@/components/common/form/Button.tsx";
import { motion } from "motion/react";
import LoadingCircle from "@/components/LoadingCirlce";
import UserStory from "@/components/book/UserStory";
import { Book } from "@/types/Book";
import { ModalRef } from "@/components/common/modal/Modal";
import ViewStoryModal from "@/components/common/modal/book/ViewStoryModal";
import AddBookModal from "@/components/common/modal/book/AddBookModal";

type BookCategories = "ALL" | "PUBLISHED" | "DRAFT";

export default function Stories() {
  const viewStoryModalRef = useRef<ModalRef>(null);
  const createBookModalRef = useRef<ModalRef>(null);

  const [story, selectedStory] = useState<Book | null>(null);
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
    (story: Book) => {
      viewStoryModalRef.current?.open();
      selectedStory(story);
    },
    [story]
  );

  return (
    <section className="w-full h-full p-4 relative font-serif bg-gray-50 overflow-y-auto">
      {story && <ViewStoryModal ref={viewStoryModalRef} story={story} />}
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
            <LoadingCircle />
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

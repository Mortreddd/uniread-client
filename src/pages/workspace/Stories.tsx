import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useCurrentUserBooks from "@/api/profile/useCurrentUserBooks.ts";
import { PaginateParams } from "@/types/Pagination.ts";
import { Button } from "@/components/common/form/Button.tsx";
import { motion } from "motion/react";
import LoadingCircle from "@/components/LoadingCirlce";
import bookCoverPhoto from "@/assets/cover6.jpg"

type BookCategories = "ALL" | "PUBLISHED" | "DRAFT";

export default function Stories() {
  const [params, setParams] = useSearchParams();
  const [category, setCategory] = useState<BookCategories>(
    params.get("category") as BookCategories
  );
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
  return (
    <section className="w-full h-full p-4 relative font-serif bg-gray-50 overflow-y-auto">
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
                setCategory("ALL");
                setParams({ category });
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
                setCategory("PUBLISHED");
                setParams({ category });
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
                setCategory("DRAFT");
                setParams({ category });
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
        <Button variant={"success"} className={"rounded"}>
          <a href={"/workspace/my-stories/new"}>New Story</a>
        </Button>
      </motion.div>
      <div className="grid grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-2 flex justify-center items-center h-96">
            <LoadingCircle />
          </div>
        ) : (
          stories.map((story) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white flex rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
            >
                <img src={bookCoverPhoto} className={'rounded-none h-auto w-28'}  alt={'Book Cover'}/>
                <div className={'p-4'}>

              <h3 className="text-xl font-semibold">{story.title}</h3>
              <p className="text-gray-600 mt-2 line-clamp-3">{story.description}</p>
              <div className="mt-4">
                <a
                  href={`/edit/${story.id}`}
                  className="text-primary hover:text-primary/80"
                >
                  View Story
                </a>
              </div>
                </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}

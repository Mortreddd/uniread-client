import { Book } from "@/types/Book";
import { motion } from "motion/react";
import bookCoverPhoto from "@/assets/cover6.jpg";
import { memo } from "react";

interface UserStoryProps {
  story: Book;
  onView: (story: Book) => void;
}

function UserStory({ story, onView }: UserStoryProps) {
  return (
    <motion.div
      key={story.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white flex rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
    >
      <img
        src={bookCoverPhoto}
        className={"rounded-none h-auto w-32"}
        alt={"Book Cover"}
      />
      <div className={"p-4"}>
        <div className="h-fit min-h-28">
          <h3 className="text-xl font-semibold">{story.title}</h3>
          <p className="text-gray-600 truncate text-wrap mt-2 line-clamp-3">
            {story.description}
          </p>
        </div>
        <div className="mt-4">
          <p
            className="text-primary hover:cursor-pointer transition-all duration-200 ease-in-out w-fit hover:text-shadow-xs hover:text-primary/80"
            onClick={() => onView(story)}
          >
            View Story
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default memo(UserStory);

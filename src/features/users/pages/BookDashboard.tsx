import { Button } from "@/shared/components/form/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import PersonalBookSection from "../components/PersonalBookSection";

export default function BookDashboard() {
  return (
    <AnimatePresence mode="wait">
      <div className="size-full overflow-hidden max-w-full">
        <div className="mb-1 md:mb-1.5">
          <motion.h1
            initial={{
              translateY: -10,
              opacity: 0,
            }}
            animate={{
              translateY: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            className="text-lg md:text-xl lg:text-2xl font-sans font-medium tracking-light text-gray-800 dark:text-gray-200"
          >
            My Books
          </motion.h1>
          <motion.div
            initial={{
              translateY: -10,
              opacity: 0,
            }}
            animate={{
              translateY: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
            className="flex flex-col lg:flex-row items-start justify-start lg:items-center gap-3 lg:gap-0 lg:justify-between"
          >
            <p className="text-gray-700 dark:text-gray-300 font-thin font-sans text-xs md:text-sm lg:text-base">
              Manage your literacy portfolio and creative drafts
            </p>
            <div className="relative inline-flex items-center">
              <Button className={"rounded"}>
                <Link
                  to={"/dashboard/books/new"}
                  reloadDocument={true}
                  className={"inline-flex items-center"}
                >
                  <PlusIcon
                    className={"size-4 lg:size-5 text-gray-200 mr-1.5 lg:mr-2"}
                  />
                  <span className="text-xs lg:text-sm font-sans truncate text-gray-200">
                    Create New Story
                  </span>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{
            translateY: -10,
            opacity: 0,
          }}
          animate={{
            translateY: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-5 lg:mt-4"
        >
          <PersonalBookSection />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

import { motion } from "motion/react";

export default function BookSectionSkeleton() {
  return (
    <motion.div
      initial={{
        translateY: 10,
        opacity: 0,
      }}
      animate={{
        translateY: 0,
        opacity: 1,
      }}
      transition={{
        ease: "easeInOut",
        duration: 0.4,
      }}
      className="mx-auto w-full rounded-md bg-gray-200 dark:bg-slate-800 p-4"
    >
      <div className="animate-pulse">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 rounded bg-gray-200 dark:bg-slate-700">
            <div className="relative h-44 md:min-h-60 mb-4 md:mb-6">
              <div className="absolute inset-0 rounded-lg bg-gray-100 dark:bg-slate-700"></div>
            </div>
            <div className="flex flex-1 flex-col gap-2 md:gap-3">
              <div className="h-2 rounded bg-gray-200 dark:bg-slate-700"></div>
              <div className="h-2 rounded bg-gray-200 dark:bg-slate-700"></div>
            </div>
          </div>
          <div className="col-span-1 rounded bg-gray-200 dark:bg-slate-700">
            <div className="relative h-44 md:min-h-60 mb-4 md:mb-6">
              <div className="absolute inset-0 rounded-lg bg-gray-100 dark:bg-slate-700"></div>
            </div>
            <div className="flex flex-1 flex-col gap-2 md:gap-3">
              <div className="h-2 rounded bg-gray-200 dark:bg-slate-700"></div>
              <div className="h-2 rounded bg-gray-200 dark:bg-slate-700"></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

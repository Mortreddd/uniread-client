import { AnimatePresence, motion } from "motion/react";
export default function LoadingScreen() {
  return (
    <AnimatePresence>
      <motion.main
        initial={{ opacity: 0, visibility: "hidden" }}
        animate={{
          opacity: 1,
          visibility: "visible",
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
        exit={{ opacity: 0, visibility: "hidden" }}
        className="h-screen bg-white flex justify-center items-center relative w-full antialiased"
      >
        <div className="flex items-center gap-4">
          <div className="size-10 bg-primary rounded-full ball-bounce"></div>
          <div className="size-10 bg-primary rounded-full ball-bounce"></div>
          <div className="size-10 bg-primary rounded-full ball-bounce"></div>
          <div className="size-10 bg-primary rounded-full ball-bounce"></div>
          <div className="size-10 bg-primary rounded-full ball-bounce"></div>
        </div>
      </motion.main>
    </AnimatePresence>
  );
}

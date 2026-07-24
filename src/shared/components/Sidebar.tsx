import { useSidebar } from "@/contexts/SidebarContext";
import { AnimatePresence, motion } from "motion/react";
import { forwardRef, HTMLAttributes, PropsWithChildren } from "react";

function Sidebar({ children }: PropsWithChildren) {
  const { open, closeSidebar } = useSidebar();

  return (
    <>
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key="sidebar-backdrop"
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
          />
        )}
        {open && (
          <motion.aside
            key="sidebar-mobile-menu"
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-full min-h-0 w-60 bg-white dark:bg-gray-800 z-50 md:hidden shadow-xl"
          >
            {children}
          </motion.aside>
        )}
      </AnimatePresence>

      <aside className="hidden md:flex flex-col min-h-0 md:min-w-60 md:max-w-fit h-full border-r border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900">
        {children}
      </aside>
    </>
  );
}

export default forwardRef(Sidebar);

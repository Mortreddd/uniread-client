import { useSidebar } from "@/contexts/SidebarContext";
import { AnimatePresence, motion } from "motion/react";
import { forwardRef, PropsWithChildren } from "react";

type SidebarProps = PropsWithChildren;

const Sidebar = forwardRef<HTMLElement, SidebarProps>(({ children }, ref) => {
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
            ref={ref}
            key="sidebar-mobile-menu"
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-full w-60 z-50 md:hidden shadow-xl bg-gray-200 dark:bg-gray-800"
          >
            {children}
          </motion.aside>
        )}
      </AnimatePresence>

      <aside className="hidden md:flex flex-col min-h-0 md:min-w-60 md:max-w-fit h-full border-r border-gray-200 dark:border-gray-700 bg-gray-200/70 dark:bg-gray-950/30">
        {children}
      </aside>
    </>
  );
});

export default Sidebar;

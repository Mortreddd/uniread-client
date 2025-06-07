import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ExploreDropdown from "../dropdown/ExploreDropdown";
import useScrollPosition from "@/hooks/useScrollPosition";

export default function AuthenticatedNavbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const { scrollY } = useScrollPosition();

  useEffect(() => {
    if (scrollY > lastScrollY.current + 5) {
      // Scrolled down more than 5px
      setShowNavbar(false);
    } else if (scrollY < lastScrollY.current - 5) {
      // Scrolled up more than 5px
      setShowNavbar(true);
    }

    lastScrollY.current = scrollY;
  }, [scrollY]);

  return (
    <>
      <AnimatePresence>
        {showNavbar && (
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full flex justify-between items-center z-30 fixed top-0 py-5 px-32"
          >
            <a href="/" className="text-2xl font-medium text-black font-serif">
              Uniread
            </a>
            <ul className="gap-5 items-center font-serif flex">
              <li>
                <ExploreDropdown />
              </li>
              <li className="hover:cursor-pointer w-fit relative group">
                <a href="/stories">Write</a>
                <div className="w-0 group-hover:h-0 group-hover:w-full border-b border-black transition-all duration-200 ease-in-out border-solid"></div>
              </li>
              <li className="hover:cursor-pointer w-fit relative group">
                <a href="/library">Library</a>
                <div className="w-0 group-hover:h-0 group-hover:w-full border-b border-black transition-all duration-200 ease-in-out border-solid"></div>
              </li>
              <li className="hover:cursor-pointer w-fit relative group">
                <a href="/conversations">Messages</a>
                <div className="w-0 group-hover:h-0 group-hover:w-full border-b border-black transition-all duration-200 ease-in-out border-solid"></div>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

import { motion } from "motion/react";
import ExploreDropdown from "../dropdown/ExploreDropdown";
import ProfileDropdown from "../dropdown/ProfileDropdown";
import {
  BellIcon,
  BuildingLibraryIcon,
  EnvelopeIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import useGetGenres from "@/api/genres/useGetGenres";

export default function AuthenticatedNavbar() {
  const { data } = useGetGenres();
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
      className="w-full py-3 bg-primary relative z-30"
    >
      <div className="w-full flex justify-between items-center bg-white py-2 px-32">
        <a href="/" className="text-2xl font-medium text-black font-serif">
          Uniread
        </a>
        <ul className="gap-3 items-center font-serif flex">
          <li>
            <ExploreDropdown genres={data} />
          </li>
          <li className="hover:cursor-pointer w-fit relative group">
            <a
              href="/workspace"
              className={
                "p-3 rounded-full bg-transparent flex items-center justify-center w-fit hover:bg-gray-200 transition-all duration-200 ease-in-out"
              }
            >
              <PencilIcon className="size-6 text-gray-800" />
            </a>
          </li>
          <li className="hover:cursor-pointer w-fit relative group">
            <a
              href="/library"
              className={
                "p-3 rounded-full bg-transparent flex items-center justify-center w-fit hover:bg-gray-200 transition-all duration-200 ease-in-out"
              }
            >
              <BuildingLibraryIcon className="size-6 text-gray-800" />
            </a>
          </li>
          <li className="hover:cursor-pointer w-fit relative group">
            <a
              href="/conversations"
              className={
                "p-3 rounded-full bg-transparent flex items-center justify-center w-fit hover:bg-gray-200 transition-all duration-200 ease-in-out"
              }
            >
              <EnvelopeIcon className="size-6 text-gray-800" />
            </a>
          </li>
          <li className="hover:cursor-pointer w-fit relative group">
            <a
              href="/notifications"
              className={
                "p-3 rounded-full bg-transparent flex items-center justify-center w-fit hover:bg-gray-200 transition-all duration-200 ease-in-out"
              }
            >
              <BellIcon className="size-6 text-gray-800" />
            </a>
          </li>
          <li className="hover:cursor-pointer">
            <ProfileDropdown />
          </li>
        </ul>
      </div>
    </motion.nav>
  );
}

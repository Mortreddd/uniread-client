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
import NotificationsModal from "@/components/modal/notification/NotificationsModal";
import { useRef } from "react";
import { ModalRef } from "../../../shared/components/Modal.tsx";
import Badge from "@/shared/components/Badge.tsx";
import { useMessage } from "@/contexts/MessageContext.tsx";

export default function AuthenticatedNavbar() {
  const { data } = useGetGenres();
  const notificationsModalRef = useRef<ModalRef>(null);

  const { unreadCount } = useMessage();
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
      className="w-full py-3 bg-primary relative z-30"
    >
      <NotificationsModal ref={notificationsModalRef} />
      <div className="w-full flex justify-between items-center bg-white py-2 lg:px-32 sm:px-2 px-4 md:px-16">
        <a href="/" className="text-2xl font-medium text-black font-serif">
          Uniread
        </a>
        <ul className="gap-3 items-center font-serif hidden md:flex">
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
              {unreadCount > 0 && (
                <Badge size={"xs"} className={"absolute top-0 right-0"}>
                  {unreadCount}
                </Badge>
              )}
              <EnvelopeIcon className="size-6 text-gray-800" />
            </a>
          </li>
          <li className="hover:cursor-pointer w-fit relative group">
            <p
              onClick={() => notificationsModalRef.current?.open()}
              className={
                "p-3 rounded-full bg-transparent flex items-center justify-center w-fit hover:bg-gray-200 transition-all duration-200 ease-in-out"
              }
            >
              <BellIcon className="size-6 text-gray-800" />
            </p>
          </li>
          <li className="hover:cursor-pointer">
            <ProfileDropdown />
          </li>
        </ul>
        <li className="md:hidden flex hover:cursor-pointer">
          <ProfileDropdown />
        </li>
      </div>
    </motion.nav>
  );
}

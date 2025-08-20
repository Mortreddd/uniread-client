import Icon from "@/components/Icon";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import defaultProfile from "@/assets/profiles/gojo.jpg";
import NotificationsModal from "../modal/modal/NotificationsModal";
import { ModalRef } from "../modal/Modal";

export default function ProfileDropdown() {
  const [open, setOpen] = useState<boolean>(false);
  const notificaitonModalRef = useRef<ModalRef>(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  function handleLogout() {
    navigate("/");
    logout();
  }

  return (
    <motion.button
      onClick={() => setOpen(!open)}
      className={
        "inline-flex items-center gap-2 x-5 py-2 text-left  relative isolate text-lg font-medium font-serif text-black bg-transparent"
      }
    >
      <NotificationsModal ref={notificaitonModalRef} />
      <Icon src={defaultProfile} size={"sm"} />

      <p className="font-serif hover:cursor-pointer text-md">
        {user?.fullName ?? "Anonymous"}
      </p>

      <ChevronDownIcon
        className={`size-4 transition-all duration-200 ease-in-out hover:cursor-pointer ${
          open && "rotate-180"
        }`}
      />
      <AnimatePresence>
        {open && (
          <motion.ul
            onMouseLeave={() => setOpen(false)}
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.3,
                ease: "easeInOut",
              },
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            className={
              "absolute right-0 text-start bg-white w-fit top-10 text-gray-800 min-w-xs rounded-lg overflow-hidden"
            }
          >
            <li className="block px-5 py-2 text-left hover:bg-gray-200 transition-all duration-200 ease-in-out hover:cursor-pointer">
              <a className="w-full" href="/profile">
                Profile
              </a>
            </li>
            <li className="block px-5 py-2 text-left hover:bg-gray-200 transition-all duration-200 ease-in-out hover:cursor-pointer">
              <a className="w-full" href="/conversations">
                Messages
              </a>
            </li>
            <li className="block px-5 py-2 text-left hover:bg-gray-200 transition-all duration-200 ease-in-out hover:cursor-pointer">
              <a className="w-full" href="/workspace">
                Workspace
              </a>
            </li>
            <li className="block px-5 py-2 text-left hover:bg-gray-200 transition-all duration-200 ease-in-out hover:cursor-pointer">
              <p
                className="w-full"
                onClick={() => notificaitonModalRef.current?.open()}
              >
                Notifications
              </p>
            </li>
            <li className="block px-5 py-2 text-left hover:bg-gray-200 transition-all duration-200 ease-in-out hover:cursor-pointer">
              <a className="w-full" href="/settings">
                Settings
              </a>
            </li>
            <li className="block px-5 py-2 text-left hover:bg-red-600 hover:text-white hover:cursor-pointer bg-transparent transition-all duration-200 ease-in-out">
              <p className="w-full" onClick={handleLogout}>
                Logout
              </p>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

import Icon from "@/components/Icon";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import defaultProfile from "@/assets/profiles/gojo.jpg";
import NotificationsModal from "@/components/modal/notification/NotificationsModal";
import { ModalRef } from "../../modal/Modal.tsx";

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
            <li className="block px-5 py-2 text-left isolate relative group">
              <a className="w-full" href="/profile">
                <span
                  className={
                    "relative z-10 duration-200 ease-in-out group-hover:text-gray-950"
                  }
                >
                  Profile
                </span>
                <span className="absolute inset-0 transition-all duration-200 ease-in-out group-hover:bg-gray-200 bg-transparent"></span>
              </a>
            </li>
            <li className="block px-5 py-2 text-left isolate relative group">
              <a className="w-full" href="/conversations">
                <span
                  className={
                    "relative z-10 duration-200 ease-in-out group-hover:text-gray-950"
                  }
                >
                  Messages
                </span>
                <span className="absolute inset-0 transition-all duration-200 ease-in-out group-hover:bg-gray-200 bg-transparent"></span>
              </a>
            </li>
            <li className="block px-5 py-2 text-left isolate relative group">
              <a className="w-full" href="/workspace">
                <span
                  className={
                    "relative z-10 duration-200 ease-in-out group-hover:text-gray-950"
                  }
                >
                  Workspace
                </span>
                <span className="absolute inset-0 transition-all duration-200 ease-in-out group-hover:bg-gray-200 bg-transparent"></span>
              </a>
            </li>
            <li className="block px-5 py-2 text-left isolate relative group">
              <a className="w-full" href="/library">
                <span
                  className={
                    "relative z-10 duration-200 ease-in-out group-hover:text-gray-950"
                  }
                >
                  Library
                </span>
                <span className="absolute inset-0 transition-all duration-200 ease-in-out group-hover:bg-gray-200 bg-transparent"></span>
              </a>
            </li>
            <li className="block px-5 py-2 text-left isolate relative group">
              <p
                className="w-full"
                onClick={() => notificaitonModalRef.current?.open()}
              >
                <span
                  className={
                    "relative z-10 duration-200 ease-in-out group-hover:text-gray-950"
                  }
                >
                  Notifications
                </span>
                <span className="absolute inset-0 transition-all duration-200 ease-in-out group-hover:bg-gray-200 bg-transparent"></span>
              </p>
            </li>
            <li className="block px-5 py-2 text-left isolate relative group">
              <a className="w-full" href="/settings">
                <span
                  className={
                    "relative z-10 duration-200 ease-in-out group-hover:text-gray-950"
                  }
                >
                  Settings
                </span>
                <span className="absolute inset-0 transition-all duration-200 ease-in-out group-hover:bg-gray-200 bg-transparent"></span>
              </a>
            </li>
            <li className="block px-5 py-2 text-left relative group isolate">
              <p className="w-full" onClick={handleLogout}>
                <span
                  className={
                    "relative z-10 transition-all duration-200 ease-in-out group-hover:cursor-pointer group-hover:text-white"
                  }
                >
                  Logout
                </span>
                <span className="absolute inset-0 transition-all duration-200 ease-in-out group-hover:bg-red-600 bg-transparent"></span>
              </p>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

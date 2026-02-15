import Icon from "@/components/Icon";
import { useNavigate, Link } from "react-router-dom"; // Use Link for internal navigation
import { useRef, useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import defaultProfile from "@/assets/profiles/gojo.jpg";
import NotificationsModal from "@/components/modal/notification/NotificationsModal";
import { ModalRef } from "../../modal/Modal.tsx";

export default function ProfileDropdown() {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference for the whole container
  const notificaitonModalRef = useRef<ModalRef>(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/");
  };

  const menuItems = [
    { label: "Profile", href: "/profile" },
    { label: "Messages", href: "/conversations" },
    { label: "Workspace", href: "/workspace" },
    { label: "Library", href: "/library" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <motion.button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-5 py-2 text-left relative isolate text-lg font-medium font-serif text-black bg-transparent"
      >
        <NotificationsModal ref={notificaitonModalRef} />
        <Icon src={defaultProfile} size={"sm"} />

        <p className="font-serif hover:cursor-pointer sm:text-xs text-sm md:text-lg">
          {user?.fullName ?? "Anonymous"}
        </p>

        <ChevronDownIcon
          className={`sm:size-3 size-3 md:size-4 transition-all duration-200 ease-in-out ${
            open ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute right-0 z-50 mt-2 text-start bg-white shadow-xl border border-gray-100 sm:w-60 w-72 rounded-lg overflow-hidden"
          >
            {menuItems.map((item) => (
              <li key={item.href} className="relative group isolate">
                <Link
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-5 py-2.5 text-gray-700 transition-colors group-hover:text-black group-hover:bg-gray-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}

            <li className="relative group isolate border-t border-gray-50">
              <button
                className="w-full px-5 py-2.5 text-left text-gray-700 group-hover:text-black group-hover:bg-gray-100 transition-colors relative"
                onClick={() => {
                  setOpen(false);
                  notificaitonModalRef.current?.open();
                }}
              >
                <span className="relative z-10">Notifications</span>
                <span className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 -z-10 transition-opacity" />
              </button>
            </li>

            <li className="relative group isolate border-t border-gray-50">
              <button
                className="w-full px-5 py-2.5 text-left text-gray-700 group-hover:text-white transition-colors relative"
                onClick={handleLogout}
              >
                <span className="relative z-10">Logout</span>
                <span className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-100 -z-10 transition-opacity" />
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

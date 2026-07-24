import Icon from "@/shared/components/Icon.tsx";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import defaultProfile from "@/assets/profiles/gojo.jpg";
import NotificationsModal from "@/components/modal/notification/NotificationsModal";
import { ModalRef } from "@/shared/components/Modal.tsx";

export default function ProfileDropdown() {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null); // Add button ref
  const notificaitonModalRef = useRef<ModalRef>(null);
  const { logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      // Check if click is outside the dropdown container AND not on the button
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }

    // Use capture phase to catch events before they bubble
    document.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, []); // Remove dependency on dropdownRef

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the outside click handler from immediately closing
    setOpen((prev) => !prev);
  };

  const closeDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(false);
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
        ref={buttonRef}
        onClick={toggleDropdown}
        className="inline-flex items-center gap-2 px-5 py-2 text-left relative isolate text-lg font-medium font-serif text-black bg-transparent dark:text-white dark:bg-transparent/80"
      >
        <NotificationsModal ref={notificaitonModalRef} />
        <Icon src={defaultProfile} size={"sm"} />
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
            onClick={closeDropdown} // Close dropdown when clicking anywhere on the menu
          >
            {menuItems.map((item) => (
              <li key={item.href} className="relative group isolate">
                <Link
                  to={item.href}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                  }}
                  className="block px-5 py-2.5 text-gray-700 transition-colors group-hover:text-black group-hover:bg-gray-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}

            <li className="relative group isolate border-t border-gray-50">
              <button
                className="w-full px-5 py-2.5 text-left text-gray-700 group-hover:text-black group-hover:bg-gray-100 transition-colors relative"
                onClick={(e) => {
                  e.stopPropagation();
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
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                  logout();
                }}
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

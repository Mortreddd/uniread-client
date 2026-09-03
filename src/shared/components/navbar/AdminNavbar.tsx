import { useAuth } from "@/contexts/AuthContext";
import Dropdown from "../Dropdown";
import UserAvatar from "../UserAvatar";
import gojoProfile from "@/assets/profiles/gojo.jpg";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "@/contexts/SidebarContext";
import { useLayout } from "@/contexts/LayoutContext";
import { useMemo, useState } from "react";
import { Button } from "../form/Button";
import {
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  PencilIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import ThemeToggle from "../ThemeToggle";
import { Input } from "../form/Input";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";

export default function AdminNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { openSidebar } = useSidebar();
  const { hasSidebar } = useLayout();

  const profileOptions = [
    {
      icon: <UserIcon className="size-4 md:size-5 lg:size-6 flex-shrink-0" />,
      label: "Profile",
      href: "/profile",
    },

    {
      icon: <PencilIcon className="size-4 md:size-5 lg:size-6 flex-shrink-0" />,
      label: "Workspace",
      href: "/workspace",
    },
    {
      icon: (
        <Cog6ToothIcon className="size-4 md:size-5 lg:size-6 flex-shrink-0" />
      ),
      label: "Settings",
      href: "/settings",
    },
    {
      icon: (
        <ArrowRightOnRectangleIcon className="size-4 md:size-5 lg:size-6 flex-shrink-0" />
      ),
      label: "Logout",
      onClick: async () => {
        // Handle logout
        await logout();
        navigate("/", { replace: true });
        console.log("Logging out...");
      },
    },
  ];

  const filteredProfileOptions = [
    {
      icon: (
        <UserCircleIcon className="size-4 md:size-5 lg:size-6 flex-shrink-0" />
      ),
      label: "Switch to User",
      href: "/",
    },
    ...profileOptions,
  ];

  return (
    <nav className="w-full shadow-lg bg-gray-100 dark:bg-slate-950">
      <div className="w-full max-w-7xl flex justify-between items-center py-2 md:py-4 px-3 md:px-5 mx-auto">
        {/* Left side - Logo & Navigation */}
        <div className="relative inline-flex items-center gap-2 md:gap-3">
          {hasSidebar && (
            <Button
              onClick={() => openSidebar()}
              variant={"transparent"}
              className={"md:hidden"}
            >
              <Bars3Icon
                className={"size-3 text-gray-800 dark:text-gray-100"}
              />
            </Button>
          )}
          <ul className="hidden lg:inline-flex items-center gap-3 md:gap-4">
            <li className="hidden md:inline-flex">
              <Input withSearch={true} placeholder="Search..." />
            </li>
          </ul>
        </div>

        {/* Right side - Actions */}
        <ul className="inline-flex justify-end items-center gap-2 md:gap-3">
          <li>
            <ThemeToggle />
          </li>
          <li>
            <Button
              variant="transparent"
              className="rounded-full border border-gray-300 dark:border-gray-600 p-1 md:p-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <BellIcon className="size-4 md:size-5" />
            </Button>
          </li>

          {/* Profile Dropdown with custom styling */}
          <li>
            <Dropdown
              align="right"
              trigger={
                <div className="relative">
                  <UserAvatar img={user?.profile?.avatarUrl ?? gojoProfile} />
                </div>
              }
              open={isProfileOpen}
              onOpenChange={setIsProfileOpen}
              closeOnItemClick={true}
              className="rounded-full p-0 hover:bg-transparent hover:cursor-pointer"
            >
              {/* Profile Header */}
              <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700 mb-1">
                <p className="text-xs md:text-sm lg:text-md font-semibold text-gray-900 dark:text-white">
                  {user?.username ?? "Anonymous"}
                </p>
                <p className="text-tiny md:text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                  {user?.email ?? "Anonymous"}
                </p>
              </div>

              {filteredProfileOptions.map(
                ({ label, href, icon, onClick }, index) => (
                  <Dropdown.Item
                    key={index}
                    icon={icon}
                    href={href}
                    onClick={onClick}
                    className="text-tiny md:text-xs lg:text-sm"
                  >
                    {label}
                  </Dropdown.Item>
                ),
              )}
            </Dropdown>
          </li>
        </ul>
      </div>
    </nav>
  );
}

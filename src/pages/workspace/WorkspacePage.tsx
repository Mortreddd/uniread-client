import AuthenticatedNavbar from "@/components/common/navbar/AuthenticatedNavbar";
import { motion } from "motion/react";
import { NavLink, NavLinkProps, Outlet } from "react-router-dom";

interface SidebarOptionProps extends NavLinkProps {
  label: string;
}

export default function WorkspacePage() {
  function optionStyle(isActive: boolean) {
    return `transition-all block duration-200 ease-in-out px-4 py-2 rounded ${
      isActive
        ? "bg-primary text-white hover:bg-primary/80"
        : "bg-zinc-100 text-gray-800 hover:bg-zinc-200"
    }`;
  }

  const sidebarOptions: SidebarOptionProps[] = [
    {
      label: "Dashboard",
      to: "/workspace",
      end: true,
      className: ({ isActive }) => optionStyle(isActive),
    },
    {
      label: "My Stories",
      to: { pathname: "/workspace/stories", search: "?category=ALL" },
      end: true,
      className: ({ isActive }) => optionStyle(isActive),
    },
    {
      label: "Bookmarks",
      to: "/workspace/bookmarks",
      end: true,
      className: ({ isActive }) => optionStyle(isActive),
    },
    {
      label: "Liked Books",
      to: "/workspace/liked-books",
      end: true,
      className: ({ isActive }) => optionStyle(isActive),
    },
  ];
  return (
    <>
      <header className="w-full relative">
        <AuthenticatedNavbar />
      </header>
      <section className="w-full flex min-h-[87vh] relative">
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="min-w-80 h-full"
        >
          <ul className="space-y-3 h-full px-3 pt-5 overflow-y-auto">
            {sidebarOptions.map((option, key) => (
              <li key={key}>
                <NavLink {...option}>{option.label}</NavLink>
              </li>
            ))}
          </ul>
        </motion.aside>
        <div className="flex-1 p-5">
          <Outlet />
        </div>
      </section>
    </>
  );
}

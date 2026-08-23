import Layout from "@/components/Layout";
import { useLayout } from "@/contexts/LayoutContext";
import { useSidebar } from "@/contexts/SidebarContext";

import AdminNavbar from "@/shared/components/navbar/AdminNavbar";
import Sidebar from "@/shared/components/Sidebar";
import {
  BookOpenIcon,
  CubeTransparentIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const { setHasSidebar } = useLayout();
  const { closeSidebar } = useSidebar();
  const sidebarOptions = [
    {
      id: 1,
      href: "/admin",
      icon: <CubeTransparentIcon className="size-3 md:size-4 text-inherit" />,
      label: "Dashboard",
    },
    {
      id: 2,
      href: "/admin/users",
      icon: <UsersIcon className="size-3 md:size-4 text-inherit" />,
      label: "User Management",
    },
    {
      id: 3,
      href: "/admin/books",
      icon: <BookOpenIcon className="size-3 md:size-4 text-inherit" />,
      label: "Book Approvals",
    },
  ];

  useEffect(() => {
    setHasSidebar(true);
  }, []);
  return (
    <Layout>
      <div className="flex flex-1 min-h-0 min-w-0 w-full">
        <aside className="shrink-0 min-h-0">
          <Sidebar>
            <div className="py-2 md:py-3 flex justify-center">
              <a
                href="/admin"
                className="text-lg md:text-xl text-center lg:text-2xl font-bold text-primary dark:text-primary-dark"
              >
                UniRead
              </a>
            </div>
            <ul className="space-y-0.5 lg:space-y-1 p-2 md:p-3">
              {sidebarOptions.map((option, key) => (
                <li key={key}>
                  <NavLink
                    to={option.href}
                    end={option.href === "/admin"}
                    onClick={() => closeSidebar()}
                    className={({ isActive }) =>
                      `gap-1.5 flex text-extratiny md:text-tiny lg:text-sm items-center
     p-1.5 md:p-2 cursor-pointer rounded
     transition-all duration-200 ease-in-out text-white
     ${
       isActive
         ? "bg-primary dark:bg-primary-dark hover:bg-primary/60 dark:hover:bg-primary-dark/60"
         : "bg-primary/60 dark:bg-primary-dark/60 hover:bg-primary dark:hover:bg-primary-dark"
     }`
                    }
                  >
                    {option.icon}
                    <span>{option.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </Sidebar>
        </aside>

        <section className="flex-1 min-w-0 min-h-0 flex flex-col">
          <header className="w-full min-w-0 shrink-0 relative shadow-xs z-10">
            <AdminNavbar />
          </header>

          <div className="flex-1 min-h-0 min-w-0 flex flex-col">
            <Outlet />
          </div>
        </section>
      </div>
    </Layout>
  );
}

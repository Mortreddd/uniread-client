import AuthenticatedNavbar from "@/components/common/navbar/AuthenticatedNavbar";
import { motion } from "motion/react";
import { NavLink, Outlet } from "react-router-dom";

export default function MyStoriesPage() {
  return (
    <>
      <header className="w-full relative">
        <AuthenticatedNavbar />
      </header>
      <section className="w-full flex min-h-[83vh] relative">
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-80 h-full"
        >
          <ul className="space-y-3 h-full px-3">
            <li className="my-5 px-4">
              <h2 className="block font-serif text-zinc-800 font-thin text-2xl">
                Workspace
              </h2>
            </li>
            <li>
              <NavLink
                to="/workspace/published"
                className={({ isActive }) =>
                  `transition-all block duration-200 ease-in-out px-4 py-2 rounded ${
                    isActive
                      ? "bg-primary text-white hover:bg-primary/80"
                      : "bg-zinc-100 text-gray-800 hover:bg-zinc-200"
                  }`
                }
              >
                My Stories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/workspace/drafts"
                className={({ isActive }) =>
                  `transition-all block duration-200 ease-in-out px-4 py-2 rounded ${
                    isActive
                      ? "bg-primary text-white hover:bg-primary/80"
                      : "bg-zinc-100 text-gray-800 hover:bg-zinc-200"
                  }`
                }
              >
                Drafts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/workspace/deleted"
                className={({ isActive }) =>
                  `transition-all block duration-200 ease-in-out px-4 py-2 rounded ${
                    isActive
                      ? "bg-primary text-white hover:bg-primary/80"
                      : "bg-zinc-100 text-gray-800 hover:bg-zinc-200"
                  }`
                }
              >
                Deleted
              </NavLink>
            </li>
          </ul>
        </motion.aside>
        <div className="flex-1">
          <Outlet />
        </div>
      </section>
    </>
  );
}

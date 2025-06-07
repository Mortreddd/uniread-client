import Footer from "@/components/Footer.tsx";
import { NavLink, Outlet } from "react-router-dom";

export default function LibraryPage() {
  return (
    <div className="w-full h-full">
      <div className="h-full w-full md:px-20 px-14 py-10 md:py-16">
        <h1 className="text-4xl font-sans text-black drop-shadow-md mb-3 md:mb-5">
          Library
        </h1>
        <div className="flex items-center gap-3 md:gap-5 border-b-2 border-solid border-gray-300 mb-3 md:mb-5">
          <NavLink
            to={"/library/saved"}
            className={({ isActive }) =>
              `${
                isActive
                  ? "border-b-2 border-solid border-primary text-primary"
                  : "text-black"
              } text-xl font-semibold py-3 md:py-5`
            }
          >
            Saved
          </NavLink>
          <NavLink
            to={"/library/bookmarks"}
            className={({ isActive }) =>
              `${
                isActive
                  ? "border-b-2 border-solid border-primary text-primary"
                  : "text-black"
              } text-xl font-semibold py-3 md:py-5 text-black`
            }
          >
            Bookmarks
          </NavLink>
        </div>
        <div className="flex p-8 bg-gray-100 rounded-sm w-full h-96">
          <Outlet />
        </div>
      </div>

      <div className="w-full h-fit min-h-52 block">
        <Footer />
      </div>
    </div>
  );
}

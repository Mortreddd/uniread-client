import Navbar from "@/components/common/navbar/Navbar";
import { NavLink, Outlet, useSearchParams } from "react-router-dom";

export default function SearchPage() {
  // TODO: remove the @ts-ignore comment before deploying the application
  // @ts-ignore
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  return (
    <main className="w-full h-full min-h-screen">
      <Navbar />
      <div className="w-full h-full px-8 md:px-12 py-4 md:py-8 bg-white">
        <div className="flex items-center gap-3 md:gap-5 border-b-2 border-solid border-gray-300 mb-3 md:mb-5">
          <NavLink
            to={{ pathname: "/search/all", search: `?query=${query}` }}
            className={({ isActive }) =>
              `${
                isActive
                  ? "border-b-2 border-solid border-primary text-primary"
                  : "text-black"
              } text-xl font-semibold py-3 md:py-5`
            }
          >
            All
          </NavLink>
          <NavLink
            to={{ pathname: "/search/books", search: `?query=${query}` }}
            className={({ isActive }) =>
              `${
                isActive
                  ? "border-b-2 border-solid border-primary text-primary"
                  : "text-black"
              } text-xl font-semibold py-3 md:py-5`
            }
          >
            Book
          </NavLink>
          <NavLink
            to={{ pathname: "/search/authors", search: `?query=${query}` }}
            className={({ isActive }) =>
              `${
                isActive
                  ? "border-b-2 border-solid border-primary text-primary"
                  : "text-black"
              } text-xl font-semibold py-3 md:py-5`
            }
          >
            Author
          </NavLink>
        </div>
        <div className="w-full h-fit min-h-80 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

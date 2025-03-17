import { ChangeEvent, FormEvent, Fragment, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApplicationLogo from "@/components/ApplicationLogo";
import { Button } from "@/components/common/form/Button";
import GuestNavbar from "@/components/common/navbar/GuestNavbar";
import Input from "@/components/common/form/Input";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import AuthenticatedNavbar from "@/components/common/navbar/AuthenticatedNavbar";
import useDebounce from "@/hooks/useDebounce";
import DiscoverDropdown from "@/components/common/dropdown/DiscoverDropdown.tsx";
import { useAuth } from "@/contexts/AuthContext.tsx";

function Navbar() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  // TODO: remove the @ts-ignore comment before deploying the application
  // @ts-ignore
  const debounceSearch = useDebounce(searchQuery);
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleSearchQueryChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate(`/search/all?query=${searchQuery}`);
  }

  return (
    <Fragment>
      {/* background color with padding vertical to make the primary color visible */}
      <nav className="pt-3 z-30 bg-primary w-full shadow-lg border-b-2 sticky top-0">
        {/* adjust the padding horizontal based on screen size */}
        <div className="bg-white md:px-20 md:py-2 px-16 py-1 flex h-fit items-center justify-between">
          <div className="flex justify-between items-center">
            {/* logo */}
            <div className="w-auto  gap-5 h-fit flex items-center">
              <Link to="/" className="bg-transparent cursor-pointer">
                <ApplicationLogo />
              </Link>

              <form
                onSubmit={handleSearchSubmit}
                className="inline-flex items-center border-2 h-fit rounded-lg border-primary "
              >
                {/*
                 * Add the form for search input
                 *
                 */}
                <Input
                  ref={searchInputRef}
                  onChange={handleSearchQueryChange}
                  type="search"
                  value={searchQuery}
                  className={"border-0 ring-0"}
                  variant={"none"}
                  placeholder="Example: genre, book"
                />

                <Button variant={"primary"} type={"submit"} className="p-2">
                  <MagnifyingGlassIcon className="text-white size-4" />
                </Button>
              </form>
              <div>
                <DiscoverDropdown />
              </div>
            </div>
          </div>
          {user ? (
            /*
             * For authenticated users, show the authenticated navbar
             */
            <AuthenticatedNavbar />
          ) : (
            /*
             * For not authenticated users, show the guest navbar
             */
            <GuestNavbar />
          )}
        </div>
      </nav>
    </Fragment>
  );
}

export default Navbar;

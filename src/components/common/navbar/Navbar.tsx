import { Link } from "react-router-dom";
import ApplicationLogo from "@/components/ApplicationLogo";
import GuestNavbar from "@/components/common/navbar/GuestNavbar";
import AuthenticatedNavbar from "@/components/common/navbar/AuthenticatedNavbar";
import DiscoverDropdown from "@/components/common/dropdown/DiscoverDropdown.tsx";
import { useAuth } from "@/contexts/AuthContext.tsx";
import SearchQuery from "@/components/search/SearchQuery.tsx";

function Navbar() {
  const { user } = useAuth();

  return (
    <>
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

              <div className={"relative"}>
                <SearchQuery />
              </div>
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
    </>
  );
}

export default Navbar;

import GuestNavbar from "@/components/common/navbar/GuestNavbar";
import AuthenticatedNavbar from "@/components/common/navbar/AuthenticatedNavbar";
import { useAuth } from "@/contexts/AuthContext.tsx";

function Navbar() {
  const { isLoggedIn } = useAuth();

  return <>{isLoggedIn() ? <AuthenticatedNavbar /> : <GuestNavbar />}</>;
}

export default Navbar;

import ProfileContainer from "@/components/profile/ProfileContainer";
import Footer from "@/components/Footer.tsx";
import { useAuth } from "@/contexts/AuthContext.tsx";
import AuthenticatedNavbar from "@/components/common/navbar/AuthenticatedNavbar";

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <>
      <header className={"w-full relative"}>
        <AuthenticatedNavbar />
      </header>
      <div className="w-full h-full min-h-52">
        <div className="h-fit w-full">
          <ProfileContainer currentUserId={user?.id} />
        </div>
        <div className="w-full h-fit">
          <Footer />
        </div>
      </div>
    </>
  );
}

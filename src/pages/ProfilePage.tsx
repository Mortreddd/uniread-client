import ProfileContainer from "@/components/profile/ProfileContainer";
import ProfileDescription from "@/components/profile/ProfileDescription";
import Footer from "@/components/Footer.tsx";
import { useAuth } from "@/contexts/AuthContext.tsx";
import Navbar from "@/components/common/navbar/Navbar.tsx";

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <>
      <header className={"w-full relative"}>
        <Navbar />
      </header>
      <div className="w-full h-full min-h-52">
        <div className="h-fit w-full">
          <ProfileContainer currentUser={user} />
        </div>
        <div className="w-full h-full">
          <ProfileDescription />
        </div>
        <div className="w-full h-fit">
          <Footer />
        </div>
      </div>
    </>
  );
}

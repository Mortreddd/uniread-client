import Navbar from "@/components/common/navbar/Navbar";
import ProfileContainer from "@/components/profile/ProfileContainer";
import ProfileDescription from "@/components/profile/ProfileDescription";
import Footer from "@/components/Footer.tsx";

export default function ProfilePage() {
  return (
    <>
      <div className="w-full h-[100dvh] min-h-52">
        <Navbar />
        <div className="h-fit w-full">
          <ProfileContainer />
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

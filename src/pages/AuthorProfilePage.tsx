import Navbar from "@/components/common/navbar/Navbar";
import Footer from "@/components/Footer";
import { useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthorProfileContainer from "@/components/author/AuthorProfileContainer";
import AuthorProfileDescription from "@/components/author/AuthorProfileDescription";

export default function AuthorProfilePage() {
  const { userId } = useParams<"userId">();

  const { user: currentUser } = useAuth();
  console.log(currentUser);
  return (
    <>
      <div className="w-full h-[100dvh] min-h-52">
        <Navbar />
        <div className="h-fit w-full">
          <AuthorProfileContainer userId={userId} />
        </div>
        <div className="w-full h-full">
          <AuthorProfileDescription userId={userId} />
        </div>
        <div className="w-full h-fit">
          <Footer />
        </div>
      </div>
    </>
  );
}

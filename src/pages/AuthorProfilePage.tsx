import Navbar from "@/components/common/navbar/Navbar";
import Footer from "@/components/Footer";
import { useParams } from "react-router-dom";
import AuthorProfileContainer from "@/components/author/AuthorProfileContainer";
import AuthorProfileDescription from "@/components/author/AuthorProfileDescription";
import useGetUserById from "@/api/user/useGetUserById.ts";
import LoadingScreen from "@/components/LoadingScreen..tsx";

export default function AuthorProfilePage() {
  const { userId } = useParams<"userId">();

  const { data: user, loading } = useGetUserById(userId);
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="w-full h-[100dvh] min-h-52">
          <Navbar />
          <div className="h-fit w-full">
            <AuthorProfileContainer user={user} />
          </div>
          <div className="w-full h-full">
            <AuthorProfileDescription user={user} />
          </div>
          <div className="w-full h-fit">
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}

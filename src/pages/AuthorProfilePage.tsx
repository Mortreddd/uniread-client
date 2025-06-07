import Footer from "@/components/Footer";
import { useParams } from "react-router-dom";
import AuthorProfileContainer from "@/components/author/AuthorProfileContainer";
import AuthorProfileDescription from "@/components/author/AuthorProfileDescription";
import useGetUserById from "@/api/user/useGetUserById.ts";
import Navbar from "@/components/common/navbar/Navbar.tsx";

export default function AuthorProfilePage() {
  const { userId } = useParams<"userId">();

  const { data: user } = useGetUserById(userId);
  return (
    <>
      <header className={'w-full'}>
        <Navbar />
      </header>
      <div className="w-full h-full min-h-52">
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
    </>
  );
}

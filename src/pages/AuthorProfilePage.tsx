import Footer from "@/shared/components/Footer.tsx";
import { useParams } from "react-router-dom";
import AuthorProfileContainer from "@/features/users/AuthorProfileContainer.tsx";
import AuthorProfileDescription from "@/features/users/AuthorProfileDescription.tsx";
import GuestNavbar from "@/components/common/navbar/GuestNavbar.tsx";
import useGetAuthorById from "@/api/user/useGetAuthorById.ts";

export default function AuthorProfilePage() {
  const { authorId } = useParams<"authorId">();

  const { data: user } = useGetAuthorById({ authorId });
  return (
    <>
      <header className={"w-full relative"}>
        <GuestNavbar />
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

import useGetUsers from "@/api/user/useGetUsers";
import AuthorDetail from "@/components/author/AuthorDetail";
import LoginModal from "@/components/common/modal/auth/LoginModal";
import { ModalRef } from "@/components/common/modal/Modal";
import Navbar from "@/components/common/navbar/Navbar";
import LoadingCircle from "@/components/LoadingCirlce";
import { useAuth } from "@/contexts/AuthContext";
import { PaginateParams } from "@/types/Pagination";
import { User } from "@/types/User";
import { useMemo, useRef, useState } from "react";
import useFollow from "@/hooks/useFollow.ts";

/**
 * Page for displaying authors
 * @link /authors
 * @returns
 */
export default function AuthorPage() {
  const { user: currentUser, isLoggedIn } = useAuth();
  // Pagination params for requesting user
  const [{ pageNo, pageSize, query }] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 20,
    query: "",
  });
  const loginModalRef = useRef<ModalRef>(null);

  // Get the authors
  const { data, loading } = useGetUsers({ pageNo, pageSize, query });
  const { isMutualFollowing, followUser, unfollowUser } = useFollow();

  /**
   * Memoized authors to avoid unnecessary re-renders
   * @returns {User[]} Array of authors excluding the current user
   */
  const memoizedAuthors: User[] = useMemo(() => {
    if (!data?.content) return [];

    return data.content.filter((author) => author.id !== currentUser?.id);
  }, [data?.content, currentUser?.id]);

  function handleFollow(followingUserId: string) {
    if (!isLoggedIn()) {
      loginModalRef.current?.open();
      return;
    }

    followUser(followingUserId);
  }

  function handleUnfollow(followingUserId: string) {
    if (!isLoggedIn()) {
      loginModalRef.current?.open();
      return;
    }

    unfollowUser(followingUserId);
  }

  return (
    <>
      <header className={"w-full relative"}>
        <Navbar />
      </header>
      <div className="px-20 py-6 w-full h-full">
        <LoginModal ref={loginModalRef} />
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading && !data?.content ? (
            <div className="col-span-full flex justify-center">
              <LoadingCircle size="xl" />
            </div>
          ) : memoizedAuthors.length > 0 ? (
            memoizedAuthors.map((author) => (
              <div className="col-span-1" key={author.id}>
                <AuthorDetail
                  user={author}
                  onUnfollow={() => handleUnfollow(author.id)}
                  onFollow={() => handleFollow(author.id)}
                  isFollowing={isMutualFollowing(author.id)}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center">
              <h1 className="text-2xl font-sans text-black">
                No available authors
              </h1>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

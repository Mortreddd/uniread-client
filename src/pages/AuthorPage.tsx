import useGetAuthors from "@/api/user/useGetAuthors.ts";
import AuthorDetail from "@/components/author/AuthorDetail";
import LoginModal from "@/components/common/modal/auth/LoginModal";
import { ModalRef } from "@/components/common/modal/Modal";
import LoadingCircle from "@/components/LoadingCirlce";
import { useAuth } from "@/contexts/AuthContext";
import { PaginateParams } from "@/types/Pagination";
import { useMemo, useRef, useState } from "react";
import useFollow from "@/hooks/useFollow.ts";
import {AuthorDetail as AuthorDetailType} from "@/types/User";
import GuestNavbar from "@/components/common/navbar/GuestNavbar.tsx";
import {useToast} from "@/contexts/ToastContext.tsx";

/**
 * Page for displaying authors
 * @link /authors
 * @returns
 */
export default function AuthorPage() {
  const { showToast } = useToast();
  const { isLoggedIn } = useAuth();
  // Pagination params for requesting user
  const [{ pageNo, pageSize, query }] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 20,
    query: "",
  });
  const loginModalRef = useRef<ModalRef>(null);

  // Get the authors
  const { data, loading } = useGetAuthors<AuthorDetailType>({ pageNo, pageSize, query });
  const { followUser, unfollowUser } = useFollow();
  console.log(data);
  /**
   * Memoized authors to avoid unnecessary re-renders
   * @returns {User[]} Array of authors excluding the current user
   */
  const memoizedAuthors: AuthorDetailType[] = useMemo(() => {
    if (!data?.content) return [];
    return data.content;

  }, [data?.content]);

  /**
   * Handle the follow button by adding the provided followingUserId
   * @param followingUserId
   */
  async function handleFollow(followingUserId: string) {
    if (!isLoggedIn()) {
      loginModalRef.current?.open();
      return;
    }

    await followUser(followingUserId, {
      onSuccess: message => {
        showToast(message, "success")
      },
      onError: message => {
        showToast(message, "error")
      }
    });
  }

  /**
   * Handle the Unfollow button for unfollowing the given followingUserId
   * @param followingUserId
   */
  async function handleUnfollow(followingUserId: string) {
    if (!isLoggedIn()) {
      loginModalRef.current?.open();
      return;
    }

    await unfollowUser(followingUserId, {
      onSuccess: message => {
        showToast(message, "success")
      },
      onError: message => {
        showToast(message, "error")
      }
    });
  }

  return (
    <>
      <header className={"w-full relative"}>
        <GuestNavbar />
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
                  isFollowing={author.isFollowing}
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

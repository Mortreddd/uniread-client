import useGetUsers from "@/api/user/useGetUsers";
import AuthorDetail from "@/components/author/AuthorDetail";
import LoginModal from "@/components/common/modal/auth/LoginModal";
import { ModalRef } from "@/components/common/modal/Modal";
import Navbar from "@/components/common/navbar/Navbar";
import LoadingCircle from "@/components/LoadingCirlce";
import { useAlert } from "@/contexts/AlertContext";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/ApiService";
import { ErrorResponse } from "@/types/Error";
import { Follow } from "@/types/Follow";
import { PaginateParams } from "@/types/Pagination";
import { SuccessResponse } from "@/types/Success";
import { User } from "@/types/User";
import { isFollowing } from "@/utils/Folllow";
import { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Page for displaying authors
 * @link /authors
 * @returns
 */
export default function AuthorPage() {
  const { user: currentUser, isLoggedIn } = useAuth();
  const { showAlert } = useAlert();
  // Pagination params for requesting user
  const [{ pageNo, pageSize, query }] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 20,
    query: "",
  });
  const loginModalRef = useRef<ModalRef>(null);

  // Get the authors
  const { data, loading } = useGetUsers({ pageNo, pageSize, query });

  /**
   * Memoized authors to avoid unnecessary re-renders
   * @returns {User[]} Array of authors excluding the current user
   */
  const memoizedAuthors: User[] = useMemo(() => {
    if (!data?.content) return [];

    return data.content.filter((author) => author.id !== currentUser?.id);
  }, [data?.content, currentUser?.id]);

  const [followingAuthors, setFollowingAuthors] = useState<Follow[]>([]);

  // Unfollow function for making delete request when delete follow to authorId
  const unfollowUser = useCallback(
    async (authorId: string) => {
      if (!isLoggedIn()) {
        loginModalRef.current?.open();
        return;
      }
      await api
        .delete(`/users/${currentUser?.id}/follow/${authorId}/delete`)
        .then((response: AxiosResponse<SuccessResponse>) => {
          setFollowingAuthors((prev) => {
            return prev.filter((follow) => follow.following.id !== authorId);
          });
          showAlert(response?.data.message, "info");
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          showAlert(
            error.response?.data.message ?? "An unexpected error occurred",
            "error"
          );
        });
    },
    [currentUser?.id, showAlert]
  );

  // Follow function for making post request creating new follow for authorId
  const followUser = useCallback(
    async (authorId: string) => {
      if (!isLoggedIn()) {
        loginModalRef.current?.open();
        return;
      }
      await api
        .post(`/users/${currentUser?.id}/follow/${authorId}`)
        .then((response: AxiosResponse<Follow>) => {
          setFollowingAuthors((prev) => {
            return [...prev, response.data];
          });
          showAlert(`Followed ${response.data.following.username}`, "success");
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          showAlert(
            error.response?.data.message ?? "An unexpected error occurred",
            "error"
          );
        });
    },
    [currentUser?.id, showAlert]
  );

  // Set the followings of users when loaded
  useEffect(() => {
    if (currentUser) {
      setFollowingAuthors(currentUser.followings);
    }
  }, [currentUser]);

  return (
    <main className="w-full antialiased h-screen">
      <Navbar />
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
                  onUnfollow={() => unfollowUser(author.id)}
                  onFollow={() => followUser(author.id)}
                  isFollowing={isFollowing(followingAuthors, author.id)}
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
    </main>
  );
}

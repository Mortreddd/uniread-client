import { useSearchParams } from "react-router-dom";
import useGetUsers from "@/api/user/useGetUsers";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PaginateParams } from "@/types/Pagination";
import AuthorInfo from "../author/AuthorInfo";
import { useAuth } from "@/contexts/AuthContext";
import { Follow } from "@/types/Follow";
import LoadingCircle from "../LoadingCirlce";
import { ModalRef } from "../common/modal/Modal";
import api from "@/services/ApiService";
import { AxiosError, AxiosResponse } from "axios";
import { useAlert } from "@/contexts/AlertContext";
import { ErrorResponse } from "@/types/Error";
import LoginModal from "../common/modal/auth/LoginModal";
import { SuccessResponse } from "@/types/Success";
import { isFollowing } from "@/utils/Folllow";

/**
 * The component of Authors in /search/authors
 * @returns Search Author compoennt
 */
export default function SearchAuthor() {
  const { user: currentUser, isLoggedIn } = useAuth();
  const { showAlert } = useAlert();
  // TODO: remove the @ts-ignore comment before deploying the application
  // @ts-ignore
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  // TODO: remove the @ts-ignore comment before deploying the application
  // @ts-ignore
  const [{ pageNo, pageSize, query: search }, setParams] =
    useState<PaginateParams>({
      pageNo: 0,
      pageSize: 20,
      query: query || "",
    });

  const loginModalRef = useRef<ModalRef>(null);

  const [followingAuthors, setFollowingAuthors] = useState<Follow[]>([]);

  // Call the get users api call and get pagination of users
  const { data, loading } = useGetUsers({ pageNo, pageSize, query: search });

  // Memoized the authors for filtering currentUser
  const memoizedAuthors = useMemo(() => {
    if (!data?.content) return [];

    return data.content.filter((author) => author.id !== currentUser?.id);
  }, [currentUser?.id, data?.content]);

  // Follow function making post request for the following id or authorId
  const onFollow = useCallback(
    async (authorId: string) => {
      if (!isLoggedIn()) {
        loginModalRef.current?.open();
        return;
      }
      await api
        .post(`/users/${currentUser?.id}/follow/${authorId}`)
        .then((response: AxiosResponse<Follow>) => {
          showAlert(`You followed ${response.data.following.username}`, "info");
          setFollowingAuthors((prev) => {
            return [...prev, response.data];
          });
        })
        .catch((error: AxiosError<ErrorResponse>) =>
          showAlert(
            error?.response?.data.message ?? "Something went wrong",
            "error"
          )
        );
    },
    [showAlert, currentUser?.id]
  );

  // Unfollow function making delete request for the following id or authorId
  const onUnfollow = useCallback(
    async (authorId: string) => {
      if (!isLoggedIn()) {
        loginModalRef.current?.open();
        return;
      }
      await api
        .delete(`/users/${currentUser?.id}/follow/${authorId}/delete`)
        .then((response: AxiosResponse<SuccessResponse>) => {
          showAlert(response.data.message, "info");
          setFollowingAuthors((prev) => {
            return prev.filter((f) => f.following.id !== authorId);
          });
        })
        .catch((error: AxiosError<ErrorResponse>) =>
          showAlert(
            error?.response?.data.message ?? "Unable to unfollow user",
            "error"
          )
        );
    },
    [currentUser?.id, showAlert]
  );

  /**
   * Set the followings of current User when loaded
   */
  useEffect(() => {
    if (currentUser) {
      setFollowingAuthors(currentUser.followings || []);
    }
  }, [currentUser]);

  return (
    <>
      <section className="w-full flex flex-col p-4 md:p-6 h-fit min-h-80 bg-gray-50">
        <LoginModal ref={loginModalRef} />
        <article className="grid grid-cols-2 grid-flow-row gap-3 md:gap-4 w-full rounded-lg">
          {loading && !data?.content ? (
            <div className="col-span-2 place-items-center">
              <LoadingCircle />
            </div>
          ) : memoizedAuthors.length > 0 ? (
            memoizedAuthors.map((author) => (
              <AuthorInfo
                key={author.id}
                author={author}
                onFollow={() => onFollow(author.id)}
                onUnfollow={() => onUnfollow(author.id)}
                isFollowing={isFollowing(followingAuthors, author.id)}
                className={"col-span-1"}
              />
            ))
          ) : (
            <div className="text-center col-span-2 place-items-center">
              <h1 className="text-2xl font-sans text-black">
                No available authors
              </h1>
            </div>
          )}
        </article>
      </section>
    </>
  );
}

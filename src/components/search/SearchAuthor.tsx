import { useSearchParams } from "react-router-dom";
import useGetAuthors from "@/api/user/useGetAuthors.ts";
import { useMemo, useRef, useState } from "react";
import { PaginateParams } from "@/types/Pagination";
import AuthorInfo from "../author/AuthorInfo";
import { useAuth } from "@/contexts/AuthContext";
import LoadingCircle from "../LoadingCirlce";
import { ModalRef } from "../common/modal/Modal";
import LoginModal from "../common/modal/auth/LoginModal";
import useFollow from "@/hooks/useFollow.ts";
import {AuthorDetail} from "@/types/User.ts";
import {useToast} from "@/contexts/ToastContext.tsx";

/**
 * The component of Authors in /search/authors
 * @returns Search Author component
 */
export default function SearchAuthor() {
    const { showToast } = useToast();
  const { user: currentUser, isLoggedIn } = useAuth();
  const [searchParams] = useSearchParams();
  const { isFollowingUser, unfollowUser, followUser } = useFollow();
  const query = searchParams.get("query");
  const [{ pageNo, pageSize, query: search }] =
    useState<PaginateParams>({
      pageNo: 0,
      pageSize: 20,
      query: query || "",
    });

  const loginModalRef = useRef<ModalRef>(null);

  // Call the get users api call and get pagination of users
  const { data, loading } = useGetAuthors<AuthorDetail>({ pageNo, pageSize, query: search });

  // Memoized the authors for filtering currentUser
  const memoizedAuthors = useMemo(() => {
    if (!data?.content) return [];

    return data.content.filter((author) => author.id !== currentUser?.id);
  }, [currentUser?.id, data?.content]);

  // Follow function making post request for the following id or authorId
  const onFollow = async (authorId: string) => {
      if (!isLoggedIn()) {
          loginModalRef.current?.open();
          return;
      }
      await unfollowUser(authorId, {
          onSuccess: message => {
              showToast(message, "success")
          },
          onError: message => {
              showToast(message, "error")
          }
      });
  }

  // Unfollow function making delete request for the following id or authorId
  const onUnfollow = async (authorId: string) => {
      if (!isLoggedIn()) {
          loginModalRef.current?.open();
          return;
      }
      await followUser(authorId, {
          onSuccess: message => {
              showToast(message, 'success')
          },
          onError: message => {
              showToast(message, 'error')
          }
      })
  };

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
                isFollowing={isFollowingUser(author.id)}
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

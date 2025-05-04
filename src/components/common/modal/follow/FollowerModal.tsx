import {
  forwardRef,
  Ref,
  useMemo,
  useState,
} from "react";
import Modal, { ModalRef } from "../Modal.tsx";
import { PaginateParams } from "@/types/Pagination.ts";
import LoadingCircle from "@/components/LoadingCirlce.tsx";
import AuthorFollowInfo from "@/components/author/AuthorFollowerInfo.tsx";
import useGetUserFollows from "@/api/follow/useGetUserFollows.ts";
import useFollow from "@/hooks/useFollow.ts";

/**
 * Follower modal component
 * @param authorId - The author id of selected user to get followers of
 * @param ref - The ref to the modal
 * @returns Follower modal component
 */

interface FollowModalProps {
  authorId: string | undefined;
}
function FollowerModal({ authorId }: FollowModalProps, ref: Ref<ModalRef>) {
  const [{ pageNo, pageSize, query }] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
    query: "",
  });
  /**
   * Get the follows of the selected user, either the selected user is following or follower
   * @returns {Follow[]} Array of follows of the selected user
   */
  const { data, loading } = useGetUserFollows({
    userId: authorId,
    pageNo,
    pageSize,
    query,
  });

  const { followUser, unfollowUser, isMutualFollowing } = useFollow();
  /**
   * Filter the followers of the author to exclude the author themselves
   * @returns {Follow[]} Array of followers excluding the author
   */
  const memoizedSelectedUserFollowers = useMemo(() => {
    if (!data?.content) return [];

    return data.content.filter(
      (f) => f.following.id === authorId && f.follower.id !== authorId
    );
  }, [data, authorId]);

  // function onBottomReached() {
  //   if (data?.last) return;
  //
  //   setState(({ pageNo }) => {
  //     return {
  //       pageNo: (pageNo ?? 0) + 1,
  //     };
  //   });
  // }

  return (
    <Modal ref={ref} className="max-h-96">
      <div className="min-w-96 w-fit h-fit">
        <h1 className="text-2xl text-center my-4">Followers</h1>
        <div className="flex flex-col items-start w-full space-y-2 overflow-y-auto">
          <div className="bg-gray-100 rounded px-4 py-2 w-full">
            {loading && !data?.content ? (
              <div className="flex justify-center">
                <LoadingCircle />
              </div>
            ) : !loading && memoizedSelectedUserFollowers.length > 0 ? (
              memoizedSelectedUserFollowers.map((follow, index) => (
                <AuthorFollowInfo
                  key={index}
                  follow={follow}
                  isMutualFollowing={isMutualFollowing(follow.follower.id)}
                  onFollow={() => followUser(follow.follower.id)}
                  onUnfollow={() => unfollowUser(follow.follower.id)}
                />
              ))
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <p className="text-gray-500">No followers found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default forwardRef(FollowerModal);

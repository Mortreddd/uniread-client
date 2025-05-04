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
 * Following modal component
 * @param authorId - The author id to get following of
 * @param ref - The ref to the modal
 * @returns following modal component
 */

interface FollowModalProps {
  authorId: string | undefined;
}
function FollowingModal({ authorId }: FollowModalProps, ref: Ref<ModalRef>) {
  const [{ pageNo, pageSize, query }] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
    query: "",
  });
  const { isMutualFollowing, followUser, unfollowUser } = useFollow();
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

  /**
   * Filter the followings of the author to exclude the author themselves
   * @return {Follow[]} Array of followings excluding the author
   */
  const memoizedSelectedUserFollowings = useMemo(() => {
    if (!data?.content) return [];

    return data.content.filter((follow) => follow.follower.id !== authorId);
  }, [data]);


  return (
    <Modal ref={ref} className="max-h-96">
      <div className="min-w-96 w-fit h-fit">
        <h1 className="text-2xl text-center my-4">Followings</h1>
        <div className="flex flex-col items-start w-full divide-y-2 overflow-y-auto">
          <div className="bg-gray-100 rounded px-4 py-2 w-full">
            {loading && !data?.content ? (
              <div className="flex justify-center">
                <LoadingCircle />
              </div>
            ) : !loading && memoizedSelectedUserFollowings.length > 0 ? (
              memoizedSelectedUserFollowings.map((follow, index) => (
                <AuthorFollowInfo
                  key={index}
                  follow={follow}
                  isMutualFollowing={isMutualFollowing(follow.following.id)}
                  onFollow={() => followUser(follow.following.id)}
                  onUnfollow={() => unfollowUser(follow.following.id)}
                />
              ))
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <p className="text-gray-500">No followings found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default forwardRef(FollowingModal);

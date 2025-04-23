import { Follow } from "@/types/Follow.ts";
import {forwardRef, Ref, useCallback, useEffect, useState} from "react";
import Modal, { ModalRef } from "../Modal.tsx";
import {  PaginateParams } from "@/types/Pagination.ts";
import LoadingCircle from "@/components/LoadingCirlce.tsx";
import AuthorFollowInfo from "@/components/author/AuthorFollowerInfo.tsx";
import api from "@/services/ApiService.ts";
import {AxiosError, AxiosResponse} from "axios";
import { SuccessResponse } from "@/types/Success.ts";
import useGetUserFollows from "@/api/follow/useGetUserFollows.ts";
import {useAlert} from "@/contexts/AlertContext.tsx";
import {ErrorResponse} from "@/types/Error.ts";
import {useAuth} from "@/contexts/AuthContext.tsx";


/**
 * Follower modal component
 * @param authorId - The author id to get followers of
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
  const { showAlert } = useAlert();
  const { user } = useAuth();
  /**
   * Get the followers of the author
   */
  const [currentUserFollowings, setCurrentUserFollowings] = useState<Follow[]>([]);
  const [selectedUserFollowers, setSelectedUserFollowers] = useState<Follow[]>([]);
  const { data, loading } = useGetUserFollows({
    userId: authorId,
    pageNo,
    pageSize,
    query,
  });

  useEffect(() => {
    if (!data) return;
    setCurrentUserFollowings(user?.followings || []);
    setSelectedUserFollowers(data.content.filter((f) => f.follower.id !== user?.id));
  }, [data, user?.followers, user?.followings]);

  /**
   * Checks if the selected user is also following the given followingUserId
   * @param followingUserId
   */
  const isMutualFollowing = (followingUserId: string) => {
    return currentUserFollowings.some((f) => f.following.id === followingUserId);
  };

  const onFollow = useCallback(async (followingUserId: string) => {
    await api
        .post(
            `/users/${user?.id}/follow/${followingUserId}`
        )
        .then((response: AxiosResponse<Follow>) => {
          setCurrentUserFollowings((prev) => [...prev, response.data])
            showAlert(`You followed ${response.data.following.username}`, 'info')
        })
        .catch((error : AxiosError<ErrorResponse>) => {
          console.error("Error following user:", error);
          showAlert(error.response?.data.message ?? "Unable to follow the user", "error")
        });
  }, [user?.id, showAlert])

  const onUnfollow = useCallback(async (followingUserId: string) => {
    await api
        .delete(
            `/users/${user?.id}/follow/${followingUserId}/delete`
        )
        .then((response: AxiosResponse<SuccessResponse>) => {
          console.log(response)
          setCurrentUserFollowings((prev) => {
            return prev.filter((f) => f.following.id !== followingUserId)
          })
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          console.error("Error unfollowing user:", error);
          showAlert(error?.response?.data.message ?? "Unable to unfollow user", 'error')
        });
  }, [showAlert, user?.id])

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
        <div className="flex flex-col items-start w-full divide-y-2 overflow-y-auto">
          <div className="bg-gray-100 rounded px-4 py-2 w-full">
            {loading && !data?.content ? (
              <div className="flex justify-center">
                <LoadingCircle />
              </div>
            ) : !loading && selectedUserFollowers.length > 0 ? (
                selectedUserFollowers.map((follow, index) => (
                <AuthorFollowInfo
                  key={index}
                  follow={follow}
                  isMutualFollowing={isMutualFollowing(follow.follower.id)}
                  onFollow={(() => onFollow(follow.follower.id))}
                  onUnfollow={(() => onUnfollow(follow.follower.id))}
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

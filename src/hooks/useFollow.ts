import {AxiosError, AxiosResponse} from "axios";
import {ErrorResponse} from "@/types/Error.ts";
import {useCallback, useState} from "react";
import {Follow} from "@/types/Follow.ts";
import {SuccessResponse} from "@/types/Success.ts";
import api from "@/services/ApiService.ts";

interface ResultHandlerProps {
    onSuccess: (message: string) => void;
    onError: (message: string) => void;
}

export default function useFollow() {
    // const { data } = useGetCurrentUserFollowings({ pageNo, pageSize });
    /**
     * Get the followers of the author
     */
    const [currentUserFollowings, setCurrentUserFollowings] = useState<Follow[]>(
        []
    );

    /**
     * Checks if the selected user is also following the given followingUserId
     * @param followingUserId
     * @returns {boolean} - True if the selected user is also following the given followingUserId, false otherwise
     */
    // const isMutualFollowing = (followingUserId: string | undefined): boolean => {
    //     if(!data) return false;
    //     return currentUserFollowings.some(
    //         (f) => f.following.id === followingUserId
    //     );
    // };

    /**
     * Checks if the selected user is following the given followingUserId
     * @param userId
     * @returns {boolean}
     */
    function isFollowingUser(userId: string | undefined) {
        return currentUserFollowings.some((f) => f.following.id === userId)
    }

    /**
     * Unfollows the given followingUserId
     * @param followingUserId - The userId to unfollow
     */
    // Unfollow function for making delete request when delete follow to authorId
    const unfollowUser : (authorId: string | undefined, {onSuccess, onError} : ResultHandlerProps) => Promise<void> = useCallback(
        async (authorId: string | undefined, { onSuccess, onError } : ResultHandlerProps) => {
            await api
                .delete(`/users/${authorId}/follow`)
                .then((response: AxiosResponse<SuccessResponse>) => {
                    setCurrentUserFollowings((prev) => {
                        return prev.filter((follow) => follow.following.id !== authorId);
                    });
                    onSuccess(response?.data.message);
                })
                .catch((error: AxiosError<ErrorResponse>) => {
                    onError(error.response?.data.message ?? "An unexpected error occurred");
                });
        },
        []
    );

    /**
     * Follows the given followingUserId
     * @param followingUserId - The userId to follow
     */
    // Follow function for making post request creating new follow for authorId
    const followUser : (authorId: string | undefined, {onSuccess, onError} : ResultHandlerProps) => Promise<void> = useCallback(
        async (authorId: string | undefined, {onSuccess, onError}) => {
            await api
                .post(`/users/${authorId}/follow`)
                .then((response: AxiosResponse<Follow>) => {
                    setCurrentUserFollowings((prev) => {
                        return [...prev, response.data];
                    });

                    onSuccess(`Followed ${response.data.following.username}`);

                })
                .catch((error: AxiosError<ErrorResponse>) => {


                    onError(error.response?.data.message ?? "An unexpected error occurred");

                });
        },
        []
    );

    /**
     * Initializes the followings of current authenticated user
     * Set the current user followings to the followings of the selected user
     * @returns {Follow[]} Array of followings of the current authenticated user
     */




    return { currentUserFollowings, followUser, unfollowUser, isFollowingUser } as const;
}
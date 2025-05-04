import {useAuth} from "@/contexts/AuthContext.tsx";
import {useAlert} from "@/contexts/AlertContext.tsx";
import {AxiosError, AxiosResponse} from "axios";
import {ErrorResponse} from "@/types/Error.ts";
import {useCallback, useEffect, useState} from "react";
import {Follow} from "@/types/Follow.ts";
import {SuccessResponse} from "@/types/Success.ts";
import api from "@/services/ApiService.ts";

export default function useFollow() {
    const { user: currentUser } = useAuth();
    const { showAlert } = useAlert();
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
    const isMutualFollowing = (followingUserId: string | undefined): boolean => {
        return currentUserFollowings.some(
            (f) => f.following.id === followingUserId
        );
    };

    /**
     * Unfollows the given followingUserId
     * @param followingUserId - The userId to unfollow
     */
    // Unfollow function for making delete request when delete follow to authorId
    const unfollowUser : (authorId: string | undefined) => Promise<void> = useCallback(
        async (authorId: string | undefined) => {
            await api
                .delete(`/users/${currentUser?.id}/follow/${authorId}/delete`)
                .then((response: AxiosResponse<SuccessResponse>) => {
                    setCurrentUserFollowings((prev) => {
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

    /**
     * Follows the given followingUserId
     * @param followingUserId - The userId to follow
     */
    // Follow function for making post request creating new follow for authorId
    const followUser : (authorId: string | undefined) => Promise<void> = useCallback(
        async (authorId: string | undefined) => {
            await api
                .post(`/users/${currentUser?.id}/follow/${authorId}`)
                .then((response: AxiosResponse<Follow>) => {
                    setCurrentUserFollowings((prev) => {
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

    /**
     * Initializes the followings of current authenticated user
     * Set the current user followings to the followings of the selected user
     * @returns {Follow[]} Array of followings of the current authenticated user
     */
    useEffect(() => {
        setCurrentUserFollowings(currentUser?.followings || []);
    }, [currentUser?.followings]);


    return { currentUserFollowings, followUser, unfollowUser, isMutualFollowing, setCurrentUserFollowings } as const;
}
import { Follow } from "@/types/Follow";

/**
 **Returns true if the authorId is existing in following list
 * @param followings
 * @param authorId
 * @returns boolean
 */
export function isFollowing(followings: Follow[], authorId: string): boolean {
  return followings.some((f) => f.following.id === authorId);
}

/**
 **Returns true if the author is existing in followers list
 * @param followers
 * @param authorId
 * @returns
 */
export function isFollower(followers: Follow[], authorId: string): boolean {
  return followers.some((f) => f.follower.id === authorId);
}

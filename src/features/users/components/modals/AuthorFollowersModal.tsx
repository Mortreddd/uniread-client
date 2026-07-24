import { Input } from "@/shared/components/form/Input";
import Modal, { ModalRef } from "@/shared/components/Modal";
import { forwardRef, Ref } from "react";

import author2 from "@/assets/author-2.png";
import author3 from "@/assets/author-3.png";
import author4 from "@/assets/author-4.png";
import FollowButton from "@/shared/components/buttons/FollowButton";
import UnfollowButton from "@/shared/components/buttons/UnfollowButton";

interface AuthorFollowersModalProps {
  username?: string;
}

function AuthorFollowersModal(
  { username = "emmanuel" }: AuthorFollowersModalProps,
  ref: Ref<ModalRef>,
) {
  return (
    <Modal ref={ref}>
      <div className="max-w-80 md:max-w-xs min-w-80 md:min-w-96 lg:max-w-md h-fit max-h-96">
        <h2 className="text-xl md:text-2xl text-gray-800 dark:text-gray-100 font-newsreader">
          Followers
        </h2>
        <Input
          withSearch={true}
          placeholder={"Search followers..."}
          className={"my-3 md:my-4 w-full"}
        />
        <div className="relative space-y-2 overflow-y-auto no-scrollbar max-h-80 mask-y-from-95% py-3 md:py-5">
          {DUMMY_USERS.map((following) => (
            <figure
              className={
                "relative flex items-center justify-between rounded-lg py-1.5 px-3 shadow-md bg-gray-100 dark:bg-slate-800 w-full"
              }
            >
              <figcaption
                className={
                  "relative isolate flex flex-1 items-center gap-x-2 md:gap-3 min-w-0"
                }
              >
                <img
                  src={following.avatarUrl}
                  className={
                    "size-9 md:size-12 object-contain rounded-full border border-primary dark:border-primary-dark shrink-0"
                  }
                />
                <div className="flex-1 min-w-0 overflow-hidden">
                  <h6 className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-100 truncate">
                    {`${following.firstName} ${following.lastName}`}
                  </h6>
                  <p
                    className={
                      "text-tiny md:text-xs text-gray-600 dark:text-gray-300 no-underline truncate"
                    }
                  >
                    @{following.username}
                  </p>
                </div>
              </figcaption>
              {following.isFollowing ? (
                <div className="shrink-0 ml-2">
                  <UnfollowButton onUnfollow={() => {}} />
                </div>
              ) : (
                <div className={"shrink-0 ml-2"}>
                  <FollowButton onFollow={() => {}} />
                </div>
              )}
            </figure>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default forwardRef(AuthorFollowersModal);

const DUMMY_USERS: {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  avatarUrl: string;
  isFollowing: boolean;
}[] = [
  {
    userId: "1",
    firstName: "Liam",
    lastName: "Carter",
    username: "liamwrites",
    avatarUrl: author2,
    isFollowing: true,
  },
  {
    userId: "2",
    firstName: "Sophia",
    lastName: "Reyes",
    username: "sophiareads",
    avatarUrl: author3,
    isFollowing: false,
  },
  {
    userId: "3",
    firstName: "Noah",
    lastName: "Tan",
    username: "noahtales",
    avatarUrl: author4,
    isFollowing: true,
  },
  {
    userId: "4",
    firstName: "Ava",
    lastName: "Santos",
    username: "avashelf",
    avatarUrl: author2,
    isFollowing: false,
  },
  {
    userId: "5",
    firstName: "Ethan",
    lastName: "Dela Cruzasdfasdfasdfasd",
    username: "ethanwrites",
    avatarUrl: author3,
    isFollowing: true,
  },
  {
    userId: "6",
    firstName: "Sophia",
    lastName: "Reyes",
    username: "sophiareads",
    avatarUrl: author3,
    isFollowing: false,
  },
  {
    userId: "7",
    firstName: "Noah",
    lastName: "Tan",
    username: "noahtales",
    avatarUrl: author4,
    isFollowing: true,
  },
  {
    userId: "8",
    firstName: "Ava",
    lastName: "Santos",
    username: "avashelf",
    avatarUrl: author2,
    isFollowing: false,
  },
  {
    userId: "9",
    firstName: "Ethan",
    lastName: "Dela Cruzasdfasdfasdfasd",
    username: "ethanwrites",
    avatarUrl: author3,
    isFollowing: true,
  },
];

import profileBackgroundImage from "@/assets/backgrounds/Profile.webp";
import Icon from "@/components/Icon.tsx";
import gojoProfilePicture from "@/assets/profiles/gojo.jpg";
import {BriefcaseIcon, UserGroupIcon, UsersIcon} from "@heroicons/react/24/outline";
import FollowerModal from "@/components/common/modal/follow/FollowerModal.tsx";
import {useRef} from "react";
import FollowingModal from "@/components/common/modal/follow/FollowingModal.tsx";
import {ModalRef} from "@/components/common/modal/Modal.tsx";
import {User} from "@/types/User.ts";

interface AuthorContainerProps {
    user?: User | null;
}
export default function AuthorProfileContainer({ user } : AuthorContainerProps) {

    const followerModal = useRef<ModalRef>(null);
    const followingRef = useRef<ModalRef>(null);

    return (
        <>
        {user && <FollowerModal authorId={user?.id} ref={followerModal} />}
        {user && <FollowingModal authorId={user?.id} ref={followingRef} />}
            <section
                className="w-full h-[60vh] bg-center bg-cover"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url(${profileBackgroundImage}`,
                }}
            >
                <div className="w-full h-full flex flex-col items-center justify-end">
                    <div className="w-fit h-fit flex flex-col gap-2 items-center">
                        <Icon
                            src={gojoProfilePicture}
                            className="border-2 border-solid border-primary"
                            size={"profile"}
                        />

                        {/* Replace with the actual username */}
                        <h1 className="text-2xl font-bold text-gray-200 font-sans">
                            @{user?.username ?? "Unknown"}
                        </h1>
                    </div>
                    <div className="h-fit w-1/3 py-5 px-3 flex justify-center space-x-3 items-center">
                        <div className="w-fit h-fit flex flex-col items-center">
                            <div className="flex gap-2 items-center">
                                <BriefcaseIcon className={"size-8 text-gray-300"}/>
                                <h6 className="text-xl font-bold text-gray-300 ">Works</h6>
                            </div>
                            <p className="text-xl font-bold text-gray-300 ">
                                {user?.storiesCount}
                            </p>
                        </div>
                        <div className="w-fit h-fit flex flex-col items-center">
                            <div
                                onClick={() => followingRef.current?.open()}
                                className="flex gap-2 items-center"
                            >
                                <UsersIcon className={"size-8 text-gray-300"}/>
                                <h6 className="text-xl font-bold text-gray-300 ">
                                    Followers
                                </h6>
                            </div>

                            <p className="text-xl font-bold text-gray-300 ">
                                {user?.followersCount}
                            </p>
                        </div>
                        <div className="w-fit h-fit flex flex-col items-center">
                            <div
                                onClick={() => followingRef.current?.open()}
                                className="flex gap-2 items-center"
                            >
                                <UserGroupIcon className={"size-8 text-gray-300"}/>
                                <h6 className="text-xl font-bold text-gray-300 ">
                                    Followings
                                </h6>
                            </div>
                            <p className="text-xl font-bold text-gray-300 ">
                                {user?.followingsCount}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
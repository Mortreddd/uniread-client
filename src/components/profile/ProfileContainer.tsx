import profileBackgroundImage from "@/assets/backgrounds/Profile.webp";
import gojoProfilePicture from "@/assets/profiles/gojo.jpg";
import Icon from "../Icon";
import {
  BriefcaseIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import FollowerModal from "@/components/common/modal/follow/FollowerModal.tsx";
import { useRef } from "react";
import { ModalRef } from "@/components/common/modal/Modal";

export default function ProfileContainer() {
  const { user : currentUser } = useAuth();
  const followerRef = useRef<ModalRef>(null);
  console.log(currentUser)
  return (
    <>
      <FollowerModal authorId={currentUser?.id} ref={followerRef} />
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
              @{currentUser?.username}
            </h1>
          </div>
          <div className="h-fit w-1/3 py-5 px-3 flex justify-evenly items-center">
            <div className="w-fit h-fit flex flex-col items-center">
              <div className="flex gap-2 items-center">
                <BriefcaseIcon className={"size-8 text-gray-300"} />
                <h6 className="text-xl font-bold text-gray-300 ">Works</h6>
              </div>
              <p className="text-xl font-bold text-gray-300 ">{currentUser?.storiesCount}</p>
            </div>
            <div className="w-fit h-fit flex flex-col items-center">
              <div
                onClick={() => followerRef.current?.open()}
                className="flex gap-2 items-center"
              >
                <UsersIcon className={"size-8 text-gray-300"} />
                <h6 className="text-xl font-bold text-gray-300 ">Followers</h6>
              </div>

              <p className="text-xl font-bold text-gray-300 ">
                {currentUser?.followersCount}
              </p>
            </div>
            <div className="w-fit h-fit flex flex-col items-center">
              <div className="flex gap-2 items-center">
                <UserGroupIcon className={"size-8 text-gray-300"} />
                <h6 className="text-xl font-bold text-gray-300 ">Followings</h6>
              </div>
              <p className="text-xl font-bold text-gray-300 ">
                {currentUser?.followingsCount}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

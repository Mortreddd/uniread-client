import Navbar from "@/components/common/navbar/Navbar";
import Footer from "@/components/Footer";
import profileBackgroundImage from "@/assets/backgrounds/Profile.webp";
import gojoProfilePicture from "@/assets/profiles/gojo.jpg";
import { NavLink, Outlet, useParams } from "react-router-dom";
import {
  BriefcaseIcon,
  EnvelopeIcon,
  UserGroupIcon,
  UserMinusIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/common/form/Button";
import Icon from "@/components/Icon";
import useGetUserByUsername from "@/api/user/useGetUserByUsername";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthorProfilePage() {
  const { username } = useParams<"username">();

  const { user: currentUser } = useAuth();
  const { data: user } = useGetUserByUsername(username);

  console.log(user);
  const isFollowed = currentUser?.followings.filter(
    (f) => f.following.id === user?.id
  );

  const bookWorksCount = user?.books?.length;
  const followersCount = user?.followers.length;
  const followingsCount = user?.followings.length;

  return (
    <>
      <div className="w-full h-[100dvh] min-h-52">
        <Navbar />
        <div className="h-fit w-full">
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
              <div className="h-fit w-1/3 py-5 px-3 flex justify-evenly items-center">
                <div className="w-fit h-fit flex flex-col items-center">
                  <div className="flex gap-2 items-center">
                    <BriefcaseIcon className={"size-8 text-gray-300"} />
                    <h6 className="text-xl font-bold text-gray-300 ">Works</h6>
                  </div>
                  <p className="text-xl font-bold text-gray-300 ">
                    {bookWorksCount}
                  </p>
                </div>
                <div className="w-fit h-fit flex flex-col items-center">
                  <div className="flex gap-2 items-center">
                    <UsersIcon className={"size-8 text-gray-300"} />
                    <h6 className="text-xl font-bold text-gray-300 ">
                      Followers
                    </h6>
                  </div>

                  <p className="text-xl font-bold text-gray-300 ">
                    {followersCount}
                  </p>
                </div>
                <div className="w-fit h-fit flex flex-col items-center">
                  <div className="flex gap-2 items-center">
                    <UserGroupIcon className={"size-8 text-gray-300"} />
                    <h6 className="text-xl font-bold text-gray-300 ">
                      Followings
                    </h6>
                  </div>
                  <p className="text-xl font-bold text-gray-300 ">
                    {followingsCount}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="w-full h-full">
          <div className="w-full h-full">
            <div className="w-full h-fit shadow-lg px-10 bg-white flex justify-between items-center">
              <div className="h-fit flex items-center justify-start gap-10">
                <NavLink
                  to={`/authors/${username}/profile/works`}
                  className={({ isActive }) =>
                    `${
                      isActive ? "border-b-2 border-solid border-primary" : ""
                    } text-2xl font-bold py-2 px-4 text-black`
                  }
                >
                  Works
                </NavLink>
                <NavLink
                  // Replace with the actual usernmae
                  to={`/authors/${username}/profile/about`}
                  className={({ isActive }) =>
                    `${
                      isActive ? "border-b-2 border-solid border-primary" : ""
                    } text-2xl font-bold py-2 px-4 text-black`
                  }
                >
                  About
                </NavLink>
              </div>
              <div className="h-fit flex items-start justify-end gap-3">
                {isFollowed ? (
                  <Button
                    variant={"primary"}
                    size={"md"}
                    className="flex items-center gap-2 px-3 rounded py-2"
                  >
                    <UserMinusIcon className="size-6" />
                    <span>Unfollow</span>
                  </Button>
                ) : (
                  <Button
                    variant={"primary"}
                    size={"md"}
                    className="flex items-center gap-2 px-3 rounded py-2"
                  >
                    <UserPlusIcon className="size-6" />
                    <span>Follow</span>
                  </Button>
                )}
                {isFollowed && (
                  <Button
                    variant={"primary"}
                    size={"md"}
                    className="flex items-center gap-2 px-3 rounded py-2"
                  >
                    <EnvelopeIcon className="size-6" />
                    <span>Message</span>
                  </Button>
                )}
              </div>
            </div>
            <div className="w-full h-fit">
              <Outlet />
            </div>
          </div>
        </div>
        <div className="w-full h-fit">
          <Footer />
        </div>
      </div>
    </>
  );
}

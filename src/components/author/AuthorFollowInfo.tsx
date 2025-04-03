import {Follow} from "@/types/Follow.ts";
import {useAuth} from "@/contexts/AuthContext.tsx";
import {Button} from "@/components/common/form/Button.tsx";
import Icon from "@/components/Icon.tsx";
import gojoProfilePicture from "@/assets/profiles/gojo.jpg"
import {UserMinusIcon, UserPlusIcon} from "@heroicons/react/24/outline";

interface AuthorFollowInfo {
    follow: Follow
}

export default function AuthorFollowInfo({ follow } : AuthorFollowInfo) {

    const {user: currentUser} = useAuth();
    const isFollowing = currentUser?.followings.some((f) => f.follower.id === currentUser.id)
    return (
        <div className={'w-full bg-transparent rounded flex items-center px-2 py-1'}>
            <Icon src={gojoProfilePicture} />
            <div className="flex flex-1 items-center justify-between">
                <div className="w-full space-y-2">
                    <h1 className="text-lg font-bold">Full Name</h1>
                    <h1 className="font-semibold">@{follow?.follower?.username}</h1>
                </div>
                {isFollowing ? (
                    <Button
                        variant={"primary"}
                        size={"md"}
                        className="flex items-center gap-2 px-3 rounded py-2"
                    >
                        <UserMinusIcon className={'size-4'}/>
                    </Button>
                ) : (

                <Button
                    variant={"primary"}
                    size={"md"}
                    className="flex items-center gap-2 px-3 rounded py-2"
                >
                        <UserPlusIcon className={'size-4'}/>
                </Button>
                )}
            </div>
        </div>
    )
}
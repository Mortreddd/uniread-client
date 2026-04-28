import { Button } from "@/shared/components/form/Button";
import UserAvatar from "./UserAvatar";
import author1 from "@/assets/author-1.png";

export default function FeaturedUser() {
  return (
    <figure className="size-full space-y-3 md:space-y-4 p-3 md:p-4 lg:p-5 rounded-lg bg-gray-200 dark:bg-slate-800">
      <UserAvatar
        src={author1}
        withVerified={true}
        className="size-14 md:size-16 mx-auto"
      />
      <figcaption className="font-medium text-center">
        <div className="text-xs md:text-base lg:text-xl text-black dark:text-white">
          Clara Oswald
        </div>
        <p className="text-extratiny sm:text-tiny md:text-xs lg:text-base text-gray-600 dark:text-gray-300 italic ">
          @clare_tales
        </p>
      </figcaption>
      <blockquote className="text-center mx-auto text-extratiny md:text-tiny lg:text-xs text-gray-700 dark:text-gray-200 line-clamp-2 md:line-clamp-3">
        Weaving intricate dark fantasy stories where shadows have minds of their
        own
      </blockquote>

      <div className="flex justify-evenly items-center">
        <div className="space-y-1.5">
          <div className="text-base md:text-lg lg:text-xl text-black font-sans dark:text-white text-center">
            42
          </div>
          <div className="text-extratiny md:text-tiny lg:text-xs text-gray-700 dark:text-gray-400 font-thin text-center uppercase">
            Stories
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="text-base md:text-lg lg:text-xl text-black font-sans dark:text-white text-center">
            12.5k
          </div>
          <div className="text-extratiny md:text-tiny lg:text-xs text-gray-700 dark:text-gray-400 font-thin text-center uppercase">
            Followers
          </div>
        </div>
      </div>
      <Button
        className={
          "text-tiny text-white md:text-sm lg:text-base rounded md:rounded-lg w-full"
        }
      >
        Follow
      </Button>
    </figure>
  );
}

import background from "@/assets/many-books.jpg";
import { Button } from "@/shared/components/form/Button";
import { CameraIcon } from "@heroicons/react/24/outline";
import gojoProfile from "@/assets/profiles/gojo.jpg";
import { Link } from "react-router-dom";

export default function SettingsProfilePage() {
  return (
    <section className="size-full relativep-2 md:p-3">
      <h3 className="font-semibold tracking-wide text-xs md:text-sm lg:text-base font-sans text-gray-900 dark:text-gray-100">
        Public Profile
      </h3>
      <p className="font-sans text-gray-600 dark:text-gray-300 text-tiny md:text-xs lg:text-sm mb-3 md:mb-4">
        Update your public presence to other writters and readers.
      </p>
      <div className="rounded-lg w-full bg-gray-200 dark:bg-slate-800">
        <div className="w-full relative">
          <img
            src={background}
            className={
              "h-36 md:h-44 lg:h-52 w-full object-cover object-center rounded"
            }
          />
          <img
            src={gojoProfile}
            className={
              "size-20 md:size-24 translate-y-10 left-5 bottom-0 z-10 absolute border border-solid border-primary dark:border-primary-dark rounded"
            }
          />
          <div className="absolute inset-0 bg-black/60"></div>
          <Button
            type={"button"}
            className={
              "inline-flex items-center absolute right-3 bottom-3 rounded"
            }
          >
            <CameraIcon className="size-3 md:size-4 lg:size-5 mr-2" />
            <span className={"text-gray-200 text-tiny md:text-xs lg:text-sm"}>
              Change Banner
            </span>
          </Button>
        </div>
      </div>

      <div className="mt-2 px-3 md:px-5 relative w-full">
        <div className="flex w-full justify-end items-center border border-solid">
          <Button variant={"dark"} className={"rounded "}>
            <span className={"text-gray-200 text-tiny md:text-xs lg:text-sm"}>
              View Profile
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}

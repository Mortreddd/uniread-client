import ApplicationLogo from "./ApplicationLogo.tsx";
import { Button } from "./form/Button.tsx";
import { GlobeAltIcon, ShareIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <div className="w-full mx-auto max-w-7xl p-6 md:p-8 lg:p-10 text-gray-600 dark:text-gray-300 font-sans flex flex-col md:flex-row justify-center items-center md:items-start">
      <div className=" flex-1 flex flex-col justify-center items-center md:items-start md:justify-start">
        <ApplicationLogo size={"sm"} />
        <p className="text-extratiny md:text-tiny lg:text-sm">
          © 2024 UniRead. The Curated Canvas for Collective Storytelling
        </p>
      </div>
      <div className="flex items-center flex-1 gap-3 md:gap-4 lg:gap-5">
        <a
          href=""
          className="text-tiny md:text-xs lg:text-sm hover:text-shadow font-semibold inline-block"
        >
          Terms
        </a>
        <a
          href=""
          className="text-tiny md:text-xs lg:text-sm hover:text-shadow font-semibold inline-block"
        >
          Policy
        </a>
        <a
          href=""
          className="text-tiny md:text-xs lg:text-sm hover:text-shadow font-semibold inline-block"
        >
          About
        </a>
        <a
          href=""
          className="text-tiny md:text-xs lg:text-sm hover:text-shadow font-semibold inline-block"
        >
          Help
        </a>
        <a
          href=""
          className="text-tiny md:text-xs lg:text-sm hover:text-shadow font-semibold inline-block"
        >
          Guidelines
        </a>
      </div>
      <div className="flex items-center justify-end flex-1 gap-3 md:gap-4 lg:gap-5 col-span-1">
        <Button
          variant={"transparent"}
          size={"sm"}
          className={"rounded-full inline-block"}
        >
          <ShareIcon
            fill={"currentColor"}
            className={"size-3 md:size-4 lg:size-5"}
          />
        </Button>
        <Button
          variant={"transparent"}
          size={"sm"}
          className={"rounded-full inline-block"}
        >
          <GlobeAltIcon className={"size-3 md:size-4 lg:size-5"} />
        </Button>
      </div>
    </div>
  );
}

import { Button } from "@/shared/components/form/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function BookDashboard() {
  return (
    <div className="size-full overflow-hidden max-w-full">
      <div className="mb-1 md:mb-1.5">
        <h1 className="text-lg md:text-xl lg:text-2xl font-sans font-medium tracking-light text-gray-800 dark:text-gray-200">
          My Books
        </h1>
        <div className="flex flex-col lg:flex-row items-start justify-start lg:items-center gap-3 lg:gap-0 lg:justify-between">
          <p className="text-gray-700 dark:text-gray-300 font-thin font-sans text-xs md:text-sm lg:text-base">
            Manage your literacy portfolio and creative drafts
          </p>
          <div className="relative inline-flex items-center">
            <Button className={"rounded"}>
              <Link
                to={"/dashboard/books/new"}
                className={"inline-flex items-center"}
              >
                <PlusIcon
                  className={"size-4 lg:size-5 text-gray-200 mr-1.5 lg:mr-2"}
                />
                <span className="text-xs lg:text-sm font-sans truncate text-gray-200">
                  Create New Story
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

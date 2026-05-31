import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/shared/components/form/Button";
import Sidebar, { SidebarRef } from "@/shared/components/Sidebar";
import {
  AdjustmentsVerticalIcon,
  ArrowTrendingUpIcon,
  CheckBadgeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import FeaturedStoriesSection from "../components/FeaturedStoriesSection";
import EditorsChoiceSection from "../components/EditorsChoiceSection";
import { AnimatePresence } from "motion/react";
import NotFoundSection from "@/shared/components/NotFoundSection";

export default function AuthorsPage() {
  const sidebarRef = useRef<SidebarRef>(null);
  const [selectedFilter, setSelectedFilter] = useState<number>(1);

  const filterItems = [
    {
      id: 1,
      icon: <CheckBadgeIcon className={"size-4 md:size-5 text-inherit"} />,
      label: "Verified Only",
      element: <FeaturedStoriesSection />,
    },
    {
      id: 2,
      icon: <ArrowTrendingUpIcon className={"size-4 md:size-5 text-inherit"} />,
      label: "Rising Stars",
      element: <NotFoundSection />,
    },
    {
      id: 3,
      icon: <SparklesIcon className={"size-4 md:size-5 text-inherit"} />,
      label: "Editor's Choice",
      element: <EditorsChoiceSection />,
    },
  ];
  return (
    <AppLayout>
      <div className="flex flex-1 min-h-0 relative">
        <div className="flex flex-col shrink-0">
          <Sidebar ref={sidebarRef}>
            <div className="h-full bg-gray-200 dark:bg-slate-800 font-sans text-gray-600 dark:text-gray-200 p-3 md:p-4 lg:p-5">
              <div className="space-y-1 md:space-y-2">
                <h1 className="text-base md:text-lg lg:text-xl text-inherit font-semibold">
                  Filters
                </h1>
                <h4 className="text-xs md:text-sm lg:text-base text-inherit">
                  Refine author discovery
                </h4>
              </div>
              <ul className="space-y-2 md:space-y-3">
                {filterItems.map((filter, key) => (
                  <li
                    key={key}
                    onClick={() => {
                      setSelectedFilter(filter.id);
                      sidebarRef.current?.close();
                    }}
                    className={`gap-1.5 flex text-tiny md:text-xs lg:text-base items-center p-1.5 md:p-2 cursor-pointer rounded md:rounded-lg transition-all duration-200 ease-in-out text-white ${filter.id === selectedFilter ? "bg-primary dark:bg-primary-dark hover:bg-primary/60 dark:hover:bg-primary-dark/60 " : "bg-primary/60 dark:bg-primary-dark/60 hover:bg-primary dark:hover:bg-primary-dark"}`}
                  >
                    {filter.icon}
                    <span className={"text-inherit"}>{filter.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Sidebar>
        </div>
        <section className="flex-1 p-3 md:p-5 lg:p-7 flex flex-col min-w-0">
          <div className="max-w-7xl mx-auto w-full">
            <Button
              onClick={() => sidebarRef.current?.open()}
              className={
                "inline-flex w-fit md:hidden items-center font-sans text-tiny rounded mb-1"
              }
            >
              <AdjustmentsVerticalIcon className={"size-3 text-white"} />
              <span className={"text-white"}>Filters</span>
            </Button>
            <div className="relative flex-1 min-w-0 h-full">
              <AnimatePresence mode={"wait"}>
                {filterItems.map(
                  ({ id, element }) => selectedFilter === id && element,
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

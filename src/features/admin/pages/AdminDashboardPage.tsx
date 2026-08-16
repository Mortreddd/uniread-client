import DecreasedStats from "@/features/users/components/DecreasedStats";
import IncreasedStats from "@/features/users/components/IncreasedStats";
import AdminLayout from "@/layouts/AdminLayout";
import { Formatters } from "@/utils/formatters";
import { BookOpenIcon, UserPlusIcon } from "@heroicons/react/24/outline";

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <main className="p-5 lg:p-10 relative flex flex-col flex-1 min-h-0">
        <h1 className="text-gray-800 font-newsreader text-lg lg:text-2xl md:text-xl dark:text-gray-200 tracking-tight">
          Platform Overview
        </h1>
        <p className="text-xs md:text-sm lg:text-base font-sans text-gray-700 dark:text-gray-300 mb-3 lg:mb-5">
          High-level metrics and recent activity
        </p>
        <AdminDashboardStats />
      </main>
    </AdminLayout>
  );
}

function AdminDashboardStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
      <div className="col-span-1 rounded bg-gray-200 dark:bg-slate-800 relative p-2 md:p-3">
        <div className="flex items-start justify-between lg:justify-start lg:gap-3">
          <h6 className="text-gray-800 font-semibold text-extratiny md:text-tiny lg:text-base font-sans dark:text-gray-200 w-fit">
            TOTAL PUBLISHED BOOKS
          </h6>
          <BookOpenIcon
            className={
              "size-4 md:size-5 lg:size-6 text-gray-800 dark:text-gray-200"
            }
          />
        </div>
        <h6 className="text-2xl md:text-3xl lg:text-4xl font-newsreader text-gray-900 dark:text-gray-100">
          {Formatters.Number.formatRelativeNumber(32822)}
        </h6>
        <DecreasedStats text={"-2.3% this month"} />
      </div>
      <div className="col-span-1 rounded bg-gray-200 dark:bg-slate-800 relative p-2 md:p-3">
        <div className="flex justify-between lg:justify-start items-start lg:gap-3">
          <h6 className="text-gray-800 font-semibold text-extratiny md:text-tiny lg:text-base font-sans dark:text-gray-200 w-fit">
            NEW USERS (24H)
          </h6>
          <UserPlusIcon
            className={
              "size-4 md:size-5 lg:size-6 text-gray-800 dark:text-gray-200"
            }
          />
        </div>
        <h6 className="text-2xl md:text-3xl lg:text-4xl font-newsreader text-gray-900 dark:text-gray-100">
          892
        </h6>
        <IncreasedStats text="+5.2% this month" />
      </div>

      <div className="col-span-1 rounded bg-gray-200 dark:bg-slate-800 relative p-2 md:p-3">
        <div className="flex items-start justify-between lg:justify-start lg:gap-3">
          <h6 className="text-gray-800 font-semibold text-extratiny md:text-tiny lg:text-base font-sans dark:text-gray-200 w-fit">
            TOTAL PUBLISHED BOOKS
          </h6>
          <BookOpenIcon
            className={
              "size-4 md:size-5 lg:size-6 text-gray-800 dark:text-gray-200"
            }
          />
        </div>
        <h6 className="text-2xl md:text-3xl lg:text-4xl font-newsreader text-gray-900 dark:text-gray-100">
          {Formatters.Number.formatRelativeNumber(32822)}
        </h6>
        <DecreasedStats text={"-2.3% this month"} />
      </div>
      <div className="col-span-1 rounded bg-gray-200 dark:bg-slate-800 relative p-2 md:p-3">
        <div className="flex justify-between lg:justify-start items-start lg:gap-3">
          <h6 className="text-gray-800 font-semibold text-extratiny md:text-tiny lg:text-base font-sans dark:text-gray-200 w-fit">
            NEW USERS (24H)
          </h6>
          <UserPlusIcon
            className={
              "size-4 md:size-5 lg:size-6 text-gray-800 dark:text-gray-200"
            }
          />
        </div>
        <h6 className="text-2xl md:text-3xl lg:text-4xl font-newsreader text-gray-900 dark:text-gray-100">
          892
        </h6>
        <IncreasedStats text="+5.2% this month" />
      </div>
    </div>
  );
}

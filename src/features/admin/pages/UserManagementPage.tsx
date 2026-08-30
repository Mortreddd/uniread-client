import DecreasedStats from "@/features/users/components/DecreasedStats";
import IncreasedStats from "@/features/users/components/IncreasedStats";
import { Formatters } from "@/utils/formatters";
import {
  DocumentDuplicateIcon,
  ShieldExclamationIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import UserTable from "../components/UserTable";
import { useGetUserMonitoring } from "../hooks/useGetUserMonitoring";
import { useMemo, useState } from "react";
import { Input } from "@/shared/components/form/Input";
import { UserMonitoringFilter } from "../types/UserTable";
import UserTableFilter from "../components/UserTableFilter";

export default function UserManagementPage() {
  return (
    <main className="p-5 lg:p-10 relative flex flex-col flex-1 min-h-0">
      <h1 className="text-gray-800 font-newsreader text-lg lg:text-2xl md:text-xl dark:text-gray-200 tracking-tight">
        User Management
      </h1>
      <p className="text-xs md:text-sm lg:text-base font-sans text-gray-700 dark:text-gray-300 mb-3 lg:mb-5">
        Manage access, roles, and review activity across the platform.
      </p>
      <UserManagementStats />
      <div className="py-4 md:py-6">
        <UsersMonitoringTable />
      </div>
    </main>
  );
}

function UserManagementStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
      <div className="col-span-1 rounded bg-gray-200 dark:bg-slate-800 relative p-2 md:p-3">
        <div className="flex items-start justify-between lg:justify-start lg:gap-3">
          <h6 className="text-gray-800 font-semibold text-extratiny md:text-tiny lg:text-base font-sans dark:text-gray-200 w-fit">
            TOTAL USERS
          </h6>
          <UsersIcon
            className={
              "size-4 md:size-5 lg:size-6 text-gray-800 dark:text-gray-200"
            }
          />
        </div>
        <h6 className="text-2xl md:text-3xl lg:text-4xl font-newsreader text-gray-900 dark:text-gray-100">
          {Formatters.Number.formatRelativeNumber(12482)}
        </h6>
        <IncreasedStats text={"-2.3% this month"} />
      </div>
      <div className="col-span-1 rounded bg-gray-200 dark:bg-slate-800 relative p-2 md:p-3">
        <div className="flex justify-between lg:justify-start items-start lg:gap-3">
          <h6 className="text-gray-800 font-semibold text-extratiny md:text-tiny lg:text-base font-sans dark:text-gray-200 w-fit">
            PENDING APPROVALS
          </h6>
          <DocumentDuplicateIcon
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
            TOTAL SUSPENDED ACCOUNTS
          </h6>
          <ShieldExclamationIcon
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
    </div>
  );
}

function UsersMonitoringTable() {
  const [filter, setFilter] = useState<UserMonitoringFilter>({
    pageNo: 0,
    pageSize: 20,
    query: "",
  });
  const { data } = useGetUserMonitoring(filter);

  const userMonitoring = useMemo(() => {
    if (!data || data.empty) return [];

    return data.content;
  }, [data]);

  return (
    <div className="relative">
      <div className="flex gap-2 lg:gap-3 items-center mb-2 lg:mb-3">
        <div className="inline-flex items-center">
          <Input withSearch={true} placeholder={"E.g: juan"} />
          <UserTableFilter
            setFilter={(selectedDate) =>
              setFilter({ ...filter, registeredAt: selectedDate.toISOString() })
            }
            setClear={() => setFilter({ ...filter, registeredAt: undefined })}
          />
        </div>
      </div>
      <UserTable users={userMonitoring} />
    </div>
  );
}

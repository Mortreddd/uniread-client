import Dropdown from "@/shared/components/Dropdown";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { memo, useState } from "react";
import { DateUtil } from "@/utils/DateUtil";
import { Button } from "@/shared/components/form/Button";
import { cn } from "@/utils/ClassNames";

export interface UserTableProps {
  setFilter: (registeredDate: Date) => void;
  setClear: () => void;
}

function UserTableFilter({ setFilter, setClear }: UserTableProps) {
  const [selectedDate, setSelectedDate] = useState<undefined | number>(
    undefined,
  );
  const today = new Date();

  const filters = [
    {
      label: "Last week",
      onClick: () => {
        setFilter(DateUtil.minusDay(today, 7));
      },
    },
    {
      label: "Last Month",
      onClick: () => {
        setFilter(DateUtil.minusMonth(today, 1));
      },
    },
    {
      label: "Last 90 days",
      onClick: () => {
        setFilter(DateUtil.minusMonth(today, 3));
      },
    },
  ];

  return (
    <Dropdown
      className="inline-flex items-center"
      variant="ghost"
      size="sm"
      hasArrowIcon={false}
      trigger={
        <Button className="rounded relative inline-flex items-center gap-2 lg:gap-3">
          <span className="text-gray-800 dark:text-gray-200 font-sans truncate text-xs lg:text-sm">
            Filters
          </span>
          <Bars3BottomLeftIcon
            className={"size-4 lg:size-5 text-gray-800 dark:text-gray-200"}
          />
        </Button>
      }
    >
      {filters.map(({ label, onClick }, index) => (
        <Dropdown.Item
          key={index}
          active={index === selectedDate}
          onClick={() => {
            setSelectedDate(index);
            onClick();
          }}
          className={cn("text-xs lg:text-sm")}
        >
          {label}
        </Dropdown.Item>
      ))}
      <Button
        onClick={() => {
          setClear();
          setSelectedDate(undefined);
        }}
        variant={"dark"}
        className={"rounded"}
      >
        <span className={"text-xs lg:text-sm"}>Clear All</span>
      </Button>
    </Dropdown>
  );
}

export default memo(UserTableFilter);

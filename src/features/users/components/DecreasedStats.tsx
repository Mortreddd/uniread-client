import { ArrowTrendingDownIcon } from "@heroicons/react/24/outline";

interface DecreasedStatsProps {
  text: string;
  sizeIcon?: string;
}
export default function DecreasedStats({
  text,
  sizeIcon = "size-3 md:size-4",
}: DecreasedStatsProps) {
  return (
    <div className={`inline-flex items-center text-red-600`}>
      <ArrowTrendingDownIcon className={`text-inherit ${sizeIcon} mr-1.5`} />
      <span className={"text-extratiny md:text-tiny lg:text-sm text-inherit"}>
        {text}
      </span>
    </div>
  );
}

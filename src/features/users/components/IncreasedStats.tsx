import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

interface IncreasedStatsProps {
  text: string;
  sizeIcon?: string;
}
export default function IncreasedStats({
  text,
  sizeIcon = "size-3 md:size-4",
}: IncreasedStatsProps) {
  return (
    <div className={`inline-flex items-center text-green-600`}>
      <ArrowTrendingUpIcon className={`text-inherit ${sizeIcon} mr-1.5`} />
      <span className={"text-extratiny md:text-tiny lg:text-sm text-inherit"}>
        {text}
      </span>
    </div>
  );
}

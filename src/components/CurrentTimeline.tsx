import { formatWeekdayWithDate } from "@/utils/Dates";
import { HTMLAttributes } from "react";

interface CurrentTimelineProps extends HTMLAttributes<HTMLTimeElement> {}

export default function CurrentTimeline({
  className,
  ...props
}: CurrentTimelineProps) {
  return (
    <time className={className} {...props}>
      <span className="font-serif text-zinc-800 font-thin text-xl">
        {formatWeekdayWithDate(new Date())}
      </span>
    </time>
  );
}

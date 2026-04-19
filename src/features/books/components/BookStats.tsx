import { BookDetail } from "../types/Book";

interface BookStatsProps {
    book: BookDetail;
}

export default function BookStats({ book }: BookStatsProps) {
  const stats = [
    { label: "TOTAL READS", value: "1.2M" },
    { label: "TOTAL LIKES", value: "84.5K" },
    { label: "TOTAL CHAPTERS", value: "42" },
    { label: "STATUS", value: "ONGOING", isStatus: true },
  ];

  return (
    <div className="flex items-center justify-between bg-gray-200 dark:bg-slate-800 rounded-lg w-full px-3 py-2 mt-2 md:mt-4">
      {stats.map((stat) => (
        <StatItem key={stat.label} {...stat} />
      ))}
    </div>
  );
}

function StatItem({ label, value, isStatus }: { label: string; value: string; isStatus?: boolean }) {
  return (
    <div className="inline-flex flex-col">
      <h6 className="text-extratiny md:text-tiny lg:text-xs uppercase text-gray-400 dark:text-gray-600 font-semibold">
        {label}
      </h6>
      <h5 className={`text-xs md:text-sm lg:text-base font-bold ${isStatus ? 'text-green-700' : 'text-black dark:text-white'}`}>
        {value}
      </h5>
    </div>
  );
}
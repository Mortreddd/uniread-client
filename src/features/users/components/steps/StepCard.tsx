import { ReactNode } from "react";

export default function StepCard({ children }: { children: ReactNode }) {
  return (
    <div className="relative p-2 md:p-3 rounded-lg bg-gray-200 dark:bg-slate-800 shadow">
      {children}
    </div>
  );
}

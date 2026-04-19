import AppLayout from "@/layouts/AppLayout.tsx";

export default function BookDetailSkeleton() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 py-8 w-full animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div className="md:col-span-3">
            <div className="aspect-[2/3] bg-gray-200 dark:bg-slate-700 rounded-xl" />
          </div>
          <div className="md:col-span-9 space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2" />
            <div className="h-20 bg-gray-200 dark:bg-slate-700 rounded" />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

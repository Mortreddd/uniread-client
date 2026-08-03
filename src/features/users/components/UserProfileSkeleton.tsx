export default function UserProfileSkeleton() {
  return (
    <div className="mx-auto w-full rounded-md bg-gray-200 dark:bg-slate-800 p-4">
      <div className="animate-pulse">
        <div className="relative h-44 md:min-h-60 mb-4 md:mb-6">
          <div className="absolute inset-0 rounded-lg bg-gray-100 dark:bg-slate-700"></div>
        </div>
        <div className="flex-1 space-y-6 py-1">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded bg-gray-200 dark:bg-slate-700"></div>
              <div className="col-span-1 h-2 rounded bg-gray-200 dark:bg-slate-700"></div>
            </div>
            <div className="h-2 rounded bg-gray-200 dark:bg-slate-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

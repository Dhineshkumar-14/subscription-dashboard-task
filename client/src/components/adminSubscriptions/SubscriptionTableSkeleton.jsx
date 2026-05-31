const SubscriptionTableSkeleton = () => {
  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                User
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                Plan
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                Status
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {[...Array(8)].map((_, index) => (
              <tr
                key={index}
                className="border-b border-slate-100 dark:border-slate-800"
              >
                <td className="px-4 py-3">
                  <div className="h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                </td>

                <td className="px-4 py-3">
                  <div className="h-4 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                </td>

                <td className="px-4 py-3">
                  <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
                </td>

                <td className="px-4 py-3">
                  <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="mx-auto h-8 w-8 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 dark:border-slate-800">
        <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

        <div className="flex gap-2">
          <div className="h-8 w-20 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
          <div className="h-8 w-20 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTableSkeleton;

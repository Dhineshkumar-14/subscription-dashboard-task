import SubscriptionRow from "./SubscriptionRow";

const SubscriptionTable = ({ subscriptions, onViewDetails }) => {
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
            {subscriptions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-4xl">📭</div>

                    <h3 className="font-medium text-slate-900 dark:text-white">
                      No subscriptions found
                    </h3>

                    <p className="text-sm text-slate-500">
                      Try adjusting your search or filters.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              subscriptions.map((sub) => (
                <SubscriptionRow
                  key={sub.id}
                  sub={sub}
                  onViewDetails={onViewDetails}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionTable;

import { useState } from "react";
import SubscriptionFilters from "../components/adminSubscriptions/SubscriptionFilters";
import SubscriptionPagination from "../components/adminSubscriptions/SubscriptionPagination";
import SubscriptionStats from "../components/adminSubscriptions/SubscriptionStats";
import SubscriptionTable from "../components/adminSubscriptions/SubscriptionTable";
import { useSubscriptions } from "../hooks/useSubscriptions";
import SubscriptionDetailsModal from "../components/adminSubscriptions/SubscriptionDetailsModal";
import SubscriptionTableSkeleton from "../components/adminSubscriptions/SubscriptionTableSkeleton";

const AdminSubscriptions = () => {
  const {
    subscriptions,
    plans,
    total,
    stats,
    loading,
    page,
    totalPages,
    search,
    plan,
    setPage,
    setSearch,
    setPlan,
  } = useSubscriptions();

  const [selectedSubscription, setSelectedSubscription] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
              Subscription Management
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View and manage all customer subscriptions
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-3 sm:w-auto">
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Total Subscriptions
              </p>

              {loading ? (
                <div className="mt-2 h-8 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              ) : (
                <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  {total}
                </h3>
              )}
            </div>
          </div>
        </div>

        <div className="mb-5">
          <SubscriptionStats stats={stats} loading={loading} />
        </div>

        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <SubscriptionFilters
            search={search}
            setSearch={setSearch}
            plan={plan}
            setPlan={setPlan}
            plans={plans}
          />
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {loading ? (
            <SubscriptionTableSkeleton />
          ) : (
            <>
              <SubscriptionTable
                subscriptions={subscriptions}
                onViewDetails={setSelectedSubscription}
              />

              {totalPages > 1 && (
                <SubscriptionPagination
                  page={page}
                  totalPages={totalPages}
                  setPage={setPage}
                />
              )}
            </>
          )}
        </div>

        {selectedSubscription && (
          <SubscriptionDetailsModal
            subscription={selectedSubscription}
            onClose={() => setSelectedSubscription(null)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminSubscriptions;

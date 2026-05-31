import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Calendar, CreditCard, CheckCircle, Crown } from "lucide-react";

const Dashboard = () => {
  const { subscription, plan } = useSelector((state) => state.auth);

  if (!subscription || !plan) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4 dark:bg-[#0f172a]">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/80 p-6 text-center backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/50">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
            <CreditCard size={22} />
          </div>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            No Active Plan
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            You don't have an active subscription yet.
          </p>

          <Link
            to="/plans"
            className="mt-5 inline-flex items-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            View Plans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a]">
      <div className="mx-auto max-w-6xl px-4 py-6">

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white/80 p-5 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/40">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
                My Subscription
              </h1>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Manage and monitor your active subscription plan.
              </p>
            </div>

            <div className="rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 px-4 py-3 text-white">
              <p className="text-xs opacity-90">Current Plan</p>

              <div className="mt-1 flex items-center gap-2">
                <Crown size={16} />
                <h3 className="text-lg font-semibold">{plan.name}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/40">

          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
              <CreditCard size={18} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                {plan.name}
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Active Subscription
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Plan Price
              </p>

              <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                ₹{plan.price}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-center gap-2 text-slate-500">
                <Calendar size={16} />
                <span className="text-xs uppercase tracking-wide">
                  Start Date
                </span>
              </div>

              <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
                {new Date(subscription.startDate).toLocaleDateString()}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-center gap-2 text-slate-500">
                <Calendar size={16} />
                <span className="text-xs uppercase tracking-wide">
                  End Date
                </span>
              </div>

              <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
                {new Date(subscription.endDate).toLocaleDateString()}
              </p>
            </div>

            <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4">
              <p className="text-xs uppercase tracking-wide text-green-500">
                Status
              </p>

              <div className="mt-2 flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />

                <p className="text-sm font-semibold uppercase tracking-wide text-green-500">
                  {subscription.status}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-3 text-base font-semibold text-slate-900 dark:text-white">
              Included Features
            </h3>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {plan.features?.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800"
                >
                  <CheckCircle size={16} className="text-green-500" />

                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

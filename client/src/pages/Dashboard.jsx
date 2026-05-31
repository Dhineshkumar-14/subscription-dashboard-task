import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Calendar, CreditCard, CheckCircle } from "lucide-react";

const Dashboard = () => {
  const { subscription, plan } = useSelector((state) => state.auth);

  if (!subscription || !plan) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            No Active Plan
          </h2>

          <p className="mt-3 text-slate-500">
            You don't have an active subscription.
          </p>

          <Link
            to="/plans"
            className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 text-white"
          >
            View Plans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          My Subscription
        </h1>

        <p className="mt-2 text-slate-500">
          Manage and view your current plan.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="mb-8 flex items-center gap-3">
          <CreditCard className="text-blue-600" />

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            {plan.name}
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-700">
            <p className="text-sm text-slate-500">Plan Price</p>

            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              ₹{plan.price}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-700">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              Start Date
            </div>

            <p className="mt-2 font-semibold">
              {new Date(subscription.startDate).toLocaleDateString()}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-700">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              End Date
            </div>

            <p className="mt-2 font-semibold">
              {new Date(subscription.endDate).toLocaleDateString()}
            </p>
          </div>

          <div className="rounded-2xl bg-green-100 p-5">
            <p className="text-sm text-green-700">Status</p>

            <p className="mt-2 text-xl font-bold text-green-700">
              {subscription.status}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="mb-5 text-xl font-semibold text-slate-900 dark:text-white">
            Included Features
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            {plan.features?.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-700"
              >
                <CheckCircle size={18} className="text-green-500" />

                <span className="text-slate-700 dark:text-slate-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

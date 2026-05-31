import { Sparkles } from "lucide-react";

const PlansHeader = ({ role }) => {
  const isAdmin = role === "admin";

  return (
    <div className="mb-8 text-center">
      <div className="mb-4 flex justify-center">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium
            ${
              isAdmin
                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
            }`}
        >
          <Sparkles size={14} />
          {isAdmin ? "Admin View" : "Pricing Plans"}
        </span>
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        {isAdmin ? "Subscription Plans" : "Choose Your Plan"}
      </h1>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
        {isAdmin
          ? "View all available subscription plans. Administrators can review plans but cannot activate subscriptions."
          : "Simple, transparent pricing designed for individuals, startups, and growing businesses."}
      </p>

      {isAdmin && (
        <div className="mt-4 flex justify-center">
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-medium text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
            Read Only Access
          </div>
        </div>
      )}
    </div>
  );
};

export default PlansHeader;

import { Check, Sparkles } from "lucide-react";

const PlanCard = ({ plan, role, subscribing, onSubscribe }) => {
  const isPro = plan.name?.toLowerCase() === "pro";

  const isLoading = subscribing === plan.id;

  return (
    <div
      className={`
        relative flex flex-col rounded-2xl border bg-white p-6
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg

        dark:bg-slate-900

        ${
          isPro
            ? "border-blue-500 shadow-md"
            : "border-slate-200 dark:border-slate-800"
        }
      `}
    >
      {isPro && (
        <div className="absolute right-4 top-4">
          <div className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            <Sparkles size={12} />
            Popular
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          {plan.name}
        </h3>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Perfect for growing businesses
        </p>
      </div>

      <div className="mt-6">
        <span className="text-4xl font-bold text-slate-900 dark:text-white">
          ₹{plan.price}
        </span>

        <span className="ml-1 text-sm text-slate-500 dark:text-slate-400">
          /month
        </span>
      </div>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {plan.duration} days access
      </p>

      <div className="mt-6 flex-1">
        <ul className="space-y-3">
          {plan.features?.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check size={16} className="mt-0.5 shrink-0 text-green-500" />

              <span className="text-sm text-slate-600 dark:text-slate-300">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {role === "admin" ? (
        <button
          disabled
          className="
            mt-6 rounded-xl
            border border-slate-200
            py-3 text-sm font-medium
            text-slate-500
            dark:border-slate-700
            dark:text-slate-400
          "
        >
          Read Only
        </button>
      ) : (
        <button
          onClick={() => onSubscribe(plan.id)}
          disabled={isLoading}
          className={`
            mt-6 rounded-xl py-3 text-sm font-medium
            transition-all duration-200

            ${
              isPro
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            }

            ${isLoading ? "cursor-not-allowed opacity-60" : ""}
          `}
        >
          {isLoading ? "Activating..." : "Activate Plan"}
        </button>
      )}
    </div>
  );
};

export default PlanCard;

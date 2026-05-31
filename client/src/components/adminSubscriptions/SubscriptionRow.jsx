import { Eye } from "lucide-react";

const SubscriptionRow = ({ sub, onViewDetails }) => {
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400";

      case "expired":
        return "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400";

      case "cancelled":
        return "bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400";

      default:
        return "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400";
    }
  };

  return (
    <tr
      className="
        border-b
        border-slate-100
        transition-colors
        hover:bg-slate-50

        dark:border-slate-800
        dark:hover:bg-slate-800/30
      "
    >

      <td className="px-4 py-3">
        <div>
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {sub.user_name}
          </p>
        </div>
      </td>


      <td className="px-4 py-3">
        <p className="max-w-[220px] truncate text-sm text-slate-600 dark:text-slate-300">
          {sub.email}
        </p>
      </td>


      <td className="px-4 py-3">
        <span
          className="
            inline-flex
            rounded-lg
            bg-blue-50
            px-2.5
            py-1
            text-xs
            font-medium
            text-blue-700

            dark:bg-blue-500/10
            dark:text-blue-400
          "
        >
          {sub.plan_name}
        </span>
      </td>


      <td className="px-4 py-3">
        <span
          className={`
            inline-flex
            rounded-full
            px-2.5
            py-1
            text-xs
            font-medium
            ${getStatusClass(sub.status)}
          `}
        >
          {sub.status}
        </span>
      </td>


      <td className="px-4 py-3 text-center">
        <button
          onClick={() => onViewDetails?.(sub)}
          className="
            inline-flex
            h-8
            w-8
            items-center
            justify-center

            rounded-lg
            border
            border-slate-200

            text-slate-600
            transition-all

            hover:border-blue-500
            hover:text-blue-600
            hover:bg-blue-50

            dark:border-slate-700
            dark:text-slate-300
            dark:hover:border-blue-500
            dark:hover:bg-blue-500/10
            dark:hover:text-blue-400
          "
          title="View Subscription"
        >
          <Eye size={15} />
        </button>
      </td>
    </tr>
  );
};

export default SubscriptionRow;

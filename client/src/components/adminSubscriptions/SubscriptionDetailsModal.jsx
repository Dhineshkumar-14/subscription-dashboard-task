import { X, User, Mail, CreditCard, Calendar } from "lucide-react";

const SubscriptionDetailsModal = ({ subscription, onClose }) => {
  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/60
        backdrop-blur-sm
        p-3 sm:p-6
      "
    >
      <div
        className="
          w-full
          max-w-3xl
          max-h-[calc(100vh-24px)]
          sm:max-h-[calc(100vh-48px)]
          overflow-hidden
          rounded-3xl
          bg-white
          shadow-2xl
          dark:bg-slate-900
        "
      >
        <div
          className="
            sticky top-0 z-10
            flex items-center justify-between
            border-b border-slate-200
            bg-white px-4 py-4
            sm:px-6
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
            Subscription Details
          </h2>

          <button
            onClick={onClose}
            className="
              rounded-xl p-2
              transition-colors
              hover:bg-slate-100
              dark:hover:bg-slate-800
            "
          >
            <X size={20} />
          </button>
        </div>

        <div
          className="
            overflow-y-auto
            p-4 sm:p-6
            max-h-[calc(100vh-120px)]
            sm:max-h-[calc(100vh-160px)]
          "
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoCard
              icon={<User size={18} />}
              label="User"
              value={subscription?.user_name}
            />

            <InfoCard
              icon={<Mail size={18} />}
              label="Email"
              value={subscription?.email}
            />

            <InfoCard
              icon={<CreditCard size={18} />}
              label="Plan"
              value={subscription?.plan_name}
            />

            <InfoCard
              icon={<Calendar size={18} />}
              label="Duration"
              value={`${subscription?.duration || 0} Days`}
            />

            <InfoCard label="Price" value={`₹${subscription?.price || 0}`} />

            <InfoCard label="Status" value={subscription?.status} status />

            <InfoCard
              label="Start Date"
              value={
                subscription?.start_date
                  ? new Date(subscription.start_date).toLocaleDateString()
                  : "-"
              }
            />

            <InfoCard
              label="End Date"
              value={
                subscription?.end_date
                  ? new Date(subscription.end_date).toLocaleDateString()
                  : "-"
              }
            />
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-base font-semibold text-slate-900 dark:text-white">
              Features
            </h3>

            <div
              className="
                rounded-2xl
                border border-slate-200
                bg-slate-50
                p-4
                dark:border-slate-700
                dark:bg-slate-800
              "
            >
              {Array.isArray(subscription?.features) ? (
                <ul className="space-y-3">
                  {subscription.features.map((feature, index) => (
                    <li
                      key={index}
                      className="
                        flex items-start gap-3
                        text-sm text-slate-700
                        dark:text-slate-300
                      "
                    >
                      <span
                        className="
                          flex h-5 w-5 shrink-0
                          items-center justify-center
                          rounded-full
                          bg-green-100
                          text-xs font-bold
                          text-green-600
                        "
                      >
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {subscription?.features || "No features available"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ label, value, icon, status }) => {
  const getStatusStyle = () => {
    if (!status) return "";

    switch (value?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "expired":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300";
    }
  };

  return (
    <div
      className="
        rounded-2xl
        border border-slate-200
        bg-white
        p-4
        shadow-sm
        transition-all
        hover:-translate-y-0.5
        hover:shadow-md
        dark:border-slate-700
        dark:bg-slate-800
      "
    >
      <div className="mb-2 flex items-center gap-2 text-slate-500">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>

      {status ? (
        <span
          className={`
            inline-flex items-center
            rounded-full
            px-3 py-1
            text-sm font-semibold
            ${getStatusStyle()}
          `}
        >
          {value || "-"}
        </span>
      ) : (
        <p
          className="
            break-words
            text-sm sm:text-base
            font-semibold
            text-slate-900
            dark:text-white
          "
        >
          {value || "-"}
        </p>
      )}
    </div>
  );
};

export default SubscriptionDetailsModal;

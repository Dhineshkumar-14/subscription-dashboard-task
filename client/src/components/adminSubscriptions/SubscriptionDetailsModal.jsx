import { X, User, Mail, CreditCard, Calendar } from "lucide-react";

const SubscriptionDetailsModal = ({ subscription, onClose }) => {
  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          rounded-3xl
          bg-white
          shadow-2xl

          dark:bg-slate-900
        "
      >

        <div
          className="
            flex items-center justify-between
            border-b
            border-slate-200
            p-6

            dark:border-slate-800
          "
        >
          <h2
            className="
              text-xl
              font-bold
              text-slate-900

              dark:text-white
            "
          >
            Subscription Details
          </h2>

          <button
            onClick={onClose}
            className="
              rounded-lg
              p-2
              hover:bg-slate-100

              dark:hover:bg-slate-800
            "
          >
            <X size={18} />
          </button>
        </div>


        <div className="space-y-5 p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <InfoCard
              icon={<User size={18} />}
              label="User"
              value={subscription.user_name}
            />

            <InfoCard
              icon={<Mail size={18} />}
              label="Email"
              value={subscription.email}
            />

            <InfoCard
              icon={<CreditCard size={18} />}
              label="Plan"
              value={subscription.plan_name}
            />

            <InfoCard
              icon={<Calendar size={18} />}
              label="Duration"
              value={`${subscription.duration} Days`}
            />

            <InfoCard label="Price" value={`₹${subscription.price}`} />

            <InfoCard label="Status" value={subscription.status} />

            <InfoCard
              label="Start Date"
              value={new Date(subscription.start_date).toLocaleDateString()}
            />

            <InfoCard
              label="End Date"
              value={new Date(subscription.end_date).toLocaleDateString()}
            />
          </div>



          <div>
            <h3
              className="
                mb-3
                font-semibold
                text-slate-900

                dark:text-white
              "
            >
              Features
            </h3>

            <div
              className="
                rounded-2xl
                bg-slate-50
                p-4

                dark:bg-slate-800
              "
            >
              {Array.isArray(subscription.features) ? (
                <ul className="space-y-2">
                  {subscription.features.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              ) : (
                <p>{subscription.features}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ label, value, icon }) => (
  <div
    className="
      rounded-2xl
      border
      border-slate-200
      p-4

      dark:border-slate-700
    "
  >
    <div className="mb-2 flex items-center gap-2 text-slate-500">
      {icon}
      <span className="text-sm">{label}</span>
    </div>

    <p className="font-semibold text-slate-900 dark:text-white">
      {value || "-"}
    </p>
  </div>
);

export default SubscriptionDetailsModal;

import { Users, BadgeCheck, Clock3, Ban } from "lucide-react";

const SubscriptionStats = ({ stats, loading }) => {
  const cards = [
    {
      title: "Total",
      value: stats?.total || 0,
      icon: Users,
      iconClass:
        "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    },
    {
      title: "Active",
      value: stats?.active || 0,
      icon: BadgeCheck,
      iconClass:
        "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400",
    },
    {
      title: "Expired",
      value: stats?.expired || 0,
      icon: Clock3,
      iconClass:
        "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
    },
    {
      title: "Cancelled",
      value: stats?.cancelled || 0,
      icon: Ban,
      iconClass: "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-4
              shadow-sm

              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  {card.title}
                </p>

                {loading ? (
                  <div
                    className="
                      mt-2
                      h-6
                      w-12
                      animate-pulse
                      rounded-md
                      bg-slate-200

                      dark:bg-slate-700
                    "
                  />
                ) : (
                  <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                    {card.value}
                  </h3>
                )}
              </div>

              <div
                className={`
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  ${card.iconClass}
                `}
              >
                <Icon size={18} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubscriptionStats;

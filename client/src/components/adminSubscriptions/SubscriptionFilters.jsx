import { Search } from "lucide-react";

const SubscriptionFilters = ({ search, setSearch, plan, setPlan, plans }) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">


      <div className="relative flex-1">
        <Search
          size={16}
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name or email..."
          className="
            h-10
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white
            pl-10
            pr-3
            text-sm

            outline-none
            transition-all

            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100

            dark:border-slate-700
            dark:bg-slate-800
            dark:text-white
            dark:focus:ring-blue-500/20
          "
        />
      </div>


      <select
        value={plan}
        onChange={(e) => setPlan(e.target.value)}
        className="
          h-10
          min-w-[180px]
          rounded-xl
          border
          border-slate-200
          bg-white
          px-3
          text-sm

          outline-none
          transition-all

          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100

          dark:border-slate-700
          dark:bg-slate-800
          dark:text-white
          dark:focus:ring-blue-500/20
        "
      >
        <option value="">All Plans</option>

        {plans?.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SubscriptionFilters;

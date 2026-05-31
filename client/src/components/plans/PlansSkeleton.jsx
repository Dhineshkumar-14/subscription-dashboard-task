const PlansSkeleton = () => {
  return (
    <>
      <div className="mb-10 text-center">
        <div className="mx-auto h-7 w-32 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />

        <div className="mx-auto mt-5 h-8 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800 sm:w-80" />

        <div className="mx-auto mt-4 h-4 w-72 animate-pulse rounded bg-slate-200 dark:bg-slate-800 sm:w-96" />
      </div>

      <div
        className="
          grid
          grid-cols-1
          gap-6
          sm:grid-cols-2
          xl:grid-cols-3
        "
      >
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="
              animate-pulse
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-8
              shadow-sm
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <div className="h-7 w-32 rounded-lg bg-slate-200 dark:bg-slate-800" />

            <div className="mt-3 h-4 w-48 rounded bg-slate-200 dark:bg-slate-800" />

            <div className="mt-8">
              <div className="h-12 w-28 rounded-lg bg-slate-200 dark:bg-slate-800" />

              <div className="mt-3 h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="my-8 h-px bg-slate-200 dark:bg-slate-800" />

            <div className="space-y-4">
              {[1, 2, 3, 4].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-800" />

                  <div className="h-4 flex-1 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              ))}
            </div>

            <div className="mt-8 h-12 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>
        ))}
      </div>
    </>
  );
};

export default PlansSkeleton;

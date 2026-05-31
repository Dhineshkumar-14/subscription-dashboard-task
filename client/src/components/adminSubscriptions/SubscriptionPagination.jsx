import { ChevronLeft, ChevronRight } from "lucide-react";

const SubscriptionPagination = ({
  page,
  totalPages,
  setPage,
}) => {
  if (totalPages <= 1) return null;

  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div
      className="
        flex flex-col sm:flex-row
        items-center justify-between
        gap-3

        border-t
        border-slate-200

        px-4 py-3

        dark:border-slate-800
      "
    >
    

      <p className="text-xs text-slate-500">
        Showing page{" "}
        <span className="font-medium text-slate-900 dark:text-white">
          {page}
        </span>{" "}
        of{" "}
        <span className="font-medium text-slate-900 dark:text-white">
          {totalPages}
        </span>
      </p>


      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            canPrev &&
            setPage((prev) => prev - 1)
          }
          disabled={!canPrev}
          className="
            inline-flex
            items-center
            gap-1

            rounded-lg
            border
            border-slate-200

            px-3 py-1.5

            text-sm
            font-medium

            transition-colors

            hover:bg-slate-50

            disabled:pointer-events-none
            disabled:opacity-50

            dark:border-slate-700
            dark:hover:bg-slate-800
          "
        >
          <ChevronLeft size={14} />
          <span className="hidden sm:inline">
            Prev
          </span>
        </button>

        <button
          onClick={() =>
            canNext &&
            setPage((prev) => prev + 1)
          }
          disabled={!canNext}
          className="
            inline-flex
            items-center
            gap-1

            rounded-lg
            border
            border-slate-200

            px-3 py-1.5

            text-sm
            font-medium

            transition-colors

            hover:bg-slate-50

            disabled:pointer-events-none
            disabled:opacity-50

            dark:border-slate-700
            dark:hover:bg-slate-800
          "
        >
          <span className="hidden sm:inline">
            Next
          </span>

          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPagination;
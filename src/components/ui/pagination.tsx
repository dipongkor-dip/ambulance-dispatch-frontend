import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

interface PaginationControlsProps {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

function getVisiblePages(page: number, pageCount: number) {
  if (pageCount <= 5) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  if (page <= 3) return [1, 2, 3, 4, "ellipsis", pageCount] as const;
  if (page >= pageCount - 2) {
    return [1, "ellipsis", pageCount - 3, pageCount - 2, pageCount - 1, pageCount] as const;
  }
  return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", pageCount] as const;
}

const PaginationControls = ({
  page,
  pageCount,
  pageSize,
  total,
  onPageChange,
}: PaginationControlsProps) => {
  if (total === 0) return null;

  const firstItem = (page - 1) * pageSize + 1;
  const lastItem = Math.min(page * pageSize, total);

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col gap-3 border-t border-[#d9e5ec] py-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm text-[#647b8b]" aria-live="polite">
        Showing {firstItem}-{lastItem} of {total} · Page {page} of {pageCount}
      </p>
      <div className="flex flex-wrap items-center gap-1.5">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="size-4" /> Previous
        </Button>
        {getVisiblePages(page, pageCount).map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              aria-hidden="true"
              className="px-1.5 text-sm text-[#78909c]"
            >
              ...
            </span>
          ) : (
            <Button
              key={item}
              type="button"
              variant={item === page ? "default" : "outline"}
              size="sm"
              aria-label={`Go to page ${item}`}
              aria-current={item === page ? "page" : undefined}
              onClick={() => onPageChange(item)}
              className="min-w-9 px-2"
            >
              {item}
            </Button>
          ),
        )}
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          Next <ChevronRight className="size-4" />
        </Button>
      </div>
    </nav>
  );
};

export { PaginationControls };
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlsProps {
  totalPages: number;
  currentPage: number;
  createPageUrl: (pageNumber: number) => string;
}

export function PaginationControls({
  totalPages,
  currentPage,
  createPageUrl,
}: PaginationControlsProps) {
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      if (start > 2) {
        pages.push("ellipsis-start");
      }

      if (currentPage <= 3) {
        for (let i = 2; i <= 4; i++) {
          if (!pages.includes(i)) pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 3; i < totalPages; i++) {
          if (!pages.includes(i)) pages.push(i);
        }
      } else {
        for (let i = start; i <= end; i++) {
          if (!pages.includes(i)) pages.push(i);
        }
      }

      if (end < totalPages - 1) {
        pages.push("ellipsis-end");
      }

      pages.push(totalPages);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={createPageUrl(currentPage - 1)} />
          </PaginationItem>
        )}

        {getVisiblePages()?.map((pageNum, index) => {
          if (pageNum === "ellipsis-start" || pageNum === "ellipsis-end") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href={createPageUrl(pageNum as number)}
                isActive={pageNum === currentPage}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={createPageUrl(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

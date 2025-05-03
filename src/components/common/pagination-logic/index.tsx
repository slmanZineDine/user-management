"use client";

// Next
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
// Shadcn-UI
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination";
// My-Hooks
import { usePagination, DOTS } from "@/hooks/usePagination";
// Constants
import { FILTERS, PAGE_SIZE } from "@/constants";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

/** ----------------------------------------------
 * @description Pagination
 * @param {number} totalCount Represent the total count of data available from the source.
 * @param {number} siblingCount (optional) Represents the min number of page buttons to be shown on each side of the current page button. Defaults to 1.
 * @param {number} currentPage Represents the current active page.
 *                              We'll use a 1-based index instead of a traditional
 *                              0-based index for our currentPage value.
 * @param {number} pageSize (optional) Represents the maximum data are visible in a single page.
 * @returns {JSX}
 -------------------------------------------------*/

type TProps = {
   totalCount: number;
   siblingCount?: number;
   currentPage: number;
   pageSize?: number;
};

const PaginationLogic = ({
   totalCount,
   siblingCount = 1,
   currentPage,
   pageSize = PAGE_SIZE,
}: TProps) => {
   // ################### NEXT HOOKS ###################
   const SearchParams = useSearchParams();
   const { replace } = useRouter();
   const pathname = usePathname();

   // ################### TRANLATION ###################
   const t = useTranslations("buttons");

   // ################### CUSTOM HOOKS ###################
   const paginationRange = usePagination({
      currentPage,
      totalCount,
      siblingCount,
      pageSize,
   });

   // ################### HANDLER ###################
   const onPageChange = (page: number) => {
      const params = new URLSearchParams(SearchParams.toString());
      params.set(FILTERS.PAGE, page.toString());
      replace(`${pathname}?${params.toString()}`, { scroll: true });
   };

   const onNext = () => onPageChange(currentPage + 1);
   const onPrevious = () => onPageChange(currentPage - 1);

   const lastPage = paginationRange?.[paginationRange?.length - 1];

   // ################### RETURN ###################
   if (currentPage === 0 || paginationRange?.length < 2 || !paginationRange) {
      return null;
   }

   return (
      <Pagination>
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious
                  onClick={onPrevious}
                  className={cn(
                     currentPage === 1 && "pointer-events-none opacity-50",
                     "cursor-pointer"
                  )}
                  title={t("previous")}
               />
            </PaginationItem>

            {paginationRange.map((pageNumber: number | string, i: number) => {
               if (pageNumber === DOTS) {
                  return (
                     <PaginationItem key={i}>
                        <PaginationEllipsis />
                     </PaginationItem>
                  );
               }

               return (
                  <PaginationItem key={i}>
                     <PaginationLink
                        isActive={pageNumber === currentPage}
                        onClick={() => onPageChange(pageNumber as number)}
                        className="cursor-pointer"
                     >
                        {pageNumber}
                     </PaginationLink>
                  </PaginationItem>
               );
            })}

            <PaginationItem>
               <PaginationNext
                  onClick={onNext}
                  className={cn(
                     currentPage === lastPage &&
                        "pointer-events-none opacity-50",
                     "cursor-pointer"
                  )}
                  title={t("next")}
               />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   );
};

export default PaginationLogic;

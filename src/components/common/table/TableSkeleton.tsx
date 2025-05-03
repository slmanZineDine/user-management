// Shadcn-ui
import { TableRow } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
   rows?: number;
   columns?: number;
};

const TableSkeleton = ({ rows = 5, columns = 5 }: Props) => {
   return (
      <>
         {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
               {Array.from({ length: columns }).map((_, colIndex) => (
                  <TableCell key={colIndex}>
                     <Skeleton className="h-6 w-full" />
                  </TableCell>
               ))}
            </TableRow>
         ))}
      </>
   );
};

export default TableSkeleton;

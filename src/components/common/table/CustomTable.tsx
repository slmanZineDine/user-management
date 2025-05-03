// React
import { Children, ReactNode } from "react";

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";

type Props = {
   tableHeader: TTableHeader[];
   noDataMsg?: string;
   isLoading?: boolean;
   children: ReactNode;
};

const CustomTable = ({
   tableHeader,
   noDataMsg = "There are no data.",
   isLoading = false,
   children,
}: Props) => {
   // ################### Data ###################
   const dataCount = Children.toArray(children).length;

   // ################### Table Head Data ###################
   const tableHeaderContent = tableHeader.map((header) =>
      header?.isShow ? (
         <TableHead
            key={header.id}
            className="font-bold text-start"
            style={header.styling ?? {}}
         >
            {header.title}
         </TableHead>
      ) : null
   );

   // ################### Table Body Data ###################
   let tableBodyContent;
   if (isLoading) {
      tableBodyContent = (
         <TableRow>
            <TableCell colSpan={tableHeaderContent.length}>
               <span className="loading loading-spinner loading-lg bg-primary"></span>
            </TableCell>
         </TableRow>
      );
   } else if (dataCount === 0) {
      tableBodyContent = (
         <TableRow>
            <TableCell colSpan={tableHeaderContent.length}>
               {noDataMsg}
            </TableCell>
         </TableRow>
      );
   } else {
      tableBodyContent = children;
   }

   return (
      <Table>
         <TableHeader>
            <TableRow>{tableHeaderContent}</TableRow>
         </TableHeader>
         <TableBody>{tableBodyContent}</TableBody>
      </Table>
   );
};

export default CustomTable;

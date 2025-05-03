// React
import { Suspense } from "react";
// Components
import UsersTableData from "./UsersTableData";
import CustomTable from "@/components/common/table/CustomTable";
import TableSkeleton from "@/components/common/table/TableSkeleton";
// Services
import { getAllUsers, getUsersByRole } from "@/services/users";
// Constants
import { SKELETONS_ROWS } from "@/constants";
// Types
import { TUsersResponse } from "@/types/response";
import PaginationLogic from "@/components/common/pagination-logic";
import { getTranslations } from "next-intl/server";

const UsersTable = async ({ page, role }: { page: number; role?: string }) => {
   // ################### NEXT INTL ###################
   const t = await getTranslations("table");

   // ################### FETCH DATA ###################
   let usersResponses: TUsersResponse;

   if (role && role !== "All") {
      usersResponses = await getUsersByRole({ page, role });
   } else {
      usersResponses = await getAllUsers({ page });
   }

   // ################### CONTENT ###################
   const tableHeader = [
      { id: 1, title: t("name"), isShow: true },
      { id: 2, title: t("email"), isShow: true },
      { id: 3, title: t("role"), isShow: true },
      { id: 4, title: t("status"), isShow: true },
      { id: 5, title: "", isShow: true },
   ];

   return (
      <section className="container section-padding">
         {/* =================== Table =================== */}
         <CustomTable tableHeader={tableHeader}>
            <Suspense
               key={page}
               fallback={
                  <TableSkeleton
                     rows={SKELETONS_ROWS}
                     columns={tableHeader.length}
                  />
               }
            >
               <UsersTableData page={page} role={role} />
            </Suspense>
         </CustomTable>

         {/* =================== Pagination =================== */}
         <section className="mt-8">
            <PaginationLogic
               currentPage={page}
               totalCount={usersResponses.total}
            />
         </section>
      </section>
   );
};

export default UsersTable;

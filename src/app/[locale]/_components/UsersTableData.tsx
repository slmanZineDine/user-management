import { TableRow } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table";
import { getAllUsers, getUsersByRole } from "@/services/users";
import { TUsersResponse } from "@/types/response";
import EditUserButton from "./EditUserButton";
import DeleteUserButton from "./DeleteUserButton";
import { getTranslations } from "next-intl/server";

type Props = { page: number; role?: string };

const UsersTableData = async ({ page, role }: Props) => {
   // ################### TRANSLATIONS ###################
   const t = await getTranslations("homePage");

   // ################### FETCH DATA ###################
   let usersResponses: TUsersResponse;

   if (role && role !== "all") {
      usersResponses = await getUsersByRole({ page, role });
   } else {
      usersResponses = await getAllUsers({ page });
   }

   if (usersResponses.users.length === 0) {
      return (
         <TableRow>
            <TableCell colSpan={5} className="text-center py-4">
               {t("noUsers")}
            </TableCell>
         </TableRow>
      );
   }

   return (
      <>
         {usersResponses.users.map((user) => (
            <TableRow key={user.id}>
               <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
               <TableCell>{user.email}</TableCell>
               <TableCell>{user.company.title}</TableCell>
               <TableCell>
                  <span className="green-status ">Active</span>
               </TableCell>
               <TableCell>
                  <div className="flex items-center gap-2">
                     <EditUserButton
                        user={{
                           id: user.id.toString(),
                           name: `${user.firstName} ${user.lastName}`,
                           email: user.email,
                           role: user.role,
                           status: "active",
                        }}
                     />
                     <DeleteUserButton
                        userId={user.id.toString()}
                        userName={`${user.firstName} ${user.lastName}`}
                     />
                  </div>
               </TableCell>
            </TableRow>
         ))}
      </>
   );
};

export default UsersTableData;

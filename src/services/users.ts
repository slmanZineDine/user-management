// API
import { fetchData } from "./api";
// Utils
import buildURLWithQueryParamsArray from "@/utils/buildURLWithQueryParamsArray";
// Constants
import { FILTERS, PAGE_SIZE } from "@/constants";
import { endpoints } from "@/constants/endpoints";
// Types
import { TUsersResponse } from "@/types/response";
import { TUser } from "@/types/user";
import { TUserForm } from "@/validations/userFormSchema";

// =================== Users ===================
export async function getAllUsers({ page }: { page: number }) {
   const URL = endpoints.users.root;

   const queryParameters = [
      { key: FILTERS.LIMIT, value: PAGE_SIZE },
      { key: FILTERS.SKIP, value: (page - 1) * PAGE_SIZE },
   ];
   const fullURL = buildURLWithQueryParamsArray(URL, queryParameters);

   const products = await fetchData<TUsersResponse>(fullURL);

   return products;
}

// =================== Users By Role ===================
export async function getUsersByRole({
   role,
   page,
}: {
   role: string;
   page: number;
}) {
   const URL = endpoints.users.filter;

   const queryParameters = [
      { key: FILTERS.KEY, value: FILTERS.ROLE },
      { key: FILTERS.VALUE, value: role },
      { key: FILTERS.LIMIT, value: PAGE_SIZE },
      { key: FILTERS.SKIP, value: (page - 1) * PAGE_SIZE },
   ];
   const fullURL = buildURLWithQueryParamsArray(URL, queryParameters);

   const products = await fetchData<TUsersResponse>(fullURL);

   return products;
}

export async function addUser(userData: TUserForm) {
   try {
      const response = await fetchData<TUser>(endpoints.users.addUser, {
         method: "POST",
         body: JSON.stringify(userData),
      });

      return { success: true, data: response };
   } catch {
      return { error: "Failed to add user" };
   }
}

export async function updateUser(userId: string, userData: TUserForm) {
   if (!userId) {
      return { error: "User ID is required" };
   }

   try {
      const response = await fetchData<TUser>(
         `${endpoints.users.root}/${userId}`,
         {
            method: "PUT",
            body: JSON.stringify(userData),
         }
      );

      return { success: true, data: response };
   } catch {
      return { error: "Failed to update user" };
   }
}

export async function deleteUser(userId: string) {
   if (!userId) {
      return { error: "User ID is required" };
   }

   try {
      await fetchData(`${endpoints.users.root}/${userId}`, {
         method: "DELETE",
      });

      return { success: true };
   } catch {
      return { error: "Failed to delete user" };
   }
}

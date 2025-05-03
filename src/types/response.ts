// Types
import { TUser } from "@/types/user";

export type TMetaPagination = {
   total: number;
   limit: number;
   skip: number;
};

export type TUsersResponse = { users: TUser[] } & TMetaPagination;

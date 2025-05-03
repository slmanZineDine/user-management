// =================== BASE URL ===================
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";

const ROOTS = {
   // =================== Users ===================
   USERS: "users",
};

export const endpoints = {
   // =================== Users ===================
   users: {
      root: ROOTS.USERS,
      filter: `${ROOTS.USERS}/filter`,
      addUser: `${ROOTS.USERS}/add`,
   },
};

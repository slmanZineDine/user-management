import { BASE_URL } from "@/constants/endpoints";

const getHeaders = (): HeadersInit => ({
   "Content-Type": "application/json",
});

interface FetchOptions extends RequestInit {
   headers?: HeadersInit;
}

// =================== REQUEST METHODS ===================
export const fetchData = async <T>(
   endpoint: string,
   options: FetchOptions = {}
): Promise<T> => {
   const response = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: getHeaders(),
      ...options,
   });

   if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
   }

   return response.json();
};

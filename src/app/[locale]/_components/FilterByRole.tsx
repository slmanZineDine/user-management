"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

const FilterByRole = () => {
   // ################### NEXT HOOKS ###################
   const router = useRouter();
   const searchParams = useSearchParams();
   const currentRole = searchParams.get("role") || "all";
   const t = useTranslations("filterByRole");

   // ################### HANDLER ###################
   const handleRoleChange = (role: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (role === "all") {
         params.delete("role");
      } else {
         params.set("role", role);
      }

      // Reset page to 1
      params.set("page", "1");

      router.push(`?${params.toString()}`);
   };

   return (
      <div className="flex items-center gap-2">
         <span className="text-sm font-medium">{t("label")}</span>
         <Select value={currentRole} onValueChange={handleRoleChange}>
            <SelectTrigger className="w-[180px]">
               <SelectValue placeholder={t("placeholder")} />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="all">{t("all")}</SelectItem>
               <SelectItem value="admin">{t("admin")}</SelectItem>
               <SelectItem value="user">{t("user")}</SelectItem>
            </SelectContent>
         </Select>
      </div>
   );
};

export default FilterByRole;

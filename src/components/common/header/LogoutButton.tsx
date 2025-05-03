"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const LogoutButton = () => {
   const t = useTranslations("buttons");
   return (
      <Button className={`w-full bg-red-500 hover:bg-red-500/85`}>
         {t("logout")}
      </Button>
   );
};

export default LogoutButton;

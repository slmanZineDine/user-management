"use client";

import { Earth } from "lucide-react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { APP_LANGUAGES } from "@/constants";

const LanguageSwitcher = () => {
   const router = useRouter();
   const pathname = usePathname();
   const { locale } = useParams();

   const switchLanguage = (newLocale: string) => {
      const path =
         pathname?.replace(`/${locale}`, `/${newLocale}`) ?? `/${newLocale}`;
      router.push(path);
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="outline" className="hover:bg-muted" size="icon">
               <Earth className="cursor-pointer" />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            {Object.entries(APP_LANGUAGES).map(([key, value], i) => (
               <DropdownMenuItem
                  key={i}
                  className="cursor-pointer hover:!bg-muted"
                  onClick={() => switchLanguage(value)}
               >
                  {key}
               </DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default LanguageSwitcher;

import { Languages } from "@/constants/enums";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
   locales: [Languages.ENGLISH, Languages.ARABIC],
   defaultLocale: Languages.ENGLISH,
});

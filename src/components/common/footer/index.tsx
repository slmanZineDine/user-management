// My-Components
import { getTranslations } from "next-intl/server";
import CurrentYear from "./CurrentYear";

const Footer = async () => {
   const t = await getTranslations("footer");

   return (
      <footer className="py-4 mt-auto border-t-2">
         <p className="text-center">
            {t("copyright")} <CurrentYear />
         </p>
      </footer>
   );
};

export default Footer;

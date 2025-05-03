import { buttonVariants } from "@/components/ui/button";
import { paths } from "@/constants/paths";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export default async function NotFound() {
   const t = await getTranslations();
   return (
      <main className="not-found-page">
         <section className="flex-center text-textColor container h-screen flex-col gap-4">
            <Image
               height={300}
               width={400}
               alt="not-found"
               src="/assets/svg/not-found.svg"
               className="-mb-4 -mt-16"
            />
            <p className="text-center text-3xl">{t("homePage.pageNotFound")}</p>
            <div className="flex-between gap-4">
               <Link
                  href={`/${paths.home.root}`}
                  className={buttonVariants({ variant: "default" })}
               >
                  {t("buttons.backToHome")}
               </Link>
            </div>
         </section>
      </main>
   );
}

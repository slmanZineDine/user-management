import UsersTable from "./_components/UsersTable";
import PageTitle from "@/components/common/page-title";
import FilterByRole from "./_components/FilterByRole";
import AddUserButton from "./_components/AddUserButton";
import { getTranslations } from "next-intl/server";

type Props = {
   searchParams: Promise<{
      page?: string;
      role?: string;
   }>;
};

export default async function Home(props: Props) {
   // ################### DATA ###################
   const searchParams = await props.searchParams;
   const page = Number(searchParams?.page) || 1;
   const role = searchParams?.role || "";
   const t = await getTranslations("homePage");

   return (
      <>
         <PageTitle title={t("title")} subTitle={t("subTitle")} />
         <section className="container flex flex-col gap-6 sm:flex-row sm:justify-between">
            <FilterByRole />
            <AddUserButton />
         </section>
         <UsersTable page={page} role={role} />
      </>
   );
}

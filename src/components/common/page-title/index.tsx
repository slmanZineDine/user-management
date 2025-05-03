type Props = {
   title: string;
   subTitle?: string;
   className?: string;
};

const PageTitle = ({ title, subTitle = "" }: Props) => {
   return (
      <section className="container section-padding">
         <h1 className={`mb-4 text-3xl font-bold text-primary`}>{title}</h1>
         {subTitle && (
            <p className="max-w-96 text-muted-foreground">{subTitle}</p>
         )}
      </section>
   );
};

export default PageTitle;

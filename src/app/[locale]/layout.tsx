// Next
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
// My-Components
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { Toaster } from "sonner";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
// Constants
import { Directions, Languages } from "@/constants/enums";
// Styles
import "./globals.css";
import { getTranslations } from "next-intl/server";

const cairo = Cairo({
   subsets: ["latin"],
   weight: ["400", "500", "600", "700"],
   preload: true,
});

export async function generateStaticParams() {
   return [{ locale: Languages.ARABIC }, { locale: Languages.ENGLISH }];
}

export async function generateMetadata(): Promise<Metadata> {
   const t = await getTranslations("homePage");

   return {
      title: {
         default: t("title"),
         template: `%s | ${t("dashboard")}`,
      },
      description: t("subTitle"),
   };
}

export default async function RootLayout({
   children,
   params,
}: Readonly<{
   children: React.ReactNode;
   params: Promise<{ locale: string }>;
}>) {
   // Ensure that the incoming `locale` is valid
   const { locale } = await params;
   if (!hasLocale(routing.locales, locale)) {
      notFound();
   }

   return (
      <html
         lang={locale}
         dir={locale === Languages.ARABIC ? Directions.RTL : Directions.LTR}
         suppressHydrationWarning
      >
         <head>
            <link rel="icon" href="/favicon.ico" />
         </head>
         <body className={`${cairo.className} antialiased`}>
            <NextIntlClientProvider>
               <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
               >
                  <div className="mx-auto max-w-8xl grid min-h-[100dvh] grid-cols-1 grid-rows-[auto_1fr_auto]">
                     <Header />
                     <main className="bg-background pt-header-height">
                        {children}
                     </main>
                     <Footer />
                  </div>
               </ThemeProvider>
               <Toaster position="top-center" />
            </NextIntlClientProvider>
         </body>
      </html>
   );
}

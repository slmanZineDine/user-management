"use client";
// Next
import Link from "next/link";
import Image from "next/image";
// Constants
import { paths } from "@/constants/paths";
import { useParams } from "next/navigation";

const Logo = ({ width, height }: { width: number; height: number }) => {
   const { locale } = useParams();
   return (
      <Link href={`/${locale}/${paths.home.root}`}>
         <Image
            src="/assets/imgs/logo.png"
            alt="logo"
            width={width}
            height={height}
         />
      </Link>
   );
};

export default Logo;

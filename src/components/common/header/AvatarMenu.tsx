// Third-Party =====> shadcn-ui
import { Skeleton } from "@/components/ui/skeleton";
import {
   DropdownMenu,
   DropdownMenuItem,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// My-Components
// import CustomLink from "../custom-link";
import LogoutButton from "./LogoutButton";

const AvatarMenu = async () => {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Avatar className="ms-2">
               <AvatarImage
                  src="/assets/imgs/avatar.png"
                  alt="user-avatar"
                  className="cursor-pointer"
               />
               <AvatarFallback>
                  <Skeleton className="size-full" />
               </AvatarFallback>
            </Avatar>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer flex-col py-4 hover:!bg-transparent">
               <h2 className="text-lg font-bold text-primary">Admin Admin</h2>
               <p>admin@admin.com</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="mb-2 border-y hover:!bg-muted">
               {/* <CustomLink
            href="/"
            className="w-full"
          > */}
               prfoile
               {/* </CustomLink> */}
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:!bg-transparent">
               <LogoutButton />
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default AvatarMenu;

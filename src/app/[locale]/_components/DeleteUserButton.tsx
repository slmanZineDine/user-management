"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { deleteUser } from "@/services/users";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type DeleteUserButtonProps = {
   userId: string;
   userName: string;
};

const DeleteUserButton = ({ userId, userName }: DeleteUserButtonProps) => {
   const [isDeleting, setIsDeleting] = useState(false);
   const [open, setOpen] = useState(false);
   const t = useTranslations();

   const handleDelete = async () => {
      setIsDeleting(true);
      try {
         const result = await deleteUser(userId);
         if (result.error) {
            toast.error(
               t("toasts.userError", { operation: t("common.delete") })
            );
         } else {
            toast.success(
               t("toasts.userSuccess", { operation: t("common.delete") })
            );
            setOpen(false);
         }
      } catch (error) {
         toast.error(t("toasts.userError", { operation: t("common.delete") }));
         console.error("Failed to delete user:", error);
      } finally {
         setIsDeleting(false);
      }
   };

   return (
      <AlertDialog open={open} onOpenChange={setOpen}>
         <AlertDialogTrigger asChild>
            <Button
               size="icon"
               variant="destructive"
               className="bg-red-500 hover:bg-red-400"
            >
               <Trash2 className="size-4" />
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>{t("modal.deleteUserTitle")}</AlertDialogTitle>
               <AlertDialogDescription>
                  {t("modal.deleteUserDescription", { userName })}
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel disabled={isDeleting}>
                  {t("buttons.cancel")}
               </AlertDialogCancel>
               <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-red-500 hover:bg-red-600"
               >
                  {isDeleting ? t("buttons.deleting") : t("buttons.delete")}
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default DeleteUserButton;

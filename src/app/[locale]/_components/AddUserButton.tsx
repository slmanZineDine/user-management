"use client";

import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { addUser } from "@/services/users";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import UserForm from "@/components/common/form/UserForm";
import { TUserForm } from "@/validations/userFormSchema";

const AddUserButton = () => {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [open, setOpen] = useState(false);
   const t = useTranslations();

   async function onSubmit(values: TUserForm) {
      setIsSubmitting(true);
      try {
         const result = await addUser(values);
         if (result.error) {
            toast.error(t("toasts.userError", { operation: t("common.add") }));
         } else {
            toast.success(
               t("toasts.userSuccess", { operation: t("common.add") })
            );
            setOpen(false);
         }
      } catch (error) {
         toast.error(t("toasts.userError", { operation: t("common.add") }));
         console.error("Failed to submit form:", error);
      } finally {
         setIsSubmitting(false);
      }
   }

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button>
               <Plus className="mr-2 h-4 w-4" />
               {t("homePage.addUser")}
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle className="text-start">
                  {t("modal.addUser")}
               </DialogTitle>
            </DialogHeader>
            <UserForm
               onSubmit={onSubmit}
               isSubmitting={isSubmitting}
               submitButtonText={t("buttons.save")}
            />
         </DialogContent>
      </Dialog>
   );
};

export default AddUserButton;

"use client";

import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { TUserForm } from "@/validations/userFormSchema";
import { updateUser } from "@/services/users";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import UserForm from "@/components/common/form/UserForm";

type EditUserFormProps = {
   user: {
      id: string;
      name: string;
      email: string;
      role: string;
      status: "active" | "inactive";
   };
};

const EditUserButton = ({ user }: EditUserFormProps) => {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [open, setOpen] = useState(false);
   const t = useTranslations();

   async function onSubmit(values: TUserForm) {
      setIsSubmitting(true);
      try {
         const result = await updateUser(user.id, values);
         if (result.error) {
            toast.error(t("toasts.userError", { operation: t("common.edit") }));
         } else {
            toast.success(
               t("toasts.userSuccess", { operation: t("common.edit") })
            );
            setOpen(false);
         }
      } catch (error) {
         toast.error(t("toasts.userError", { operation: t("common.edit") }));
         console.error("Failed to submit form:", error);
      } finally {
         setIsSubmitting(false);
      }
   }

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button
               size="icon"
               variant="default"
               className="bg-green-500 hover:bg-green-400"
            >
               <Pencil className="h-4 w-4" />
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle className="text-start">
                  {t("modal.editUser")}
               </DialogTitle>
            </DialogHeader>
            <UserForm
               defaultValues={{
                  name: user.name,
                  email: user.email,
                  role: user.role,
                  status: user.status,
               }}
               onSubmit={onSubmit}
               isSubmitting={isSubmitting}
               submitButtonText={t("buttons.saveChanges")}
            />
         </DialogContent>
      </Dialog>
   );
};

export default EditUserButton;

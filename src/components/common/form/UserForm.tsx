"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { TUserForm, userFormSchema } from "@/validations/userFormSchema";
import { useTranslations } from "next-intl";

type UserFormProps = {
   defaultValues?: TUserForm;
   onSubmit: (values: TUserForm) => Promise<void>;
   isSubmitting: boolean;
   submitButtonText: string;
};

const UserForm = ({
   defaultValues,
   onSubmit,
   isSubmitting,
   submitButtonText,
}: UserFormProps) => {
   const t = useTranslations();

   const form = useForm<TUserForm>({
      resolver: zodResolver(userFormSchema(t)),
      mode: "onBlur",
      defaultValues: defaultValues || {
         name: "",
         email: "",
         role: "",
         status: "",
      },
   });

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>{t("form.name")}</FormLabel>
                     <FormControl>
                        <Input
                           placeholder={t("form.namePlaceholder")}
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>{t("form.email")}</FormLabel>
                     <FormControl>
                        <Input
                           placeholder={t("form.emailPlaceholder")}
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="role"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>{t("form.role")}</FormLabel>
                     <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                     >
                        <FormControl>
                           <SelectTrigger className="w-full">
                              <SelectValue
                                 placeholder={t("form.rolePlaceholder")}
                              />
                           </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           <SelectItem value="admin">
                              {t("filterByRole.admin")}
                           </SelectItem>
                           <SelectItem value="user">
                              {t("filterByRole.user")}
                           </SelectItem>
                        </SelectContent>
                     </Select>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="status"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>{t("form.status")}</FormLabel>
                     <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                     >
                        <FormControl>
                           <SelectTrigger className="w-full">
                              <SelectValue
                                 placeholder={t("form.statusPlaceholder")}
                              />
                           </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           <SelectItem value="active">
                              {t("form.active")}
                           </SelectItem>
                           <SelectItem value="inactive">
                              {t("form.inactive")}
                           </SelectItem>
                        </SelectContent>
                     </Select>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <button
               type="submit"
               className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md disabled:opacity-50"
               disabled={isSubmitting}
            >
               {isSubmitting ? t("buttons.saving") : submitButtonText}
            </button>
         </form>
      </Form>
   );
};

export default UserForm;

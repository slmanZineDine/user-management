import { NAME_MAX_LENGTH } from "@/constants";
import { z } from "zod";

const userFormSchema = (
   t?: (key: string, params?: Record<string, string | number>) => string
) => {
   return z.object({
      name: z
         .string()
         .trim()
         .min(2, {
            message: t ? t("errors.required") : "This field is required.",
         })
         .max(NAME_MAX_LENGTH, {
            message: t
               ? t("errors.lengthError", {
                    length: NAME_MAX_LENGTH,
                 })
               : `The value must be less than ${NAME_MAX_LENGTH} characters long.`,
         }),
      email: z
         .string()
         .trim()
         .min(2, {
            message: t ? t("errors.required") : "This field is required.",
         })
         .email(t ? t("errors.emailError") : "Invalid email address."),
      role: z.string().min(2, {
         message: t ? t("errors.required") : "This field is required.",
      }),
      status: z.string().min(2, {
         message: t ? t("errors.required") : "This field is required.",
      }),
   });
};

type TUserForm = z.infer<ReturnType<typeof userFormSchema>>;

export { userFormSchema, type TUserForm };

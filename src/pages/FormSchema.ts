import * as z from "zod";

export const FormSchema = z.object({
  field1: z
    .string()
    .min(3, "Username must not be lesser than 3 characters")
    .max(25, "Username must not be greater than 25 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "The username must contain only letters, numbers and underscore (_)"
    ),
  field2: z
    .string()
    .min(3, "Username must not be lesser than 3 characters")
    .max(25, "Username must not be greater than 25 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "The username must contain only letters, numbers and underscore (_)"
    ),
});

export type IFormInput = z.infer<typeof FormSchema>;
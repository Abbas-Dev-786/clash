import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({ message: "Name is required" })
      .min(2, { message: "Name must be atleast 3 characters long" }),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Invalid Email address" }),
    password: z
      .string({ message: "Password is required" })
      .min(8, { message: "Password must be atleast 8 characters long" }),
    confirm_password: z
      .string({ message: "Confirm Password is required" })
      .min(8, {
        message: "Confirm Password must be atleast 8 characters long",
      }),
  })
  .refine(({ confirm_password, password }) => confirm_password === password, {
    message: "Confirm Password is not matching",
    path: ["confirm_password"],
  });

export const loginSchema = z.object({
  email: z
    .string({ message: "email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "password is required" })
    .min(8, { message: "password must be atleast 8 characters long" }),
});

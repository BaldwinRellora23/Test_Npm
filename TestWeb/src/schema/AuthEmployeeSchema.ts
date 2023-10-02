import { z } from "zod";

export const AuthEmployee = z.object({
  userName: z
    .string()
    .max(6, { message: "Username must not exceeded in 6 characters." }),
  password: z
    .string()
    .max(6, { message: "Password must not exceeded in 6 characters." }),
});

export type AuthEmployeeSchema = z.infer<typeof AuthEmployee>;

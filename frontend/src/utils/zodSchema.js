import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  // confirmPassword: z.string().min(8),
})

export const signInSchema = signUpSchema.omit({name: true})
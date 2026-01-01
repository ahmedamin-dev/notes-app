import { z } from "zod";

export const signupShcema = z.object({
  username: z.string().min(4, { error: "Name must be at least 4 characters" }),
  email: z.email(),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters" }),
});

export type SignupInputs = z.infer<typeof signupShcema>;

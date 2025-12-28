import { z } from "zod";

export const homeFormSchema = z.object({
  email: z.email({ error: "You must enter a valid email" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters" }),
});

export type HomeInputs = z.infer<typeof homeFormSchema>;

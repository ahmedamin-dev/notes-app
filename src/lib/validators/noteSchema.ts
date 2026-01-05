import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().min(4, { error: "Title must be at least 4 characters" }),
  description: z.string().min(1, { error: "Please enter a valid description" }),
});

export type NoteInput = z.infer<typeof noteSchema>;

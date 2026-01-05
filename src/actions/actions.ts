"use server";

import { Note } from "@/generated/prisma/client";
import { getServerSession } from "@/lib/getSession";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { NoteInput, noteSchema } from "@/lib/validators/noteSchema";

export const createNoteGroup = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    return { error: "Unauthorized" };
  }

  if (!title || title.trim().length === 0) {
    return { error: "Title is required" };
  }

  try {
    await prisma.noteGroup.create({
      data: {
        title,
        userId: user.id,
      },
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to create notebook", error);
    return { error: "Failed to create notebook" };
  }
};

export const createNote = async (noteGroupId: string, data: NoteInput) => {
  const parsed = noteSchema.safeParse(data);
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    return { error: "Unauthorized" };
  }

  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  const validatedData = parsed.data;

  try {
    const note = await prisma.note.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        noteGroupId,
      },
    });
    return { success: true, data: note };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create new Note" };
  }
};

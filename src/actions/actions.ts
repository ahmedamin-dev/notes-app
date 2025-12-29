"use server";

import { getServerSession } from "@/lib/getSession";
import prisma from "@/lib/prisma";

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
    return { success: true };
  } catch (error) {
    console.error("Failed to create notebook", error);
    return { error: "Failed to create notebook" };
  }
};

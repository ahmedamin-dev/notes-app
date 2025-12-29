"use server";

import { getServerSession } from "@/lib/getSession";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getNoteGroups = async () => {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    const noteGroups = await prisma.noteGroup.findMany();

    return { success: true };
  } catch (error) {
    console.error("Error getting note groups", error);
    return { error: "Error getting note groups" };
  }
};

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

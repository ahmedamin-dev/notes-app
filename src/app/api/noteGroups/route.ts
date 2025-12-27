import { getServerSession } from "@/lib/getSession";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession();
    const user = session.data?.user;

    if (!user) {
      return new Response(JSON.stringify({ message: "You must login first" }), {
        status: 401,
      });
    }

    const noteGroups = await prisma.noteGroup.findMany({
      where: {
        id: user.id,
      },
      orderBy: [{ favorite: "desc" }, { createdAt: "desc" }],
    });

    return new Response(JSON.stringify(noteGroups), { status: 200 });
  } catch (error) {
    console.error("error getting note groups", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const { title } = await req.json();
    const session = await getServerSession();
    const user = session.data?.user;

    if (!user) {
      return new Response(JSON.stringify({ message: "You must login first" }), {
        status: 401,
      });
    }

    if (!title || title.trim().length === 0) {
      return new Response(JSON.stringify({ message: "Title is required" }), {
        status: 400,
      });
    }

    const newNoteGroup = await prisma.noteGroup.create({
      data: {
        title,
        userId: user.id,
      },
    });

    return new Response(JSON.stringify(newNoteGroup), { status: 201 });
  } catch (error) {
    console.error("error creating note group", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}

import AddNote from "@/components/AddNote";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/prisma";
import { CiStar } from "react-icons/ci";

const NoteGroupId = async ({
  params,
}: {
  params: Promise<{ noteGroupId: string }>;
}) => {
  const { noteGroupId } = await params;
  const notes = await prisma.note.findMany();
  return (
    <div>
      <section className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="space-y-3 w-full">
          <Input type="text" placeholder="Search notes..." />
        </div>
        <AddNote noteGroupId={noteGroupId} />
      </section>

      <section className="grid grid-cols-1 gap-4 pt-7 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <Card key={note.id}>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>{note.title}</CardTitle>
              <Button variant={"outline"} size={"icon"}>
                <CiStar />
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div>{note.description}</div>
              <div className="text-muted-foreground">
                Last modified: {note.updatedAt.toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default NoteGroupId;

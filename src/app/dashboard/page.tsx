import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CiStar } from "react-icons/ci";
import Link from "next/link";
import AddNewNotebook from "@/components/AddNewNotebook";
import { getServerSession } from "@/lib/getSession";
import prisma from "@/lib/prisma";
import { unauthorized } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    return unauthorized();
  }

  const noteGroups = await prisma.noteGroup.findMany({
    where: {
      userId: user.id,
    },
  });
  return (
    <main>
      <section className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="space-y-3 w-full">
          <Input type="text" placeholder="Search Notebooks..." />
        </div>
        <AddNewNotebook />
      </section>

      <section className="grid grid-cols-1 gap-4 pt-7 sm:grid-cols-2 lg:grid-cols-3">
        {noteGroups.map((group) => (
          <Link key={group.id} href={`/dashboard/${group.id}`}>
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>{group.title}</CardTitle>
                <Button variant={"outline"} size={"icon"}>
                  <CiStar />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground">
                  Last modified: {group.updatedAt.toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </main>
  );
};

export default Dashboard;

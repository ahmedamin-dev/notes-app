import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockNoteGroups } from "@/lib/constants/noteGroups";
import { IoAddSharp } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import Link from "next/link";

const Dashboard = () => {
  return (
    <main>
      <section className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="space-y-3 w-full">
          <Input type="text" placeholder="Search Notebooks..." />
        </div>
        <div>
          <Button className="font-medium" variant={"outline"}>
            <IoAddSharp className="size-5" />
            New Notebook
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 pt-7 sm:grid-cols-2 lg:grid-cols-3">
        {mockNoteGroups.map((group) => (
          <Link key={group.id} href={`/${group.id}`}>
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

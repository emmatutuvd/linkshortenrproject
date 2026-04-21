import { auth } from "@clerk/nextjs/server";
import { getLinksByUserId } from "@/data/links";
import { Card, CardContent } from "@/components/ui/card";
import { Link2, ExternalLink } from "lucide-react";
import { CreateLinkDialog } from "./create-link-dialog";
import { EditLinkDialog } from "./edit-link-dialog";
import { DeleteLinkDialog } from "./delete-link-dialog";

export default async function DashboardPage() {
  const { userId } = await auth();
  const userLinks = await getLinksByUserId(userId!);

  return (
    <main className="flex flex-1 flex-col px-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <CreateLinkDialog />
      </div>

      {userLinks.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-2 text-muted-foreground">
          <Link2 className="size-10 stroke-1" />
          <p className="text-sm">No links yet. Create your first short link!</p>
        </div>
      ) : (
        <ul className="mt-6 grid gap-3">
          {userLinks.map((link) => (
            <li key={link.id}>
              <Card>
                <CardContent className="flex items-center justify-between gap-4 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">/{link.shortCode}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {link.url}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <EditLinkDialog link={link} />
                    <DeleteLinkDialog link={link} />
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      <ExternalLink className="size-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

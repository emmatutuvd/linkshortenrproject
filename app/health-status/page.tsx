import { checkDatabaseHealth, getLinkCount } from "@/data/health";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Server, Link2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HealthStatusPage() {
  const [db, linkCount] = await Promise.all([
    checkDatabaseHealth(),
    getLinkCount(),
  ]);

  const allHealthy = db.ok;

  return (
    <main className="flex flex-1 flex-col px-6 py-8">
      <div className="mx-auto w-full max-w-2xl flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            Health Of Application
          </h1>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              allHealthy
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {allHealthy ? "Operational" : "Degraded"}
          </span>
        </div>

        <div className="grid gap-4">
          {/* App */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <Server className="size-5 text-muted-foreground" />
              <CardTitle className="text-base">Application</CardTitle>
              <StatusBadge ok={true} />
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Next.js app is running.
            </CardContent>
          </Card>

          {/* Database */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <Database className="size-5 text-muted-foreground" />
              <CardTitle className="text-base">Database</CardTitle>
              <StatusBadge ok={db.ok} />
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {db.ok
                ? `Connected · ${db.latencyMs} ms`
                : "Unable to reach database."}
            </CardContent>
          </Card>

          {/* Links */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <Link2 className="size-5 text-muted-foreground" />
              <CardTitle className="text-base">Links</CardTitle>
              <StatusBadge ok={linkCount !== null} />
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {linkCount !== null
                ? `${linkCount.toLocaleString()} total short link${linkCount !== 1 ? "s" : ""} stored`
                : "Could not retrieve link count."}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

function StatusBadge({ ok }: { ok: boolean }) {
  return (
    <span
      className={`ml-auto rounded-full px-2.5 py-0.5 text-xs font-medium ${
        ok
          ? "bg-green-500/20 text-green-400"
          : "bg-red-500/20 text-red-400"
      }`}
    >
      {ok ? "OK" : "Error"}
    </span>
  );
}

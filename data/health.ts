import { db } from "@/db";
import { links } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function checkDatabaseHealth(): Promise<{
  ok: boolean;
  latencyMs: number;
}> {
  const start = Date.now();
  try {
    await db.execute(sql`SELECT 1`);
    return { ok: true, latencyMs: Date.now() - start };
  } catch {
    return { ok: false, latencyMs: Date.now() - start };
  }
}

export async function getLinkCount(): Promise<number | null> {
  try {
    const result = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(links);
    return result[0]?.count ?? 0;
  } catch {
    return null;
  }
}

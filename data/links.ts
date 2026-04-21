import { db } from '@/db';
import { links } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';

export async function getLinksByUserId(userId: string) {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.createdAt));
}

export async function createLink(data: { userId: string; shortCode: string; url: string }) {
  const [link] = await db
    .insert(links)
    .values({
      userId: data.userId,
      shortCode: data.shortCode,
      url: data.url,
    })
    .returning();
  return link;
}

export async function updateLink(data: { id: string; userId: string; shortCode: string; url: string }) {
  const [link] = await db
    .update(links)
    .set({
      shortCode: data.shortCode,
      url: data.url,
      updatedAt: new Date(),
    })
    .where(and(
      eq(links.id, data.id),
      eq(links.userId, data.userId)
    ))
    .returning();
  return link;
}

export async function deleteLink(data: { id: string; userId: string }) {
  const [link] = await db
    .delete(links)
    .where(and(
      eq(links.id, data.id),
      eq(links.userId, data.userId)
    ))
    .returning();
  return link;
}

export async function getLinkByShortCode(shortCode: string) {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  return link;
}

import { db } from '@/db';
import { links } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

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
    .where(eq(links.id, data.id))
    .where(eq(links.userId, data.userId))
    .returning();
  return link;
}

export async function deleteLink(data: { id: string; userId: string }) {
  const [link] = await db
    .delete(links)
    .where(eq(links.id, data.id))
    .where(eq(links.userId, data.userId))
    .returning();
  return link;
}

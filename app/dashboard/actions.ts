'use server';

import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { createLink, updateLink, deleteLink } from '@/data/links';
import { db } from '@/db';
import { links } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

const createLinkSchema = z.object({
  url: z.string().url('Please enter a valid URL'),
  shortCode: z
    .string()
    .min(1, 'Short code is required')
    .max(50, 'Short code must be 50 characters or less')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Short code can only contain letters, numbers, hyphens, and underscores'),
});

export async function createLinkAction(input: { url: string; shortCode: string }) {
  try {
    // 1. Validate
    const result = createLinkSchema.safeParse(input);
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }
    const validated = result.data;

    // 2. Authenticate
    const { userId } = await auth();
    if (!userId) {
      return { error: 'Unauthorized' };
    }

    // 3. Check if short code already exists
    const existing = await db
      .select()
      .from(links)
      .where(eq(links.shortCode, validated.shortCode))
      .limit(1);

    if (existing.length > 0) {
      return { error: 'This short code is already taken. Please choose another one.' };
    }

    // 4. Create link via helper
    const link = await createLink({
      userId,
      shortCode: validated.shortCode,
      url: validated.url,
    });

    return { success: true, data: link };
  } catch (error) {
    return { error: 'Failed to create link. Please try again.' };
  }
}

const updateLinkSchema = z.object({
  id: z.string().uuid('Invalid link ID'),
  url: z.string().url('Please enter a valid URL'),
  shortCode: z
    .string()
    .min(1, 'Short code is required')
    .max(50, 'Short code must be 50 characters or less')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Short code can only contain letters, numbers, hyphens, and underscores'),
});

export async function updateLinkAction(input: { id: string; url: string; shortCode: string }) {
  try {
    // 1. Validate
    const result = updateLinkSchema.safeParse(input);
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }
    const validated = result.data;

    // 2. Authenticate
    const { userId } = await auth();
    if (!userId) {
      return { error: 'Unauthorized' };
    }

    // 3. Check if short code already exists (excluding current link)
    const existing = await db
      .select()
      .from(links)
      .where(
        and(
          eq(links.shortCode, validated.shortCode),
          eq(links.userId, userId)
        )
      )
      .limit(1);

    if (existing.length > 0 && existing[0].id !== validated.id) {
      return { error: 'This short code is already taken. Please choose another one.' };
    }

    // 4. Update link via helper
    const link = await updateLink({
      id: validated.id,
      userId,
      shortCode: validated.shortCode,
      url: validated.url,
    });

    if (!link) {
      return { error: 'Link not found or you do not have permission to edit it.' };
    }

    return { success: true, data: link };
  } catch (error) {
    return { error: 'Failed to update link. Please try again.' };
  }
}

const deleteLinkSchema = z.object({
  id: z.string().uuid('Invalid link ID'),
});

export async function deleteLinkAction(input: { id: string }) {
  try {
    // 1. Validate
    const result = deleteLinkSchema.safeParse(input);
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }
    const validated = result.data;

    // 2. Authenticate
    const { userId } = await auth();
    if (!userId) {
      return { error: 'Unauthorized' };
    }

    // 3. Delete link via helper
    const link = await deleteLink({
      id: validated.id,
      userId,
    });

    if (!link) {
      return { error: 'Link not found or you do not have permission to delete it.' };
    }

    return { success: true, data: link };
  } catch (error) {
    return { error: 'Failed to delete link. Please try again.' };
  }
}

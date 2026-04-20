import { pgTable, text, timestamp, uuid, uniqueIndex, index } from 'drizzle-orm/pg-core';

export const links = pgTable(
  'links',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id').notNull(),
    shortCode: text('short_code').notNull(),
    url: text('url').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex('links_short_code_idx').on(table.shortCode),
    index('links_user_id_idx').on(table.userId),
  ]
);

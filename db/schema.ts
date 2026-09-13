import {
  bigint,
  index,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const links = pgTable(
  'links',
  {
    id: bigint('id', { mode: 'number' })
      .generatedAlwaysAsIdentity()
      .primaryKey(),
    shortCode: varchar('short_code', { length: 32 }).notNull().unique(),
    url: text('url').notNull(),
    clerkUserId: text('clerk_user_id').notNull(),
    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'date',
    })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', {
      withTimezone: true,
      mode: 'date',
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [index('links_clerk_user_id_idx').on(table.clerkUserId)],
);

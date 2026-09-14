import { and, desc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { links } from '@/db/schema';

type CreateLinkInput = {
  clerkUserId: string;
  shortCode: string;
  url: string;
};

type UpdateLinkInput = CreateLinkInput & {
  id: number;
};

export async function createLink(input: CreateLinkInput) {
  const [link] = await db.insert(links).values(input).returning({
    id: links.id,
  });

  return link;
}

export async function getLinksForUser(clerkUserId: string) {
  return db
    .select({
      id: links.id,
      shortCode: links.shortCode,
      url: links.url,
      createdAt: links.createdAt,
    })
    .from(links)
    .where(eq(links.clerkUserId, clerkUserId))
    .orderBy(desc(links.createdAt));
}

export async function getLinkByShortCode(shortCode: string) {
  const [link] = await db
    .select({ url: links.url })
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);

  return link;
}

export async function updateLink(input: UpdateLinkInput) {
  const [link] = await db
    .update(links)
    .set({
      shortCode: input.shortCode,
      url: input.url,
      updatedAt: new Date(),
    })
    .where(
      and(eq(links.id, input.id), eq(links.clerkUserId, input.clerkUserId)),
    )
    .returning({ id: links.id });

  return link;
}

export async function deleteLink(input: { id: number; clerkUserId: string }) {
  const [link] = await db
    .delete(links)
    .where(
      and(eq(links.id, input.id), eq(links.clerkUserId, input.clerkUserId)),
    )
    .returning({ id: links.id });

  return link;
}

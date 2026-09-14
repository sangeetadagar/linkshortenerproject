'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { deleteLink, updateLink } from '@/data/links';

const linkIdSchema = z.number().int().positive();
const linkFieldsSchema = z.object({
  url: z.url('Enter a valid URL, including https://'),
  shortCode: z
    .string()
    .trim()
    .min(3, 'Use at least 3 characters for your short code.')
    .max(32, 'Use 32 characters or fewer.')
    .regex(/^[a-zA-Z0-9-]+$/, 'Use only letters, numbers, and hyphens.'),
});

export type UpdateLinkActionInput = {
  id: number;
  url: string;
  shortCode: string;
};

export type DeleteLinkActionInput = {
  id: number;
};

export async function updateLinkAction(input: UpdateLinkActionInput) {
  const parsedId = linkIdSchema.safeParse(input.id);
  const parsedFields = linkFieldsSchema.safeParse({
    url: input.url,
    shortCode: input.shortCode,
  });

  if (!parsedId.success) {
    return { error: 'That link could not be found.' };
  }

  if (!parsedFields.success) {
    return {
      error: parsedFields.error.issues[0]?.message ?? 'Check your link.',
    };
  }

  const { userId } = await auth();

  if (!userId) {
    return { error: 'You must be signed in to edit a link.' };
  }

  try {
    const updatedLink = await updateLink({
      clerkUserId: userId,
      id: parsedId.data,
      shortCode: parsedFields.data.shortCode,
      url: parsedFields.data.url,
    });

    if (!updatedLink) {
      return { error: 'That link could not be found.' };
    }
  } catch {
    return { error: 'That short code is already in use. Try another one.' };
  }

  revalidatePath('/dashboard');
  return { success: 'Link updated.' };
}

export async function deleteLinkAction(input: DeleteLinkActionInput) {
  const parsedId = linkIdSchema.safeParse(input.id);

  if (!parsedId.success) {
    return { error: 'That link could not be found.' };
  }

  const { userId } = await auth();

  if (!userId) {
    return { error: 'You must be signed in to delete a link.' };
  }

  try {
    const deletedLink = await deleteLink({
      clerkUserId: userId,
      id: parsedId.data,
    });

    if (!deletedLink) {
      return { error: 'That link could not be found.' };
    }
  } catch {
    return { error: 'We could not delete that link. Please try again.' };
  }

  revalidatePath('/dashboard');
  return { success: 'Link deleted.' };
}

'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createLink } from '@/data/links';

const createLinkSchema = z.object({
  url: z.url('Enter a valid URL, including https://'),
  shortCode: z
    .string()
    .trim()
    .min(3, 'Use at least 3 characters for your short code.')
    .max(32, 'Use 32 characters or fewer.')
    .regex(/^[a-zA-Z0-9-]+$/, 'Use only letters, numbers, and hyphens.'),
});

export type CreateLinkActionInput = {
  url: string;
  shortCode: string;
};

export async function createLinkAction(input: CreateLinkActionInput) {
  const parsedInput = createLinkSchema.safeParse(input);

  if (!parsedInput.success) {
    return {
      error: parsedInput.error.issues[0]?.message ?? 'Check your link.',
    };
  }

  const { userId } = await auth();

  if (!userId) {
    return { error: 'You must be signed in to create a link.' };
  }

  try {
    await createLink({
      clerkUserId: userId,
      shortCode: parsedInput.data.shortCode,
      url: parsedInput.data.url,
    });
  } catch {
    return { error: 'That short code is already in use. Try another one.' };
  }

  revalidatePath('/dashboard');
  return { success: 'Link created.' };
}

import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { CreateLinkDialog } from '@/components/create-link-dialog';
import { LinksList } from '@/components/links-list';
import { getLinksForUser } from '@/data/links';

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const links = await getLinksForUser(userId);

  return (
    <div className="min-h-full bg-zinc-950 text-zinc-100">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-white"
        >
          Shortly<span className="text-blue-400">.</span>
        </Link>
        <UserButton />
      </header>
      <main className="mx-auto w-full max-w-7xl px-6 pb-20 pt-12 lg:px-10 lg:pt-16">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-400">
              Workspace / Overview
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
              Your links
            </h1>
            <p className="mt-3 text-zinc-400">
              Keep every destination organized and ready to share.
            </p>
          </div>
          <CreateLinkDialog />
        </div>
        <LinksList links={links} />
      </main>
    </div>
  );
}

'use client';

import { ExternalLink, Link2, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState, useTransition } from 'react';
import {
  deleteLinkAction,
  updateLinkAction,
} from '@/components/links-list.actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { getLinksForUser } from '@/data/links';

type UserLinks = Awaited<ReturnType<typeof getLinksForUser>>;

type LinksListProps = {
  links: UserLinks;
};

function formatCreatedAt(date: Date) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
  }).format(date);
}

type LinkItem = UserLinks[number];

function EditLinkDialog({ link }: { link: LinkItem }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState(link.url);
  const [shortCode, setShortCode] = useState(link.shortCode);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const input = {
      id: link.id,
      url,
      shortCode,
    };

    startTransition(async () => {
      const result = await updateLinkAction(input);

      if ('error' in result) {
        setError(result.error ?? 'Check your link and try again.');
        return;
      }

      setOpen(false);
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Edit /${link.shortCode}`}
        title="Edit link"
        onClick={() => {
          setError(null);
          setUrl(link.url);
          setShortCode(link.shortCode);
          setOpen(true);
        }}
      >
        <Pencil aria-hidden="true" />
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit short link</DialogTitle>
          <DialogDescription>
            Update the destination or short code for this link.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`url-${link.id}`}>Destination URL</Label>
            <Input
              id={`url-${link.id}`}
              name="url"
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`shortCode-${link.id}`}>Short code</Label>
            <Input
              id={`shortCode-${link.id}`}
              name="shortCode"
              value={shortCode}
              onChange={(event) => setShortCode(event.target.value)}
              required
              minLength={3}
              maxLength={32}
              pattern="[a-zA-Z0-9-]+"
            />
          </div>
          {error ? (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          ) : null}
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteLinkDialog({ link }: { link: LinkItem }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    setError(null);

    startTransition(async () => {
      const result = await deleteLinkAction({ id: link.id });

      if ('error' in result) {
        setError(result.error ?? 'We could not delete that link.');
        return;
      }

      setOpen(false);
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Delete /${link.shortCode}`}
        title="Delete link"
        className="text-zinc-500 hover:text-destructive"
        onClick={() => {
          setError(null);
          setOpen(true);
        }}
      >
        <Trash2 aria-hidden="true" />
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this short link?</DialogTitle>
          <DialogDescription>
            This will permanently delete /{link.shortCode}. This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? 'Deleting...' : 'Delete link'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function LinksList({ links }: LinksListProps) {
  if (links.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/60 px-6 py-14 text-center">
        <Link2 className="mx-auto size-8 text-blue-400" aria-hidden="true" />
        <h2 className="mt-4 text-lg font-semibold text-white">
          Your links will appear here
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-400">
          Create your first short link to start tracking and sharing it.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      <div className="hidden grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto_auto] gap-4 border-b border-zinc-800 px-5 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500 sm:grid">
        <span>Short link</span>
        <span>Destination</span>
        <span>Created</span>
        <span className="sr-only">Actions</span>
      </div>
      <ul className="divide-y divide-zinc-800">
        {links.map((link) => (
          <li
            key={link.id}
            className="grid gap-3 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto_auto] sm:items-center sm:gap-4"
          >
            <a
              href={`/l/${link.shortCode}`}
              className="flex min-w-0 items-center gap-2 text-sm font-medium text-blue-300 hover:text-blue-200"
            >
              <Link2
                className="size-4 shrink-0 text-blue-400"
                aria-hidden="true"
              />
              <span className="truncate">/{link.shortCode}</span>
            </a>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="flex min-w-0 items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200"
            >
              <span className="truncate">{link.url}</span>
              <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
            </a>
            <time
              dateTime={link.createdAt.toISOString()}
              className="text-xs text-zinc-500"
            >
              {formatCreatedAt(link.createdAt)}
            </time>
            <div className="flex items-center justify-end gap-1 sm:col-start-4 sm:row-start-1">
              <EditLinkDialog link={link} />
              <DeleteLinkDialog link={link} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

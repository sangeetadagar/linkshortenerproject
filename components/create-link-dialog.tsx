'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState, useTransition } from 'react';
import { createLinkAction } from '@/components/create-link-dialog.actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function CreateLinkDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const form = event.currentTarget;
    const input = {
      url: String(formData.get('url') ?? ''),
      shortCode: String(formData.get('shortCode') ?? ''),
    };

    startTransition(async () => {
      const result = await createLinkAction(input);

      if ('error' in result) {
        setError(result.error ?? 'Check your link and try again.');
        return;
      }

      setOpen(false);
      form.reset();
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="gap-2">
            <Plus aria-hidden="true" />
            Create link
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a short link</DialogTitle>
          <DialogDescription>
            Give your destination a memorable address to share.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Destination URL</Label>
            <Input
              id="url"
              name="url"
              type="url"
              placeholder="https://example.com/article"
              required
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shortCode">Short code</Label>
            <Input
              id="shortCode"
              name="shortCode"
              placeholder="my-article"
              required
              minLength={3}
              maxLength={32}
              pattern="[a-zA-Z0-9-]+"
            />
            <p className="text-xs text-muted-foreground">
              Letters, numbers, and hyphens only.
            </p>
          </div>
          {error ? (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          ) : null}
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create link'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-zinc-50 dark:bg-zinc-950">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Shortly<span className="text-blue-600">.</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="ghost" size="lg" className="px-4">
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="lg" className="px-4">
                Sign up
              </Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </nav>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Make every character count
          </p>
          <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-zinc-950 sm:text-7xl dark:text-white">
            Links that stay out of the way.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Turn long, unwieldy URLs into short links your audience can remember
            and trust.
          </p>
          <div className="mt-10 flex max-w-xl gap-3 rounded-xl border border-zinc-200 bg-white p-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <input
              className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-zinc-400"
              placeholder="Paste a long URL"
              aria-label="Long URL"
            />
            <Button
              size="lg"
              className="h-auto bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Shorten
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

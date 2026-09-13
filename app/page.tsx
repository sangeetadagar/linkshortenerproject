import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import {
  ArrowRight,
  BarChart3,
  Check,
  Copy,
  Link2,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-full overflow-hidden bg-zinc-950 text-zinc-100">
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-white"
        >
          Shortly<span className="text-blue-400">.</span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="flex items-center gap-2 text-sm font-medium"
        >
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                size="lg"
                className="px-4 text-zinc-300 hover:text-white"
              >
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button
                size="lg"
                className="bg-blue-500 px-4 text-white hover:bg-blue-400"
              >
                Sign up
              </Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </nav>
      </header>
      <main>
        <section className="relative mx-auto grid w-full max-w-7xl gap-16 px-6 pb-24 pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10 lg:pb-32 lg:pt-24">
          <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="relative">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs font-medium text-blue-300">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Simple links. Better reach.
            </div>
            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-7xl">
              The shortest path from click to connection.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-400">
              Turn long, unwieldy URLs into short links your audience can
              remember, share, and trust.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <SignUpButton mode="modal">
                <Button
                  size="lg"
                  className="h-11 gap-2 bg-blue-500 px-5 text-white hover:bg-blue-400"
                >
                  Create your first link
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </SignUpButton>
              <Link
                href="#features"
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'lg',
                  className: 'h-11 text-zinc-300 hover:text-white',
                })}
              >
                See how it works
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-500">
              <span className="flex items-center gap-2">
                <Check className="size-4 text-blue-400" /> Free to get started
              </span>
              <span className="flex items-center gap-2">
                <Check className="size-4 text-blue-400" /> No credit card
              </span>
            </div>
          </div>

          <div className="relative lg:pl-8">
            <div className="absolute -inset-4 rounded-[2rem] bg-blue-500/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/30">
              <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400">
                    <Link2 className="size-4" />
                  </span>
                  Your links
                </div>
                <span className="text-xs text-zinc-500">
                  Workspace / Overview
                </span>
              </div>
              <div className="grid gap-4 p-5 sm:grid-cols-3">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 sm:col-span-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-zinc-500">Total clicks</p>
                      <p className="mt-2 text-3xl font-semibold text-white">
                        12,480
                      </p>
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-medium text-emerald-400">
                      +18.4%
                    </span>
                  </div>
                  <div className="mt-6 flex h-20 items-end gap-1.5">
                    {[34, 48, 40, 62, 56, 74, 66, 84, 72, 92, 80, 100].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t-sm bg-blue-500/70"
                          style={{ height: `${height}%` }}
                        />
                      ),
                    )}
                  </div>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                  <BarChart3 className="size-5 text-blue-400" />
                  <p className="mt-5 text-xs text-zinc-500">Active links</p>
                  <p className="mt-1 text-2xl font-semibold text-white">24</p>
                  <p className="mt-2 text-xs text-zinc-600">
                    Across 4 campaigns
                  </p>
                </div>
              </div>
              <div className="mx-5 mb-5 overflow-hidden rounded-xl border border-zinc-800">
                <div className="grid grid-cols-[1fr_auto] border-b border-zinc-800 px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-zinc-600">
                  <span>Short link</span>
                  <span>Clicks</span>
                </div>
                {[
                  ['shortly.to/launch', '4,820'],
                  ['shortly.to/notes', '3,261'],
                  ['shortly.to/weekly', '1,904'],
                ].map(([link, clicks]) => (
                  <div
                    key={link}
                    className="grid grid-cols-[1fr_auto] items-center border-b border-zinc-800/70 px-4 py-3 last:border-0"
                  >
                    <span className="flex items-center gap-2 text-sm text-blue-300">
                      <Link2 className="size-3.5 text-zinc-600" />
                      {link}
                    </span>
                    <span className="text-sm text-zinc-400">{clicks}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="border-y border-zinc-800/80 bg-zinc-900/40"
        >
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-400">
                Built for momentum
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Everything you need to make every click count.
              </h2>
              <p className="mt-4 text-zinc-400">
                Shortly keeps the mechanics quiet so your message can do the
                talking.
              </p>
            </div>
            <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 md:grid-cols-3">
              {[
                {
                  icon: Zap,
                  title: 'Fast by default',
                  copy: 'Create clean, reliable short links in seconds, without getting buried in settings.',
                },
                {
                  icon: BarChart3,
                  title: 'Know what works',
                  copy: 'See the clicks behind your links and learn which ideas are moving people forward.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Share with confidence',
                  copy: 'Keep every destination organized and every link ready for the next conversation.',
                },
              ].map(({ icon: Icon, title, copy }) => (
                <div key={title} className="bg-zinc-950 p-7 lg:p-8">
                  <Icon className="size-5 text-blue-400" aria-hidden="true" />
                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-500">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-20 sm:flex-row sm:items-center sm:justify-between lg:px-10 lg:py-24">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Ready to make a shorter impression?
            </h2>
            <p className="mt-3 text-zinc-500">
              Your next great link is only a few characters away.
            </p>
          </div>
          <SignUpButton mode="modal">
            <Button
              size="lg"
              className="h-11 shrink-0 gap-2 bg-white px-5 text-zinc-950 hover:bg-zinc-200"
            >
              Start shortening
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </SignUpButton>
        </section>
      </main>
      <footer className="border-t border-zinc-800/80 px-6 py-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Shortly. Simple links for busy teams.</span>
          <span className="flex items-center gap-1.5">
            <Copy className="size-3.5" /> Keep it short.
          </span>
        </div>
      </footer>
    </div>
  );
}

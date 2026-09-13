<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Agent Instructions

These instructions apply to all work in this repository. Treat them as the local engineering contract for the link shortener application.

## Project Context

- This is a Next.js 16.3 App Router application using React 19, TypeScript, Tailwind CSS v4, Clerk, Drizzle ORM, and Neon HTTP.
- The product is a small link-shortening service. Favor a clear, dependable user flow over speculative features or broad abstractions.
- The `app/` directory owns routes, layouts, metadata, and route-level UI. Shared UI belongs in `components/`; reusable non-UI code belongs in `lib/`; database code belongs in `db/`.
- The `@/*` TypeScript alias maps to the repository root. Prefer it for imports that cross directory boundaries.

## Before Changing Code

- **MANDATORY: Before generating, editing, or proposing ANY code, ALWAYS read every relevant individual instruction file in the `/docs` directory first.** Determine which document(s) apply to the task, read the complete file(s), and follow their requirements before writing code. Do not skip this step, even for small changes, bug fixes, refactors, configuration work, or UI updates.
- Read the target file and its nearest caller or sibling implementation before editing.
- For Next.js behavior, routing, server/client boundaries, or framework configuration, read the matching guide under `node_modules/next/dist/docs/` first. This project may use APIs that differ from older Next.js examples.
- Check the existing implementation before introducing a new helper, component, dependency, or styling pattern.
- Keep the change focused. Do not rewrite unrelated code, generated files, or user changes already present in the worktree.

## Architecture Rules

- Keep route components as Server Components by default. Add `'use client'` only when a component needs browser APIs, event handlers, local interactive state, or a client-only library.
- Keep data access, secrets, and privileged mutations on the server. Never expose `DATABASE_URL`, Clerk secret keys, or other server-only environment variables to client code.
- Use Server Actions or route handlers for mutations and validate all untrusted input at the boundary. Return explicit success and error states rather than relying on thrown errors reaching the UI.
- Use `next/link` for internal navigation and `next/image` when rendering project images.
- Keep layouts and page modules thin when behavior can be moved into a focused component or domain helper.
- Do not add a state-management library for local or route-scoped state without a demonstrated need.

## TypeScript and Code Style

- Maintain strict TypeScript. Do not use `any` to bypass a type error; model the value or narrow it safely instead.
- Use descriptive names and preserve the existing single-quote style in TypeScript files unless the surrounding file clearly uses another convention.
- Prefer small, composable functions and early returns. Avoid premature abstractions and duplicate business rules.
- Keep public component APIs narrow and type them from the actual behavior they support.
- Do not add comments that restate code. Add a short comment only when a non-obvious constraint or framework behavior would otherwise be easy to miss.
- Do not modify generated files such as `next-env.d.ts` or `.next` output by hand.

## Authentication and Authorization

- Read [`docs/auth.md`](docs/auth.md) before changing Clerk configuration, authentication flows, protected routes, or user-owned data access.
- Clerk is the source of truth for authentication. Use the existing `@clerk/nextjs` provider, components, and server utilities rather than creating a parallel auth flow.
- Treat authentication and authorization as separate checks: a signed-in user is not automatically authorized to access another user's links.
- Enforce ownership on the server for every read, update, and delete involving user data. Do not trust user IDs, redirect parameters, or hidden form fields supplied by the client.
- Keep public short-link resolution separate from authenticated dashboard operations, and make the intended visibility of each route explicit.
- Do not log session tokens, cookies, authorization headers, private URLs, or other sensitive data.

## Database and Data Handling

- Use Drizzle for database access and keep schema changes in `db/schema.ts` plus the repository's normal migration workflow.
- Reuse the shared database client from `db/index.ts`; do not create a new client per request or import database code into client components.
- Validate URLs, aliases, lengths, and ownership before writing. Normalize only when the product contract requires it, and preserve the original destination URL when it is user-visible.
- Design short-code lookups and ownership checks to be efficient. Add constraints or indexes when correctness depends on uniqueness or lookup performance.
- Handle missing records, duplicate aliases, malformed URLs, and database failures as expected application states with useful user-facing messages.
- Never hard-code credentials or commit local environment files. Document required environment variables without including their values.

## UI and Accessibility

- Read [`docs/ui.md`](docs/ui.md) before changing or generating any UI.
- Preserve the existing Shortly visual language: restrained zinc neutrals, blue accent actions, Geist fonts, compact rounded controls, and responsive layouts.
- Use shadcn/ui components for every UI element. Use the existing `components/ui` primitives and `lucide-react` icons; do not create custom UI components or hand-roll replacements.
- When a needed primitive is missing, add it through the configured shadcn workflow and preserve the settings in `components.json`.
- Use Tailwind utilities and existing CSS variables before adding custom CSS. Keep class names readable and avoid arbitrary values unless they solve a real layout requirement.
- Every form control needs an accessible label or an equivalent `aria-label`; buttons must communicate their action and disabled/loading state.
- Include visible focus states, keyboard access, useful validation errors, and empty/loading/error states for interactive workflows.
- Keep text and controls usable on narrow screens. Do not rely on hover alone to expose essential actions.
- Avoid decorative UI that competes with the shortening workflow. Use animation sparingly and respect reduced-motion preferences when adding motion.

## Validation

- Run `npm run lint` after TypeScript, JSX, styling, or configuration changes.
- Run `npm run build` for changes affecting routes, server/client boundaries, environment access, metadata, or deployment behavior.
- Add or update focused tests when a test harness is introduced or already exists for the touched behavior. At minimum, manually verify the affected success, validation-error, unauthenticated, and empty states when applicable.
- Inspect the final diff for accidental formatting, secrets, unrelated edits, and missing loading or error handling.
- Report validation that could not be run and the reason; do not claim a check passed without running it.

## Change Discipline

- Keep changes minimal and backward-compatible unless the task explicitly calls for a migration or breaking change.
- Preserve existing public routes, metadata, component APIs, and database behavior unless the task requires changing them.
- Do not install dependencies when the existing stack can solve the problem. If a new dependency is necessary, explain its purpose and update the lockfile through the package manager.
- Do not commit changes, create branches, or reset the worktree unless explicitly requested.
- Keep project-specific agent guidance in this file.

For detailed guidelines on specific topics, refer to the modular documentation in the `docs/` directory. The mandatory documentation gate above applies before generating any code.

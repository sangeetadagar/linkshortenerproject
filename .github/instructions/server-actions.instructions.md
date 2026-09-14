---
description: Use when implementing or changing data mutations, server actions, validation, authentication checks, or database writes in this app.
---

# Server Action Mutation Guidelines

- Perform every data mutation through a Next.js Server Action. Do not mutate data directly from client components, route components, or event handlers.
- Call Server Actions only from client components. Place each action in an `actions.ts` file colocated with the client component that calls it.
- Give every Server Action input an explicit TypeScript type. Do not use the `FormData` TypeScript type; define a type that represents the expected fields.
- Validate every Server Action input with Zod before doing any other application work.
- Check for a logged-in Clerk user before continuing to any database operation. Treat the server-resolved user identity as authoritative and never trust a client-supplied user ID.
- Keep Drizzle queries out of Server Actions. Put database operations in typed helper functions under `/data`, and call those helpers from the actions.
- Scope user-owned reads and mutations to the authenticated Clerk user ID. Server Actions must not throw errors for expected failures; return an object with either an `error` or `success` property instead.

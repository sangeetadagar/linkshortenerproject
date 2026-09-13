---
name: clerk-authentication
description: 'Use when implementing authentication, protected routes, sign-in/sign-up flows, or user-owned data in this app.'
---

# Clerk Authentication

Clerk is the only authentication system for this app. The root provider is configured in `app/layout.tsx`, and request interception is configured in `proxy.ts`. Do not add passwords, custom sessions, JWT handling, OAuth providers, or any other parallel authentication method.

## Rules

- Use Clerk’s current Next.js APIs and patterns. Read the local Clerk skill documentation when implementing non-trivial auth behavior.
- Treat the server as the authority for identity and authorization. Client visibility is not authorization.
- Resolve the current user on the server before reading or mutating user-owned links.
- Scope every user-owned database query by the authenticated Clerk user ID. Never accept an owner ID from the browser as trusted input.
- `/dashboard` is protected and must require a signed-in Clerk user. Define and verify its signed-out behavior whenever the route is changed.
- A signed-in user requesting `/` must be redirected to `/dashboard`.
- Sign-in and sign-up must always open as Clerk modals. Use Clerk triggers such as `SignInButton` and `SignUpButton` with `mode="modal"`; do not expose standalone auth forms or pages as the primary flow.
- Keep sign-in and sign-up route structure compatible with the existing catch-all segments for Clerk's routing and fallback behavior.
- Do not log session tokens, secrets, private URLs, or personal data.

When adding or changing auth behavior, verify both signed-out and signed-in paths, including `/`, `/dashboard`, and modal sign-in/sign-up triggers.

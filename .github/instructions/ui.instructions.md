---
name: shadcn-ui-components
description: 'Use when implementing or changing any user interface in this app.'
---

# shadcn UI Components

All UI elements in this app must use shadcn/ui components. Use the existing primitives in `components/ui` and import them through the `@/components/ui` alias. Do not create custom UI components or hand-roll replacements for shadcn primitives.

## Rules

- Check `components/ui` before adding UI. Compose the available shadcn primitives directly in the route or feature that needs them.
- When a required primitive is missing, add it through the configured shadcn workflow rather than implementing a bespoke component. Preserve the project settings in `components.json`.
- Keep styling consistent with the configured Base Nova style, neutral CSS variables, Tailwind utilities, and Lucide icons.
- Preserve accessibility: use the primitive's supported labels, descriptions, focus states, keyboard behavior, and disabled/loading states.
- Do not introduce another component library or duplicate shadcn primitives with local implementations.

Read this guide before generating or modifying JSX, forms, navigation, dialogs, menus, or other UI elements.

---
description: This file describes the styling rules and best practices for the project. Read this before creating or modifying any UI components.
---
# Styling — Tailwind CSS v4 + shadcn/ui

## Rules

- **All UI elements must use shadcn/ui components.** Never create custom components from scratch.
- If a shadcn component exists for the UI pattern you need, use it — do not re-implement it.
- Import shadcn components from `@/components/ui/`, never directly from the shadcn package.

## Adding Components

Install new shadcn components with the CLI:

```bash
npx shadcn@latest add <component-name>
```

This generates the component into `components/ui/`. Treat generated files as owned code — you may edit them.

## Using Components

```ts
// Correct
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Wrong — never import from the shadcn package directly
import { Button } from 'shadcn/ui';
```

## Merging Classes — `cn()`

Use the `cn()` helper from `@/lib/utils` whenever conditionally combining Tailwind classes:

```ts
import { cn } from '@/lib/utils';

<div className={cn('base-class', condition && 'conditional-class')} />
```

## Tailwind CSS v4

- There is **no** `tailwind.config.js`. Configuration and design tokens live in `app/globals.css` under `@theme`.
- Add custom tokens (colours, spacing, etc.) inside the `@theme` block in `globals.css`.
- Use standard Tailwind utility classes for layout, spacing, and typography.

## Icons

Use `lucide-react` for all icons:

```ts
import { LinkIcon, Trash2 } from 'lucide-react';
```

Do not use other icon libraries.

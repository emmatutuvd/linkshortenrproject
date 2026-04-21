---
description: This file describes the server actions architecture and best practices for data mutations.
---

# Server Actions

## Rules

- **All data mutations** must be done via Server Actions. Never mutate data directly in Server Components or Route Handlers unless there's a specific reason.
- Server Actions must be called from **Client Components** (`"use client"`).
- Server Action files **MUST** be named `actions.ts` and **colocated** in the same directory as the component that calls them.

## Type Safety

- All data passed to Server Actions must have **appropriate TypeScript types**.
- **Never use the `FormData` TypeScript type** directly in Server Action parameters. Parse and validate form data into strongly-typed objects.

## Validation

- **All input data MUST be validated** using Zod before processing.
- Define Zod schemas at the top of the `actions.ts` file.

## Error Handling

- Server Actions **MUST NOT throw errors**.
- Instead, return an object with either:
  - `{ success: true, data: ... }` for successful operations
  - `{ error: string }` for failures
- This ensures predictable error handling in Client Components.

## Authentication

- **Every Server Action MUST check for a logged-in user** before performing any database operations.
- Use Clerk's `auth()` helper to retrieve `userId`:

  ```ts
  import { auth } from "@clerk/nextjs/server";

  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }
  ```

## Database Operations

- Server Actions **MUST NOT** directly use Drizzle queries.
- Instead, call **helper functions** from the `/data` directory that wrap Drizzle queries.
- Keep Server Actions focused on validation, authorization, and orchestration.

## Example Structure

```ts
// app/dashboard/actions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createLink } from "@/data/links";

const createLinkSchema = z.object({
  url: z.string().url(),
  slug: z.string().min(1),
});

export async function createLinkAction(input: { url: string; slug: string }) {
  try {
    // 1. Validate
    const validated = createLinkSchema.parse(input);

    // 2. Authenticate
    const { userId } = await auth();
    if (!userId) {
      return { error: "Unauthorized" };
    }

    // 3. Database operation via helper
    const link = await createLink({ ...validated, userId });
    return { success: true, data: link };
  } catch (error) {
    return { error: "Failed to create link" };
  }
}
```

## File Colocation

```
app/
  dashboard/
    page.tsx          # Client Component that calls the action
    actions.ts        # Server Actions for this route
```

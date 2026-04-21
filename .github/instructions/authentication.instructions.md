---
description: This file describes the authentication rules and best practices for the project .
---

# Authentication — Clerk v7

## Rules

- **All auth is Clerk.** Never implement custom authentication, session handling, or JWT logic.
- Use `@clerk/nextjs` exclusively. Do not install or use NextAuth, Auth.js, or any other auth library.

## Route Protection

| Route        | Behaviour                                             |
| ------------ | ----------------------------------------------------- |
| `/dashboard` | Protected — redirect unauthenticated users to sign-in |
| `/` (home)   | Redirect authenticated users to `/dashboard`          |

This is enforced in `proxy.ts` (the Next.js middleware file) using Clerk's `clerkMiddleware` and `createRouteMatcher`.

```ts
// proxy.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
const isPublicHome = createRouteMatcher(["/"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Redirect authenticated users away from home
  if (isPublicHome(req) && userId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect /dashboard — Clerk will redirect to sign-in automatically
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
```

## Sign In / Sign Up — Modal Only

Always open Clerk's sign-in and sign-up flows as a **modal**. Never navigate to a dedicated `/sign-in` or `/sign-up` page.

Use Clerk's `useClerk()` hook to open the modal programmatically:

```ts
"use client";
import { useClerk } from "@clerk/nextjs";

const { openSignIn, openSignUp } = useClerk();

// Trigger sign-in modal
openSignIn();

// Trigger sign-up modal
openSignUp();
```

Do **not** render `<SignIn />` or `<SignUp />` as full-page components.

## Reading the Current User

**Server Component / Server Action:**

```ts
import { auth, currentUser } from "@clerk/nextjs/server";

// Lightweight — just the user ID
const { userId } = await auth();

// Full user object (extra network call — use sparingly)
const user = await currentUser();
```

**Client Component:**

```ts
"use client";
import { useAuth, useUser } from "@clerk/nextjs";

const { userId, isSignedIn } = useAuth();
const { user } = useUser();
```

## Layout

`ClerkProvider` must wrap the entire app. It lives in `app/layout.tsx` — do not add it anywhere else.

## Security

- Always scope database queries to the authenticated `userId`. Never trust client-supplied user IDs.
- Call `auth.protect()` (server-side) or check `userId` before any data mutation in Server Actions.

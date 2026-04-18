"use client";

import { useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function HeroCTA() {
  const { openSignUp, openSignIn } = useClerk();

  return (
    <div className="flex flex-wrap gap-3">
      <Button size="lg" onClick={() => openSignUp()}>
        Get started free
      </Button>
      <Button size="lg" variant="outline" onClick={() => openSignIn()}>
        Sign in
      </Button>
    </div>
  );
}

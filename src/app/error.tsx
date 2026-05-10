"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-sm text-muted-foreground">Something broke</p>
      <h1 className="mt-2 font-display text-3xl font-bold">
        We hit an unexpected error
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Our team has been notified. Try again, or head back to the homepage.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button asChild variant="outline">
          <a href="/">Home</a>
        </Button>
      </div>
    </div>
  );
}

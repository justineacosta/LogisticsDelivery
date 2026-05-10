"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trackingSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";

interface Props {
  defaultValue?: string;
  compact?: boolean;
}

export function TrackingForm({ defaultValue = "", compact = false }: Props) {
  const router = useRouter();
  const [value, setValue] = React.useState(defaultValue);
  const [error, setError] = React.useState<string | null>(null);
  const [pending, startTransition] = React.useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = trackingSchema.safeParse({ trackingNumber: value.trim() });
    if (!parsed.success) {
      setError(parsed.error.issues[0]!.message);
      return;
    }
    setError(null);
    startTransition(() => {
      router.push(`/tracking/${parsed.data.trackingNumber}`);
    });
  };

  return (
    <form onSubmit={onSubmit} className={cn("w-full", compact ? "" : "max-w-2xl")}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="VEL-DEMO-1001"
            aria-label="Tracking number"
            aria-invalid={!!error}
            className="h-12 pl-11 text-base"
            autoComplete="off"
          />
        </div>
        <Button
          type="submit"
          variant="glow"
          size="lg"
          disabled={pending}
          className="h-12"
        >
          {pending ? "Searching…" : "Track"}
        </Button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs text-destructive">
          {error}
        </p>
      )}
    </form>
  );
}

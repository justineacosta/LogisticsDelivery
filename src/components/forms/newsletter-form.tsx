"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { newsletterSchema, type NewsletterInput } from "@/lib/validations";

export function NewsletterForm({ source = "footer" }: { source?: string }) {
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "", source },
  });

  const onSubmit = async (data: NewsletterInput) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Subscription failed");
      setStatus("success");
      setMessage("Subscribed. Watch your inbox.");
      reset({ email: "", source });
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Subscription failed");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-300">
        <Check className="h-4 w-4" />
        {message}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="you@company.com"
          aria-label="Email address"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        <Button
          type="submit"
          variant="default"
          size="icon"
          aria-label="Subscribe"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </Button>
      </div>
      {errors.email && (
        <p role="alert" className="text-xs text-destructive">
          {errors.email.message}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-xs text-destructive">
          {message}
        </p>
      )}
    </form>
  );
}

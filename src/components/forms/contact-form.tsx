"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactInput } from "@/lib/validations";

export function ContactForm() {
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to send");
      setStatus("success");
      setMessage("Thanks — we'll respond within 1 business day.");
      reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Failed to send");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-emerald-700 dark:text-emerald-300">
        <Check className="h-5 w-5 shrink-0" />
        <p className="font-medium">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" error={errors.name?.message}>
          <Input id="name" autoComplete="name" {...register("name")} />
        </Field>
        <Field id="email" label="Work email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
          />
        </Field>
        <Field id="phone" label="Phone (optional)" error={errors.phone?.message}>
          <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
        </Field>
        <Field id="company" label="Company (optional)">
          <Input
            id="company"
            autoComplete="organization"
            {...register("company")}
          />
        </Field>
      </div>
      <Field id="subject" label="Subject (optional)">
        <Input id="subject" {...register("subject")} />
      </Field>
      <Field id="message" label="How can we help?" error={errors.message?.message}>
        <Textarea id="message" rows={6} {...register("message")} />
      </Field>

      <Button
        type="submit"
        size="lg"
        variant="glow"
        disabled={status === "loading"}
        className="w-full sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          "Send message"
        )}
      </Button>

      {status === "error" && (
        <p role="alert" className="text-sm text-destructive">
          {message}
        </p>
      )}
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

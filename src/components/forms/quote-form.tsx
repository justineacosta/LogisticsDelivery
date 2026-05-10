"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { quoteSchema, type QuoteInput } from "@/lib/validations";

const SERVICE_OPTIONS = [
  { value: "ROAD", label: "Road freight" },
  { value: "AIR", label: "Air cargo" },
  { value: "OCEAN", label: "Ocean freight" },
  { value: "RAIL", label: "Rail freight" },
  { value: "WAREHOUSING", label: "Warehousing & 3PL" },
  { value: "LAST_MILE", label: "Last-mile delivery" },
  { value: "CUSTOMS", label: "Customs brokerage" },
] as const;

export function QuoteForm() {
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { serviceType: "OCEAN" },
  });

  const onSubmit = async (data: QuoteInput) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Submission failed");
      setStatus("success");
      setMessage(
        `Quote ${json.id} received. Expect a response within 2 business hours.`,
      );
      reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Submission failed");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-emerald-700 dark:text-emerald-300">
        <div className="flex items-center gap-3">
          <Check className="h-6 w-6" />
          <h3 className="font-display text-xl font-semibold">Quote received</h3>
        </div>
        <p className="mt-2 text-sm">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <fieldset className="space-y-5">
        <legend className="font-display text-lg font-semibold">Contact</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="fullName" label="Full name" error={errors.fullName?.message}>
            <Input id="fullName" autoComplete="name" {...register("fullName")} />
          </Field>
          <Field id="email" label="Work email" error={errors.email?.message}>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
            />
          </Field>
          <Field id="phone" label="Phone" error={errors.phone?.message}>
            <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
          </Field>
          <Field id="company" label="Company">
            <Input
              id="company"
              autoComplete="organization"
              {...register("company")}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="font-display text-lg font-semibold">Shipment</legend>

        <Field id="serviceType" label="Service" error={errors.serviceType?.message}>
          <Controller
            control={control}
            name="serviceType"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="serviceType">
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_OPTIONS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="originCity" label="Origin city" error={errors.originCity?.message}>
            <Input id="originCity" {...register("originCity")} />
          </Field>
          <Field
            id="originCountry"
            label="Origin country"
            error={errors.originCountry?.message}
          >
            <Input id="originCountry" {...register("originCountry")} />
          </Field>
          <Field id="destCity" label="Destination city" error={errors.destCity?.message}>
            <Input id="destCity" {...register("destCity")} />
          </Field>
          <Field
            id="destCountry"
            label="Destination country"
            error={errors.destCountry?.message}
          >
            <Input id="destCountry" {...register("destCountry")} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <Field id="weightKg" label="Weight (kg)" error={errors.weightKg?.message}>
            <Input id="weightKg" type="number" step="any" {...register("weightKg")} />
          </Field>
          <Field id="volumeM3" label="Volume (m³)">
            <Input id="volumeM3" type="number" step="any" {...register("volumeM3")} />
          </Field>
          <Field id="pickupDate" label="Pickup date">
            <Input id="pickupDate" type="date" {...register("pickupDate")} />
          </Field>
        </div>

        <Field id="cargoType" label="Cargo type" error={errors.cargoType?.message}>
          <Input
            id="cargoType"
            placeholder="e.g. Apparel, electronics, refrigerated pharma…"
            {...register("cargoType")}
          />
        </Field>

        <Field id="notes" label="Notes (optional)">
          <Textarea
            id="notes"
            rows={4}
            placeholder="Special handling, target transit time, incoterms…"
            {...register("notes")}
          />
        </Field>
      </fieldset>

      <Button
        type="submit"
        size="lg"
        variant="glow"
        disabled={status === "loading"}
        className="w-full sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
          </>
        ) : (
          "Get my quote"
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

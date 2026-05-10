import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(80),
  email: z.string().email("Valid email required"),
  phone: z.string().max(40).optional().or(z.literal("")),
  company: z.string().max(120).optional().or(z.literal("")),
  subject: z.string().max(160).optional().or(z.literal("")),
  message: z.string().min(10, "Tell us a bit more").max(4000),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const serviceTypeSchema = z.enum([
  "ROAD",
  "AIR",
  "OCEAN",
  "RAIL",
  "WAREHOUSING",
  "LAST_MILE",
  "CUSTOMS",
]);

export const quoteSchema = z.object({
  fullName: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().min(5).max(40),
  company: z.string().max(120).optional().or(z.literal("")),
  serviceType: serviceTypeSchema,
  originCity: z.string().min(2).max(80),
  originCountry: z.string().min(2).max(80),
  destCity: z.string().min(2).max(80),
  destCountry: z.string().min(2).max(80),
  weightKg: z.coerce.number().positive().max(1_000_000),
  volumeM3: z.coerce.number().positive().max(100_000).optional(),
  cargoType: z.string().min(2).max(120),
  pickupDate: z.string().optional(),
  notes: z.string().max(2000).optional().or(z.literal("")),
});
export type QuoteInput = z.infer<typeof quoteSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Valid email required"),
  source: z.string().max(80).optional(),
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const trackingSchema = z.object({
  trackingNumber: z
    .string()
    .min(4, "Enter a tracking number")
    .max(64)
    .regex(/^[A-Za-z0-9-]+$/, "Letters, numbers, and dashes only"),
});
export type TrackingInput = z.infer<typeof trackingSchema>;

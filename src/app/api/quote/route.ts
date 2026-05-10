import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/validations";
import { db } from "@/lib/db";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = clientIp(req);
  const rl = rateLimit(`quote:${ip}`, { limit: 6, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests, slow down." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const record = await db.quoteRequest.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      company: data.company || null,
      serviceType: data.serviceType,
      originCity: data.originCity,
      originCountry: data.originCountry,
      destCity: data.destCity,
      destCountry: data.destCountry,
      weightKg: data.weightKg,
      volumeM3: data.volumeM3 ?? null,
      cargoType: data.cargoType,
      pickupDate: data.pickupDate ? new Date(data.pickupDate) : null,
      notes: data.notes || null,
    },
  });

  return NextResponse.json({ ok: true, id: record.id });
}

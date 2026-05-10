import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { newsletterSchema } from "@/lib/validations";
import { db } from "@/lib/db";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = clientIp(req);
  const rl = rateLimit(`newsletter:${ip}`, { limit: 8, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Valid email required" },
      { status: 422 },
    );
  }

  const token = crypto.randomBytes(20).toString("hex");
  const record = await db.newsletterSubscriber.upsert({
    where: { email: parsed.data.email },
    update: { source: parsed.data.source ?? null },
    create: {
      email: parsed.data.email,
      source: parsed.data.source ?? null,
      confirmToken: token,
    },
  });

  return NextResponse.json({ ok: true, id: record.id });
}

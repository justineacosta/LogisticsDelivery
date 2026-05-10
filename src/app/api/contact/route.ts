import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { db } from "@/lib/db";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = clientIp(req);
  const rl = rateLimit(`contact:${ip}`, { limit: 4, windowMs: 60_000 });
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

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { name, email, phone, company, subject, message } = parsed.data;

  const record = await db.contactMessage.create({
    data: {
      name,
      email,
      phone: phone || null,
      company: company || null,
      subject: subject || null,
      message,
      ipAddress: ip,
      source: req.headers.get("referer") ?? undefined,
    },
  });

  // TODO: send transactional email via Resend / SES.

  return NextResponse.json({ ok: true, id: record.id });
}

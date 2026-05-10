import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ number: string }> },
) {
  const { number } = await ctx.params;
  if (!number || !/^[A-Za-z0-9-]+$/.test(number)) {
    return NextResponse.json({ error: "Invalid tracking number" }, { status: 400 });
  }

  const shipment = await db.shipment.findUnique({
    where: { trackingNumber: number.toUpperCase() },
    include: {
      events: { orderBy: { occurredAt: "desc" } },
    },
  });

  if (!shipment) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, shipment });
}

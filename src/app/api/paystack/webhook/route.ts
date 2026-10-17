import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPaystackTransaction } from "@/lib/paystack";
import { markOrderPaid } from "@/lib/paid-order";

export const runtime = "nodejs";
export async function POST(request: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const signature = request.headers.get("x-paystack-signature");
  if (!secret || !signature) return NextResponse.json({ error: "Webhook is not configured." }, { status: 400 });
  const rawBody = await request.text();
  const expected = createHmac("sha512", secret).update(rawBody).digest("hex");
  const a = Buffer.from(signature, "hex"); const b = Buffer.from(expected, "hex");
  if (a.length !== b.length || !timingSafeEqual(a, b)) return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  let event: { event?: string; data?: { reference?: string } };
  try { event = JSON.parse(rawBody); } catch { return NextResponse.json({ error: "Invalid JSON." }, { status: 400 }); }
  if (event.event !== "charge.success" || !event.data?.reference) return NextResponse.json({ received: true });
  try {
    const payment = await verifyPaystackTransaction(event.data.reference);
    if (payment.status !== "success" || payment.reference !== event.data.reference) return NextResponse.json({ received: true, verified: false });
    const orderId = payment.metadata?.orderId;
    if (!orderId) return NextResponse.json({ error: "Missing order reference." }, { status: 400 });
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });
    if (payment.amount !== order.total || payment.currency.toLowerCase() !== order.currency.toLowerCase()) return NextResponse.json({ error: "Payment amount or currency mismatch." }, { status: 400 });
    await markOrderPaid(orderId, payment.reference);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Paystack webhook processing error", error);
    return NextResponse.json({ error: "Webhook processing failed; Paystack can retry this event." }, { status: 500 });
  }
}

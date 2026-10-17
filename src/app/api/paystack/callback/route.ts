import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPaystackTransaction } from "@/lib/paystack";
import { markOrderPaid } from "@/lib/paid-order";

export const runtime = "nodejs";
export async function GET(request: Request) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
  const reference = new URL(request.url).searchParams.get("reference");
  if (!reference) return NextResponse.redirect(new URL("/checkout/success?status=failed", appUrl));
  try {
    const payment = await verifyPaystackTransaction(reference);
    const orderId = payment.metadata?.orderId;
    if (payment.status !== "success" || !orderId) return NextResponse.redirect(new URL("/checkout/success?status=failed", appUrl));
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order || payment.reference !== reference || payment.amount !== order.total || payment.currency.toLowerCase() !== order.currency.toLowerCase()) {
      return NextResponse.redirect(new URL("/checkout/success?status=failed", appUrl));
    }
    await markOrderPaid(order.id, reference);
    return NextResponse.redirect(new URL("/checkout/success?status=success", appUrl));
  } catch (error) {
    console.error("Paystack callback verification error", error);
    return NextResponse.redirect(new URL("/checkout/success?status=pending", appUrl));
  }
}

import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { initializePaystackTransaction } from "@/lib/paystack";

export const runtime = "nodejs";
const schema = z.object({
  email: z.string().trim().email().max(254),
  items: z.array(z.object({ id: z.string().min(1), quantity: z.number().int().min(1).max(99) })).min(1).max(50),
});
export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Your cart or email looks invalid." }, { status: 400 });
    const email = parsed.data.email.toLowerCase();
    const quantities = new Map<string, number>();
    for (const item of parsed.data.items) quantities.set(item.id, Math.min(99, (quantities.get(item.id) || 0) + item.quantity));
    const products = await prisma.product.findMany({ where: { id: { in: [...quantities.keys()] } } });
    if (products.length !== quantities.size) return NextResponse.json({ error: "One or more products are no longer available. Refresh your cart." }, { status: 400 });
    for (const product of products) if (product.stock < (quantities.get(product.id) || 0)) return NextResponse.json({ error: `Not enough stock for ${product.name}.` }, { status: 400 });
    const session = await getSession();
    const total = products.reduce((sum, product) => sum + product.price * (quantities.get(product.id) || 0), 0);
    const order = await prisma.order.create({
      data: { userId: session.user?.id, email, total, currency: (process.env.PAYSTACK_CURRENCY || "USD").toLowerCase(), items: { create: products.map(product => ({ productId: product.id, name: product.name, image: product.image, price: product.price, quantity: quantities.get(product.id) || 1 })) } },
    });
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const reference = `volt-${order.id}-${randomBytes(5).toString("hex")}`;
    const transaction = await initializePaystackTransaction({ email, amount: total, reference, orderId: order.id, callbackUrl: `${appUrl}/api/paystack/callback` });
    await prisma.order.update({ where: { id: order.id }, data: { paymentReference: transaction.reference } });
    return NextResponse.json({ url: transaction.authorizationUrl });
  } catch (error) {
    console.error("Checkout creation error", error);
    return NextResponse.json({ error: "Could not start checkout. Check your Paystack test key and currency settings, then try again." }, { status: 500 });
  }
}

import { prisma } from "@/lib/prisma";
import { sendOrderConfirmation } from "@/lib/email";

export async function markOrderPaid(orderId: string, reference: string) {
  const order = await prisma.order.findUnique({ where: { id: orderId }, include: { items: true } });
  if (!order) throw new Error("Order not found.");
  if (order.paymentReference && order.paymentReference !== reference) throw new Error("Payment reference does not match this order.");
  const updated = await prisma.order.updateMany({
    where: { id: orderId, status: "PENDING" },
    data: { status: "PAID", paymentReference: reference, paymentProvider: "paystack" },
  });
  if (updated.count === 1) {
    try {
      await sendOrderConfirmation({ email: order.email, orderId: order.id, total: order.total, items: order.items.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })) });
    } catch (error) {
      console.error("Order paid but confirmation email failed", error);
    }
  }
  return { order, alreadyPaid: updated.count === 0 };
}

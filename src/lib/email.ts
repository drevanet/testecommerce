import { Resend } from "resend";
import { money } from "@/lib/money";

export async function sendOrderConfirmation(input: {
  email: string; orderId: string; total: number;
  items: { name: string; quantity: number; price: number }[];
}) {
  const { RESEND_API_KEY, EMAIL_FROM } = process.env;
  if (!RESEND_API_KEY || !EMAIL_FROM) {
    console.warn("Email not sent: configure RESEND_API_KEY and EMAIL_FROM.");
    return;
  }

  const resend = new Resend(RESEND_API_KEY);
  const itemRows = input.items.map((item) =>
    `<tr><td style="padding:12px;border-bottom:1px solid #eee">${escapeHtml(item.name)} × ${item.quantity}</td><td style="padding:12px;text-align:right;border-bottom:1px solid #eee">${money(item.price * item.quantity)}</td></tr>`
  ).join("");
  const { error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: input.email,
    subject: `Your Volt order ${input.orderId.slice(-8).toUpperCase()} is confirmed`,
    html: `<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#111827"><div style="background:#111827;padding:28px;color:white;font-size:24px;font-weight:bold">VOLT<span style="color:#a3e635">.</span></div><div style="padding:28px"><h1>Order confirmed. Good choice.</h1><p>Thanks for shopping with Volt. Your payment was successful and your order is being prepared.</p><p><strong>Order:</strong> ${escapeHtml(input.orderId)}</p><table style="width:100%;border-collapse:collapse">${itemRows}<tr><td style="padding:16px;font-weight:bold">Total paid</td><td style="padding:16px;text-align:right;font-weight:bold">${money(input.total)}</td></tr></table><p style="margin-top:24px;color:#6b7280">This is a demo-store order confirmation.</p></div></div>`,
  });
  if (error) {
    console.error("Resend order confirmation failed:", error);
    throw new Error("Unable to send order confirmation email.");
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char] || char);
}

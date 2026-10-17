const API = "https://api.paystack.co";

export async function initializePaystackTransaction(input: {
  email: string; amount: number; reference: string; orderId: string; callbackUrl: string;
}) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) throw new Error("PAYSTACK_SECRET_KEY is not configured.");
  const response = await fetch(`${API}/transaction/initialize`, {
    method: "POST", cache: "no-store",
    headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email: input.email, amount: String(input.amount), currency: process.env.PAYSTACK_CURRENCY || "USD",
      reference: input.reference, callback_url: input.callbackUrl,
      metadata: { orderId: input.orderId, store: "Volt Gadgets" },
    }),
  });
  const result = await response.json();
  if (!response.ok || !result.status || !result.data?.authorization_url) {
    throw new Error(result.message || "Paystack could not initialize this transaction.");
  }
  return { authorizationUrl: result.data.authorization_url as string, reference: result.data.reference as string };
}

export async function verifyPaystackTransaction(reference: string) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) throw new Error("PAYSTACK_SECRET_KEY is not configured.");
  const response = await fetch(`${API}/transaction/verify/${encodeURIComponent(reference)}`, {
    method: "GET", cache: "no-store", headers: { Authorization: `Bearer ${secret}` },
  });
  const result = await response.json();
  if (!response.ok || !result.status || !result.data) throw new Error(result.message || "Could not verify Paystack transaction.");
  return result.data as { status: string; reference: string; amount: number; currency: string; metadata?: { orderId?: string }; customer?: { email?: string } };
}

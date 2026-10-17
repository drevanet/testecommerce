"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LockKeyhole, ArrowLeft, CreditCard } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { money } from "@/lib/money";

export default function CheckoutPage() {
  const { items, subtotal, ready } = useCart();
  const [email,setEmail] = useState("");
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState("");
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!items.length) return;
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/checkout", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ email, items:items.map(({id,quantity})=>({id,quantity})) }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not start checkout.");
      if (data.url) window.location.assign(data.url);
      else throw new Error("Paystack did not return a checkout URL.");
    } catch (e) { setError(e instanceof Error ? e.message : "Something went wrong."); setBusy(false); }
  }
  if (!ready) return <div className="mx-auto max-w-5xl px-4 py-20">Loading checkout…</div>;
  if (!items.length) return <div className="mx-auto max-w-2xl px-4 py-24 text-center"><h1 className="text-3xl font-semibold">Your bag is empty.</h1><Link href="/shop" className="mt-6 inline-block underline">Find something good</Link></div>;
  return <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8"><Link href="/cart" className="inline-flex items-center gap-2 text-sm text-slate-500"><ArrowLeft size={15}/> Back to bag</Link><div className="mt-7 grid gap-10 md:grid-cols-[1fr_340px]"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-slate-500">Almost yours</p><h1 className="mt-3 text-4xl font-semibold tracking-[-.06em]">Checkout.</h1><p className="mt-3 text-sm leading-6 text-slate-500">Enter your email for your order confirmation, then complete payment securely with Paystack.</p><form onSubmit={submit} className="mt-8 rounded-3xl border border-slate-200 p-6 sm:p-8"><label htmlFor="email" className="text-sm font-semibold">Email address</label><input id="email" type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-100"/><p className="mt-2 text-xs text-slate-500">We'll send your receipt and order confirmation here.</p><div className="mt-7 flex items-center gap-3 rounded-xl bg-slate-50 p-4"><LockKeyhole size={18}/><div><p className="text-sm font-semibold">Secure payment powered by Paystack</p><p className="mt-1 text-xs text-slate-500">Payment details are entered on Paystack's secure checkout page.</p></div></div>{error&&<p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button disabled={busy} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-lime-300 px-5 py-4 text-sm font-bold text-slate-950 transition hover:bg-lime-200 disabled:cursor-wait disabled:opacity-60"><CreditCard size={17}/>{busy?"Redirecting to Paystack…":`Pay ${money(subtotal)}`} </button><p className="mt-4 text-center text-[11px] leading-5 text-slate-400">Demo store: use your Paystack test-mode payment methods and test credentials.</p></form></div><aside className="h-fit rounded-3xl bg-slate-50 p-6"><h2 className="font-semibold">Your order</h2><div className="mt-5 space-y-4">{items.map(item=><div key={item.id} className="flex gap-3"><div className="relative"><Image src={item.image} alt={item.name} width={66} height={66} className="h-16 w-16 rounded-xl object-cover"/><span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-slate-700 px-1 text-[10px] font-bold text-white">{item.quantity}</span></div><div className="min-w-0 flex-1"><p className="text-sm font-medium">{item.name}</p><p className="mt-1 text-xs text-slate-500">{money(item.price)} each</p></div><p className="text-sm font-semibold">{money(item.price*item.quantity)}</p></div>)}</div><div className="mt-6 space-y-3 border-t border-slate-200 pt-5 text-sm"><div className="flex justify-between"><span className="text-slate-500">Subtotal</span><span>{money(subtotal)}</span></div><div className="flex justify-between"><span className="text-slate-500">Shipping</span><span>{subtotal>=7500?"Free":"At checkout"}</span></div><div className="flex justify-between border-t border-slate-200 pt-4 text-base font-bold"><span>Total before tax</span><span>{money(subtotal)}</span></div></div></aside></div></div>;
}

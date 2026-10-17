"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, PackageCheck } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CheckoutSuccessPage() {
  const { clear } = useCart();
  const [status,setStatus] = useState("pending");
  const [checking,setChecking] = useState(true);
  const didClear = useRef(false);
  useEffect(()=>{
    const nextStatus = new URLSearchParams(window.location.search).get("status") || "pending";
    setStatus(nextStatus);
    if (nextStatus === "success" && !didClear.current) { didClear.current = true; clear(); }
    setChecking(false);
  },[clear]);
  return <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center"><span className="grid h-20 w-20 place-items-center rounded-full bg-lime-100 text-lime-700"><CheckCircle2 size={42}/></span><p className="mt-7 text-xs font-bold uppercase tracking-[.2em] text-slate-500">{status === "success" ? "Payment confirmed" : status === "failed" ? "Payment not confirmed" : "Checking payment"}</p><h1 className="mt-3 text-4xl font-semibold tracking-[-.06em]">That's a good choice.</h1><p className="mt-4 max-w-lg text-sm leading-6 text-slate-500">{status === "success" ? "Paystack verified your payment. Your order confirmation email will be sent to the address provided at checkout." : status === "failed" ? "We could not verify a successful payment. Your order has not been marked paid; you can return to your bag and try again." : "Your payment is still being verified. If you completed payment, wait a moment before trying again."}</p><div className="mt-7 flex items-center gap-2 rounded-2xl bg-slate-50 px-5 py-4 text-left text-sm"><PackageCheck size={20}/><span>{checking?"Checking your order…":status === "success" ? "Your order is confirmed." : status === "failed" ? "No successful payment was verified." : "Payment verification is pending."}</span></div><Link href="/shop" className="mt-7 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white">Back to the good stuff</Link></div>;
}

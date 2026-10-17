"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [busy,setBusy] = useState(false);
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      const response = await fetch(`/api/auth/${mode}`, { method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,password}) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to continue.");
      router.push("/account"); router.refresh();
    } catch(e) { setError(e instanceof Error ? e.message : "Something went wrong."); setBusy(false); }
  }
  return <form onSubmit={submit} className="space-y-4">
    {mode==="signup"&&<div><label htmlFor="name" className="text-sm font-semibold">Full name</label><input id="name" required autoComplete="name" value={name} onChange={e=>setName(e.target.value)} minLength={2} maxLength={80} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-100" placeholder="Alex Morgan"/></div>}
    <div><label htmlFor="email" className="text-sm font-semibold">Email address</label><input id="email" type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} maxLength={254} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-100" placeholder="you@example.com"/></div>
    <div><label htmlFor="password" className="text-sm font-semibold">Password</label><input id="password" type="password" required autoComplete={mode==="signup"?"new-password":"current-password"} value={password} onChange={e=>setPassword(e.target.value)} minLength={mode==="signup"?8:1} maxLength={128} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-100" placeholder={mode==="signup"?"At least 8 characters":"Your password"}/>{mode==="signup"&&<p className="mt-2 text-xs text-slate-400">Use at least 8 characters.</p>}</div>
    {error&&<p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    <button disabled={busy} className="w-full rounded-full bg-slate-950 px-5 py-4 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-60">{busy?"One moment…":mode==="signup"?"Create account":"Sign in"}</button>
    <p className="text-center text-xs leading-5 text-slate-400">By continuing, you agree to the store's demo terms and privacy policy.</p>
  </form>;
}

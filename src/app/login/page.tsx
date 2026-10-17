import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { AuthForm } from "@/components/auth-form";

export default async function LoginPage() {
  const session = await getSession();
  if (session.user) redirect("/account");
  return <div className="mx-auto grid min-h-[65vh] max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:px-8"><div className="hidden rounded-[2rem] bg-slate-950 p-12 text-white md:block"><p className="text-xs font-bold uppercase tracking-[.2em] text-lime-300">Welcome back to better</p><h1 className="mt-5 text-5xl font-semibold leading-tight tracking-[-.06em]">Your good<br/>taste has a<br/><span className="text-lime-300">home.</span></h1><p className="mt-6 max-w-sm text-sm leading-6 text-slate-400">Sign in to pick up where you left off and keep all your favourite upgrades in one place.</p></div><div className="mx-auto w-full max-w-md"><p className="text-xs font-bold uppercase tracking-[.2em] text-slate-500">Your Volt account</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">Welcome back.</h2><p className="mt-2 text-sm text-slate-500">New here? <Link href="/signup" className="font-semibold text-slate-950 underline underline-offset-4">Create an account</Link></p><div className="mt-7"><AuthForm mode="login"/></div></div></div>;
}

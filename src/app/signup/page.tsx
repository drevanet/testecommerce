import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { AuthForm } from "@/components/auth-form";

export default async function SignupPage() {
  const session = await getSession();
  if (session.user) redirect("/account");
  return <div className="mx-auto grid min-h-[65vh] max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:px-8"><div className="hidden rounded-[2rem] bg-lime-300 p-12 md:block"><p className="text-xs font-bold uppercase tracking-[.2em]">Your next chapter</p><h1 className="mt-5 text-5xl font-semibold leading-tight tracking-[-.06em]">A smarter<br/>setup starts<br/>right <span className="underline decoration-2 underline-offset-8">here.</span></h1><p className="mt-6 max-w-sm text-sm leading-6 text-slate-800/75">Create your account for a smoother way to shop the gear you'll love using every day.</p></div><div className="mx-auto w-full max-w-md"><p className="text-xs font-bold uppercase tracking-[.2em] text-slate-500">Join the good side</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">Create your account.</h2><p className="mt-2 text-sm text-slate-500">Already have an account? <Link href="/login" className="font-semibold text-slate-950 underline underline-offset-4">Sign in</Link></p><div className="mt-7"><AuthForm mode="signup"/></div></div></div>;
}

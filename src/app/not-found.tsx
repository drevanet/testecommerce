import Link from "next/link";
export default function NotFound() {
  return <div className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center px-4 text-center"><p className="text-xs font-bold uppercase tracking-[.2em] text-slate-500">404 / off the grid</p><h1 className="mt-4 text-4xl font-semibold tracking-tight">That page took a wrong turn.</h1><p className="mt-3 text-sm text-slate-500">Let's get you back to the good stuff.</p><Link href="/shop" className="mt-6 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white">Explore the shop</Link></div>;
}

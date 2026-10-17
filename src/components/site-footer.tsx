import Link from "next/link";
import { Zap } from "lucide-react";

export function SiteFooter() {
  return <footer className="mt-20 bg-slate-950 text-white">
    <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
      <div className="lg:col-span-2"><Link href="/" className="inline-flex items-center gap-2 text-2xl font-black tracking-[-.08em]"><Zap className="text-lime-300" fill="currentColor" />VOLT<span className="-ml-2 text-lime-300">.</span></Link><p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">Good tech should feel effortless. Discover thoughtfully chosen gadgets that make every day a little smarter.</p><p className="mt-7 text-xs text-slate-500">© {new Date().getFullYear()} Volt Gadgets. All circuits connected.</p></div>
      <div><p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-lime-300">Explore</p><div className="grid gap-3 text-sm text-slate-300"><Link href="/shop">Shop all</Link><Link href="/categories">Categories</Link><Link href="/shop?sort=popular">Best sellers</Link><Link href="/account">My account</Link></div></div>
      <div><p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-lime-300">Here to help</p><div className="grid gap-3 text-sm text-slate-300"><Link href="/#faq">FAQs</Link><Link href="/cart">Shipping & returns</Link><a href="mailto:hello@volt.example">Contact support</a><p className="text-xs text-slate-500">Demo storefront • Paystack test mode</p></div></div>
    </div>
  </footer>;
}

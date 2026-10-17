"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, Search, ShoppingBag, UserRound, X, Zap } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function SiteHeader({ user }: { user?: { name: string; email: string } | null }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();
  const links = [{ href: "/shop", label: "Shop all" }, { href: "/categories", label: "Categories" }, { href: "/shop?sort=popular", label: "Best sellers" }, { href: "/#why-volt", label: "Our story" }];
  return <>
    <div className="bg-slate-950 px-4 py-2 text-center text-[11px] font-medium tracking-[.13em] text-white sm:text-xs">
      FREE SHIPPING ON ORDERS OVER $75 <span className="mx-2 text-lime-300">✳</span> 30-DAY EASY RETURNS
    </div>
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button className="mr-3 md:hidden" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-[-.08em]"><span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-lime-300"><Zap size={20} fill="currentColor" /></span>VOLT<span className="-ml-2 text-lime-500">.</span></Link>
        <nav className="hidden items-center gap-8 md:flex">{links.map(link => <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-600 transition hover:text-slate-950">{link.label}</Link>)}</nav>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/shop" className="hidden rounded-full p-2 text-slate-700 hover:bg-slate-100 sm:block" aria-label="Search products"><Search size={19} /></Link>
          <Link href={user ? "/account" : "/login"} className="rounded-full p-2 text-slate-700 hover:bg-slate-100" aria-label={user ? "Your account" : "Log in"}><UserRound size={19} /></Link>
          <Link href="/cart" className="relative rounded-full p-2 text-slate-700 hover:bg-slate-100" aria-label={`Shopping bag with ${count} items`}><ShoppingBag size={20} />{count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-lime-300 px-1 text-[10px] font-bold text-slate-950">{count}</span>}</Link>
        </div>
      </div>
      {menuOpen && <nav className="grid gap-1 border-t border-slate-100 bg-white p-4 md:hidden">{links.map(link => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 font-medium hover:bg-slate-50">{link.label}</Link>)}</nav>}
    </header>
  </>;
}

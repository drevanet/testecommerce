import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";
import { fallbackProducts, categories } from "@/lib/products";
import Link from "next/link";
import { Search } from "lucide-react";

export const metadata: Metadata = { title: "Shop all gadgets" };
export default async function ShopPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string; sort?: string }> }) {
  const params = await searchParams;
  const q = params.q?.trim() || "";
  const where = {
    ...(q ? { OR: [{ name: { contains: q } }, { description: { contains: q } }, { category: { contains: q } }] } : {}),
    ...(params.category ? { category: { equals: categories.find(c => c.slug === params.category)?.name || params.category } } : {})
  };
  const orderBy = params.sort === "price-low" ? { price: "asc" as const } : params.sort === "price-high" ? { price: "desc" as const } : params.sort === "popular" ? { rating: "desc" as const } : { featured: "desc" as const };
  let products = await prisma.product.findMany({ where, orderBy }).catch(() => []);
  if (!products.length && !q && !params.category) products = fallbackProducts;
  return <div className="mx-auto min-h-[60vh] max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <div className="rounded-[2rem] bg-slate-950 px-6 py-10 text-white sm:px-10 sm:py-14"><p className="text-xs font-bold uppercase tracking-[.2em] text-lime-300">The full collection</p><h1 className="mt-3 text-4xl font-semibold tracking-[-.06em] sm:text-5xl">Find your next favourite.</h1><p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">Sixty good reasons to love your setup. Browse smart everyday essentials, thoughtful upgrades, and tech that just gets you.</p></div>
    <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap gap-2"><Link href="/shop" className={`rounded-full px-4 py-2 text-xs font-semibold ${!params.category ? "bg-slate-950 text-white" : "bg-slate-100 hover:bg-slate-200"}`}>All products</Link>{categories.map(c=><Link key={c.slug} href={`/shop?category=${c.slug}`} className={`rounded-full px-4 py-2 text-xs font-semibold ${params.category===c.slug ? "bg-slate-950 text-white" : "bg-slate-100 hover:bg-slate-200"}`}>{c.name}</Link>)}</div>
      <form action="/shop" className="flex gap-2"><div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5"><Search size={16} className="text-slate-400"/><input name="q" defaultValue={q} placeholder="Search gadgets..." className="w-full bg-transparent text-sm outline-none" /></div><select name="sort" defaultValue={params.sort || "featured"} className="rounded-full border border-slate-200 bg-white px-3 text-xs font-medium outline-none"><option value="featured">Featured</option><option value="popular">Top rated</option><option value="price-low">Price: low-high</option><option value="price-high">Price: high-low</option></select><button className="rounded-full bg-lime-300 px-4 text-sm font-bold">Go</button></form>
    </div>
    <div className="mb-6 mt-8 flex items-center justify-between"><p className="text-sm text-slate-500">{products.length} products {q ? `for “${q}”` : ""}</p><p className="text-xs text-slate-400">Thoughtfully chosen. Ready for you.</p></div>
    {products.length ? <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">{products.map(product=><ProductCard key={product.id} product={product as any}/>)}</div> : <div className="rounded-3xl border border-dashed border-slate-300 py-20 text-center"><p className="text-lg font-semibold">No gadgets found</p><p className="mt-2 text-sm text-slate-500">Try another search or browse all products.</p><Link href="/shop" className="mt-5 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Clear filters</Link></div>}
  </div>;
}

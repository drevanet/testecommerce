import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { categories, fallbackProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find(c=>c.slug===slug);
  if (!category) notFound();
  let products = await prisma.product.findMany({ where:{ category:category.name }, orderBy:{ featured:"desc" } }).catch(()=>[]);
  if (!products.length && category.name==="Audio") products = fallbackProducts;
  return <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><Link href="/categories" className="text-sm text-slate-500 hover:text-slate-900">← All categories</Link><p className="mt-8 text-xs font-bold uppercase tracking-[.2em] text-slate-500">Category spotlight</p><h1 className="mt-3 text-4xl font-semibold tracking-[-.06em]">{category.name}</h1><p className="mt-3 text-slate-500">{category.description}</p><div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">{products.map(p=><ProductCard key={p.id} product={p as any}/>)}</div>{!products.length&&<p className="py-14 text-slate-500">Products are being curated. Check back soon.</p>}</div>;
}

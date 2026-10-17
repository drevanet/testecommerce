import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { fallbackProducts } from "@/lib/products";
import { money } from "@/lib/money";
import { AddToCartButton } from "@/components/add-to-cart";
import { ProductCard } from "@/components/product-card";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let product = await prisma.product.findUnique({ where:{slug} }).catch(()=>null);
  if (!product && slug===fallbackProducts[0].slug) product = fallbackProducts[0] as any;
  if (!product) notFound();
  const related = await prisma.product.findMany({ where:{category:product.category,slug:{not:product.slug}},take:4 }).catch(()=>[]);
  return <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><Link href="/shop" className="text-sm text-slate-500">← Back to shop</Link><div className="mt-7 grid gap-10 md:grid-cols-2 md:gap-16"><div className="overflow-hidden rounded-3xl bg-slate-100"><Image src={product.image} alt={product.name} width={1000} height={1000} priority className="aspect-square w-full object-cover"/></div><div className="flex flex-col justify-center"><p className="text-xs font-bold uppercase tracking-[.2em] text-slate-500">{product.category}</p><h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-.06em] sm:text-5xl">{product.name}</h1><div className="mt-4 flex items-center gap-2 text-sm"><span className="flex items-center gap-1 text-amber-500"><Star size={15} fill="currentColor"/> {product.rating.toFixed(1)}</span><span className="text-slate-400">·</span><span className="text-slate-500">Customer favourite</span></div><div className="mt-6 flex items-center gap-3"><span className="text-2xl font-bold">{money(product.price)}</span>{product.compareAt&&<span className="text-lg text-slate-400 line-through">{money(product.compareAt)}</span>}{product.badge&&<span className="rounded-full bg-lime-100 px-3 py-1 text-[10px] font-bold tracking-wider">{product.badge}</span>}</div><p className="mt-6 max-w-xl leading-7 text-slate-600">{product.description}</p><div className="mt-8 max-w-sm"><AddToCartButton product={{id:product.id,slug:product.slug,name:product.name,price:product.price,image:product.image}}/></div><div className="mt-8 grid gap-4 border-t border-slate-200 pt-6 text-sm text-slate-600"><p className="flex items-center gap-3"><Truck size={18}/> Free shipping on orders over $75</p><p className="flex items-center gap-3"><RotateCcw size={18}/> 30-day easy returns (demo policy)</p><p className="flex items-center gap-3"><ShieldCheck size={18}/> Secure Paystack checkout</p></div><p className="mt-6 text-xs text-slate-400">{product.stock>0?"In stock and ready to go":"Currently unavailable"}</p></div></div>{related.length>0&&<section className="mt-20"><h2 className="text-2xl font-semibold tracking-tight">More from {product.category}</h2><div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">{related.map(p=><ProductCard key={p.id} product={p as any}/>)}</div></section>}</div>;
}

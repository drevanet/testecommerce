import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/products";
import { prisma } from "@/lib/prisma";

const photos: Record<string,string> = {
  audio:"photo-1505740420928-5e560c06d30e", wearables:"photo-1523275335684-37898b6baf30",
  mobile:"photo-1511707171634-5f897ff02aa9", computing:"photo-1496181133206-80ce9b88a853",
  gaming:"photo-1593305841991-05c297ba4575", "home-tech":"photo-1558089687-f282ffcbc126"
};
export default async function CategoriesPage() {
  const counts = await prisma.product.groupBy({ by:["category"], _count:{_all:true} }).catch(() => []);
  return <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><p className="text-xs font-bold uppercase tracking-[.2em] text-slate-500">Explore your interests</p><h1 className="mt-3 text-4xl font-semibold tracking-[-.06em] sm:text-5xl">Shop by category.</h1><p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">A place for every passion, every setup, and every everyday upgrade.</p><div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{categories.map(c=><Link href={`/categories/${c.slug}`} key={c.slug} className="group relative overflow-hidden rounded-3xl bg-slate-100"><Image src={`https://images.unsplash.com/${photos[c.slug]}?auto=format&fit=crop&w=1000&q=85`} alt={c.name} width={700} height={650} className="aspect-[1.25/1] w-full object-cover transition duration-500 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent"/><div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white"><div><h2 className="text-2xl font-semibold tracking-tight">{c.name}</h2><p className="mt-1 text-sm text-white/75">{c.description}</p><p className="mt-3 text-xs text-white/70">{counts.find(x=>x.category===c.name)?._count._all ?? 10} products to explore</p></div><span className="grid h-11 w-11 place-items-center rounded-full bg-lime-300 text-slate-950"><ArrowUpRight size={20}/></span></div></Link>)}</div></div>;
}

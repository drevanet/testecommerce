import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { ProductView } from "@/lib/products";
import { money } from "@/lib/money";
import { AddToCartButton } from "@/components/add-to-cart";

export function ProductCard({ product }: { product: ProductView }) {
  return <article className="group min-w-0">
    <div className="product-image relative mb-4 overflow-hidden rounded-2xl bg-slate-100">
      <Link href={`/products/${product.slug}`} className="block">
        <Image src={product.image} alt={product.name} width={700} height={700} className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105" />
      </Link>
      {product.badge && <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold tracking-[.14em] text-slate-900">{product.badge}</span>}
      <div className="absolute bottom-3 right-3"><AddToCartButton compact product={{ id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image }} /></div>
    </div>
    <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
      <span>{product.category}</span><span className="inline-flex items-center gap-1"><Star size={12} fill="currentColor" className="text-amber-500" /> {product.rating.toFixed(1)}</span>
    </div>
    <Link href={`/products/${product.slug}`} className="mt-2 block font-semibold tracking-tight text-slate-900 hover:text-slate-600">{product.name}</Link>
    <div className="mt-2 flex items-center gap-2">
      <span className="font-bold">{money(product.price)}</span>
      {product.compareAt && <span className="text-sm text-slate-400 line-through">{money(product.compareAt)}</span>}
    </div>
  </article>;
}

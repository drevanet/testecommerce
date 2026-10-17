"use client";
import { useState } from "react";
import { Check, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function AddToCartButton({ product, compact = false }: {
  product: { id: string; slug: string; name: string; price: number; image: string };
  compact?: boolean;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  return <button
    onClick={() => { addItem(product); setAdded(true); window.setTimeout(() => setAdded(false), 1300); }}
    className={compact
      ? "grid h-10 w-10 place-items-center rounded-full bg-lime-300 text-slate-950 transition hover:bg-lime-200"
      : "inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"}
    aria-label={`Add ${product.name} to cart`}
  >
    {added ? <Check size={17} /> : compact ? <Plus size={18} /> : <><ShoppingBag size={17} /> Add to cart</>}
    {!compact && added ? "Added to bag" : null}
  </button>;
}

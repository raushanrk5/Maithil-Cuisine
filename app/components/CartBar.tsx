"use client";

import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function CartBar() {
  const { itemCount, total } = useCart();
  const router = useRouter();

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <button
        onClick={() => router.push("/checkout")}
        className="w-full max-w-2xl mx-auto flex items-center justify-between bg-brand-crimson text-white px-5 py-4 rounded-2xl shadow-2xl hover:bg-brand-crimson-light transition-colors"
      >
        <span className="bg-white/20 rounded-xl px-3 py-1 text-sm font-bold tabular-nums">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
        <span className="font-bold text-base">Proceed to Checkout →</span>
        <span className="font-bold text-base tabular-nums">₹{total}</span>
      </button>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";

export default function CheckoutPage() {
  const { items, total, itemCount, clear } = useCart();
  const router = useRouter();

  const [name, setName] = useState(() => typeof window !== "undefined" ? localStorage.getItem("checkout_name") ?? "" : "");
  const [phone, setPhone] = useState(() => typeof window !== "undefined" ? localStorage.getItem("checkout_phone") ?? "" : "");
  const [address, setAddress] = useState(() => typeof window !== "undefined" ? localStorage.getItem("checkout_address") ?? "" : "");
  const [lookingUp, setLookingUp] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [error, setError] = useState("");

  // Redirect to menu if cart is empty (but not after placing order)
  useEffect(() => {
    if (itemCount === 0 && !placed) router.replace("/menu");
  }, [itemCount, placed, router]);

  // Auto-lookup customer by phone
  useEffect(() => {
    if (phone.length !== 10) {
      setIsReturning(false);
      return;
    }
    setLookingUp(true);
    fetch(`/api/lookup-customer?phone=${phone}`)
      .then((r) => r.json())
      .then(({ customer }) => {
        if (customer) {
          setName(customer.name);
          setAddress(customer.address);
          setIsReturning(true);
        } else {
          setIsReturning(false);
        }
      })
      .finally(() => setLookingUp(false));
  }, [phone]);

  async function handleOrder(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!name || !phone || !address) return;

    setPlacing(true);
    setError("");

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, address, items, total }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setPlaced(true);
      clear();
      localStorage.removeItem("checkout_name");
      localStorage.removeItem("checkout_phone");
      localStorage.removeItem("checkout_address");
      router.push(`/order-success?id=${data.orderId}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setPlacing(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-brand-cream pt-28 pb-16 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1.5 text-brand-navy/50 hover:text-brand-crimson text-sm font-medium transition-colors mb-4"
            >
              ← Back to Menu
            </button>
            <h1 className="text-brand-navy text-3xl font-bold mb-1">Checkout</h1>
            <p className="text-brand-navy/50 text-sm">Review your order and enter delivery details</p>
          </div>

          <div className="grid grid-cols-1 gap-6">

            {/* Order Summary */}
            <div className="bg-white rounded-2xl border border-brand-cream-dark shadow-sm overflow-hidden">
              <div className="bg-brand-navy px-5 py-4">
                <h2 className="text-brand-gold font-bold text-base">Your Order</h2>
              </div>
              <div className="divide-y divide-brand-cream-dark">
                {items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between px-5 py-3">
                    <div>
                      <p className="text-brand-navy font-medium text-sm">{item.name}</p>
                      <p className="text-brand-navy/40 text-xs">₹{item.price} × {item.quantity}</p>
                    </div>
                    <span className="text-brand-crimson font-bold text-sm">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between px-5 py-4 bg-brand-navy/5 border-t border-brand-cream-dark">
                <span className="text-brand-navy font-bold">Total</span>
                <span className="text-brand-crimson font-black text-xl">₹{total}</span>
              </div>
            </div>

            {/* Delivery Form */}
            <form onSubmit={handleOrder} className="bg-white rounded-2xl border border-brand-cream-dark shadow-sm overflow-hidden">
              <div className="bg-brand-navy px-5 py-4">
                <h2 className="text-brand-gold font-bold text-base">Delivery Details</h2>
              </div>
              <div className="p-5 flex flex-col gap-4">

                {/* Phone */}
                <div>
                  <label className="text-brand-navy text-sm font-semibold mb-1.5 block">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => { const v = e.target.value.replace(/\D/g, "").slice(0, 10); setPhone(v); localStorage.setItem("checkout_phone", v); }}
                      placeholder="10-digit mobile number"
                      required
                      className="w-full border border-brand-cream-dark rounded-xl px-4 py-3 text-brand-navy text-sm focus:outline-none focus:border-brand-gold placeholder:text-brand-navy/30"
                    />
                    {lookingUp && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-brand-navy/40">
                        Looking up...
                      </span>
                    )}
                    {isReturning && !lookingUp && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-600 font-medium">
                        ✓ Welcome back!
                      </span>
                    )}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="text-brand-navy text-sm font-semibold mb-1.5 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); localStorage.setItem("checkout_name", e.target.value); }}
                    placeholder="Your name"
                    required
                    className="w-full border border-brand-cream-dark rounded-xl px-4 py-3 text-brand-navy text-sm focus:outline-none focus:border-brand-gold placeholder:text-brand-navy/30"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="text-brand-navy text-sm font-semibold mb-1.5 block">
                    Delivery Address
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => { setAddress(e.target.value); localStorage.setItem("checkout_address", e.target.value); }}
                    placeholder="House no., street, landmark..."
                    required
                    rows={3}
                    className="w-full border border-brand-cream-dark rounded-xl px-4 py-3 text-brand-navy text-sm focus:outline-none focus:border-brand-gold placeholder:text-brand-navy/30 resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={placing || !name || !phone || !address}
                  className="w-full bg-brand-crimson text-white py-4 rounded-xl font-bold text-base hover:bg-brand-crimson-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {placing ? "Placing Order..." : `Place Order · ₹${total}`}
                </button>

                <p className="text-center text-brand-navy/40 text-xs">
                  We will call you to confirm your order
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { vegMenu, nonVegMenu } from "../data/menu";
import type { Availability } from "../api/availability/route";
import type { StaffOrder } from "./page";

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ago`;
}

const allCategories = [
  ...new Set([
    ...vegMenu.map((c) => c.name),
    ...nonVegMenu.map((c) => c.name),
  ]),
];

const allMenus = [...vegMenu, ...nonVegMenu];

// Items present in vegMenu are veg; items only in nonVegMenu are non-veg
const vegItemNames = new Set(vegMenu.flatMap((c) => c.items.map((i) => i.name)));

export default function StaffClient({
  orders,
  availability: initial,
}: {
  orders: StaffOrder[];
  availability: Availability;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"orders" | "menu">("orders");
  const [availability, setAvailability] = useState<Availability>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  async function handleLogout() {
    await fetch("/api/staff-logout", { method: "POST" });
    router.push("/staff/login");
  }

  async function save(next: Availability) {
    setSaving(true);
    setSaved(false);
    setSaveError(false);
    setAvailability(next);
    const res = await fetch("/api/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } else {
      setSaveError(true);
      setTimeout(() => setSaveError(false), 3000);
    }
  }

  function toggleCategory(name: string) {
    const isOff = availability.disabled_categories.includes(name);
    save({
      ...availability,
      disabled_categories: isOff
        ? availability.disabled_categories.filter((c) => c !== name)
        : [...availability.disabled_categories, name],
    });
  }

  function toggleItem(name: string) {
    const isOff = availability.disabled_items.includes(name);
    save({
      ...availability,
      disabled_items: isOff
        ? availability.disabled_items.filter((i) => i !== name)
        : [...availability.disabled_items, name],
    });
  }

  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-brand-navy px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-brand-gold font-bold text-lg">Maithil Cuisine</h1>
          <p className="text-white/40 text-xs">Staff Portal</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-white/50 hover:text-white text-sm transition-colors"
        >
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-brand-cream-dark px-4 sm:px-8">
        <div className="flex gap-6 max-w-3xl mx-auto">
          {(["orders", "menu"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-3 text-sm font-semibold border-b-2 transition-colors ${
                tab === t
                  ? "border-brand-crimson text-brand-crimson"
                  : "border-transparent text-brand-navy/40 hover:text-brand-navy"
              }`}
            >
              {t === "orders" ? `Today's Orders (${orders.length})` : "Menu Availability"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

        {/* Orders tab */}
        {tab === "orders" && (
          <>
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-brand-cream-dark">
                <p className="text-5xl mb-4">🍽️</p>
                <p className="text-brand-navy/50">No orders yet today</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl border border-brand-cream-dark shadow-sm overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-5 py-3 bg-brand-navy/5 border-b border-brand-cream-dark">
                      <span className="text-brand-navy font-bold text-sm">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </span>
                      <span className="text-brand-navy/40 text-xs">
                        {formatTime(order.created_at)} · {timeAgo(order.created_at)}
                      </span>
                    </div>

                    <div className="p-5 grid sm:grid-cols-2 gap-5">
                      <div>
                        <p className="text-brand-navy/40 text-xs uppercase tracking-wide mb-1">Customer</p>
                        <p className="text-brand-navy font-bold text-sm mb-1">{order.customer_name}</p>
                        <p className="text-brand-navy/60 text-sm">{order.customer_address}</p>
                      </div>

                      <div>
                        <p className="text-brand-navy/40 text-xs uppercase tracking-wide mb-2">Items</p>
                        <div className="space-y-1">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span className="text-brand-navy">{item.name} × {item.quantity}</span>
                              <span className="text-brand-crimson font-medium">₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between mt-3 pt-3 border-t border-brand-cream-dark">
                          <span className="text-brand-navy font-bold text-sm">Total</span>
                          <span className="text-brand-crimson font-black text-base">₹{order.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Menu availability tab */}
        {tab === "menu" && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <p className="text-brand-navy/50 text-sm">
                Toggle off items or categories that are not available today.
              </p>
              {saving && <span className="text-xs text-brand-navy/40">Saving...</span>}
              {saved && <span className="text-xs text-green-600 font-semibold">✓ Saved</span>}
              {saveError && <span className="text-xs text-red-500 font-semibold">Failed to save</span>}
            </div>

            <div className="flex flex-col gap-3">
              {allCategories.map((catName) => {
                const catOff = availability.disabled_categories.includes(catName);
                const catItems = allMenus
                  .filter((c) => c.name === catName)
                  .flatMap((c) => c.items);
                const isExpanded = expanded === catName;

                return (
                  <div
                    key={catName}
                    className="bg-white rounded-2xl border border-brand-cream-dark overflow-hidden"
                  >
                    {/* Category row */}
                    <div className="flex items-center gap-3 px-5 py-4">
                      <button
                        onClick={() => setExpanded(isExpanded ? null : catName)}
                        className="flex-1 text-left"
                      >
                        <span className={`font-bold text-sm ${catOff ? "line-through text-brand-navy/30" : "text-brand-navy"}`}>
                          {catName}
                        </span>
                        <span className="text-brand-navy/30 text-xs ml-2">
                          {catItems.length} items {isExpanded ? "▲" : "▼"}
                        </span>
                      </button>

                      {/* Category toggle */}
                      <button
                        onClick={() => toggleCategory(catName)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${
                          catOff ? "bg-red-400" : "bg-green-500"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                            catOff ? "translate-x-1" : "translate-x-6"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Items (expanded) */}
                    {isExpanded && !catOff && (
                      <div className="border-t border-brand-cream-dark divide-y divide-brand-cream-dark">
                        {catItems.map((item) => {
                          const itemOff = availability.disabled_items.includes(item.name);
                          const isVeg = vegItemNames.has(item.name);
                          return (
                            <div key={item.name} className="flex items-center px-5 py-3 gap-3">
                              <span className={`flex-1 text-sm font-medium ${itemOff ? "line-through text-brand-navy/30" : isVeg ? "text-green-700" : "text-red-600"}`}>
                                {item.name}
                              </span>
                              <span className="text-brand-navy/40 text-xs shrink-0">{item.price}</span>
                              <button
                                onClick={() => toggleItem(item.name)}
                                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0 ${
                                  itemOff ? "bg-red-400" : "bg-green-500"
                                }`}
                              >
                                <span
                                  className={`inline-block h-3 w-3 rounded-full bg-white shadow transition-transform ${
                                    itemOff ? "translate-x-1" : "translate-x-5"
                                  }`}
                                />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

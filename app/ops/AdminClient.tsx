"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { Order } from "./page";

const PAGE_SIZE = 10;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
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
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

type DateFilter = "today" | "week" | "all";
type SortOption = "newest" | "oldest" | "highest" | "lowest";

export default function AdminClient({
  orders,
  totalOrders,
  todayOrders,
  todayRevenue,
  totalRevenue,
}: {
  orders: Order[];
  totalOrders: number;
  todayOrders: number;
  todayRevenue: number;
  totalRevenue: number;
}) {
  const router = useRouter();
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [sort, setSort] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);
  const [copied, setCopied] = useState<string | null>(null);

  async function handleLogout() {
    await fetch("/api/admin-logout", { method: "POST" });
    router.push("/ops/login");
  }

  function copyAddress(id: string, address: string) {
    navigator.clipboard.writeText(address);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  const filtered = useMemo(() => {
    const now = new Date();
    return orders.filter((o) => {
      const d = new Date(o.created_at);
      if (dateFilter === "today") return d.toDateString() === now.toDateString();
      if (dateFilter === "week") {
        const weekAgo = new Date(now);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return d >= weekAgo;
      }
      return true;
    });
  }, [orders, dateFilter]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sort === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sort === "oldest") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (sort === "highest") return b.total - a.total;
      return a.total - b.total;
    });
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function changeFilter(f: DateFilter) {
    setDateFilter(f);
    setPage(1);
  }

  function changeSort(s: SortOption) {
    setSort(s);
    setPage(1);
  }

  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-brand-navy px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-brand-gold font-bold text-lg">Maithil Cuisine</h1>
          <p className="text-white/40 text-xs">Admin Dashboard</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-white/50 hover:text-white text-sm transition-colors"
        >
          Sign Out
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-brand-cream-dark text-center">
            <div className="text-brand-navy text-3xl font-black">{totalOrders}</div>
            <div className="text-brand-navy/50 text-xs mt-1">Total Orders</div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-brand-cream-dark text-center">
            <div className="text-brand-crimson text-3xl font-black">{todayOrders}</div>
            <div className="text-brand-navy/50 text-xs mt-1">Today&apos;s Orders</div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-brand-cream-dark text-center">
            <div className="text-brand-gold text-2xl font-black">₹{todayRevenue}</div>
            <div className="text-brand-navy/50 text-xs mt-1">Today&apos;s Revenue</div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-brand-cream-dark text-center">
            <div className="text-green-600 text-2xl font-black">₹{totalRevenue}</div>
            <div className="text-brand-navy/50 text-xs mt-1">Total Revenue</div>
          </div>
        </div>

        {/* Filters + Sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
          <div className="flex gap-2">
            {(["today", "week", "all"] as DateFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => changeFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  dateFilter === f
                    ? "bg-brand-navy text-white"
                    : "bg-white border border-brand-cream-dark text-brand-navy/60 hover:border-brand-navy/30"
                }`}
              >
                {f === "today" ? "Today" : f === "week" ? "This Week" : "All Time"}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => changeSort(e.target.value as SortOption)}
            className="text-sm border border-brand-cream-dark rounded-xl px-3 py-1.5 text-brand-navy bg-white focus:outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>
        </div>

        {/* Count */}
        <p className="text-brand-navy/40 text-xs mb-4">
          Showing {paginated.length} of {sorted.length} orders
        </p>

        {/* Orders */}
        {paginated.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-brand-cream-dark">
            <p className="text-5xl mb-4">🍽️</p>
            <p className="text-brand-navy/50">No orders found</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {paginated.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-brand-cream-dark shadow-sm overflow-hidden"
              >
                {/* Order header */}
                <div className="flex items-center justify-between px-5 py-3 bg-brand-navy/5 border-b border-brand-cream-dark">
                  <span className="text-brand-navy font-bold text-sm">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </span>
                  <span className="text-brand-navy/40 text-xs">{formatDate(order.created_at)} · {timeAgo(order.created_at)}</span>
                </div>

                <div className="p-5 grid sm:grid-cols-2 gap-5">
                  {/* Customer */}
                  <div>
                    <p className="text-brand-navy/40 text-xs uppercase tracking-wide mb-2">Customer</p>
                    <p className="text-brand-navy font-bold text-sm mb-2">{order.customer_name}</p>
                    <p className="text-brand-navy/60 text-sm mb-3">{order.customer_address}</p>

                    {/* Actions */}
                    <div className="flex gap-2 flex-wrap">
                      <a
                        href={`tel:${order.customer_phone}`}
                        className="flex items-center gap-1.5 bg-brand-crimson text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-brand-crimson-light transition-colors"
                      >
                        📞 {order.customer_phone}
                      </a>
                      <a
                        href={`https://wa.me/91${order.customer_phone}?text=Hello ${order.customer_name}, your order from Maithil Cuisine is confirmed!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-green-700 transition-colors"
                      >
                        WhatsApp
                      </a>
                      <button
                        onClick={() => copyAddress(order.id, order.customer_address)}
                        className="flex items-center gap-1.5 bg-brand-cream border border-brand-cream-dark text-brand-navy px-3 py-1.5 rounded-lg text-xs font-semibold hover:border-brand-navy/30 transition-colors"
                      >
                        {copied === order.id ? "✓ Copied" : "Copy Address"}
                      </button>
                    </div>
                  </div>

                  {/* Items */}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl border border-brand-cream-dark text-brand-navy text-sm font-medium disabled:opacity-40 hover:border-brand-navy/30 transition-colors bg-white"
            >
              ← Prev
            </button>
            <span className="text-brand-navy/50 text-sm">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl border border-brand-cream-dark text-brand-navy text-sm font-medium disabled:opacity-40 hover:border-brand-navy/30 transition-colors bg-white"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

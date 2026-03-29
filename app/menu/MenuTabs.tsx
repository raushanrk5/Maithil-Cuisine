"use client";

import { useState } from "react";
import { vegMenu, nonVegMenu, type MenuCategory, type MenuItem } from "../data/menu";
import { useCart } from "../context/CartContext";

const categoryIcons: Record<string, string> = {
  Breakfast: "🌅",
  Starter: "🍢",
  "Rice & Noodles": "🍚",
  Noodles: "🍜",
  "Main Course": "🍛",
  Bread: "🫓",
  Desserts: "🍮",
};

const SMALL_THRESHOLD = 5;

function parsePrice(priceStr: string): number {
  const match = priceStr.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
}

function groupCategories(categories: MenuCategory[]): Array<MenuCategory | MenuCategory[]> {
  const groups: Array<MenuCategory | MenuCategory[]> = [];
  let i = 0;
  while (i < categories.length) {
    if (categories[i].items.length <= SMALL_THRESHOLD) {
      const pair: MenuCategory[] = [];
      while (i < categories.length && categories[i].items.length <= SMALL_THRESHOLD) {
        pair.push(categories[i]);
        i++;
      }
      groups.push(pair.length === 1 ? pair[0] : pair);
    } else {
      groups.push(categories[i]);
      i++;
    }
  }
  return groups;
}

function ItemRow({ item, index }: { item: MenuItem; index: number }) {
  const { items, addItem, updateQuantity } = useCart();
  const price = parsePrice(item.price);
  const cartItem = items.find((i) => i.name === item.name);
  const quantity = cartItem?.quantity ?? 0;

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 ${
        index % 2 === 0 ? "bg-white" : "bg-brand-cream/40"
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 shrink-0" />
      <span className="text-brand-navy text-sm flex-1">{item.name}</span>
      <span className="text-brand-crimson font-bold text-sm shrink-0 tabular-nums">
        {item.price}
      </span>

      {/* Cart controls */}
      {quantity === 0 ? (
        <button
          onClick={() => addItem(item.name, price)}
          className="w-7 h-7 rounded-full bg-brand-crimson text-white font-bold text-lg flex items-center justify-center hover:bg-brand-crimson-light transition-colors shrink-0"
        >
          +
        </button>
      ) : (
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => updateQuantity(item.name, -1)}
            className="w-7 h-7 rounded-full border-2 border-brand-crimson text-brand-crimson font-bold text-lg flex items-center justify-center hover:bg-brand-crimson hover:text-white transition-colors"
          >
            −
          </button>
          <span className="text-brand-navy font-bold text-sm w-4 text-center tabular-nums">
            {quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.name, +1)}
            className="w-7 h-7 rounded-full bg-brand-crimson text-white font-bold text-lg flex items-center justify-center hover:bg-brand-crimson-light transition-colors"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}

function CategoryCard({ category }: { category: MenuCategory }) {
  const icon = categoryIcons[category.name] ?? "✦";
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-cream-dark h-full">
      <div className="bg-brand-navy px-5 py-4 flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-brand-gold font-bold text-base sm:text-lg tracking-wide">
          {category.name}
        </h3>
        <span className="ml-auto text-white/30 text-xs font-medium shrink-0">
          {category.items.length} items
        </span>
      </div>
      <div className="divide-y divide-brand-cream-dark">
        {category.items.map((item, i) => (
          <ItemRow key={item.name} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function MenuTabs() {
  const [tab, setTab] = useState<"veg" | "nonveg">("veg");
  const menu = tab === "veg" ? vegMenu : nonVegMenu;
  const groups = groupCategories(menu);

  return (
    <div className="pb-24">
      {/* Tab toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-white border border-brand-cream-dark rounded-2xl p-1.5 shadow-md gap-1.5">
          <button
            onClick={() => setTab("veg")}
            className={`flex items-center gap-2 px-6 sm:px-10 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
              tab === "veg"
                ? "bg-green-600 text-white shadow-sm"
                : "text-brand-navy/50 hover:text-green-700 hover:bg-green-50"
            }`}
          >
            <span className="text-base">🌿</span>
            <span>Veg</span>
          </button>
          <button
            onClick={() => setTab("nonveg")}
            className={`flex items-center gap-2 px-6 sm:px-10 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
              tab === "nonveg"
                ? "bg-brand-crimson text-white shadow-sm"
                : "text-brand-navy/50 hover:text-brand-crimson hover:bg-red-50"
            }`}
          >
            <span className="text-base">🍗</span>
            <span>Non-Veg</span>
          </button>
        </div>
      </div>

      <p className="text-center text-brand-navy/40 text-xs tracking-widest uppercase mb-8">
        {tab === "veg" ? "🌿 Pure Vegetarian" : "🍗 Non Vegetarian"}&nbsp;·&nbsp;
        {menu.reduce((a, c) => a + c.items.length, 0)} dishes
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {groups.map((group, idx) =>
          Array.isArray(group) ? (
            <div key={idx} className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {group.map((cat) => (
                <CategoryCard key={cat.name} category={cat} />
              ))}
            </div>
          ) : (
            <CategoryCard key={group.name} category={group} />
          )
        )}
      </div>
    </div>
  );
}

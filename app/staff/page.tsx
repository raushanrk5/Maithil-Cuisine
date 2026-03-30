import { supabase } from "../lib/supabase";
import StaffClient from "./StaffClient";
import type { Availability } from "../api/availability/route";

type OrderItem = { name: string; price: number; quantity: number };

export type StaffOrder = {
  id: string;
  customer_name: string;
  customer_address: string;
  items: OrderItem[];
  total: number;
  created_at: string;
};

export default async function StaffPage() {
  const today = new Date().toISOString().split("T")[0];

  const [ordersRes, settingsRes] = await Promise.all([
    supabase
      .from("orders")
      .select("id, customer_name, customer_address, items, total, created_at")
      .gte("created_at", `${today}T00:00:00`)
      .order("created_at", { ascending: false }),
    supabase
      .from("settings")
      .select("value")
      .eq("key", "availability")
      .single(),
  ]);

  const orders = (ordersRes.data ?? []) as StaffOrder[];
  const availability: Availability = settingsRes.data?.value ?? {
    disabled_categories: [],
    disabled_items: [],
  };

  return (
    <StaffClient
      orders={orders}
      availability={availability}
    />
  );
}

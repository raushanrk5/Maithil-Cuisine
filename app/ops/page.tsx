import { supabase } from "../lib/supabase";
import AdminClient from "./AdminClient";

type OrderItem = { name: string; price: number; quantity: number };

export type Order = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  items: OrderItem[];
  total: number;
  created_at: string;
};

export default async function AdminPage() {
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  const all = (orders ?? []) as Order[];
  const today = new Date().toDateString();
  const todayOrders = all.filter((o) => new Date(o.created_at).toDateString() === today);
  const todayRevenue = todayOrders.reduce((s, o) => s + o.total, 0);
  const totalRevenue = all.reduce((s, o) => s + o.total, 0);

  return (
    <AdminClient
      orders={all}
      totalOrders={all.length}
      todayOrders={todayOrders.length}
      todayRevenue={todayRevenue}
      totalRevenue={totalRevenue}
    />
  );
}

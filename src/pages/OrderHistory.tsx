import Navbar from "@/components/Navbar";
import { ShoppingBag, Search, Filter, ChevronDown } from "lucide-react";
import { useState } from "react";

type StatusFilter = "all" | "success" | "pending" | "cancelled";

const allOrders = [
  { id: "HK-20240101", type: "Blox Fruit Account", status: "success" as const, price: "1,200,000₫", date: "2024-01-15", method: "MoMo" },
  { id: "HK-20240102", type: "500 Robux Pack", status: "success" as const, price: "110,000₫", date: "2024-01-14", method: "Bank QR" },
  { id: "HK-20240103", type: "Power Leveling", status: "pending" as const, price: "350,000₫", date: "2024-01-13", method: "Scratch Card" },
  { id: "HK-20240104", type: "Pet Sim Bundle", status: "cancelled" as const, price: "2,500,000₫", date: "2024-01-12", method: "Bank QR" },
  { id: "HK-20240105", type: "1,000 Robux Premium", status: "success" as const, price: "200,000₫", date: "2024-01-11", method: "MoMo" },
  { id: "HK-20240106", type: "Dark Matter Fox", status: "pending" as const, price: "1,800,000₫", date: "2024-01-10", method: "Bank QR" },
  { id: "HK-20240107", type: "Starter Pack T-Rex", status: "success" as const, price: "450,000₫", date: "2024-01-09", method: "MoMo" },
  { id: "HK-20240108", type: "Gem Farming Bot", status: "cancelled" as const, price: "600,000₫", date: "2024-01-08", method: "Scratch Card" },
];

const statusConfig = {
  success: { label: "Success", class: "bg-green-500/15 text-green-400 border border-green-500/20" },
  pending: { label: "Pending", class: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20" },
  cancelled: { label: "Cancelled", class: "bg-red-500/15 text-red-400 border border-red-500/20" },
};

const OrderHistory = () => {
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");

  const filtered = allOrders.filter((o) => {
    const matchFilter = filter === "all" || o.status === filter;
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.type.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-heading font-bold text-3xl text-foreground text-glow-cyan flex items-center gap-3">
                <ShoppingBag className="w-7 h-7 text-primary" />
                Order History
              </h1>
              <p className="text-muted-foreground text-sm mt-1">{allOrders.length} total orders</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by ID or product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/30 border border-glass-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all focus:shadow-[0_0_15px_hsl(186_100%_50%/0.1)]"
              />
            </div>
            <div className="flex gap-2">
              {(["all", "success", "pending", "cancelled"] as StatusFilter[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all capitalize ${
                    filter === s ? "bg-primary/15 text-primary border border-primary/30 glow-cyan" : "glass-panel text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s === "all" ? "All" : s}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-5 text-xs text-muted-foreground font-medium">Order ID</th>
                    <th className="text-left py-4 px-5 text-xs text-muted-foreground font-medium">Type</th>
                    <th className="text-left py-4 px-5 text-xs text-muted-foreground font-medium">Method</th>
                    <th className="text-left py-4 px-5 text-xs text-muted-foreground font-medium">Status</th>
                    <th className="text-right py-4 px-5 text-xs text-muted-foreground font-medium">Price</th>
                    <th className="text-right py-4 px-5 text-xs text-muted-foreground font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((o) => (
                    <tr key={o.id} className="border-b border-border/30 hover:bg-muted/10 transition-colors group">
                      <td className="py-4 px-5 font-mono text-primary text-xs">{o.id}</td>
                      <td className="py-4 px-5 text-foreground font-medium">{o.type}</td>
                      <td className="py-4 px-5 text-muted-foreground">{o.method}</td>
                      <td className="py-4 px-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-semibold ${statusConfig[o.status].class}`}>
                          {statusConfig[o.status].label}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right font-heading font-semibold text-foreground">{o.price}</td>
                      <td className="py-4 px-5 text-right text-muted-foreground text-xs">{o.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="text-center py-12 text-muted-foreground text-sm">No orders found</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderHistory;

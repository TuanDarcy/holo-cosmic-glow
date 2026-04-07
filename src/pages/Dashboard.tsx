import Navbar from "@/components/Navbar";
import { LayoutDashboard, ShoppingBag, Settings, LogOut, Sword, Zap, Trophy, Clock } from "lucide-react";
import { useState } from "react";

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "settings", label: "Settings", icon: Settings },
];

const levelingProgress = [
  { game: "Blox Fruits", current: 2200, max: 2550, status: "In Progress" },
  { game: "Pet Simulator X", current: 180, max: 200, status: "In Progress" },
  { game: "Murder Mystery 2", current: 95, max: 100, status: "Almost Done" },
];

const orders = [
  { id: "#HK-2401", item: "Leopard Fruit Account", price: "1,200,000₫", status: "Delivered", date: "2024-01-15" },
  { id: "#HK-2402", item: "500 Robux Pack", price: "110,000₫", status: "Delivered", date: "2024-01-14" },
  { id: "#HK-2403", item: "Power Leveling — Blox Fruits", price: "350,000₫", status: "Processing", date: "2024-01-13" },
  { id: "#HK-2404", item: "Huge Cat Pet Bundle", price: "2,500,000₫", status: "Delivered", date: "2024-01-12" },
  { id: "#HK-2405", item: "1,000 Robux Premium", price: "200,000₫", status: "Pending", date: "2024-01-11" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex gap-6">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-56 shrink-0">
              <div className="glass-panel rounded-2xl p-4 space-y-1 sticky top-24">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      activeTab === item.id
                        ? "bg-primary/10 text-primary glow-cyan"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 border-t border-border mt-4">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-all">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </aside>

            {/* Main */}
            <div className="flex-1 space-y-6">
              <h1 className="font-heading font-bold text-3xl text-foreground text-glow-cyan">Dashboard</h1>

              {/* Stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Total Spent", value: "4,360,000₫", icon: Zap, color: "text-primary" },
                  { label: "Orders", value: "12", icon: Trophy, color: "text-secondary" },
                  { label: "Active Services", value: "3", icon: Clock, color: "text-primary" },
                ].map((s) => (
                  <div key={s.label} className="glass-panel iridescent-border p-5 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                      <s.icon className={`w-4 h-4 ${s.color}`} />
                    </div>
                    <p className="font-heading font-bold text-2xl text-foreground">{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Power Leveling Progress */}
              <div className="glass-panel rounded-2xl p-6">
                <h2 className="font-heading font-semibold text-lg text-foreground mb-5 flex items-center gap-2">
                  <Sword className="w-5 h-5 text-primary" />
                  Power Leveling Progress
                </h2>
                <div className="space-y-5">
                  {levelingProgress.map((lp) => (
                    <div key={lp.game}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">{lp.game}</span>
                        <span className="text-xs text-muted-foreground">
                          {lp.current}/{lp.max} — <span className="text-primary">{lp.status}</span>
                        </span>
                      </div>
                      <div className="liquid-progress h-3">
                        <div
                          className="liquid-progress-bar"
                          style={{ width: `${(lp.current / lp.max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order History */}
              <div className="glass-panel rounded-2xl p-6 overflow-x-auto">
                <h2 className="font-heading font-semibold text-lg text-foreground mb-5 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  Order History
                </h2>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-xs text-muted-foreground font-medium">Order</th>
                      <th className="text-left py-3 px-2 text-xs text-muted-foreground font-medium">Item</th>
                      <th className="text-left py-3 px-2 text-xs text-muted-foreground font-medium">Price</th>
                      <th className="text-left py-3 px-2 text-xs text-muted-foreground font-medium">Status</th>
                      <th className="text-left py-3 px-2 text-xs text-muted-foreground font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                        <td className="py-3 px-2 font-mono text-primary text-xs">{o.id}</td>
                        <td className="py-3 px-2 text-foreground">{o.item}</td>
                        <td className="py-3 px-2 font-heading font-semibold text-foreground">{o.price}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            o.status === "Delivered" ? "bg-green-500/20 text-green-400" :
                            o.status === "Processing" ? "bg-primary/20 text-primary" :
                            "bg-yellow-500/20 text-yellow-400"
                          }`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-muted-foreground text-xs">{o.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

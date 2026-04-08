import { Check, X, Trash2, Eye, Search } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const mockOrders = [
  { id: "HK-0001", customer: "DragonSlayer99", email: "dragon@mail.com", amount: "1,200,000₫", status: "pending", type: "Blox Fruit Account", date: "2024-01-15" },
  { id: "HK-0002", customer: "BloxMaster", email: "blox@mail.com", amount: "350,000₫", status: "pending", type: "Power Leveling", date: "2024-01-14" },
  { id: "HK-0003", customer: "PetLord", email: "pet@mail.com", amount: "2,500,000₫", status: "approved", type: "Pet Bundle", date: "2024-01-13" },
  { id: "HK-0004", customer: "RobuxKing", email: "robux@mail.com", amount: "200,000₫", status: "rejected", type: "1000 Robux", date: "2024-01-12" },
  { id: "HK-0005", customer: "NightFury", email: "night@mail.com", amount: "450,000₫", status: "pending", type: "Starter Pack", date: "2024-01-11" },
];

const statusStyles = {
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  approved: "bg-green-500/15 text-green-400 border-green-500/20",
  rejected: "bg-red-500/15 text-red-400 border-red-500/20",
};

export default function AdminOrderManagement() {
  const [orders, setOrders] = useState(mockOrders);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const handleAction = (id: string, action: "approve" | "reject" | "delete") => {
    if (action === "delete") {
      setOrders(orders.filter((o) => o.id !== id));
      toast({ title: "Order deleted", description: `Order ${id} removed` });
    } else {
      setOrders(orders.map((o) => o.id === id ? { ...o, status: action === "approve" ? "approved" : "rejected" } : o));
      toast({ title: action === "approve" ? "Order approved" : "Order rejected", description: `Order ${id} updated` });
    }
  };

  const filtered = orders.filter((o) =>
    o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-xl text-foreground">Order Management</h2>
        <span className="text-xs text-muted-foreground">{orders.filter(o => o.status === "pending").length} pending</span>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/30 border border-glass-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
        />
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Order</th>
                <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Customer</th>
                <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Type</th>
                <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Amount</th>
                <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Status</th>
                <th className="text-right py-3 px-4 text-xs text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-border/30 hover:bg-muted/10 transition-colors">
                  <td className="py-3 px-4 font-mono text-primary text-xs">{o.id}</td>
                  <td className="py-3 px-4 text-foreground">{o.customer}</td>
                  <td className="py-3 px-4 text-muted-foreground">{o.type}</td>
                  <td className="py-3 px-4 font-heading font-semibold text-foreground">{o.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border capitalize ${statusStyles[o.status as keyof typeof statusStyles]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      {o.status === "pending" && (
                        <>
                          <button onClick={() => handleAction(o.id, "approve")} className="p-1.5 rounded-lg hover:bg-green-500/15 text-green-400 transition-colors" title="Approve">
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleAction(o.id, "reject")} className="p-1.5 rounded-lg hover:bg-red-500/15 text-red-400 transition-colors" title="Reject">
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button onClick={() => handleAction(o.id, "delete")} className="p-1.5 rounded-lg hover:bg-destructive/15 text-destructive transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { Zap } from "lucide-react";

const recharges = [
  { name: "Tuan***", amount: "500,000₫" },
  { name: "Minh***", amount: "1,000,000₫" },
  { name: "Hoa***", amount: "200,000₫" },
  { name: "Long***", amount: "2,000,000₫" },
  { name: "Linh***", amount: "100,000₫" },
  { name: "Duc***", amount: "500,000₫" },
  { name: "Thao***", amount: "1,500,000₫" },
  { name: "Nam***", amount: "300,000₫" },
];

const TopRechargeMarquee = () => {
  const items = [...recharges, ...recharges];

  return (
    <div className="glass-panel py-2.5 overflow-hidden border-b border-glass-border">
      <div className="flex items-center">
        <div className="flex-shrink-0 flex items-center gap-1.5 px-4 border-r border-glass-border">
          <Zap className="w-3.5 h-3.5 text-primary animate-pulse-glow" />
          <span className="text-xs font-heading font-bold text-primary whitespace-nowrap">TOP NẠP</span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="flex animate-marquee gap-6 pl-4">
            {items.map((r, i) => (
              <span key={i} className="flex items-center gap-1.5 whitespace-nowrap text-xs">
                <span className="text-muted-foreground">{r.name}</span>
                <span className="text-primary font-semibold">+{r.amount}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRechargeMarquee;

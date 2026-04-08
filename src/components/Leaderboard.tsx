import { Crown, Medal, Star } from "lucide-react";

const leaders = [
  { rank: 1, name: "Tuan***", spent: "25,000,000₫", badge: "Diamond", color: "from-primary to-secondary" },
  { rank: 2, name: "Minh***", spent: "18,500,000₫", badge: "Platinum", color: "from-secondary to-primary" },
  { rank: 3, name: "Long***", spent: "12,200,000₫", badge: "Gold", color: "from-yellow-400 to-orange-500" },
  { rank: 4, name: "Hoa***", spent: "8,900,000₫", badge: "Silver", color: "from-slate-300 to-slate-500" },
  { rank: 5, name: "Linh***", spent: "6,100,000₫", badge: "Bronze", color: "from-orange-300 to-orange-600" },
];

const rankIcons = [Crown, Medal, Star];

const Leaderboard = () => (
  <div className="glass-panel iridescent-border rounded-2xl p-6">
    <div className="flex items-center gap-3 mb-5">
      <div className="p-2 rounded-lg bg-secondary/20">
        <Crown className="w-5 h-5 text-secondary" />
      </div>
      <div>
        <h2 className="font-heading font-bold text-lg text-foreground">Bảng Vinh Danh</h2>
        <p className="text-xs text-muted-foreground">Top Contributors</p>
      </div>
    </div>
    <div className="space-y-3">
      {leaders.map((l) => {
        const Icon = rankIcons[Math.min(l.rank - 1, 2)];
        return (
          <div key={l.rank} className="flex items-center gap-3 glass-panel p-3 rounded-xl group hover:glow-violet transition-all">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${l.color} flex items-center justify-center flex-shrink-0`}>
              <span className="text-xs font-bold text-primary-foreground">{l.rank}</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-muted to-muted-foreground/30 flex items-center justify-center flex-shrink-0 overflow-hidden">
              <span className="text-sm">🎮</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-heading font-semibold text-sm text-foreground truncate">{l.name}</p>
              <p className="text-[10px] text-muted-foreground">{l.badge}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-heading font-bold text-sm text-primary text-glow-cyan">{l.spent}</p>
            </div>
            <Icon className="w-4 h-4 text-secondary/60 flex-shrink-0" />
          </div>
        );
      })}
    </div>
  </div>
);

export default Leaderboard;

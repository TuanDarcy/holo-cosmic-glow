import { Bell, Check, Gift, Coins, AlertCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const notifications = [
  { id: 1, icon: Coins, text: "Nạp thành công 500,000₫", time: "2 phút trước", read: false },
  { id: 2, icon: Gift, text: "Sự kiện mới: Giảm giá 20% Blox Fruit", time: "15 phút trước", read: false },
  { id: 3, icon: Check, text: "Đơn hàng #1042 đã hoàn thành", time: "1 giờ trước", read: true },
  { id: 4, icon: AlertCircle, text: "Bảo trì hệ thống lúc 2:00 AM", time: "3 giờ trước", read: true },
];

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="relative p-2 rounded-xl hover:bg-muted/50 transition-colors">
        <Bell className="w-5 h-5 text-muted-foreground" />
        {unread > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary text-[9px] font-bold text-primary-foreground flex items-center justify-center animate-pulse-glow">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 glass-panel iridescent-border rounded-xl overflow-hidden z-50 animate-fade-in">
          <div className="p-3 border-b border-glass-border">
            <h3 className="font-heading font-bold text-sm text-foreground">Thông báo</h3>
          </div>
          <div className="max-h-72 overflow-y-auto">
            {notifications.map((n) => (
              <div key={n.id} className={`flex items-start gap-3 p-3 hover:bg-muted/30 transition-colors ${!n.read ? "bg-primary/5" : ""}`}>
                <div className={`p-1.5 rounded-lg flex-shrink-0 ${!n.read ? "bg-primary/20 text-primary" : "bg-muted/50 text-muted-foreground"}`}>
                  <n.icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground">{n.text}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
                </div>
                {!n.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;

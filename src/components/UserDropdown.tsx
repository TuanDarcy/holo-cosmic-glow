import { User, Key, LogOut, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const menuItems = [
    { icon: User, label: "Thông tin chung", path: "/profile" },
    { icon: Key, label: "Đổi mật khẩu", path: "/profile?tab=security" },
  ];

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 p-1 rounded-xl hover:bg-muted/50 transition-colors">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <span className="text-xs font-bold text-primary-foreground">🎮</span>
        </div>
        <ChevronDown className={`w-3 h-3 text-muted-foreground hidden sm:block transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 glass-panel iridescent-border rounded-xl overflow-hidden z-50 animate-fade-in">
          <div className="p-3 border-b border-glass-border">
            <p className="font-heading font-semibold text-sm text-foreground">HoloGamer</p>
            <p className="text-[10px] text-muted-foreground">user@holoshop.vn</p>
          </div>
          <div className="py-1">
            {menuItems.map((item) => (
              <Link
                key={item.path + item.label}
                to={item.path}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-muted/30 transition-colors"
              >
                <item.icon className="w-4 h-4 text-muted-foreground" />
                {item.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-glass-border py-1">
            <Link to="/login" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut className="w-4 h-4" />
              Đăng xuất
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;

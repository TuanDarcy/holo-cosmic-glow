import { User, Key, LogOut, LogIn, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  const menuItems = [
    { icon: User, label: "Thông tin chung", path: "/profile" },
    { icon: Key, label: "Đổi mật khẩu", path: "/profile?tab=security" },
  ];

  // Guest mode
  if (!isAuthenticated) {
    return (
      <div>
        <Link
          to="/login"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
        >
          <LogIn className="w-4 h-4" />
          <span className="hidden sm:inline">Đăng nhập</span>
        </Link>
      </div>
    );
  }

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
            <p className="font-heading font-semibold text-sm text-foreground">{user?.username || "User"}</p>
            <p className="text-[10px] text-muted-foreground">Balance: {user?.balance?.toLocaleString("vi-VN") ?? 0}₫</p>
            <p className="text-[10px] text-muted-foreground capitalize">Role: {user?.role}</p>
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
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;

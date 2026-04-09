import { Wallet, Menu, X, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Trang chủ", path: "/" },
  { label: "Nạp tiền", path: "/deposit" },
  { label: "Admin", path: "/admin" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const visibleNavLinks = navLinks.filter((link) => {
    if (link.path !== "/admin") return true;
    return isAuthenticated && user?.role === "ADMIN";
  });

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-glass-border">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-cyan">
              <span className="font-heading font-black text-primary-foreground text-sm">HS</span>
            </div>
            <span className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors hidden sm:inline">
              Holo<span className="text-primary">Shop</span>
            </span>
          </Link>

          {/* Nav links - desktop */}
          <div className="hidden md:flex items-center gap-1">
            {visibleNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/10 glow-cyan"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search bar */}
            <div className="relative group hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-40 lg:w-56 pl-9 pr-3 py-2 rounded-xl bg-muted/30 border border-glass-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:w-64 transition-all duration-300"
              />
            </div>

            <Link to="/deposit" className="glass-panel px-3 sm:px-4 py-1.5 rounded-full flex items-center gap-2 hover:border-primary/30 transition-colors">
              <Wallet className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">1,250,000₫</span>
            </Link>

            <NotificationDropdown />
            <UserDropdown />

            {/* Mobile menu toggle */}
            <button className="md:hidden p-2 rounded-xl hover:bg-muted/50 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 pt-16 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative glass-panel border-b border-glass-border p-4 space-y-1">
            {/* Mobile search */}
            <div className="relative group mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-muted/30 border border-glass-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-all"
              />
            </div>
            {visibleNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

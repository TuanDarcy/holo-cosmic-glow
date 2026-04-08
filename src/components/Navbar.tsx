import { Search, Wallet, Bell, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Deposit", path: "/deposit" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Checkout", path: "/checkout" },
  { label: "Admin", path: "/admin" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-glass-border">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-cyan">
            <span className="font-heading font-black text-primary-foreground text-sm">HS</span>
          </div>
          <span className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
            Holo<span className="text-primary">Shop</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
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

        {/* Search */}
        <div className="hidden lg:flex items-center flex-1 max-w-sm mx-6">
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search accounts, items..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-muted/50 border border-glass-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:bg-muted/70 transition-all"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Balance */}
          <div className="glass-panel px-4 py-1.5 rounded-full flex items-center gap-2 cursor-pointer hover:border-primary/30 transition-colors">
            <Wallet className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">1,250,000₫</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl hover:bg-muted/50 transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          </button>

          {/* Avatar */}
          <button className="flex items-center gap-2 p-1 rounded-xl hover:bg-muted/50 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">VN</span>
            </div>
            <ChevronDown className="w-3 h-3 text-muted-foreground hidden sm:block" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

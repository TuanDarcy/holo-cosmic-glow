import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/SectionHeader";
import { Sword, PawPrint, Coins, TrendingUp } from "lucide-react";
import hero1 from "@/assets/hero-character-1.jpg";
import hero2 from "@/assets/hero-character-2.jpg";
import hero3 from "@/assets/hero-character-3.jpg";

const bloxFruitProducts = [
  {
    title: "Max Leopard + Dragon + Venom Account",
    image: hero1,
    price: "1,200,000₫",
    level: "2550",
    items: "45",
    tag: "HOT",
  },
  {
    title: "Buddha Awakened + All Swords Account",
    image: hero3,
    price: "850,000₫",
    level: "2400",
    items: "32",
    tag: "SALE",
  },
  {
    title: "Dough V2 + CDK + Full Accessory",
    image: hero2,
    price: "2,100,000₫",
    level: "2550",
    items: "58",
    tag: "PREMIUM",
  },
  { title: "Starter Pack — T-Rex + Portal", image: hero1, price: "450,000₫", level: "1800", items: "18" },
];

const petSimProducts = [
  {
    title: "Huge Crowned Corgi Collection",
    image: hero2,
    price: "3,500,000₫",
    level: "MAX",
    items: "120",
    tag: "RARE",
  },
  { title: "Dark Matter Galaxy Fox Set", image: hero3, price: "1,800,000₫", level: "MAX", items: "85" },
  { title: "Rainbow Exclusive Pet Bundle", image: hero1, price: "2,200,000₫", level: "MAX", items: "95", tag: "NEW" },
  { title: "Gem Farming Bot Account", image: hero2, price: "600,000₫", level: "MAX", items: "40" },
];

const robuxDeals = [
  { title: "100 Robux — Instant Delivery", image: hero3, price: "25,000₫" },
  { title: "500 Robux — Best Value", image: hero1, price: "110,000₫", tag: "POPULAR" },
  { title: "1,000 Robux — Premium Pack", image: hero2, price: "200,000₫", tag: "DEAL" },
  { title: "5,000 Robux — Whale Bundle", image: hero3, price: "900,000₫", tag: "VIP" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-7xl space-y-12">
          {/* Hero */}
          <section className="animate-fade-in">
            <HeroSlider />
          </section>

          {/* Quick Stats */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {[
              { label: "Active Users", value: "12,450+", icon: TrendingUp },
              { label: "Accounts Sold", value: "45,200+", icon: Sword },
              { label: "Pet Services", value: "8,900+", icon: PawPrint },
              { label: "Robux Delivered", value: "2.5M+", icon: Coins },
            ].map((stat) => (
              <div key={stat.label} className="glass-panel p-4 rounded-xl text-center iridescent-border">
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="font-heading font-bold text-xl text-foreground text-glow-cyan">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </section>

          {/* Blox Fruit */}
          <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <SectionHeader title="Top Tier Blox Fruit Accounts" subtitle="Premium verified accounts" icon={Sword} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {bloxFruitProducts.map((p, i) => (
                <ProductCard key={i} {...p} />
              ))}
            </div>
          </section>

          {/* Pet Sim */}
          <section className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <SectionHeader title="Pet Sim Services" subtitle="Exclusive pet collections" icon={PawPrint} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {petSimProducts.map((p, i) => (
                <ProductCard key={i} {...p} />
              ))}
            </div>
          </section>

          {/* Robux */}
          <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <SectionHeader title="Instant Robux" subtitle="Delivered in minutes" icon={Coins} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {robuxDeals.map((p, i) => (
                <ProductCard key={i} {...p} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;

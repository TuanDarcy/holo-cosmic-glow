import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Zap, Search } from "lucide-react";
import hero1 from "@/assets/hero-character-1.jpg";
import hero2 from "@/assets/hero-character-2.jpg";
import hero3 from "@/assets/hero-character-3.jpg";

const slides = [
  {
    id: 1,
    title: "Legendary Blox Fruit",
    subtitle: "Max Level Account",
    description: "Full awakened fruits, max stats, all gamepasses included",
    price: "2,500,000₫",
    badge: "LIMITED",
    image: hero1,
  },
  {
    id: 2,
    title: "Mythic Pet Sim X",
    subtitle: "Exclusive Collection",
    description: "Rainbow Dark Matter pets, 150B+ gems, max enchants",
    price: "1,800,000₫",
    badge: "HOT",
    image: hero2,
  },
  {
    id: 3,
    title: "Pro Murder Mystery",
    subtitle: "Elite Account",
    description: "All godly weapons, complete knife collection, rare items",
    price: "900,000₫",
    badge: "NEW",
    image: hero3,
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden glass-panel min-h-[400px] md:min-h-[480px]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover opacity-40 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full min-h-[400px] md:min-h-[480px] px-8 md:px-12">
        {/* Search Bar - moved here */}
        <div className="mb-6 max-w-lg">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Tìm kiếm tài khoản, vật phẩm..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-background/40 backdrop-blur-md border border-glass-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:bg-background/60 transition-all"
            />
          </div>
        </div>

        <div className="max-w-lg">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/20 text-primary border border-primary/30 mb-4 animate-pulse-glow">
            <Zap className="w-3 h-3" />
            {slide.badge}
          </span>
          <h1 className="font-heading font-black text-4xl md:text-5xl text-foreground mb-1 text-glow-cyan">
            {slide.title}
          </h1>
          <p className="font-heading font-semibold text-xl text-secondary mb-3 text-glow-violet">
            {slide.subtitle}
          </p>
          <p className="text-muted-foreground text-sm mb-6 max-w-md leading-relaxed">
            {slide.description}
          </p>
          <div className="flex items-center gap-4">
            <button className="btn-glow px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary font-heading font-bold text-primary-foreground hover:scale-105 transition-transform">
              Mua Ngay — {slide.price}
            </button>
            <div className="flex items-center gap-1 text-primary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-primary glow-cyan" : "w-2 bg-muted-foreground/40"
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full glass-panel hover:bg-primary/10 transition-colors">
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full glass-panel hover:bg-primary/10 transition-colors">
        <ChevronRight className="w-5 h-5 text-foreground" />
      </button>
    </div>
  );
};

export default HeroSlider;

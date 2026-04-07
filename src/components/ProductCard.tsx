import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  title: string;
  image: string;
  price: string;
  level?: string;
  items?: string;
  tag?: string;
}

const ProductCard = ({ title, image, price, level, items, tag }: ProductCardProps) => {
  return (
    <div className="glass-panel iridescent-border rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300 hover:glow-cyan">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

        {/* Floating badges */}
        {tag && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary/90 text-primary-foreground animate-float">
            {tag}
          </span>
        )}
        <div className="absolute bottom-3 left-3 flex gap-2">
          {level && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-secondary/80 text-secondary-foreground backdrop-blur-sm">
              LV {level}
            </span>
          )}
          {items && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-primary/80 text-primary-foreground backdrop-blur-sm">
              {items} Items
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-heading font-bold text-sm text-foreground mb-3 line-clamp-2">{title}</h3>
        <div className="flex items-center justify-between">
          <span className="font-heading font-bold text-primary text-lg text-glow-cyan">{price}</span>
          <button className="btn-glow p-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:scale-110 transition-transform">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

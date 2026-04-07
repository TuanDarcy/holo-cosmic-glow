import { ChevronRight, type LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
}

const SectionHeader = ({ title, subtitle, icon: Icon }: SectionHeaderProps) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      {Icon && (
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <div>
        <h2 className="font-heading font-bold text-xl text-foreground">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
    </div>
    <button className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors font-medium">
      View All <ChevronRight className="w-4 h-4" />
    </button>
  </div>
);

export default SectionHeader;

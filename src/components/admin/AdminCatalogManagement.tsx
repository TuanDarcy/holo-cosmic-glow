import { Plus, Trash2, Edit, Upload, FolderOpen, Image } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
  description: string;
  thumbnail: string | null;
  productCount: number;
  active: boolean;
}

const initialCategories: Category[] = [
  { id: "1", name: "Blox Fruits", description: "Premium Blox Fruit accounts and items", thumbnail: null, productCount: 24, active: true },
  { id: "2", name: "Pet Simulator X", description: "Rare pets and collections", thumbnail: null, productCount: 18, active: true },
  { id: "3", name: "Robux", description: "Instant Robux delivery packages", thumbnail: null, productCount: 8, active: true },
  { id: "4", name: "Murder Mystery 2", description: "Rare weapons and knives", thumbnail: null, productCount: 12, active: false },
];

export default function AdminCatalogManagement() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!formData.name.trim()) return;

    if (editingId) {
      setCategories(categories.map((c) => c.id === editingId ? { ...c, name: formData.name, description: formData.description } : c));
      toast({ title: "Category updated" });
    } else {
      setCategories([...categories, {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        thumbnail: null,
        productCount: 0,
        active: true,
      }]);
      toast({ title: "Category created" });
    }
    setFormData({ name: "", description: "" });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (cat: Category) => {
    setFormData({ name: cat.name, description: cat.description });
    setEditingId(cat.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
    toast({ title: "Category deleted" });
  };

  const handleToggle = (id: string) => {
    setCategories(categories.map((c) => c.id === id ? { ...c, active: !c.active } : c));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-xl text-foreground">Catalog & Files</h2>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ name: "", description: "" }); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-medium btn-glow transition-all hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Create/Edit Form */}
      {showForm && (
        <div className="glass-panel iridescent-border rounded-2xl p-6 space-y-4">
          <h3 className="font-heading font-semibold text-foreground">{editingId ? "Edit Category" : "New Category"}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Category name"
                className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-glass-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Short description"
                className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-glass-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
          </div>

          {/* Upload Zone */}
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Thumbnail</label>
            <div className="border-2 border-dashed border-glass-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Click or drag to upload thumbnail</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP up to 5MB</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={handleSubmit} className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all">
              {editingId ? "Update" : "Create"}
            </button>
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="px-5 py-2 rounded-xl bg-muted/30 border border-glass-border text-sm text-foreground hover:bg-muted/50 transition-all">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className={`glass-panel iridescent-border rounded-2xl p-5 transition-all ${!cat.active ? "opacity-50" : ""}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-muted/30 border border-glass-border flex items-center justify-center">
                  {cat.thumbnail ? <img src={cat.thumbnail} alt="" className="w-full h-full rounded-xl object-cover" /> : <FolderOpen className="w-5 h-5 text-muted-foreground" />}
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground">{cat.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => handleEdit(cat)} className="p-1.5 rounded-lg hover:bg-primary/15 text-primary transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(cat.id)} className="p-1.5 rounded-lg hover:bg-destructive/15 text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{cat.productCount} products</span>
              <button
                onClick={() => handleToggle(cat.id)}
                className={`px-3 py-1 rounded-full text-[10px] font-semibold border transition-all ${
                  cat.active ? "bg-green-500/15 text-green-400 border-green-500/20" : "bg-muted/30 text-muted-foreground border-glass-border"
                }`}
              >
                {cat.active ? "Active" : "Inactive"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

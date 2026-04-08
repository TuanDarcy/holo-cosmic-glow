import { LayoutDashboard, Package, ShoppingCart, BarChart3, Users, LogOut, Shield, FolderOpen } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../Navbar';
import AdminDashboard from './AdminDashboard';
import ProductsTable from './ProductsTable';
import AdminOrderManagement from './AdminOrderManagement';
import Analytics from './Analytics';
import AdminMemberManagement from './AdminMemberManagement';
import AdminCatalogManagement from './AdminCatalogManagement';
import AdminPermissions from './AdminPermissions';

export default function AdminLayout() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'catalog', label: 'Catalog', icon: FolderOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'permissions', label: 'Permissions', icon: Shield },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <AdminDashboard />;
      case 'products': return <ProductsTable />;
      case 'orders': return <AdminOrderManagement />;
      case 'members': return <AdminMemberManagement />;
      case 'catalog': return <AdminCatalogManagement />;
      case 'analytics': return <Analytics />;
      case 'permissions': return <AdminPermissions />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex gap-6">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-52 shrink-0">
              <div className="glass-panel rounded-2xl p-4 space-y-1 sticky top-24">
                <h2 className="font-heading font-bold text-sm text-primary mb-3 px-3">Admin Panel</h2>
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      activeTab === item.id
                        ? 'bg-primary/10 text-primary glow-cyan'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
                <div className="pt-3 border-t border-border mt-3">
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-all">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </aside>

            {/* Mobile tabs */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-glass-border p-2 flex gap-1 overflow-x-auto">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-[10px] font-medium transition-all shrink-0 ${
                    activeTab === item.id ? 'text-primary bg-primary/10' : 'text-muted-foreground'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 pb-16 md:pb-0">{renderContent()}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

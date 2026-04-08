import { LayoutDashboard, Package, ShoppingCart, BarChart3, Users, LogOut } from 'lucide-react';
import { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import ProductsTable from './ProductsTable';
import OrdersTable from './OrdersTable';
import Analytics from './Analytics';
import UsersManagement from './UsersManagement';

export default function AdminLayout() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', label: 'Bảng điều khiển', icon: LayoutDashboard },
    { id: 'products', label: 'Sản phẩm', icon: Package },
    { id: 'orders', label: 'Đơn hàng', icon: ShoppingCart },
    { id: 'analytics', label: 'Thống kê', icon: BarChart3 },
    { id: 'users', label: 'Người dùng', icon: Users },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'products':
        return <ProductsTable />;
      case 'orders':
        return <OrdersTable />;
      case 'analytics':
        return <Analytics />;
      case 'users':
        return <UsersManagement />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-slate-900 text-gray-100">
      <div className="flex gap-6 p-6 max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="w-48 flex-shrink-0">
          <div className="glass-panel rounded-xl p-4 sticky top-24">
            <h2 className="font-bold text-lg text-cyan-400 mb-4">Admin Panel</h2>
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all font-medium ${
                    activeTab === item.id
                      ? 'bg-cyan-500/20 text-cyan-400 border-l-4 border-cyan-500'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-slate-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-slate-700 mt-4">
                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all font-medium">
                  <LogOut className="w-5 h-5" />
                  Đăng xuất
                </button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">{renderContent()}</main>
      </div>
    </div>
  );
}

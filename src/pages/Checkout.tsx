import { useState } from 'react';
import PaymentMethodSelector from '@/components/payment/PaymentMethodSelector';
import Cart from '@/components/cart/Cart';
import CartSummary from '@/components/cart/CartSummary';
import { BarChart3, ShoppingBag, Settings, LogOut } from 'lucide-react';

export default function Checkout() {
  const [activeTab, setActiveTab] = useState<'cart' | 'payment'>('cart');

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground text-glow-cyan mb-2">Thanh Toán</h1>
          <p className="text-muted-foreground">Hoàn tất đơn hàng của bạn</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('cart')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'cart'
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            Giỏ hàng
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'payment'
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Thanh toán
          </button>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main */}
          <div className="md:col-span-2">
            {activeTab === 'cart' ? (
              <div className="glass-panel rounded-2xl p-6 iridescent-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Sản phẩm trong giỏ</h2>
                <Cart />
              </div>
            ) : (
              <div className="glass-panel rounded-2xl p-6 iridescent-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Chọn phương thức thanh toán</h2>
                <PaymentMethodSelector />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="glass-panel rounded-2xl p-6 iridescent-border sticky top-24">
              <CartSummary />
              <button className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 rounded-lg shadow-lg">
                {activeTab === 'cart' ? 'Tiếp tục mua sắm' : 'Xác nhận thanh toán'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

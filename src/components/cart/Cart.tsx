import { useCartStore } from '@/stores/cartStore';
import { Trash2, Minus, Plus } from 'lucide-react';

export default function Cart() {
  const { items, removeItem, updateQuantity } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Giỏ hàng của bạn đang trống</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.productId} className="bg-white border-2 border-gray-200 rounded-lg p-4 flex gap-4">
          {/* Image */}
          <img
            src={item.image}
            alt={item.title}
            className="w-20 h-20 object-cover rounded-lg"
          />

          {/* Item Info */}
          <div className="flex-1">
            <h3 className="font-bold text-gray-800">{item.title}</h3>
            <p className="text-cyan-600 font-semibold">{item.price.toLocaleString('vi-VN')}₫</p>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-2 border-2 border-gray-300 rounded-lg px-2">
            <button
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold w-6 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Subtotal */}
          <div className="text-right">
            <p className="text-lg font-bold text-gray-800">
              {(item.price * item.quantity).toLocaleString('vi-VN')}₫
            </p>
          </div>

          {/* Remove */}
          <button
            onClick={() => removeItem(item.productId)}
            className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
}

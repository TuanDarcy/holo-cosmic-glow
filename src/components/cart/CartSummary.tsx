import { useCartStore } from '@/stores/cartStore';
import { useState } from 'react';
import { Ticket } from 'lucide-react';

export default function CartSummary() {
  const { subtotal, discount, couponCode, applyCoupon, removeCoupon, getTotal } = useCartStore();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const mockCoupons: { [key: string]: number } = {
    SUMMER2024: 50000,
    WELCOME10: Math.floor(subtotal * 0.1),
    HOLO20: Math.floor(subtotal * 0.2),
  };

  const handleApplyCoupon = () => {
    const code = couponInput.toUpperCase();
    const discountAmount = mockCoupons[code];

    if (discountAmount) {
      applyCoupon(code, discountAmount);
      setCouponError('');
      setCouponInput('');
    } else {
      setCouponError('Mã giảm giá không hợp lệ');
    }
  };

  const total = getTotal();

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-bold text-gray-800">Tóm tắt đơn hàng</h3>

      {/* Subtotal */}
      <div className="flex justify-between text-gray-600">
        <span>Tạm tính:</span>
        <span className="font-semibold">{subtotal.toLocaleString('vi-VN')}₫</span>
      </div>

      {/* Discount */}
      {discount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Giảm giá ({couponCode}):</span>
          <span className="font-semibold">-{discount.toLocaleString('vi-VN')}₫</span>
        </div>
      )}

      {/* Coupon Input */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            placeholder="Mã giảm giá"
            className="flex-1 border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-cyan-500 focus:outline-none"
          />
          <button
            onClick={handleApplyCoupon}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-1"
          >
            <Ticket className="w-4 h-4" />
            Áp dụng
          </button>
        </div>
        {couponError && <p className="text-red-600 text-sm mt-1">{couponError}</p>}
        {couponCode && (
          <button
            onClick={removeCoupon}
            className="text-sm text-gray-500 hover:text-gray-700 mt-2"
          >
            Xóa mã coupon
          </button>
        )}
      </div>

      {/* Total */}
      <div className="pt-4 border-t border-gray-200 flex justify-between text-lg font-bold">
        <span className="text-gray-800">Tổng cộng:</span>
        <span className="text-cyan-600">{total.toLocaleString('vi-VN')}₫</span>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Smartphone, QrCode, Loader2 } from 'lucide-react';

export default function ZaloPayPayment() {
  const [amount, setAmount] = useState(100000);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'form' | 'qr' | 'success'>('form');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus('qr');
    setLoading(false);
  };

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStatus('success');
    setLoading(false);
  };

  if (status === 'success') {
    return (
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
          <Smartphone className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-blue-600">Thanh toán thành công qua Zalo Pay!</h3>
        <p className="text-gray-600">Số tiền {amount.toLocaleString('vi-VN')}₫ đã được nạp vào tài khoản.</p>
      </div>
    );
  }

  if (status === 'qr') {
    return (
      <div className="space-y-4">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
          <Smartphone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="font-bold mb-2">Mở Zalo trên điện thoại</h3>
          <p className="text-sm text-gray-600 mb-4">
            Bạn sẽ được chuyển hướng đến Zalo Pay để hoàn tất thanh toán.
          </p>
          <div className="bg-white p-6 rounded-lg border-2 border-blue-300 mb-4">
            <QrCode className="w-24 h-24 text-blue-500 mx-auto" />
            <p className="text-xs text-gray-500 mt-2">Hoặc quét mã QR này</p>
          </div>
        </div>

        <button
          onClick={handleConfirm}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Đang xác thực...
            </>
          ) : (
            'Tôi đã thanh toán'
          )}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Số tiền cần nạp</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
          min={10000}
          step={10000}
          className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[100000, 200000, 500000].map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setAmount(preset)}
            className={`p-2 rounded-lg border-2 font-semibold text-sm ${
              amount === preset
                ? 'border-blue-500 bg-blue-100'
                : 'border-gray-300 bg-white hover:border-blue-300'
            }`}
          >
            {(preset / 1000).toFixed(0)}K
          </button>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 rounded-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Đang chuyển hướng...
          </>
        ) : (
          <>
            <Smartphone className="w-5 h-5" />
            Thanh toán qua Zalo Pay
          </>
        )}
      </button>
    </form>
  );
}

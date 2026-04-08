import { useState } from 'react';
import { CryptoPayload, CryptoType } from '@/types/payment';
import { Wallet, Copy, Check, Loader2 } from 'lucide-react';

export default function CryptoPayment() {
  const [cryptoType, setCryptoType] = useState<CryptoType>('bitcoin');
  const [amount, setAmount] = useState(100);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const cryptoOptions = [
    { id: 'bitcoin' as const, name: 'Bitcoin', symbol: 'BTC', rate: 42000 },
    { id: 'ethereum' as const, name: 'Ethereum', symbol: 'ETH', rate: 2200 },
    { id: 'usdt' as const, name: 'USDT', symbol: 'USDT', rate: 1 },
  ];

  const selected = cryptoOptions.find((c) => c.id === cryptoType);
  const usdValue = amount * (selected?.rate || 0);
  const vndValue = usdValue * 24500; // Mock conversion

  const walletAddress = '1A1z7agoat2LWSSTTZJVM8NAP6VXhRYvVm'; // Mock BTC address

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Crypto Type Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Chọn loại tiền điện tử</label>
        <div className="grid grid-cols-3 gap-3">
          {cryptoOptions.map((crypto) => (
            <button
              key={crypto.id}
              type="button"
              onClick={() => setCryptoType(crypto.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                cryptoType === crypto.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-purple-300'
              }`}
            >
              <div className="font-bold">{crypto.symbol}</div>
              <div className="text-xs text-gray-600">{crypto.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Amount Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Số lượng {selected?.symbol}
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Math.max(0, +e.target.value))}
          step={0.01}
          className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:outline-none transition-colors"
        />
      </div>

      {/* Conversion */}
      <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{amount} {selected?.symbol}</span>
          <span className="font-bold text-purple-600">${usdValue.toFixed(2)}</span>
        </div>
        <div className="border-t border-purple-200 pt-2 flex justify-between text-sm">
          <span className="text-gray-600">Giá tiền VND</span>
          <span className="font-bold text-purple-600">{vndValue.toLocaleString('vi-VN')}₫</span>
        </div>
      </div>

      {/* Wallet Address */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Gửi {selected?.symbol} đến địa chỉ
        </label>
        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 break-all font-mono text-sm text-gray-800">
          {walletAddress}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="mt-2 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Đã sao chép
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Sao chép địa chỉ
            </>
          )}
        </button>
      </div>

      {/* Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
        ⚠️ Chỉ gửi {selected?.symbol} đến địa chỉ này. Gửi các loại tiền khác sẽ bị mất vĩnh viễn.
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Đang xử lý...
          </>
        ) : (
          <>
            <Wallet className="w-5 h-5" />
            Tôi đã gửi tiền
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        ✓ Đây là demo. Vui lòng không gửi tiền thật.
      </p>
    </form>
  );
}

import { useState } from 'react';
import { PaymentMethod } from '@/types/payment';
import ScratchCardPayment from './ScratchCardPayment';
import BankQRPayment from './BankQRPayment';
import CryptoPayment from './CryptoPayment';
import ZaloPayPayment from './ZaloPayPayment';
import { CreditCard, QrCode, Wallet, Smartphone } from 'lucide-react';

export default function PaymentMethodSelector() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('scratch-card');

  const methods: Array<{
    id: PaymentMethod;
    label: string;
    icon: React.ReactNode;
    description: string;
    badge?: string;
  }> = [
    {
      id: 'scratch-card',
      label: 'Thẻ Cào',
      icon: <CreditCard className="w-5 h-5" />,
      description: 'Vina, Mobi, Viettel',
      badge: '⭐ PHỔ BIẾN',
    },
    {
      id: 'bank-qr',
      label: 'Bank QR',
      icon: <QrCode className="w-5 h-5" />,
      description: 'Quét mã từ ứng dụng ngân hàng',
      badge: '⭐ PHỔ BIẾN',
    },
    {
      id: 'zalo-pay',
      label: 'Zalo Pay',
      icon: <Smartphone className="w-5 h-5" />,
      description: 'Ví điện tử Zalo',
    },
    {
      id: 'crypto',
      label: 'Crypto',
      icon: <Wallet className="w-5 h-5" />,
      description: 'Bitcoin, Ethereum, USDT',
    },
  ];

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'scratch-card':
        return <ScratchCardPayment />;
      case 'bank-qr':
        return <BankQRPayment />;
      case 'zalo-pay':
        return <ZaloPayPayment />;
      case 'crypto':
        return <CryptoPayment />;
      default:
        return <ScratchCardPayment />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Method Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            className={`relative p-4 rounded-xl border-2 transition-all ${
              selectedMethod === method.id
                ? 'border-cyan-500 bg-cyan-50 shadow-lg shadow-cyan-500/20'
                : 'border-gray-200 bg-white hover:border-cyan-300'
            }`}
          >
            {method.badge && (
              <div className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                {method.badge}
              </div>
            )}
            <div className=" mb-2 text-cyan-600">{method.icon}</div>
            <div className="font-bold text-sm text-gray-800">{method.label}</div>
            <div className="text-xs text-gray-500 mt-1">{method.description}</div>
          </button>
        ))}
      </div>

      {/* Selected Method Form */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-lg">
        {renderPaymentForm()}
      </div>
    </div>
  );
}

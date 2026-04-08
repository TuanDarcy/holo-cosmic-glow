import { Eye, Trash2 } from 'lucide-react';

export default function OrdersTable() {
  const orders = [
    {
      id: 'HK-2024-001',
      customer: 'Nguyễn A',
      amount: '1,200,000₫',
      method: '💳 Thẻ cào',
      status: 'completed',
      date: '2024-04-08',
    },
    {
      id: 'HK-2024-002',
      customer: 'Trần B',
      amount: '850,000₫',
      method: '🏦 Bank QR',
      status: 'pending',
      date: '2024-04-08',
    },
    {
      id: 'HK-2024-003',
      customer: 'Lê C',
      amount: '2,100,000₫',
      method: '💜 Zalo Pay',
      status: 'completed',
      date: '2024-04-07',
    },
    {
      id: 'HK-2024-004',
      customer: 'Phạm D',
      amount: '500,000₫',
      method: '💳 Thẻ cào',
      status: 'failed',
      date: '2024-04-07',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'failed':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '✅ Hoàn thành';
      case 'pending':
        return '🔄 Chờ xử lý';
      case 'failed':
        return '❌ Thất bại';
      default:
        return status;
    }
  };

  return (
    <div className="glass-panel rounded-lg p-6 border border-slate-700">
      <h3 className="font-bold text-lg mb-6">Quản lý đơn hàng</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 px-3">ID đơn hàng</th>
              <th className="text-left py-3 px-3">Khách hàng</th>
              <th className="text-left py-3 px-3">Số tiền</th>
              <th className="text-left py-3 px-3">Phương thức</th>
              <th className="text-left py-3 px-3">Trạng thái</th>
              <th className="text-left py-3 px-3">Ngày</th>
              <th className="text-right py-3 px-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                <td className="py-3 px-3 font-mono font-bold text-cyan-400">{order.id}</td>
                <td className="py-3 px-3">{order.customer}</td>
                <td className="py-3 px-3 font-bold text-cyan-400">{order.amount}</td>
                <td className="py-3 px-3">{order.method}</td>
                <td className="py-3 px-3">
                  <span className={`px-3 py-1 rounded text-xs font-bold ${getStatusBadge(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </td>
                <td className="py-3 px-3 text-gray-400">{order.date}</td>
                <td className="py-3 px-3 text-right flex gap-2 justify-end">
                  <button className="p-1 hover:bg-blue-500/20 rounded transition-colors">
                    <Eye className="w-4 h-4 text-blue-400" />
                  </button>
                  <button className="p-1 hover:bg-red-500/20 rounded transition-colors">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

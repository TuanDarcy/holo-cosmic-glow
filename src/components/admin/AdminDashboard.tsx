import { TrendingUp, ShoppingBag, Users, Bitcoin } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function AdminDashboard() {
  const dashboardData = [
    { date: 'T2', revenue: 150000, orders: 12 },
    { date: 'T3', revenue: 280000, orders: 18 },
    { date: 'T4', revenue: 320000, orders: 21 },
    { date: 'T5', revenue: 450000, orders: 28 },
    { date: 'T6', revenue: 380000, orders: 25 },
    { date: 'T7', revenue: 520000, orders: 35 },
    { date: 'CN', revenue: 670000, orders: 42 },
  ];

  const kpis = [
    { label: 'Doanh thu hôm nay', value: '2,500,000₫', icon: TrendingUp, color: 'text-green-500' },
    { label: 'Đơn hàng hôm nay', value: '15', icon: ShoppingBag, color: 'text-blue-500' },
    { label: 'Người dùng mới', value: '8', icon: Users, color: 'text-purple-500' },
    { label: 'Tiền điện tử nhận được', value: '0.025 BTC', icon: Bitcoin, color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="glass-panel rounded-lg p-4 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{kpi.label}</p>
                <p className="text-2xl font-bold text-white mt-2">{kpi.value}</p>
              </div>
              <kpi.icon className={`w-10 h-10 ${kpi.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="glass-panel rounded-lg p-6 border border-slate-700">
          <h3 className="font-bold text-lg mb-4">Doanh thu 7 ngày</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #64748b' }} />
              <Line type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Chart */}
        <div className="glass-panel rounded-lg p-6 border border-slate-700">
          <h3 className="font-bold text-lg mb-4">Đơn hàng 7 ngày</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #64748b' }} />
              <Bar dataKey="orders" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="glass-panel rounded-lg p-6 border border-slate-700">
        <h3 className="font-bold text-lg mb-4">Đơn hàng gần đây</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 px-2">ID</th>
              <th className="text-left py-2 px-2">Khách hàng</th>
              <th className="text-left py-2 px-2">Số tiền</th>
              <th className="text-left py-2 px-2">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 'HK-0001', customer: 'User A', amount: '450,000₫', status: '✅ Hoàn thành' },
              { id: 'HK-0002', customer: 'User B', amount: '320,000₫', status: '🔄 Xử lý' },
              { id: 'HK-0003', customer: 'User C', amount: '250,000₫', status: '✅ Hoàn thành' },
            ].map((order) => (
              <tr key={order.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                <td className="py-3 px-2">{order.id}</td>
                <td className="py-3 px-2">{order.customer}</td>
                <td className="py-3 px-2 font-bold text-cyan-400">{order.amount}</td>
                <td className="py-3 px-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

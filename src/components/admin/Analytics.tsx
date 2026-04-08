import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Analytics() {
  const revenueByMethod = [
    { name: 'Thẻ cào', value: 4500000, color: '#06b6d4' },
    { name: 'Bank QR', value: 3200000, color: '#0ea5e9' },
    { name: 'Zalo Pay', value: 1800000, color: '#8b5cf6' },
    { name: 'Crypto', value: 500000, color: '#f59e0b' },
  ];

  const dailyMetrics = [
    { day: 'T2', revenue: 150000, orders: 12, users: 8 },
    { day: 'T3', revenue: 280000, orders: 18, users: 15 },
    { day: 'T4', revenue: 320000, orders: 21, users: 18 },
    { day: 'T5', revenue: 450000, orders: 28, users: 22 },
    { day: 'T6', revenue: 380000, orders: 25, users: 20 },
    { day: 'T7', revenue: 520000, orders: 35, users: 28 },
    { day: 'CN', revenue: 670000, orders: 42, users: 35 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Phân tích & Báo cáo</h2>

      {/* Revenue by Method */}
      <div className="glass-panel rounded-lg p-6 border border-slate-700">
        <h3 className="font-bold text-lg mb-4">Doanh thu theo phương thức thanh toán</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={revenueByMethod} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={100} fill="#8884d8" dataKey="value">
              {revenueByMethod.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value.toLocaleString('vi-VN')}₫`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Metrics */}
      <div className="glass-panel rounded-lg p-6 border border-slate-700">
        <h3 className="font-bold text-lg mb-4">Thống kê hàng ngày (7 ngày gần đây)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyMetrics}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="day" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #64748b' }} />
            <Line type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={2} name="Doanh thu" />
            <Line type="monotone" dataKey="orders" stroke="#0ea5e9" strokeWidth={2} name="Đơn hàng" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: 'Tổng doanh thu', value: '10,103,000₫', change: '+15.2%' },
          { label: 'Trung bình đơn hàng', value: '325,000₫', change: '+8.3%' },
          { label: 'Tỉ lệ hoàn thành', value: '98.5%', change: '+2.1%' },
          { label: 'Khách hàng mới', value: '146', change: '+12.5%' },
        ].map((stat) => (
          <div key={stat.label} className="glass-panel rounded-lg p-4 border border-slate-700">
            <p className="text-sm text-gray-400">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
            <p className="text-xs text-green-400 mt-1">{stat.change} so với tuần trước</p>
          </div>
        ))}
      </div>
    </div>
  );
}

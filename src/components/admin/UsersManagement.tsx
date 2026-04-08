import { Trash2, Edit2, Shield, Lock } from 'lucide-react';

export default function UsersManagement() {
  const users = [
    { id: 1, username: 'nguyenvana', email: 'vana@example.com', status: 'active', joinDate: '2024-01-15', orders: 12, spent: '3,850,000₫', role: 'user' },
    { id: 2, username: 'phamthihuong', email: 'huong@example.com', status: 'active', joinDate: '2024-01-20', orders: 8, spent: '2,450,000₫', role: 'user' },
    { id: 3, username: 'levanminh', email: 'minh@example.com', status: 'banned', joinDate: '2024-01-10', orders: 3, spent: '950,000₫', role: 'user' },
    { id: 4, username: 'tranhoangthanh', email: 'thanh@example.com', status: 'active', joinDate: '2024-01-25', orders: 5, spent: '1,650,000₫', role: 'moderator' },
    { id: 5, username: 'lainguyenlam', email: 'lam@example.com', status: 'active', joinDate: '2024-02-01', orders: 15, spent: '4,200,000₫', role: 'user' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'banned':
        return 'bg-red-500/20 text-red-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getRoleIcon = (role: string) => {
    if (role === 'moderator') return <Shield size={16} className="text-purple-400" />;
    if (role === 'admin') return <Lock size={16} className="text-red-400" />;
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quản lý người dùng</h2>
        <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-4 py-2 rounded-lg font-medium transition">
          + Thêm người dùng
        </button>
      </div>

      <div className="glass-panel rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-600 bg-slate-800/50">
                <th className="px-6 py-3 text-left font-bold">Người dùng</th>
                <th className="px-6 py-3 text-left font-bold">Email</th>
                <th className="px-6 py-3 text-left font-bold">Ngày tham gia</th>
                <th className="px-6 py-3 text-left font-bold">Đơn hàng</th>
                <th className="px-6 py-3 text-left font-bold">Chi tiêu</th>
                <th className="px-6 py-3 text-left font-bold">Trạng thái</th>
                <th className="px-6 py-3 text-left font-bold">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-800/30 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{user.username}</p>
                        {user.role !== 'user' && (
                          <div className="flex items-center gap-1 mt-1">
                            {getRoleIcon(user.role)}
                            <span className="text-xs text-purple-400 capitalize">{user.role}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{user.email}</td>
                  <td className="px-6 py-4 text-gray-400">{user.joinDate}</td>
                  <td className="px-6 py-4">{user.orders}</td>
                  <td className="px-6 py-4 font-medium text-cyan-400">{user.spent}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status === 'active' ? 'Hoạt động' : 'Bị cấm'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-blue-500/20 rounded-lg transition text-blue-400 hover:text-blue-300">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 hover:bg-red-500/20 rounded-lg transition text-red-400 hover:text-red-300">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: 'Tổng người dùng', value: '2,543', icon: '👥' },
          { label: 'Hoạt động hôm nay', value: '387', icon: '🟢' },
          { label: 'Mới trong 7 ngày', value: '142', icon: '⭐' },
          { label: 'Bị cấm', value: '12', icon: '🚫' },
        ].map((stat) => (
          <div key={stat.label} className="glass-panel rounded-lg p-4 border border-slate-700">
            <p className="text-sm text-gray-400">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-2 flex items-center gap-2">
              <span>{stat.icon}</span>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

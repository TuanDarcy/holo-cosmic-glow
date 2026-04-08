import { Trash2, Edit, Eye } from 'lucide-react';

export default function ProductsTable() {
  const products = [
    {
      id: '1',
      name: 'Max Leopard + Dragon + Venom',
      level: '2550',
      price: '1,200,000₫',
      stock: 3,
      status: 'active',
    },
    {
      id: '2',
      name: 'Buddha Awakened + All Swords',
      level: '2400',
      price: '850,000₫',
      stock: 0,
      status: 'out-of-stock',
    },
    { id: '3', name: 'Dough V2 + CDK', level: '2550', price: '2,100,000₫', stock: 5, status: 'active' },
    {
      id: '4',
      name: 'Huge Crowned Corgi Collection',
      level: 'MAX',
      price: '3,500,000₫',
      stock: 2,
      status: 'active',
    },
  ];

  return (
    <div className="glass-panel rounded-lg p-6 border border-slate-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg">Quản lý sản phẩm</h3>
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-bold">
          + Thêm sản phẩm
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 px-3">Sản phẩm</th>
              <th className="text-left py-3 px-3">Level</th>
              <th className="text-left py-3 px-3">Giá</th>
              <th className="text-left py-3 px-3">Kho</th>
              <th className="text-left py-3 px-3">Trạng thái</th>
              <th className="text-right py-3 px-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                <td className="py-3 px-3 font-medium">{product.name}</td>
                <td className="py-3 px-3">{product.level}</td>
                <td className="py-3 px-3 text-cyan-400 font-bold">{product.price}</td>
                <td className="py-3 px-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      product.stock > 0
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {product.stock} cái
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      product.status === 'active'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {product.status === 'active' ? '✅ Hoạt động' : '❌ Hết hàng'}
                  </span>
                </td>
                <td className="py-3 px-3 text-right flex gap-2 justify-end">
                  <button className="p-1 hover:bg-blue-500/20 rounded transition-colors">
                    <Eye className="w-4 h-4 text-blue-400" />
                  </button>
                  <button className="p-1 hover:bg-yellow-500/20 rounded transition-colors">
                    <Edit className="w-4 h-4 text-yellow-400" />
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

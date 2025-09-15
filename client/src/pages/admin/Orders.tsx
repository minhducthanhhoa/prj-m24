import React from 'react';
import Sidebar from './Sidebar';

interface Order {
  id: string;
  productName: string;
  orderId: string;
  userId: string;
  status: string;
  totalPrice: string;
  date: string;
  note: string;
}

const Orders: React.FC = () => {
  const orders: Order[] = [
    {
      id: '39842-231',
      productName: "Macbook Pro 15'",
      orderId: '23455VN/HN',
      userId: 'UTG001',
      status: 'Đơn hàng mới',
      totalPrice: '$2,999.00',
      date: '20 Jan, 2022',
      note: 'Giao đến HN',
    },
    {
      id: '39842-232',
      productName: "Macbook Pro 13'",
      orderId: '23687VN/HN',
      userId: 'UTG002',
      status: 'Đã xác thực',
      totalPrice: '$2,999.00',
      date: '22 Feb, 2022',
      note: 'Giao đến HN',
    },
    {
      id: '39842-233',
      productName: 'iPhone 13 Mini',
      orderId: '78155VN/HN',
      userId: 'UTG003',
      status: 'Đang giao hàng',
      totalPrice: '$2,999.00',
      date: '22 Feb, 2022',
      note: 'Giao đến HN',
    },
    {
      id: '39842-234',
      productName: 'iPhone 14',
      orderId: '68465VN/HN',
      userId: 'UTG004',
      status: 'Đã giao hàng',
      totalPrice: '$2,999.00',
      date: '22 Feb, 2022',
      note: 'Giao đến HN',
    },
    {
      id: '39842-235',
      productName: 'AirPods 2',
      orderId: '98457VN/HN',
      userId: 'UTG005',
      status: 'Đã thanh toán',
      totalPrice: '$2,999.00',
      date: '22 Feb, 2022',
      note: 'Giao đến HN',
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="orders flex-1 p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">Orders</h2>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                {[
                  'ID',
                  'Tên sản phẩm',
                  'Mã đơn hàng',
                  'User ID',
                  'Trạng thái',
                  'Tổng tiền',
                  'Ngày',
                  'Ghi chú',
                  'Hành động',
                ].map((header) => (
                  <th
                    key={header}
                    className="py-3 px-4 border-b text-left font-medium text-gray-700"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="text-sm hover:bg-gray-50 transition"
                >
                  <td className="py-2 px-4 border-b">{order.id}</td>
                  <td className="py-2 px-4 border-b">{order.productName}</td>
                  <td className="py-2 px-4 border-b">{order.orderId}</td>
                  <td className="py-2 px-4 border-b">{order.userId}</td>
                  <td className="py-2 px-4 border-b">{order.status}</td>
                  <td className="py-2 px-4 border-b">{order.totalPrice}</td>
                  <td className="py-2 px-4 border-b">{order.date}</td>
                  <td className="py-2 px-4 border-b">{order.note}</td>
                  <td className="py-2 px-4 border-b space-x-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                      Chi tiết
                    </button>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                      Cập nhật
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;

import React from 'react';

const Orders: React.FC = () => {
  const orders = [
    {
      id: '39842-231',
      productName: 'Macbook Pro 15\'',
      orderId: '23455VN/HN',
      userId: 'UTG001',
      status: 'Đơn hàng mới',
      totalPrice: '$2,999.00',
      date: '20 Jan, 2022',
      note: 'Giao đến HN'
    },
    {
      id: '39842-232',
      productName: 'Macbook Pro 13\'',
      orderId: '23687VN/HN',
      userId: 'UTG002',
      status: 'Đã xác thực',
      totalPrice: '$2,999.00',
      date: '22 Feb, 2022',
      note: 'Giao đến HN'
    },
    {
      id: '39842-233',
      productName: 'iPhone 13 Mini',
      orderId: '78155VN/HN',
      userId: 'UTG003',
      status: 'Đang giao hàng',
      totalPrice: '$2,999.00',
      date: '22 Feb, 2022',
      note: 'Giao đến HN'
    },
    {
      id: '39842-234',
      productName: 'iPhone 14',
      orderId: '68465VN/HN',
      userId: 'UTG004',
      status: 'Đã giao hàng',
      totalPrice: '$2,999.00',
      date: '22 Feb, 2022',
      note: 'Giao đến HN'
    },
    {
      id: '39842-235',
      productName: 'AirPods 2',
      orderId: '98457VN/HN',
      userId: 'UTG005',
      status: 'Đã thanh toán',
      totalPrice: '$2,999.00',
      date: '22 Feb, 2022',
      note: 'Giao đến HN'
    }
  ];

  return (
    <div className="orders p-4">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Tên sản phẩm</th>
            <th className="py-2 px-4 border-b">Mã đơn hàng</th>
            <th className="py-2 px-4 border-b">Id User</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Total Price</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Note</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="text-center">
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b">{order.productName}</td>
              <td className="py-2 px-4 border-b">{order.orderId}</td>
              <td className="py-2 px-4 border-b">{order.userId}</td>
              <td className="py-2 px-4 border-b">{order.status}</td>
              <td className="py-2 px-4 border-b">{order.totalPrice}</td>
              <td className="py-2 px-4 border-b">{order.date}</td>
              <td className="py-2 px-4 border-b">{order.note}</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">Detail</button>
                <button className="bg-yellow-500 text-white px-2 py-1 rounded">Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;

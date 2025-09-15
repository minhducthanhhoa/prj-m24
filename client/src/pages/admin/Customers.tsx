import React, { useState } from 'react';
import Sidebar from './Sidebar';

interface Customer {
  id: string;
  username: string;
  email: string;
  role: 'Admin' | 'User';
  date: string;
  active: boolean;
}

const initialCustomers: Customer[] = [
  {
    id: '12542',
    username: 'Rikkei Academy',
    email: 'ra@rikkeisoft.com',
    role: 'Admin',
    date: '20 Jan, 2022',
    active: true,
  },
  {
    id: '32423',
    username: 'User1',
    email: 'user1@gmail.com',
    role: 'User',
    date: '22 Feb, 2022',
    active: false,
  },
  {
    id: '39985',
    username: 'User2',
    email: 'user2@gmail.com',
    role: 'User',
    date: '22 Feb, 2022',
    active: false,
  },
  {
    id: '69532',
    username: 'User3',
    email: 'user3@gmail.com',
    role: 'User',
    date: '22 Feb, 2022',
    active: false,
  },
  {
    id: '74832',
    username: 'User4',
    email: 'user4@gmail.com',
    role: 'User',
    date: '22 Feb, 2022',
    active: true,
  },
];

const CustomerForm: React.FC<{
  onAdd: (customer: Customer) => void;
  onCancel: () => void;
}> = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Customer, 'id' | 'date'>>({
    username: '',
    email: '',
    role: 'User',
    active: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.username || !formData.email) return;

    const newCustomer: Customer = {
      ...formData,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
    };
    onAdd(newCustomer);
  };

  return (
    <div className="mb-4 bg-gray-100 p-4 rounded">
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="border p-2 mr-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border p-2 mr-2"
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="border p-2 mr-2"
      >
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Add User
      </button>
      <button
        onClick={onCancel}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Cancel
      </button>
    </div>
  );
};

const CustomerTable: React.FC<{
  customers: Customer[];
  onToggleActive: (id: string) => void;
}> = ({ customers, onToggleActive }) => (
  <table className="min-w-full bg-white">
    <thead>
      <tr>
        <th className="py-2 px-4 border-b">ID</th>
        <th className="py-2 px-4 border-b">Tên đăng nhập</th>
        <th className="py-2 px-4 border-b">Email</th>
        <th className="py-2 px-4 border-b">Role</th>
        <th className="py-2 px-4 border-b">Date</th>
        <th className="py-2 px-4 border-b">Action</th>
      </tr>
    </thead>
    <tbody>
      {customers.map((customer) => (
        <tr key={customer.id} className="text-center">
          <td className="py-2 px-4 border-b">{customer.id}</td>
          <td className="py-2 px-4 border-b">{customer.username}</td>
          <td className="py-2 px-4 border-b">{customer.email}</td>
          <td className="py-2 px-4 border-b">{customer.role}</td>
          <td className="py-2 px-4 border-b">{customer.date}</td>
          <td className="py-2 px-4 border-b">
            <button
              onClick={() => onToggleActive(customer.id)}
              className={`text-white px-2 py-1 rounded mr-2 ${
                customer.active ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {customer.active ? 'Active' : 'Inactive'}
            </button>
            <button className="bg-blue-500 text-white px-2 py-1 rounded">
              View
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [showForm, setShowForm] = useState(false);

  const addCustomer = (customer: Customer) => {
    setCustomers((prev) => [...prev, customer]);
    setShowForm(false);
  };

  const toggleActive = (id: string) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === id ? { ...customer, active: !customer.active } : customer
      )
    );
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="customers p-4">
        <h2 className="text-2xl font-bold mb-4">Customers</h2>

        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          {showForm ? 'Đóng Form' : 'Thêm User'}
        </button>

        {showForm && (
          <CustomerForm onAdd={addCustomer} onCancel={() => setShowForm(false)} />
        )}

        <CustomerTable customers={customers} onToggleActive={toggleActive} />
      </div>
    </div>
  );
};

export default Customers;

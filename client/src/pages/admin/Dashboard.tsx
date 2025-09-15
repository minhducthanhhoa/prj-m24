import React from 'react';
import { FaTachometerAlt, FaProductHunt, FaShoppingCart, FaUsers } from 'react-icons/fa';
import Sidebar from './Sidebar';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => (
  <div className="stat p-4 bg-white shadow rounded flex items-center">
    <div className="text-4xl">{icon}</div>
    <div className="ml-4">
      <p>{label}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const stats = [
    {
      icon: <FaTachometerAlt className="text-blue-500" />,
      label: 'Total Sales',
      value: '$9,328.55',
    },
    {
      icon: <FaProductHunt className="text-green-500" />,
      label: 'Visitors',
      value: '12,302',
    },
    {
      icon: <FaShoppingCart className="text-yellow-500" />,
      label: 'Orders',
      value: '963',
    },
    {
      icon: <FaUsers className="text-red-500" />,
      label: 'Top Categories',
      value: '$6.2k',
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="dashboard p-4 w-full">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <div className="stats grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

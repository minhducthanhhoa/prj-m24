import React from 'react';
import { FaTachometerAlt, FaProductHunt, FaShoppingCart, FaUsers } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="stats grid grid-cols-2 gap-4">
        <div className="stat p-4 bg-white shadow rounded flex items-center">
          <FaTachometerAlt className="text-4xl text-blue-500" />
          <div className="ml-4">
            <p>Total Sales</p>
            <h3 className="text-xl font-bold">$9,328.55</h3>
          </div>
        </div>
        <div className="stat p-4 bg-white shadow rounded flex items-center">
          <FaProductHunt className="text-4xl text-green-500" />
          <div className="ml-4">
            <p>Visitors</p>
            <h3 className="text-xl font-bold">12,302</h3>
          </div>
        </div>
        <div className="stat p-4 bg-white shadow rounded flex items-center">
          <FaShoppingCart className="text-4xl text-yellow-500" />
          <div className="ml-4">
            <p>Orders</p>
            <h3 className="text-xl font-bold">963</h3>
          </div>
        </div>
        <div className="stat p-4 bg-white shadow rounded flex items-center">
          <FaUsers className="text-4xl text-red-500" />
          <div className="ml-4">
            <p>Top Categories</p>
            <h3 className="text-xl font-bold">$6.2k</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

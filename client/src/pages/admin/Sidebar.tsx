import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaProductHunt, FaShoppingCart, FaUsers, FaListAlt } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Rikkei Academy</h2>
      <ul>
        <li className="mb-4">
          <Link to="/dashboard" className="flex items-center">
            <FaTachometerAlt className="mr-2" />
            Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/productsAdmin" className="flex items-center">
            <FaProductHunt className="mr-2" />
            Products
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/orders" className="flex items-center">
            <FaShoppingCart className="mr-2" />
            Orders
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/customers" className="flex items-center">
            <FaUsers className="mr-2" />
            Customers
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/categories" className="flex items-center">
            <FaListAlt className="mr-2" />
            Categories
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

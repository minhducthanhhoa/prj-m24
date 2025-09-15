import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaProductHunt,
  FaShoppingCart,
  FaUsers,
  FaListAlt,
} from "react-icons/fa";

interface MenuItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { path: "/productsAdmin", label: "Products", icon: <FaProductHunt /> },
  { path: "/orders", label: "Orders", icon: <FaShoppingCart /> },
  { path: "/customers", label: "Customers", icon: <FaUsers /> },
  { path: "/categories", label: "Categories", icon: <FaListAlt /> },
];

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Rikkei Academy</h2>
      <ul>
        {menuItems.map(({ path, label, icon }) => (
          <li key={path} className="mb-4">
            <Link to={path} className="flex items-center hover:text-gray-300">
              <span className="mr-2">{icon}</span>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

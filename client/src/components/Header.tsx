import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: <FaShoppingCart />, to: "/cart" },
  ];

  const actionButtons = [
    { label: "Admin", onClick: () => navigate("/admin"), style: "bg-blue-500" },
    { label: "Login", onClick: () => navigate("/loginUser"), style: "bg-blue-500" },
    { label: "Register", onClick: () => navigate("/register"), style: "bg-green-500" },
  ];

  return (
    <header className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <h1 className="text-2xl font-bold">Phone Store</h1>

      <nav className="flex items-center space-x-4">
        {/* Links */}
        {navLinks.map((link, idx) => (
          <Link
            key={idx}
            to={link.to}
            className="hover:text-blue-400 transition-colors"
          >
            {link.label}
          </Link>
        ))}

        {/* Action Buttons */}
        {actionButtons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.onClick}
            className={`${btn.style} px-4 py-2 rounded hover:opacity-90 transition`}
          >
            {btn.label}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;

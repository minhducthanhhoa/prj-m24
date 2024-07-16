import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/loginUser');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleAdminClick = () => {
    navigate('/admin');
  };

  return (
    <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <h1 className="text-2xl">Phone Store</h1>
      <nav className="flex items-center">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/products" className="mr-4">Products</Link>
        <Link to="/cart" className="mr-4">
          <FaShoppingCart />
        </Link>
        <button onClick={handleAdminClick} className="bg-blue-500 px-4 py-2 rounded">Admin</button>
        <button onClick={handleLoginClick} className="bg-blue-500 px-4 py-2 rounded mr-4">Login</button>
        <button onClick={handleRegisterClick} className="bg-green-500 px-4 py-2 rounded">Register</button>
      </nav>
    </header>
  );
};

export default Header;

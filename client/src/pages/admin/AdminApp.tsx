import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../../pages/admin/Dashboard';
import Orders from '../../pages/admin/Orders';
import Customers from '../../pages/admin/Customers';
import Login from '../../pages/admin/Login';
import Sidebar from '../../pages/admin/Sidebar';
import Categories from '../../pages/admin/Categories';
import AddCategory from '../../pages/admin/AddCategory';
import EditCategory from '../../pages/admin/EditCategory';
import { CategoryProvider } from '../../pages/admin/CategoryContext';
import ProductsAdmin from './ProductsAdmin';

const AdminApp: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <CategoryProvider>
      <div className="flex">
        {isLoggedIn && <Sidebar />}
        <div className="flex-1">
          {isLoggedIn ? (
            <>
              <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
                <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
              </nav>
              <div className="p-4">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/productsAdmin" element={<ProductsAdmin />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/categories/add" element={<AddCategory />} />
                  <Route path="/categories/edit/:id" element={<EditCategory />} />
                  {/* <Route path="*" element={<Navigate to="/dashboard"/>} />  */}
                </Routes>
              </div>
            </>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </div>
      </div>
    </CategoryProvider>
  );
};

export default AdminApp;

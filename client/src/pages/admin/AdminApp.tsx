import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../../pages/admin/Dashboard";
import Orders from "../../pages/admin/Orders";
import Customers from "../../pages/admin/Customers";
import Login from "../../pages/admin/Login";
import Sidebar from "../../pages/admin/Sidebar";
import Categories from "../../pages/admin/Categories";
import ProductsAdmin from "./ProductsAdmin";

const AdminApp: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  // Config routes
  const adminRoutes = [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/productsAdmin", element: <ProductsAdmin /> },
    { path: "/orders", element: <Orders /> },
    { path: "/customers", element: <Customers /> },
    { path: "/categories", element: <Categories /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {isLoggedIn && <Sidebar />}

      <div className="flex-1">
        {isLoggedIn ? (
          <>
            {/* Navbar */}
            <nav className="flex items-center justify-between bg-gray-800 p-4 text-white">
              <h1 className="text-lg font-semibold">Admin Panel</h1>
              <button
                onClick={handleLogout}
                className="rounded bg-red-500 px-4 py-2 transition hover:bg-red-600"
              >
                Logout
              </button>
            </nav>

            {/* Content */}
            <div className="p-4">
              <Routes>
                {adminRoutes.map((route, idx) => (
                  <Route key={idx} path={route.path} element={route.element} />
                ))}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
          </>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default AdminApp;

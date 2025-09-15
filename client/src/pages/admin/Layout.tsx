import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout: React.FC = () => (
  <div className="flex min-h-screen">
    {/* Sidebar cố định */}
    <Sidebar />

    {/* Main content */}
    <main className="flex-1 p-4 bg-gray-50">
      <Outlet />
    </main>
  </div>
);

export default Layout;

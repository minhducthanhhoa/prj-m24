import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Banner from './components/Banner';
import Home from './pages/user/Home';
import Products from './pages/user/Products';
import ProductDetailPage from './pages/user/ProductDetailPage';
import Cart from './pages/user/Cart';
import LoginUser from './pages/user/LoginUser';
import Register from './pages/user/Register';
import AdminApp from './pages/admin/AdminApp';  // Ensure the correct import path
import Orders from './pages/admin/Orders';
import Dashboard from './pages/admin/Dashboard';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import Customers from './pages/admin/Customers';
import Categories from './pages/admin/Categories';
import AddCategory from './pages/admin/AddCategory';
import EditCategory from './pages/admin/EditCategory';


const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Banner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/loginUser" element={<LoginUser />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/*" element={<AdminApp />} />
        
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="productsAdmin" element={<ProductsAdmin />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/add" element={<AddCategory />} />
          <Route path="categories/edit/:id" element={<EditCategory />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

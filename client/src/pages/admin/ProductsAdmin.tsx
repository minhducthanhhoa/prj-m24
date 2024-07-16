import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Sidebar from './Sidebar';

// Mock API function to fetch products data from the given URL
const fetchProducts = async () => {
  const response = await fetch('http://localhost:5000/products');
  const data = await response.json();
  return data;
};

interface Product {
  id: string;
  name: string;
  status: string;
  category: string;
  price: string;
  date: string;
}

const ProductsAdmin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchProducts();
      const formattedProducts = productsData.map((product: any) => ({
        ...product,
        status: 'Available', // Add a default status or fetch from actual data if available
        date: '20 Jan, 2022' // Add a default date or fetch from actual data if available
      }));
      setProducts(formattedProducts);
    };

    loadProducts();
  }, []);

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setFormMode('add');
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setFormMode('edit');
    setShowForm(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setCurrentProduct(product);
    setShowDeleteModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProduct: Product = {
      id: formData.get('id') as string,
      name: formData.get('name') as string,
      status: formData.get('status') as string,
      category: formData.get('category') as string,
      price: formData.get('price') as string,
      date: formData.get('date') as string,
    };

    if (formMode === 'add') {
      setProducts([...products, newProduct]);
    } else if (formMode === 'edit' && currentProduct) {
      setProducts(products.map(product => product.id === currentProduct.id ? newProduct : product));
    }

    setShowForm(false);
  };

  const confirmDelete = () => {
    if (currentProduct) {
      setProducts(products.filter(product => product.id !== currentProduct.id));
      setShowDeleteModal(false);
    }
  };

  return (
    <>
    <div className="products p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <button onClick={handleAddProduct} className="bg-blue-500 text-white px-4 py-2 rounded mb-4 flex items-center">
        <FaPlus className="mr-2" /> Add Product
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Category</th>
              <th className="py-2 px-4 border-b text-left">Price</th>
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border-b text-left">{product.id}</td>
                <td className="py-2 px-4 border-b text-left">{product.name}</td>
                <td className="py-2 px-4 border-b text-left">{product.status}</td>
                <td className="py-2 px-4 border-b text-left">{product.category}</td>
                <td className="py-2 px-4 border-b text-left">{product.price}</td>
                <td className="py-2 px-4 border-b text-left">{product.date}</td>
                <td className="py-2 px-4 border-b text-left">
                  <button onClick={() => handleEditProduct(product)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 flex items-center">
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button onClick={() => handleDeleteProduct(product)} className="bg-red-500 text-white px-2 py-1 rounded flex items-center">
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md w-1/2">
            <h2 className="text-xl font-bold mb-4">{formMode === 'add' ? 'Add Product' : 'Edit Product'}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block mb-1">ID</label>
                <input name="id" defaultValue={currentProduct?.id || ''} className="w-full px-2 py-1 border rounded" required />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input name="name" defaultValue={currentProduct?.name || ''} className="w-full px-2 py-1 border rounded" required />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Status</label>
                <input name="status" defaultValue={currentProduct?.status || ''} className="w-full px-2 py-1 border rounded" required />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Category</label>
                <input name="category" defaultValue={currentProduct?.category || ''} className="w-full px-2 py-1 border rounded" required />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Price</label>
                <input name="price" defaultValue={currentProduct?.price || ''} className="w-full px-2 py-1 border rounded" required />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Date</label>
                <input name="date" defaultValue={currentProduct?.date || ''} className="w-full px-2 py-1 border rounded" required />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md w-1/3">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
            <div className="flex justify-end mt-4">
              <button type="button" onClick={() => setShowDeleteModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
              <button type="button" onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default ProductsAdmin;

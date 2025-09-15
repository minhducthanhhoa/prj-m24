import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "./Sidebar";

// Mock API
const fetchProducts = async () => {
  const response = await fetch("http://localhost:5000/products");
  return response.json();
};

interface Product {
  id: string;
  name: string;
  status: string;
  category: string;
  price: string;
  date: string;
}

// ✅ Component Form thêm/sửa
const ProductForm: React.FC<{
  product: Product | null;
  mode: "add" | "edit";
  onClose: () => void;
  onSubmit: (product: Product) => void;
}> = ({ product, mode, onClose, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newProduct: Product = {
      id: formData.get("id") as string,
      name: formData.get("name") as string,
      status: formData.get("status") as string,
      category: formData.get("category") as string,
      price: formData.get("price") as string,
      date: formData.get("date") as string,
    };

    onSubmit(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-md w-1/2">
        <h2 className="text-xl font-bold mb-4">
          {mode === "add" ? "Add Product" : "Edit Product"}
        </h2>
        <form onSubmit={handleSubmit}>
          {["id", "name", "status", "category", "price", "date"].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block mb-1 capitalize">{field}</label>
              <input
                name={field}
                defaultValue={product ? (product as any)[field] : ""}
                className="w-full px-2 py-1 border rounded"
                required
              />
            </div>
          ))}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ✅ Component Xác nhận xóa
const DeleteModal: React.FC<{
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-4 rounded shadow-md w-1/3">
      <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
      <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

// ✅ Main Component
const ProductsAdmin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Load dữ liệu
  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchProducts();
      const formatted = productsData.map((p: any) => ({
        ...p,
        status: "Available",
        date: "20 Jan, 2022",
      }));
      setProducts(formatted);
    };
    loadProducts();
  }, []);

  // Add
  const handleAddProduct = () => {
    setCurrentProduct(null);
    setFormMode("add");
    setShowForm(true);
  };

  // Edit
  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setFormMode("edit");
    setShowForm(true);
  };

  // Delete
  const handleDeleteProduct = (product: Product) => {
    setCurrentProduct(product);
    setShowDeleteModal(true);
  };

  // Submit form
  const handleFormSubmit = (newProduct: Product) => {
    if (formMode === "add") {
      setProducts((prev) => [...prev, newProduct]);
    } else if (formMode === "edit" && currentProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === currentProduct.id ? newProduct : p))
      );
    }
  };

  const confirmDelete = () => {
    if (currentProduct) {
      setProducts((prev) => prev.filter((p) => p.id !== currentProduct.id));
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="products p-4 flex-1">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 flex items-center"
        >
          <FaPlus className="mr-2" /> Add Product
        </button>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                {["ID", "Name", "Status", "Category", "Price", "Date", "Action"].map(
                  (h) => (
                    <th
                      key={h}
                      className="py-2 px-4 border-b text-left font-medium"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="py-2 px-4 border-b">{p.id}</td>
                  <td className="py-2 px-4 border-b">{p.name}</td>
                  <td className="py-2 px-4 border-b">{p.status}</td>
                  <td className="py-2 px-4 border-b">{p.category}</td>
                  <td className="py-2 px-4 border-b">{p.price}</td>
                  <td className="py-2 px-4 border-b">{p.date}</td>
                  <td className="py-2 px-4 border-b flex gap-2">
                    <button
                      onClick={() => handleEditProduct(p)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded flex items-center"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(p)}
                      className="bg-red-500 text-white px-2 py-1 rounded flex items-center"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Form */}
        {showForm && (
          <ProductForm
            product={currentProduct}
            mode={formMode}
            onClose={() => setShowForm(false)}
            onSubmit={handleFormSubmit}
          />
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <DeleteModal
            onConfirm={confirmDelete}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsAdmin;

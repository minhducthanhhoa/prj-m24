import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from './CategoryContext';

const AddCategory: React.FC = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addCategory } = useCategories();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '') {
      setError('Tên danh mục không được để trống');
      return;
    }
    addCategory(name);
    navigate('/categories');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </div>
  );
};

export default AddCategory;

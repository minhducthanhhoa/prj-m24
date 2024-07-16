import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCategories } from './CategoryContext';

const EditCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { categories, updateCategory } = useCategories();
  const [name, setName] = useState('');

  useEffect(() => {
    if (id) {
      const category = categories.find(category => category.id === parseInt(id));
      if (category) {
        setName(category.name);
      }
    }
  }, [id, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      updateCategory(parseInt(id), name);
      navigate('/categories');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EditCategory;

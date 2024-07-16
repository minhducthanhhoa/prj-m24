import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import { useCategories } from './CategoryContext';

const Categories: React.FC = () => {
  const { categories, deleteCategory } = useCategories();
  const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = (id: number) => {
    setSelectedCategory(id);
    setShow(true);
  };

  const handleDelete = () => {
    if (selectedCategory !== null) {
      deleteCategory(selectedCategory);
      setShow(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <Link to="/categories/add" className="btn btn-primary mb-4 inline-flex items-center">
        <FaPlus className="mr-2" /> Add Category
      </Link>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td className="py-2 px-4">{category.name}</td>
              <td className="py-2 px-4 flex items-center">
                <Link to={`/categories/edit/${category.id}`} className="text-blue-500 mr-4">
                  <FaEdit />
                </Link>
                <button onClick={() => handleShow(category.id)} className="text-red-500">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa danh mục này?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Categories;

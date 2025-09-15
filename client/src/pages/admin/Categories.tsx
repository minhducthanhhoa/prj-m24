import React, { useState } from 'react';
import { FaTrashAlt, FaPencilAlt, FaPlusCircle } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import Sidebar from './Sidebar';

interface Category {
  id: string;
  name: string;
  type: 'iphone' | 'android';
}

type ModalMode = 'add' | 'edit' | 'delete' | null;

const CategoryList: React.FC<{
  categories: Category[];
  onEdit: (c: Category) => void;
  onDelete: (c: Category) => void;
}> = ({ categories, onEdit, onDelete }) => (
  <ul className="space-y-2">
    {categories.map((category) => (
      <li
        key={category.id}
        className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
      >
        <span>{category.name}</span>
        <div className="space-x-2">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => onEdit(category)}
          >
            <FaPencilAlt />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => onDelete(category)}
          >
            <FaTrashAlt />
          </button>
        </div>
      </li>
    ))}
  </ul>
);

const CategoryFormModal: React.FC<{
  show: boolean;
  mode: 'add' | 'edit';
  category: Category;
  onChange: (c: Category) => void;
  onCancel: () => void;
  onSave: () => void;
}> = ({ show, mode, category, onChange, onCancel, onSave }) => (
  <Modal show={show} onHide={onCancel}>
    <Modal.Header closeButton>
      <Modal.Title>{mode === 'add' ? 'Add Category' : 'Edit Category'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={category.name}
            onChange={(e) => onChange({ ...category, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="type" className="mt-2">
          <Form.Label>Type</Form.Label>
          <Form.Control
            as="select"
            value={category.type}
            onChange={(e) =>
              onChange({ ...category, type: e.target.value as 'iphone' | 'android' })
            }
          >
            <option value="iphone">iPhone</option>
            <option value="android">Android</option>
          </Form.Control>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="primary" onClick={onSave}>
        Save
      </Button>
    </Modal.Footer>
  </Modal>
);

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'iPhone 12', type: 'iphone' },
    { id: '2', name: 'Samsung Galaxy S21', type: 'android' },
    { id: '3', name: 'iPhone 13', type: 'iphone' },
    { id: '4', name: 'Redmi Note 10', type: 'android' },
  ]);

  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleAdd = () => {
    setSelectedCategory({ id: '', name: '', type: 'iphone' });
    setModalMode('add');
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setModalMode('edit');
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setModalMode('delete');
  };

  const confirmSave = () => {
    if (!selectedCategory) return;

    if (modalMode === 'add') {
      const newCategory = { ...selectedCategory, id: `new-${categories.length + 1}` };
      setCategories([...categories, newCategory]);
    } else if (modalMode === 'edit') {
      setCategories(
        categories.map((c) => (c.id === selectedCategory.id ? selectedCategory : c))
      );
    }

    setModalMode(null);
    setSelectedCategory(null);
  };

  const confirmDelete = () => {
    if (selectedCategory) {
      setCategories(categories.filter((c) => c.id !== selectedCategory.id));
    }
    setModalMode(null);
    setSelectedCategory(null);
  };

  const cancelModal = () => {
    setModalMode(null);
    setSelectedCategory(null);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Category Management</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(['iphone', 'android'] as const).map((type) => (
            <div key={type}>
              <h2 className="text-2xl font-bold mb-2">{type === 'iphone' ? 'iPhone' : 'Android'}</h2>
              <CategoryList
                categories={categories.filter((c) => c.type === type)}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 text-right">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center"
            onClick={handleAdd}
          >
            <FaPlusCircle className="mr-2" />
            Add Category
          </button>
        </div>

        {/* Add/Edit Modal */}
        {modalMode && modalMode !== 'delete' && selectedCategory && (
          <CategoryFormModal
            show={true}
            mode={modalMode}
            category={selectedCategory}
            onChange={setSelectedCategory}
            onCancel={cancelModal}
            onSave={confirmSave}
          />
        )}

        {/* Delete Modal */}
        {modalMode === 'delete' && selectedCategory && (
          <Modal show={true} onHide={cancelModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete the "{selectedCategory.name}" category?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={cancelModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
}

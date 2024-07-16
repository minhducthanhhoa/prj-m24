import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Category {
  id: number;
  name: string;
}

interface CategoryContextProps {
  categories: Category[];
  addCategory: (name: string) => void;
  deleteCategory: (id: number) => void;
  updateCategory: (id: number, name: string) => void;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Android' },
    { id: 2, name: 'iPhone' },
  ]);

  const addCategory = (name: string) => {
    const newCategory = { id: categories.length + 1, name };
    setCategories([...categories, newCategory]);
  };

  const deleteCategory = (id: number) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const updateCategory = (id: number, name: string) => {
    setCategories(categories.map(category => (category.id === id ? { id, name } : category)));
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory, deleteCategory, updateCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

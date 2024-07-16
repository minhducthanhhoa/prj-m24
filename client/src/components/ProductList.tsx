import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../redux/slices/productSlice';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onAddToFavorites: (id: number) => void;
  favorites: number[];
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart, onAddToFavorites, favorites }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product: any) => (
        <div key={product.id} className="product-card">
          <div className="product-image-container">
            <img src={product.image} alt={product.name} className="product-image" />
          </div>
          <h3 className="text-xl">{product.name}</h3>
          <p>Price: ${product.price}</p>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-blue-500 text-white px-4 py-2 mt-2 w-full flex items-center justify-center"
          >
            <FaShoppingCart className="mr-2" /> Add to Cart
          </button>
          <button
            onClick={() => onAddToFavorites(product.id)}
            className={`absolute top-4 right-4 ${favorites.includes(product.id) ? 'text-red-500' : 'text-gray-500'}`}
          >
            <FaHeart />
          </button>
          <Link to={`/product/${product.id}`} className="text-blue-500 mt-2 block text-center">View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

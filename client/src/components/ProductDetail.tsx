import React from 'react';
import { Product } from '../redux/slices/productSlice';

interface ProductDetailProps {
  product: Product;
  onAddToCart: () => void;
  onAddToFavorites: () => void;
  isFavorite: boolean;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onAddToFavorites, isFavorite }) => {
  return (
    <div className="border p-4">
      <img src={product.image} alt={product.name} className="w-full h-64 object-contain mb-4" />
      <h3 className="text-2xl">{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <button
        onClick={onAddToCart}
        className="bg-blue-500 text-white px-4 py-2 mt-4"
      >
        Add to Cart
      </button>
      <button
        onClick={onAddToFavorites}
        className={`ml-4 ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default ProductDetail;
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../redux/slices/productSlice";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onAddToFavorites: (id: number) => void;
  favorites: number[];
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddToCart,
  onAddToFavorites,
  favorites,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="relative rounded-lg border bg-white p-4 shadow hover:shadow-lg transition"
        >
          {/* Favorite */}
          <button
            onClick={() => onAddToFavorites(product.id)}
            className={`absolute right-4 top-4 text-xl transition ${
              favorites.includes(product.id)
                ? "text-red-500"
                : "text-gray-400 hover:text-red-400"
            }`}
          >
            <FaHeart />
          </button>

          {/* Image */}
          <div className="mb-4 flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-contain"
            />
          </div>

          {/* Info */}
          <h3 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h3>
          <p className="mt-1 text-blue-600 font-medium">
            {formatPrice(product.price)}
          </p>

          {/* Actions */}
          <div className="mt-4">
            <button
              onClick={() => onAddToCart(product)}
              className="flex w-full items-center justify-center rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
            >
              <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
            <Link
              to={`/product/${product.id}`}
              className="mt-3 block text-center text-sm font-medium text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

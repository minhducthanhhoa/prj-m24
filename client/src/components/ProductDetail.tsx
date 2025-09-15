import React from "react";
import { Product } from "../redux/slices/productSlice";

interface ProductDetailProps {
  product: Product;
  onAddToCart: () => void;
  onAddToFavorites: () => void;
  isFavorite: boolean;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    price
  );

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onAddToCart,
  onAddToFavorites,
  isFavorite,
}) => {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-md transition hover:shadow-lg">
      {/* Image */}
      <div className="mb-4 flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full max-w-sm object-contain"
        />
      </div>

      {/* Info */}
      <h3 className="text-2xl font-semibold text-gray-800">{product.name}</h3>
      <p className="mt-2 text-lg font-medium text-blue-600">
        {formatPrice(product.price)}
      </p>
      <p className="text-gray-500">Category: {product.category}</p>

      {/* Actions */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={onAddToCart}
          className="rounded bg-blue-500 px-5 py-2 text-white transition hover:bg-blue-600"
        >
          Add to Cart
        </button>
        <button
          onClick={onAddToFavorites}
          className={`rounded px-5 py-2 transition ${
            isFavorite
              ? "bg-red-100 text-red-500 hover:bg-red-200"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;

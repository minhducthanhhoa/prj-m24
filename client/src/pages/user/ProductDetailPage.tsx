import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchProducts,
  addToFavorites,
  removeFromFavorites,
} from "../../redux/slices/productSlice";
import { addItemToCart } from "../../redux/slices/cartSlice";
import { RootState, AppDispatch } from "../../redux/store";
import ProductDetail from "../../components/ProductDetail";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { items, favorites } = useSelector((state: RootState) => state.products);
  const product = items.find((item) => item.id === Number(id));

  useEffect(() => {
    if (!product) {
      dispatch(fetchProducts());
    }
  }, [dispatch, product]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItemToCart({ ...product, quantity: 1 }));
    }
  };

  const toggleFavorite = () => {
    if (!product) return;
    const action = favorites.includes(product.id)
      ? removeFromFavorites(product.id)
      : addToFavorites(product.id);
    dispatch(action);
  };

  if (!product) {
    return (
      <div className="container mx-auto text-center py-10">
        <p className="text-lg text-gray-600">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <ProductDetail
        product={product}
        onAddToCart={handleAddToCart}
        onAddToFavorites={toggleFavorite}
        isFavorite={favorites.includes(product.id)}
      />
    </div>
  );
};

export default ProductDetailPage;
